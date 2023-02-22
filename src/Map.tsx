import React, {
  useEffect,
  useRef,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import "./Map.css";
import { useGeoSearch } from "./useGeoSearch";
import MapGL, {
  GeolocateControl,
  Layer,
  MapRef,
  NavigationControl,
  Source,
  SymbolLayer,
} from "react-map-gl";
import { LngLatBounds } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { AppContext } from "./App";
import { Attributes, GBPObject, getObjectType } from "./schema";
import { useInfiniteHits, useSearchBox } from "react-instantsearch-hooks-web";
import { Header } from "./Header";
import { LayerSource } from "./Layers";
import useDebounce from "./useDebounce";
import { mapboxToken } from "./config";
import { ToolTip } from "./Tooltip";
import CustomIcons from "./Icons";

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
  startBoundsInstant.southWest
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
      { lat: lowLat, lng: lowLng }
    );
    mapRef.current?.fitBounds(bounds, {
      padding: 25,
    });
  } catch (e) {
    console.error("Error moving bounds", e, "items:", items, "center:", center);
  }
}

/** Reads some bounds, creates some smaller bounds */
function smallerCirlceBounds(bounds) {
  // Ratio to make the circle smaller
  const p = 0.7;

  const neBounds = bounds.getNorthEast();
  const swBounds = bounds.getSouthWest();

  if (!neBounds || !swBounds) {
    return;
  }

  let [x1, y1] = [neBounds.lng, neBounds.lat];
  let [x2, y2] = [swBounds.lng, swBounds.lat];

  let [[xn1, yn1], [xn2, yn2]] = [
    [
      ((1 + p) / 2) * x1 + ((1 - p) / 2) * x2,
      ((1 + p) / 2) * y1 + ((1 - p) / 2) * y2,
    ],
    [
      ((1 + p) / 2) * x2 + ((1 - p) / 2) * x1,
      ((1 + p) / 2) * y2 + ((1 - p) / 2) * y1,
    ],
  ];

  return {
    northEast: { lng: xn1, lat: yn1 },
    southWest: { lng: xn2, lat: yn2 },
  };
}

export function Map() {
  const { refine } = useGeoSearch();
  const { hits: items } = useInfiniteHits();
  const { query } = useSearchBox();
  const {
    setCurrent,
    current,
    showFilter,
    showResults,
    setShowFilter,
    setShowResults,
    setShowLayerSelector,
    setLocationFilter,
    showLayerSelector,
    locationFilter,
    layers,
  } = useContext(AppContext);
  const mapRef = useRef<MapRef>();
  const [viewState, setViewState] = useState(mapStartState);
  const [hoverInfo, setHoverInfo] = useState(null);

  // We need to wait for new items to load after setting the location filter
  let debouncedLocationFilter = useDebounce(locationFilter, 1000);

  // if the users toggles the sidebars, resize the map
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.getMap().resize();
    }
  }, [current, showFilter, showResults, showLayerSelector]);

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
    if (!evt.originalEvent) {
      return;
    }
    const bounds = mapRef.current.getMap().getBounds();
    refine(smallerCirlceBounds(bounds));
    setViewState(evt.viewState);
  }, []);

  const handleHover = useCallback(
    (event) => {
      const {
        features,
        point: { x, y },
      } = event;
      const hoveredFeature = features && features[0];
      if (hoveredFeature) {
        mapRef.current.getCanvas().style.cursor = "pointer";
      } else {
        mapRef.current.getCanvas().style.cursor = "";
      }
      setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
    },
    [layers]
  );

  const data: GeoJSON.FeatureCollection<GeoJSON.Geometry> = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: items.map((item) => {
        const isCurrent =
          item.id == current?.id || locationFilter?.id == item.id;

        const { color, icon, isAob } = getObjectType(item);

        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [item._geoloc.lng, item._geoloc.lat],
          },
          properties: {
            // These are be displayed in the popup
            naam: item.naam,
            // These are used to style the point.
            // Add the keys to `hiddenProps` in `Tooltip.tsx` to hide them from the tooltip.
            id: item.id,
            size: isCurrent ? 1.4 : 1,
            "text-size": isCurrent ? 15 : 12,
            // Lower = shown on top
            "sort-key": isCurrent ? 0 : 1,
            type: item["bag-object-type"],
            color: isCurrent ? "#000000" : color,
            title: item[Attributes.huisnummerLetter.id] || item["naam"],
            icon: isAob ? "my-marker" : "houses",
          },
        };
      }),
    };
  }, [items, current]);

  const interactiveLayers = useMemo(() => {
    let l = layers.filter((l) => l.visible).map((layer) => layer.id);
    l.push("points");
    return l;
  }, [layers]);

  const handleMapClick = useCallback(
    (evt: mapboxgl.MapLayerMouseEvent) => {
      if (evt.features) {
        const feature = evt.features[0];
        // find item with same bag ID in results, show that
        const item = items.find((i) => i.id == feature.properties?.id);

        const type = getObjectType(item);

        if (type.isAob) {
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
    [items]
  );

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
        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
        </Source>
        {layers
          .filter((layer) => layer.visible)
          .map((layer) => (
            <LayerSource layer={layer} key={layer.id} />
          ))}
        {/* {markers} */}
      </MapGL>
    </div>
  );
}

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer: SymbolLayer = {
  id: "points",
  type: "symbol",
  source: "points",
  layout: {
    // get the title name and icon from the source's properties
    "text-field": ["get", "title"],
    // Show icon depending on type
    "icon-image": ["get", "icon"],
    "icon-size": ["get", "size"],
    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    "text-offset": [0, 1.25],
    "text-anchor": "top",
    "symbol-sort-key": ["get", "sort-key"],
    "text-size": ["get", "text-size"],
    "icon-padding": 1,
  },
  paint: {
    "text-halo-color": "rgba(255,255,255,0.75)",
    "text-halo-width": 1,
    "icon-color": ["get", "color"],
  },
};
