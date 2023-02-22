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
  MapRef,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { LngLatBounds } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { AppContext } from "./App";
import { GBPObject, GBPObjectTypes } from "./schema";
import { useInfiniteHits, useSearchBox } from "react-instantsearch-hooks-web";
import { Header } from "./Header";
import { LayerSource } from "./Layers";
import useDebounce from "./useDebounce";
import { mapboxToken } from "./config";
import { HoverInfo } from "./Tooltip";

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

export function Map() {
  const { refine } = useGeoSearch();
  const { query } = useSearchBox();
  const { hits: items } = useInfiniteHits();
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

  // If the user moves the map, update the query to filter current area
  const updateBoundsQuery = useCallback((evt) => {
    if (!evt.originalEvent) {
      return;
    }
    const bounds = mapRef.current.getMap().getBounds();

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

    refine({
      northEast: { lng: xn1, lat: yn1 },
      southWest: { lng: xn2, lat: yn2 },
    });
    setViewState(evt.viewState);
  }, []);

  const handleHover = useCallback(
    (event) => {
      const {
        features,
        point: { x, y },
      } = event;
      const hoveredFeature = features && features[0];
      setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
    },
    [layers]
  );

  // Memoize markers to prevent rerendering
  const markers = useMemo(
    () =>
      items.map((item) => {
        const isCurrent = item.id == current?.id;
        const handleClick = () => {
          // Move the map if it's not a GBPO
          if (GBPObjectTypes["" + item["bag-object-type"]].isAob) {
            setCurrent(item as unknown as GBPObject);
          } else {
            setLocationFilter({
              id: item.id as string,
              name: item.naam as string,
            });
          }
        };

        if (!item._geoloc) {
          return null;
        }

        return (
          <Marker
            onClick={handleClick}
            longitude={item._geoloc.lng}
            latitude={item._geoloc.lat}
            anchor="bottom"
            // We need this key to make sure the content re-renders, for some reason color changes don't trigger an update
            key={`${item.id} ${isCurrent}`}
            color={
              isCurrent
                ? "#000000"
                : GBPObjectTypes["" + item["bag-object-type"]].color
            }
            style={{
              zIndex: isCurrent ? 1 : 0,
            }}
            scale={isCurrent ? 0.8 : 0.6}
          ></Marker>
        );
      }),
    [items, current]
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
        onMoveEnd={updateBoundsQuery}
        style={{ width: "100%", height: "100%", flexBasis: "600px", flex: 1 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        ref={mapRef}
        attributionControl={false}
        interactiveLayerIds={layers
          .filter((l) => l.visible)
          .map((layer) => layer.id)}
      >
        {hoverInfo && <HoverInfo {...hoverInfo} />}
        <NavigationControl position={"bottom-right"} />
        <GeolocateControl position={"bottom-left"} />
        {markers}
        {layers
          .filter((layer) => layer.visible)
          .map((layer) => (
            <LayerSource layer={layer} key={layer.id} />
          ))}
      </MapGL>
    </div>
  );
}
