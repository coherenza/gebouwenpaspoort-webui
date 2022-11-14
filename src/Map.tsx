import React, { useState } from "react";
import {
  GoogleMapsLoader,
  GeoSearch,
  Control,
  Marker,
} from "react-instantsearch-dom-maps";
import { mapsKey } from "./config";
import './Map.css';

export const Map = () => {
  return (
    <div className="Map">
      <GoogleMapsLoader apiKey={mapsKey}>
        {(google) => {
          return (
          <GeoSearch google={google}>
            {({ hits }) => (
              <>
                <Control />
                {hits.map((hit) => (
                  <Marker key={hit.objectID} hit={hit} />
                ))}
              </>
            )}
          </GeoSearch>
        )}}
      </GoogleMapsLoader>
    </div>
  );
};
