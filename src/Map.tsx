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

function moveBounds(mapRef, items) {
  if (!mapRef.current) {
    return;
  }
  // Don't set the bounds if there are no items
  if (items.length == 0) {
    return;
  }
  const center = mapRef.current.getMap().getBounds().getCenter();
  let lowLat = center.lat;
  let highLat = center.lat;
  let lowLng = center.lng;
  let highLng = center.lng;
  items.forEach((item, i) => {
    let lat0, lat1, lng0, lng1;
    if (item.geo_bbox) {
      //console.info(`bounds from geo_bbox for ${JSON.stringify(item['bag-object-type'])} ${JSON.stringify(item.naam)}: ${JSON.stringify(item.geo_bbox)}`);
      lat0 = Math.min(item.geo_bbox[0].lat, item.geo_bbox[1].lat);
      lat1 = Math.max(item.geo_bbox[0].lat, item.geo_bbox[1].lat);
      lng0 = Math.min(item.geo_bbox[0].lng, item.geo_bbox[1].lng);
      lng1 = Math.max(item.geo_bbox[0].lng, item.geo_bbox[1].lng);
    } else {
      const { lat, lng } = item._geoloc;
      lat0 = lat;
      lat1 = lat;
      lng0 = lng;
      lng1 = lng;
    }
    if (i == 0) {
      lowLat = lat0;
      highLat = lat1;
      lowLng = lng0;
      highLng = lng1;
    } else {
      // For some reason the extend method doesn't work, so we do it manually
      // bounds.extend(item._geoloc);
      if (lat0 < lowLat) {
        lowLat = lat0;
      }
      if (lat1 > highLat) {
        highLat = lat1;
      }
      if (lng0 < lowLng) {
        lowLng = lng0;
      }
      if (lng1 > highLng) {
        highLng = lng1;
      }
    }
  });
  let bounds = undefined;
  try {
    bounds = new LngLatBounds(
      { lat: highLat, lng: highLng },
      { lat: lowLat, lng: lowLng },
    );
    mapRef.current?.fitBounds(bounds, {
      padding: 25,
    });
  } catch (e) {
    console.error("Error moving bounds", e, "items:", items, "center:", center);
  }
}


// Add this custom control definition before your Map component:
class AreaControl {
  _container: HTMLButtonElement | null = null;
  _map: any;

  onAdd(map: any) {
    this._map = map;
    this._container = document.createElement("button");
    // Use Mapbox control default classes for basic styling
    this._container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
    // You can use inline styles to adjust appearance
    this._container.style.backgroundColor = "#fff";
    this._container.style.border = "none";
    this._container.style.padding = "5px";
    this._container.style.cursor = "default";
    this._container.type = "button";
    this._container.style.display = "none"; // Hide control initially
    return this._container;
  }

  onRemove() {
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
    this._map = undefined;
  }
}


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
  const [currentBounds, setCurrentBounds] = useState<LngLatBounds | null>(null);

  // Add a ref for our custom area control:
  const areaControlRef = useRef<AreaControl | null>(null);

  // We need to wait for new items to load after setting the location filter
  let debouncedLocationFilter = useDebounce(locationFilter, 1000);

  // if the users toggles the sidebars, resize the map
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.getMap().resize();
    }
  }, [current, showFilter, showResults, showLayerSelector, showDetails]);

  // When the returned items change (e.g. after a fulltext query), we move the bounds of the map
  let moveMapToItemBounds = useCallback(() => {
    moveBounds(mapRef, items);
  }, [mapRef, items]);

  // If user changed the query, move the bounds to the new items
  useEffect(() => {
    moveMapToItemBounds();
  }, [query]);

  // If user changed the locationfilter, move the bounds to the new items
  useEffect(() => {
    moveMapToItemBounds();
  }, [debouncedLocationFilter]);

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

  // If the user moves the map, update the query to filter current area
  const updateBoundsQuery = useCallback((evt) => {
    // only if the user moves
    if (!evt.originalEvent || lastInteractionOrigin === "text") {
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
  }, [lastInteractionOrigin, refine]);

  const setCenter = useCallback(
    ({ lat, lng }) => {
      mapRef.current.setCenter([lng, lat]);
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
          // @ts-ignore
          setCurrent(item);
          setCenter(item._geoloc);
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
        console.log("feature", feature);

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

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });

    map.addControl(draw, 'bottom-left');

    const updateArea = (e?: { type: string }) => {
      const data = draw.getAll();
      if (data.features.length > 0) {
        const area = turf.area(data);
        setArea(Math.round(area * 100) / 100);
      } else {
        setArea(null);
      }
    };

    map.on('draw.create', updateArea);
    map.on('draw.delete', updateArea);
    map.on('draw.update', updateArea);

    // Cleanup
    return () => {
      map.removeControl(draw);
      map.off('draw.create', updateArea);
      map.off('draw.delete', updateArea);
      map.off('draw.update', updateArea);
    };
  }, [mapRef.current]); // Only run once when map is initialized

  // Add useEffect to create our custom area control
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    if (!areaControlRef.current) {
      areaControlRef.current = new AreaControl();
      map.addControl(areaControlRef.current, 'bottom-left');
    }
    return () => {
      if (areaControlRef.current) {
        map.removeControl(areaControlRef.current);
        areaControlRef.current = null;
      }
    };
  }, [mapRef.current]);

  // Update the custom control button text when the area changes
  useEffect(() => {
    if (areaControlRef.current && areaControlRef.current._container) {
      if (area !== null) {
        areaControlRef.current._container.textContent = `${area} m²`;
        areaControlRef.current._container.style.display = "block";
      } else {
        areaControlRef.current._container.style.display = "none";
      }
    }
  }, [area]);

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
