import "./Details.css";
import { useContext } from "react";
import { AppContext } from "./App";
import { displayAttributes as displayAttributes, GBPObjectTypes } from "./schema";
import { AttributeView } from "./Attributes";
import { useRefinementList } from "react-instantsearch-hooks-web";

export function Details() {
  const { current, setCurrent } = useContext(AppContext);
  const x = useRefinementList({ attribute: "pdok-locatie-id" });

  if (!current) {
    return null;
  }

  const geo = current["bag-aob-geo-EPSG28992"];

  if (!GBPObjectTypes[""+current["bag-object-type"]].isAob) {
    return (
      <div className="Sidebar details-panel">
        <div className="Titlebar Titlebar--padded">
          <button onClick={() => setCurrent(undefined)}>sluit</button>
        </div>
        <p>Weergave voor '{current["bag-object-type"]}' nog niet ondersteund, probeer de zoekbalk!</p>
      </div>
    );
  }
  return (
    <div className="Sidebar details-panel">
      {current ? (
        <>
          <div className="Titlebar Titlebar--padded">
            <h3 className="details-panel__title">
              {current[displayAttributes[0].id]}{" "}
            </h3>
            {geo && (
              <a
                className="button"
                rel="noopener noreferrer"
                target="_blank"
                href={`https://app.slagboomenpeeters.com/c37aae05-9e9a-4210-a1b8-d957367fc978?z=12&mode=oblique&x=${geo.x}&y=${geo.y}`}
              >
                luchtfoto
              </a>
            )}
            <button onClick={() => setCurrent(undefined)}>sluit</button>
          </div>
          <div className="Details__attributes">
            {displayAttributes.map((attribute, i) => {
              // we use the first attribute to render in the header
              if (i == 0) return null;
              return (
                <AttributeView
                  key={attribute.name}
                  attribute={attribute}
                  hit={current}
                />
              );
            })}
          </div>
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
