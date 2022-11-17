import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  useMemo,
} from "react";
import "./Map.css";
import { useGeoSearch } from "./useGeoSearch";
import MapGL, { Layer, MapRef, Marker, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { AppContext } from "./App";
import { Gebouw } from "./schema";

const mapboxToken =
  "pk.eyJ1Ijoiam9lcGlvIiwiYSI6ImNqbTIzanZ1bjBkanQza211anFxbWNiM3IifQ.2iBrlCLHaXU79_tY9SVpXA";

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

export function Map() {
  const { items, refine } = useGeoSearch();
  const { setCurrent, current } = useContext(AppContext);
  const mapRef = useRef<MapRef>();
  const [viewState, setViewState] = React.useState({
    longitude: 5.1213,
    latitude: 52.0907,
    zoom: 11,
  });

  const onMove = useCallback(
    (evt) => {
      const bounds = mapRef.current.getMap().getBounds();

      refine({
        northEast: bounds.getNorthEast(),
        southWest: bounds.getSouthWest(),
      });
      setViewState(evt.viewState);
    },
    [viewState]
  );

  const markers = useMemo(
    () =>
      items.map((item) => {
        return (
          <Marker
            onClick={() => setCurrent(item as unknown as Gebouw)}
            longitude={item._geoloc.lng}
            latitude={item._geoloc.lat}
            anchor="bottom"
            key={item.id as string}
            color={item.id == current?.id ? "#000000" : "#FF0000"}
          ></Marker>
        );
      }),
    [items, current]
  );

  return (
    <MapGL
      initialViewState={viewState}
      mapboxAccessToken={mapboxToken}
      onMove={onMove}
      style={{ width: "100%", height: "600px", flexBasis: "600px", flex: 1 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      ref={mapRef}
      attributionControl={false}
    >
      {markers}
    </MapGL>
  );
}
