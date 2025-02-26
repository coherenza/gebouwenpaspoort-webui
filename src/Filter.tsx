import { Attribute } from "./schema";
import { useState } from "react";
import { RangeInput } from "react-instantsearch";
import "./Filter.css";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { CustomHierarchicalRefinementList } from "./components/CustomHierarchicalRefinementList";
import { CustomRefinementList } from "./components/CustomRefinementList";
import "./components/CustomRefinementList.css";

// Sort strings that we use to indicate numeric intervals.
const intervalSortValue = function (x: string) {
  const value = x
    .replace(/^\D+/, "0.")
    .replace(/\D+$/, ".0")
    .replace(/\s*-\s*/, ".");
  return Number.parseFloat(value);
};

const sortLabels = (a, b) => {
  return a.escapedValue.toLowerCase() < b.escapedValue.toLowerCase() ? -1 : 1;
};

const sortIntervals = (a, b) => {
  return intervalSortValue(a.name) < intervalSortValue(b.name) ? -1 : 1;
};

export const Filter = (filter: Attribute) => {
  const filterType = filter.filterType || "select";
  const [open, setOpen] = useState(false);
  return (
    <div className="layer-group">
      <button
        className="layer-group__header"
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
        <h4>{filter.name}</h4>
      </button>
      {open && (
        <div className="layer-group__content">
          {filterType === "select" &&
            (!!filter.vocabulary
              ? (
                <CustomHierarchicalRefinementList
                  attribute={filter.id}
                  limit={1000}
                  sortBy={sortLabels}
                  vocabulary={filter.vocabulary}
                />
              )
              : (
                <CustomRefinementList
                  attribute={filter.id}
                  limit={1000}
                  sortBy={sortLabels}
                />
              ))}
          {filterType === "range" && <RangeInput attribute={filter.id} />}
          {filterType === "intervals" && (
            <CustomRefinementList
              attribute={filter.id}
              sortBy={sortIntervals}
              limit={100}
            />
          )}
        </div>
      )}
    </div>
  );
};
