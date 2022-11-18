import "./Details.css";
import { useContext } from "react";
import { AppContext } from "./App";
import { Highlight } from "react-instantsearch-hooks-web";

export function Details() {
  const { current, setCurrent } = useContext(AppContext);
  if (!current) {
    return null;
  }
  return (
    <div className="Sidebar details-panel">
      {current ? (
        <>
          <div className="Titlebar">
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

/** Render all property-value combinations available */
const HitProps = ({ hit }) => {
  return (
    <div className="HitProps">
      {Object.entries(hit).map(([key, _value]) => {
        let shown_key = key.replace(
          /^(bag-aob-|bag-opr-|bag-num-|bwk-num-|squitxo_)/,
          ""
        );
        // if (typeof _value == "object") {
        //   return null
        // }
        return (
          <>
            <strong key={`prop-${key}`}>{shown_key}: </strong>
            <Highlight
              key={`val-${key}`}
              attribute={key}
              hit={hit}
              tagName="mark"
            />
          </>
        );
      })}
    </div>
  );
};
