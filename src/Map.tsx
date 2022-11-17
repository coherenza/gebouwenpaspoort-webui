import React, { useContext, useState } from "react";
import {
  GoogleMapsLoader,
  GeoSearch,
  Control,
  Marker,
} from "react-instantsearch-dom-maps";
import { AppContext } from "./App";
import { mapsKey } from "./config";
import "./Map.css";
import { Gebouw } from "./schema";

export const Map = () => {
  const { setCurrent } = useContext(AppContext);

  return (
    <div className="Map">
      <GoogleMapsLoader apiKey={mapsKey}>
        {(google) => {
          return (
            <GeoSearch google={google}>
              {({ hits }) => (
                <>
                  <Control />
                  {hits.map((hit: Gebouw) => (
                    <Marker
                      onClick={() => setCurrent(hit)}
                      key={hit.id}
                      hit={hit}
                    />
                  ))}
                </>
              )}
            </GeoSearch>
          );
        }}
      </GoogleMapsLoader>
    </div>
  );
};
