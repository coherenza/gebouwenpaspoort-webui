import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Map.css";
import MapGL, {
  GeolocateControl,
  Layer,
  MapLayerMouseEvent,
  MapRef,
  NavigationControl,
  Source,
} from "react-map-gl";
import { LngLatBounds } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { AppContext } from "./App";
import { GBPObject, getObjectType } from "./schema";
import {
  useGeoSearch,
  useInfiniteHits,
  useSearchBox,
} from "react-instantsearch";
import { Header } from "./Header";
import useDebounce from "./useDebounce";
import { mapboxToken } from "./config";
import { ToolTip } from "./Tooltip";
import { Dialog } from "./Dialog";
import CustomIcons from "./Icons";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from "@turf/turf";
import { boundsLngLatToIS, boundsLngLatToMatrix } from "./bounds";
import { LayerSource } from "./layers/LayerSource";
import { bagLayerId } from "./layers/LayerTypes";
import { bagLayer } from "./layers/LayerStyles";
import { boundsUtrecht } from "./layers/constants";

export const mapStartState = {
  latitude: 52.0907,
  longitude: 5.1213,
  zoom: 11,
};

export const startBoundsInstant = {
  northEast: { lng: 5.2739270893989385, lat: 52.173599476147416 },
  southWest: { lng: 4.975922939008171, lat: 52.013504913663525 },
};

export const startBounds = new LngLatBounds(
  startBoundsInstant.northEast,
  startBoundsInstant.southWest,
);

export const zoomStreetLevel = 18;

/** Amount of ms to animate the map to the new bounds */
const animationDuration = 1000;

export function Map() {
  const { refine } = useGeoSearch();
  const { hits: items } = useInfiniteHits({
    escapeHTML: false,
  });
  const { query } = useSearchBox();
  const {
    setCurrent,
    current,
    showFilter,
    showResults,
    showDetails,
    setShowDetails,
    setShowFilter,
    setShowResults,
    setShowLayerSelector,
    lastInteractionOrigin,
    setLastInteractionOrigin,
    setLocationFilter,
    showLayerSelector,
    locationFilter,
    layers,
  } = useContext(AppContext);
  const mapRef = useRef<MapRef>();
  const [viewState, setViewState] = useState(mapStartState);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [clickedFeature, setClickedFeature] = useState(null);
  const [area, setArea] = useState<number | null>(null);
  const [lineLength, setLineLength] = useState<number | null>(null);
  const [currentBounds, setCurrentBounds] = useState<LngLatBounds | null>(null);
  // Add a ref to store the MapboxDraw instance
  const drawRef = useRef<any>(null);

  // Add a flag to track if we're currently animating
  const isAnimating = useRef(false);

  // Add state for tracking active drawing mode
  const [activeMode, setActiveMode] = useState<string | null>(null);

  // if the users toggles the sidebars, resize the map
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.getMap().resize();
    }
  }, [current, showFilter, showResults, showLayerSelector, showDetails]);

  // If user changed the query, move the bounds to the new items
  useEffect(() => {
    if (lastInteractionOrigin == "map") {
      return;
    }
    moveBounds();
  }, [query, mapRef.current, items]);

  // initialize map
  // Load marker icon
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (map) {
      CustomIcons.forEach((icon) => {
        const customIcon = new Image(24, 24);
        customIcon.src = icon.src;
        let opts = { sdf: true };
        customIcon.onload = () => map.addImage(icon.name, customIcon, opts);
      });
    }
  }, [mapRef.current]);

  const moveBounds = useCallback(() => {
      if (!mapRef.current) {
        return;
      }
      if (query == "") {
        mapRef.current?.fitBounds(boundsUtrecht)
        return;
      }
      if (items.length == 0) {
        mapRef.current?.fitBounds(boundsUtrecht)
        return;
      }
      const firstItem = items[0];

      mapRef.current?.getMap().flyTo({
        center: [firstItem._geoloc.lng, firstItem._geoloc.lat],
        zoom: zoomStreetLevel,
        duration: animationDuration,
      });

    }, [mapRef, items, query]);

  // If the user moves the map, update the query to filter current area
  const updateBoundsQuery = useCallback((evt) => {
    // Don't update if we're animating or if it's not a user-initiated event
    if (!evt.originalEvent || lastInteractionOrigin === "text" || isAnimating.current) {
      return;
    }
    const latLngBounds = mapRef.current.getMap().getBounds();
    if (latLngBounds) {
      setCurrentBounds(latLngBounds);
      const boundsIS = boundsLngLatToIS(latLngBounds);
      refine(boundsIS);
    }
    setLastInteractionOrigin("map");
    setViewState(evt.viewState);
  }, [lastInteractionOrigin, refine, isAnimating]);

  const setCenter = useCallback(
    (item: GBPObject) => {
      mapRef.current?.getMap().flyTo({
        center: [item._geo.lng, item._geo.lat],
        zoom: zoomStreetLevel,
        duration: animationDuration,
      });
    },
    [mapRef],
  );

  const handleHover = useCallback(
    (event) => {
      const {
        features,
        point: { x, y },
      } = event;
      const hoveredFeature = features && features[0];
      if (!mapRef.current) {
        return;
      }
      if (hoveredFeature) {
        mapRef.current.getCanvas().style.cursor = "pointer";
      } else {
        mapRef.current.getCanvas().style.cursor = "";
      }
      setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
    },
    [layers],
  );

  const visibleLayers = useMemo(() => {
    const active = layers.filter((l) => l.visible);
    return active;
  }, [layers]);

  const data: GeoJSON.FeatureCollection<GeoJSON.Geometry> = useMemo(() => {
    return {
      type: "FeatureCollection",
      id: bagLayerId,
      features: items.map((item, index) => {
        const isCurrent = item.id == current?.id ||
          locationFilter?.id == item.id;

        const { color, isAob, label } = getObjectType(item);

        // If the first item is also an address, we open it on the map.
        // But only if the user was interacting with something other than the map.
        if (index == 0 && isAob && lastInteractionOrigin == "text") {
          setCurrent(item as unknown as GBPObject);
          // setShowDetails(true);
        }

        const iconTitle = isAob
          ? item.hoofdadres["bag-num-huisnummer-letter-aanduiding"]
          : item.naam;

        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [item._geoloc.lng, item._geoloc.lat],
          },
          properties: {
            // These are be displayed in the popup
            [label]: item.naam,
            // These are used to style the point.
            // Add the keys to `hiddenProps` in `Tooltip.tsx` to hide them from the tooltip.
            id: item.id,
            size: isCurrent ? 1.4 : 1,
            "text-size": isCurrent ? 15 : 12,
            // Lower = shown on top
            "sort-key": isCurrent ? 0 : 1,
            type: item["bag-object-type"],
            color: isCurrent ? "#000000" : color,
            title: iconTitle,
            icon: isAob ? "my-marker" : "houses",
          },
        };
      }),
    };
  }, [items, current, lastInteractionOrigin]);

  const showBagLayer =
    layers.filter((l) => l.id == bagLayerId && l.visible).length > 0;

  const interactiveLayers = useMemo(() => {
    let l: string[] = [];
    layers.filter((l) => l.visible).forEach((layer) => {
      // Add base layer ID
      l.push(layer.id);
      // For vector layers, also add the symbol layer ID
      if (layer.type === 'vector') {
        l.push(`${layer.id}-symbol`);
      }
    });
    showBagLayer && l.push(bagLayerId);
    return l;
  }, [layers]);

  const handleMapClick = useCallback(
    (evt: MapLayerMouseEvent) => {
      setLastInteractionOrigin("map");
      if (evt.features?.length) {
        const feature = evt.features[0];

        if (feature?.layer?.id !== bagLayerId) {
          setClickedFeature(feature);
          return;
        }

        // find item with same bag ID in results, show that
        const item = items.find((i) => i.id == feature?.properties?.id);

        if (!item) {
          return;
        }

        const type = getObjectType(item);

        if (type.isAob) {
          setShowDetails(true);
          setCurrent(item as unknown as GBPObject);
          setCenter(item as unknown as GBPObject);
          return;
        } else {
          setLocationFilter({
            id: item.id as string,
            name: item.naam as string,
          });
        }
      } else {
        console.warn("no features on this point", evt);
      }
    },
    [items],
  );

  // Draw a polygon on the map and calculate the surface area
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    // Create the draw control if it doesn't exist
    if (!drawRef.current) {
      drawRef.current = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          line_string: true,
          trash: true,
        },
        // Set these to true to make the controls more visible
        boxSelect: true,
        touchEnabled: true
      });

      // Add the control to the map - position it at the bottom-left
      map.addControl(drawRef.current, 'bottom-left');
    }

    const updateArea = (e?: any) => {
      if (!drawRef.current) return;

      const data = drawRef.current.getAll();

      // Calculate area for polygons
      const polygons = data.features.filter(f => f.geometry.type === 'Polygon');
      if (polygons.length > 0) {
        let totalArea = 0;
        for (const polygon of polygons) {
          const area = turf.area(polygon);
          totalArea += area;
        }
        setArea(Math.round(totalArea));
      } else {
        // Hide area measurement when no polygons exist
        setArea(0);
      }

      // Calculate length for lines
      const lines = data.features.filter(f => f.geometry.type === 'LineString');
      if (lines.length > 0) {
        let totalLength = 0;
        for (const line of lines) {
          const length = turf.length(line, { units: 'meters' });
          totalLength += length;
        }
        setLineLength(Math.round(totalLength));
      } else {
        // Hide length measurement when no lines exist
        setLineLength(0);
      }
    };

    // Use 'any' type assertion to avoid TypeScript errors with MapboxDraw events
    (map as any).on('draw.create', updateArea);
    (map as any).on('draw.update', updateArea);
    (map as any).on('draw.selectionchange', updateArea);
    // Add event to update measurements during drawing
    (map as any).on('draw.render', updateArea);

    // Add event listener for mode change to track active drawing mode
    (map as any).on('draw.modechange', (e) => {
      const mode = e.mode;
      setActiveMode(mode);

      // Update measurements when mode changes
      updateArea(e);
    });

    // Add event listener for trash button to ensure measurements are cleared
    (map as any).on('draw.delete', () => {
      console.log('draw.delete event triggered');
      // Get the current data after deletion
      const data = drawRef.current.getAll();

      // Check if there are any polygons left
      const polygons = data.features.filter(f => f.geometry.type === 'Polygon');
      if (polygons.length === 0) {
        // No polygons left, clear area measurement
        setArea(0);
      } else {
        // Update area measurement for remaining polygons
        let totalArea = 0;
        for (const polygon of polygons) {
          const area = turf.area(polygon);
          totalArea += area;
        }
        setArea(Math.round(totalArea));
      }

      // Check if there are any lines left
      const lines = data.features.filter(f => f.geometry.type === 'LineString');
      if (lines.length === 0) {
        // No lines left, clear length measurement
        setLineLength(0);
      } else {
        // Update length measurement for remaining lines
        let totalLength = 0;
        for (const line of lines) {
          const length = turf.length(line, { units: 'meters' });
          totalLength += length;
        }
        setLineLength(Math.round(totalLength));
      }
    });

    // Add a click event listener to the trash button to ensure it works correctly
    const trashButton = document.querySelector('.mapbox-gl-draw_trash');
    if (trashButton) {
      trashButton.addEventListener('click', () => {
        console.log('Trash button clicked');

        // Get the currently selected features
        const selectedFeatures = drawRef.current.getSelectedIds();

        if (selectedFeatures.length === 0) {
          // No features selected, clear everything
          drawRef.current.deleteAll();
          setArea(0);
          setLineLength(0);
        } else {
          // Some features are selected, they will be deleted by MapboxDraw
          // We need to manually check what remains after deletion

          // First, get the current data
          const currentData = drawRef.current.getAll();

          // Store the IDs of selected features
          const selectedIds = new Set(selectedFeatures);

          // Filter out the features that will be deleted
          const remainingFeatures = currentData.features.filter(f => !selectedIds.has(f.id));

          // Check if there will be any polygons left
          const remainingPolygons = remainingFeatures.filter(f => f.geometry.type === 'Polygon');
          if (remainingPolygons.length === 0) {
            setArea(0);
          }

          // Check if there will be any lines left
          const remainingLines = remainingFeatures.filter(f => f.geometry.type === 'LineString');
          if (remainingLines.length === 0) {
            setLineLength(0);
          }
        }
      });
    }

    // Cleanup
    return () => {
      if (drawRef.current) {
        // Remove the click event listener from the trash button
        const trashButton = document.querySelector('.mapbox-gl-draw_trash');
        if (trashButton) {
          // Use a no-op function since we can't access the original handler
          trashButton.removeEventListener('click', () => {});
        }

        map.removeControl(drawRef.current);
        drawRef.current = null;
      }
      (map as any).off('draw.create', updateArea);
      (map as any).off('draw.update', updateArea);
      (map as any).off('draw.selectionchange', updateArea);
      (map as any).off('draw.render', updateArea);
      (map as any).off('draw.modechange', updateArea);
      (map as any).off('draw.delete');
    };
  }, [mapRef.current]); // Only run once when map is initialized

  return (
    <div className="Map__wrapper">
      <div className="Map__buttons Map__buttons--left">
        {!showFilter && (
          <button onClick={() => setShowFilter(!showFilter)}>Filters</button>
        )}
        {!showLayerSelector && (
          <button
            id="toggle-layers-view"
            onClick={() => setShowLayerSelector(!showLayerSelector)}
          >
            Kaartlagen
          </button>
        )}
      </div>
      <div className="Map__buttons Map__buttons--right">
        {!showResults && (
          <button onClick={() => setShowResults(!showResults)}>
            Resultaten
          </button>
        )}
        {!showDetails && current && (
          <button onClick={() => setShowDetails(!showDetails)}>Details</button>
        )}
      </div>

      {/* Measurement displays */}
      {(area > 0 || lineLength > 0) && (
        <div className="Map__measurements">
          {area > 0 && (
            <div className="Map__measurement Map__measurement--area">
              Oppervlakte: {area} m²
            </div>
          )}
          {lineLength > 0 && (
            <div className="Map__measurement Map__measurement--length">
              Lengte: {lineLength} m
            </div>
          )}
        </div>
      )}

      <Header />
      <MapGL
        trackResize={true}
        id="mainMap"
        initialViewState={viewState}
        mapboxAccessToken={mapboxToken}
        // maxBounds={startBounds}
        onMouseMove={handleHover}
        onMouseOut={() => setHoverInfo(null)}
        onClick={handleMapClick}
        onMoveEnd={updateBoundsQuery}
        style={{ width: "100%", height: "100%", flexBasis: "600px", flex: 1 }}
        mapStyle="mapbox://styles/joepio/clefv1fk2001x01msvlmxl79g"
        ref={mapRef}
        attributionControl={false}
        interactiveLayerIds={interactiveLayers}
      >
        {hoverInfo && <ToolTip {...hoverInfo} />}
        <NavigationControl position={"bottom-right"} />
        <GeolocateControl position={"bottom-left"} />
        {/* TODO: Layer ordering. This is currently not supported. https://github.com/alex3165/react-mapbox-gl/issues/606 */}
        {showBagLayer && (
          <Source type="geojson" data={data}>
            <Layer {...bagLayer} />
          </Source>
        )}
        {visibleLayers
          .map((layer) => <LayerSource layer={layer} key={layer.id} bounds={currentBounds ? boundsLngLatToMatrix(currentBounds) : null} />)}
      </MapGL>
      <Dialog
        feature={clickedFeature}
        onClose={() => setClickedFeature(null)}
      />
    </div>
  );
}
