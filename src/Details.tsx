import "./Details.css";
import { useContext } from "react";
import { AppContext } from "./App";
import {
  displayAttributes as displayAttributes,
  getObjectType,
} from "./schema";
import { AttributeView } from "./Attributes";
import { useCurrentRefinements } from "react-instantsearch";
import { Cross1Icon } from "@radix-ui/react-icons";

export function Details() {
  const { current, showDetails, setShowDetails } = useContext(AppContext);
  // The `useCurrentRefinements` hook is quite expensive, so we call it once over here
  //  and pass the props all the way down.
  const { items: selectedAttributes } = useCurrentRefinements();

  if (!current || !showDetails) return null;

  if (!getObjectType(current).isAob) {
    return (
      <div className="Sidebar details-panel">
        <div className="Titlebar Titlebar--padded">
          <button
            title="Sluit details"
            onClick={() => {
              setShowDetails(false);
            }}
          >
            <Cross1Icon />
          </button>
        </div>
        <p>
          Weergave voor '{current["bag-object-type"]}' nog niet ondersteund,
          probeer de zoekbalk!
        </p>
      </div>
    );
  }

  const detailsPropertyIds = displayAttributes.map((at) => at.id);

  return (
    <div className="Sidebar details-panel">
      {current
        ? (
          <>
            <div className="Titlebar Titlebar--padded">
              <h3 className="details-panel__title">
                {
                  current[displayAttributes[0].id].replace(
                    /(\d\d\d\d[A-Z][A-Z])\s+/,
                    "$1\xA0",
                  ) /* non-breakable space tussen postcode en woonplaats */
                }
              </h3>
              <button
                title="Sluit details"
                onClick={() => setShowDetails(false)}
              >
                <Cross1Icon />
              </button>
            </div>
            <div className="details-info">
              <span>
                {Object.entries(current)
                  .map(([key, value]) =>
                    detailsPropertyIds.includes(key) && Array.isArray(value)
                      ? value.length
                      : 0
                  )
                  .reduce((a, b) => a + b, 0)}
              </span>
              <span>details</span>
            </div>
            <div className="Sidebar__scroller">
              {displayAttributes.map((attribute, i) => {
                // we use the first attribute to render in the header
                if (i == 0) return null;

                return (
                  // @ts-ignore
                  <AttributeView
                    selectedAttributes={selectedAttributes}
                    key={"av_" + attribute.id}
                    attribute={attribute}
                    hit={current}
                  />
                );
              })}
            </div>
          </>
        )
        : (
          <>
            <h2>Welkom bij GebouwenPaspoort</h2>
            <p>
              Je kunt hier zoeken binnen gebouwendata in de gemeente Utrecht.
            </p>
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
