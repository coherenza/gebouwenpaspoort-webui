import { useCurrentRefinements } from "react-instantsearch";
import "./CurrentRefinements.css";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { AppContext } from "./App";
import { Attributes } from "./schema";

export function CurrentRefinements() {
  const { items, refine } = useCurrentRefinements();

  if (items.length === 0) {
    return null;
  }
  return (
    <div className="CurrentRefinements">
      {items.map((item, item_index) => {
        return item.refinements.map((refinement, refinement_index) => (
          <Refinement
            item={refinement}
            refine={refine}
            parent={item}
            key={`refinement-${item.label}-${item_index.toString()}-${refinement_index.toString()}`}
          />
        ));
      })}
    </div>
  );
}

function Refinement({ item, refine, parent }) {
  const { locationFilter } = useContext(AppContext);

  let attribute = Object.values(Attributes).find(
    (a) => a.id == item.attribute.replace(/.*\./, ""),
  );
  let label = (attribute ? attribute.name + ": " : "") + item.label;

  if (parent.label == "pdok-locatie-id") {
    label = locationFilter?.name || "locatie filter";
  }

  return (
    <button
      className="CurrentRefinements__button"
      key={label}
      title="Filter verwijderen"
      onClick={() => refine(item)}
    >
      <div className="label">{label}</div>
      <Cross1Icon />
    </button>
  );
}
