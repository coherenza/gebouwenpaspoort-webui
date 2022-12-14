import { useCurrentRefinements } from "react-instantsearch-hooks-web";
import "./CurrentRefinements.css";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { AppContext } from "./App";

export function CurrentRefinements() {
  const { items, refine } = useCurrentRefinements();

  if (items.length === 0) {
    return null;
  }
  return (
    <div className="CurrentRefinements">
      {items.map((item) => {
        return item.refinements.map((refinement) => (
          <Refinement item={refinement} refine={refine} parent={item}/>
        ));
      })}
    </div>
  );
}

function Refinement({ item, refine, parent }) {
  const { locationFilter } = useContext(AppContext);

  let label = item.label;

  if (parent.label == "pdok-locatie-id") {
    label = locationFilter.name;
  }

  return (
    <button
      className="CurrentRefinements__button"
      key={item.label}
      onClick={() => refine(item)}
    >
      <div className="label">{label}</div>
      <Cross1Icon />
    </button>
  );
}
