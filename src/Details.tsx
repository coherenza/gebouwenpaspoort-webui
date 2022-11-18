import { HitProps } from "./HitLine";
import "./Details.css";
import { useCallback, useContext } from "react";
import { AppContext } from "./App";

export function Details() {
  const { current, setCurrent } = useContext(AppContext);
  if (!current) {
    return null;
  }
  return (
    <div className="details-panel">
      {current ? (
        <>
          <div className="details-panel__header">
            <h2>{current["bag-num-volledig"]} </h2>
            <button onClick={() => setCurrent(undefined)}>sluit</button>
          </div>
          <HitProps hit={current} />
        </>
      ) : (
        <>
          <h2>Welkom bij GebouwenPaspoort</h2>
          <p>Je kunt hier zoeken binnen gebouwendata in de gemeente Utrecht.</p>
          <p>
            Typ iets in de zoekbalk, zoom in op de kaart, of speel met de
            filters om gebouwen te vinden.
          </p>
          <p>
            Klik op een adresnaam of een punt op de kaart om meer te weten te
            komen.
          </p>
        </>
      )}
    </div>
  );
}
