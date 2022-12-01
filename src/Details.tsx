import "./Details.css";
import { useContext } from "react";
import { AppContext } from "./App";
import { displaySchema as displayAttributes } from "./schema";
import { AttributeView } from "./Attributes";

export function Details() {
  const { current, setCurrent } = useContext(AppContext);
  if (!current) {
    return null;
  }
  const { x, y } = current["bag-aob-geo-EPSG28992"];
  return (
    <div className="Sidebar details-panel">
      {current ? (
        <>
          <div className="Titlebar Titlebar--padded">
            <h3>{current[displayAttributes[0].id]} </h3>
            <a
              className="button"
              rel="noopener noreferrer"
              target="_blank"
              href={`https://app.slagboomenpeeters.com/c37aae05-9e9a-4210-a1b8-d957367fc978?z=12&mode=oblique&x=${x}&y=${y}`}
            >
              luchtfoto
            </a>
            <button onClick={() => setCurrent(undefined)}>sluit</button>
          </div>
          {displayAttributes.map((attribute, i) => {
            // we use the first attribute to render in the header
            if (i == 0) return null;
            return <AttributeView key={attribute.name} attribute={attribute} hit={current} />;
          })}
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
