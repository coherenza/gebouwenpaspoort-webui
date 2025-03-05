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
import { BAGLayer } from "./layers/defaultServices";

export const mapStartState = {
  latitude: 52.0907,
  longitude: 5.1213,
  zoom: 11,
};

// Create startBoundsInstant from boundsUtrecht
export const startBoundsInstant = {
  northEast: { lng: boundsUtrecht[2], lat: boundsUtrecht[3] },
  southWest: { lng: boundsUtrecht[0], lat: boundsUtrecht[1] },
};

// Create startBounds from boundsUtrecht
export const startBounds = [
  boundsUtrecht[0], // Southwest longitude
  boundsUtrecht[1], // Southwest latitude
  boundsUtrecht[2], // Northeast longitude
  boundsUtrecht[3]  // Northeast latitude
];

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
    showBagLayer,
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

  // if the users toggles the sidebars, resize the map
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.getMap().resize();
    }
  }, [current, showFilter, showResults, showLayerSelector, showDetails]);

  // If user changed the query, move the bounds to the new items
  useEffect(() => {
    if (lastInteractionOrigin == "mapMove") {
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
    setLastInteractionOrigin("mapMove");
    console.log("moveBounds...");
    if (!mapRef.current) {
      console.log("No map ref");
      return;
    }
    // If no query and no location filter, move to boundsUtrecht
    if (query == "" && locationFilter == null) {
      console.log("No query");
      isAnimating.current = true;
      mapRef.current?.fitBounds(boundsUtrecht, {
        animate: true,
        duration: animationDuration,
        }).once('moveend', () => {
          isAnimating.current = false;
        });
        return;
    }
    if (items.length == 0) {
      console.log("No items");
      isAnimating.current = true;
      mapRef.current?.fitBounds(boundsUtrecht, {
        animate: true,
          duration: animationDuration,
        }).once('moveend', () => {
          isAnimating.current = false;
        });
        return;
      }
      const firstItem = items[0];

      console.log("Moving to first item", firstItem);
      isAnimating.current = true;
      mapRef.current?.getMap().flyTo({
        center: [firstItem._geoloc.lng, firstItem._geoloc.lat],
        zoom: zoomStreetLevel,
        duration: animationDuration,
      }).once('moveend', () => {
        isAnimating.current = false;
      });

    }, [mapRef, items, query]);

  // If the user moves the map, update the query to filter current area
  const updateBoundsQuery = useCallback((evt) => {
    // Don't update if we're animating or if it's not a user-initiated event
    if (!evt.originalEvent || lastInteractionOrigin !== "mapMove" || isAnimating.current) {
      console.log("Not updating bounds query");
      return;
    }
    const latLngBounds = mapRef.current.getMap().getBounds();
    if (latLngBounds) {
      setCurrentBounds(latLngBounds);
      const boundsIS = boundsLngLatToIS(latLngBounds);
      refine(boundsIS);
    }
    setLastInteractionOrigin("mapMove");
    setViewState(evt.viewState);
  }, [lastInteractionOrigin, refine, isAnimating, showResults, showFilter, showLayerSelector]);

  const setCenter = useCallback(
    (item: GBPObject) => {
      console.log("Setting center", item);
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
      const { features, point } = event;
      const hoveredFeature = features && features[0];

      if (!mapRef.current) return;

      // Update cursor style based on whether a feature is hovered
      mapRef.current.getCanvas().style.cursor = hoveredFeature ? "pointer" : "";

      // Update hover info with feature and position
      setHoverInfo(hoveredFeature && { feature: hoveredFeature, x: point.x, y: point.y });
    },
    [layers],
  );

  const visibleLayers = useMemo(() => layers.filter(layer => layer.visible), [layers]);

  const data: GeoJSON.FeatureCollection<GeoJSON.Geometry> = useMemo(() => {
    return {
      type: "FeatureCollection",
      id: bagLayerId,
      features: items.map((item, index) => {
        const isCurrent = item.id === current?.id || locationFilter?.id === item.id;
        const { color, isAob, label } = getObjectType(item);

        // Auto-select first address item when searching
        if (index === 0 && isAob && lastInteractionOrigin === "mapClick") {
          setCurrent(item as unknown as GBPObject);
        }

        // Determine icon title based on item type
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
            // Display property
            [label]: item.naam,

            // Styling properties
            id: item.id,
            size: isCurrent ? 1.4 : 1,
            "text-size": isCurrent ? 15 : 12,
            "sort-key": isCurrent ? 0 : 1, // Lower = shown on top
            type: item["bag-object-type"],
            color: isCurrent ? "#000000" : color,
            title: iconTitle,
            icon: isAob ? "my-marker" : "houses",
          },
        };
      }),
    };
  }, [items, current, lastInteractionOrigin]);

  // Check if search results exist
  const hasSearchResults = useMemo(() => {
    return items.length > 0;
  }, [items]);

  const interactiveLayers = useMemo(() => {
    // Get layer IDs from visible layers
    const visibleLayerIds = layers
      .filter(layer => layer.visible)
      .flatMap(layer =>
        layer.type === 'vector'
          ? [layer.id, `${layer.id}-symbol`]
          : [layer.id]
      );

    // Add BAG layer ID if it's visible
    if (showBagLayer && hasSearchResults) {
      visibleLayerIds.push(bagLayerId);
    }

    return visibleLayerIds;
  }, [layers, showBagLayer, hasSearchResults]);

  const handleMapClick = useCallback(
    (evt: MapLayerMouseEvent) => {
      setLastInteractionOrigin("mapClick");

      // No features clicked
      if (!evt.features?.length) return;

      const feature = evt.features[0];

      // Handle BAG layer clicks
      if (feature?.layer?.id === bagLayerId) {
        // Find the corresponding item in search results
        const itemId = feature?.properties?.id;
        const item = items.find(i => i.id === itemId);
        if (!item) return;

        // Handle different item types
        const { isAob } = getObjectType(item);

        if (isAob) {
          setShowDetails(true);
          setCurrent(item as unknown as GBPObject);
          setCenter(item as unknown as GBPObject);
        } else {
          setLocationFilter({
            id: item.id as string,
            name: item.naam as string,
          });
          // setCenter(item as unknown as GBPObject);
        }
      } else {
        // Handle other layer clicks
        setClickedFeature(feature);
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
        // Ensure proper selection behavior
        defaultMode: 'simple_select',
        boxSelect: true,
        touchEnabled: true
      });

      // Add the control to the map - position it at the bottom-left
      map.addControl(drawRef.current, 'bottom-left');
    }

    // Consolidated function to calculate and update measurements
    const updateMeasurements = () => {
      if (!drawRef.current) return;

      const data = drawRef.current.getAll();

      // Calculate area for polygons
      const polygons = data.features.filter(f => f.geometry.type === 'Polygon');
      if (polygons.length > 0) {
        const totalArea = polygons.reduce((sum, polygon) => sum + turf.area(polygon), 0);
        setArea(Math.round(totalArea));
      } else {
        setArea(0);
      }

      // Calculate length for lines
      const lines = data.features.filter(f => f.geometry.type === 'LineString');
      if (lines.length > 0) {
        const totalLength = lines.reduce((sum, line) =>
          sum + turf.length(line, { units: 'meters' }), 0);
        setLineLength(Math.round(totalLength));
      } else {
        setLineLength(0);
      }
    };

    // Register all event listeners
    (map as any).on('draw.create', updateMeasurements);
    (map as any).on('draw.update', updateMeasurements);
    (map as any).on('draw.selectionchange', updateMeasurements);
    (map as any).on('draw.render', updateMeasurements);
    (map as any).on('draw.modechange', updateMeasurements);

    // Special handler for delete events to ensure measurements are reset
    const handleDeleteEvent = () => {
      // Simple approach: recalculate measurements after deletion
      updateMeasurements();
    };

    (map as any).on('draw.delete', handleDeleteEvent);

    // Add a click event listener to the trash button
    const trashButton = document.querySelector('.mapbox-gl-draw_trash');

    // Define the handler function outside so we can reference it in the cleanup
    const handleTrashClick = (e) => {
      if (!drawRef.current) return;

      // Simple approach: delete all features and reset measurements
      drawRef.current.deleteAll();
      setArea(0);
      setLineLength(0);
    };

    if (trashButton) {
      trashButton.addEventListener('click', handleTrashClick);
    }

    // Cleanup
    return () => {
      if (drawRef.current) {
        // Remove the click event listener from the trash button
        const trashButton = document.querySelector('.mapbox-gl-draw_trash');
        if (trashButton) {
          trashButton.removeEventListener('click', handleTrashClick);
        }

        map.removeControl(drawRef.current);
        drawRef.current = null;
      }

      // Remove all event listeners
      (map as any).off('draw.create', updateMeasurements);
      (map as any).off('draw.update', updateMeasurements);
      (map as any).off('draw.selectionchange', updateMeasurements);
      (map as any).off('draw.render', updateMeasurements);
      (map as any).off('draw.modechange', updateMeasurements);
      (map as any).off('draw.delete', handleDeleteEvent);
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
              Oppervlakte: {area.toLocaleString()} m²
            </div>
          )}
          {lineLength > 0 && (
            <div className="Map__measurement Map__measurement--length">
              Lengte: {lineLength.toLocaleString()} m
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
        {/* Show BAG layer (search results) when it's toggled on */}
        {showBagLayer && hasSearchResults && (
          <Source id={bagLayerId} type="geojson" data={data}>
            <Layer {...bagLayer} />
          </Source>
        )}
        {visibleLayers
          .map((layer) => <LayerSource layer={layer} key={layer.uniqueId || `${layer.serviceId || 'noservice'}-${layer.url || 'nourl'}-${layer.id}`} bounds={currentBounds ? boundsLngLatToMatrix(currentBounds) : null} />)}
      </MapGL>
      <Dialog
        feature={clickedFeature}
        onClose={() => setClickedFeature(null)}
      />
    </div>
  );
}
