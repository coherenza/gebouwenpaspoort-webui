import { HitProps } from "./HitLine";
import "./Details.css";
import { useCallback, useContext } from "react";
import { AppContext } from "./App";

export function Details() {
  const { current, setCurrent } = useContext(AppContext);
  return (
    <div className="details-panel">
      {current ? (
        <>
          <h2>
            {current["bag-num-volledig"]}{" "}
            <button onClick={() => setCurrent(undefined)}>sluit</button>
          </h2>
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
