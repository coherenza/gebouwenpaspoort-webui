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
  const [state, set] = useState(false);
  return (
    <div className="Map">
      <button onClick={() => set(!state)}>rerender</button>

      {window.google && <GeoSearch google={window.google}>
        {({ hits }) => (
          <div>
            <Control />
            {hits.map((hit) => (
              <Marker key={hit.objectID} hit={hit} />
            ))}
          </div>
        )}
      </GeoSearch>}
      <GoogleMapsLoader apiKey={mapsKey}>
        {(google) => {
          console.log('google', google);

          return (null);
        }}
      </GoogleMapsLoader>
    </div>
  );
};
