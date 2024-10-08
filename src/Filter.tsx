import { Attribute } from "./schema";
import { useState } from "react";
import {
  RangeInput,
  RefinementList,
  RefinementListProps,
} from "react-instantsearch";
import "./Filter.css";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { HierarchicalRefinementList } from "./HierarchicalRefinementList";
import "./RefinementList.css";

// Sort strings that we use to indicate numeric intervals.
const intervalSortValue = function (x: string) {
  const value = x
    .replace(/^\D+/, "0.")
    .replace(/\D+$/, ".0")
    .replace(/\s*-\s*/, ".");
  return Number.parseFloat(value);
};

const sortLabels: RefinementListProps["sortBy"] = (a, b) => {
  return a.escapedValue.toLowerCase() < b.escapedValue.toLowerCase() ? -1 : 1;
};

const sortIntervals: RefinementListProps["sortBy"] = (a, b) => {
  return intervalSortValue(a.name) < intervalSortValue(b.name) ? -1 : 1;
};

export const Filter = (filter: Attribute) => {
  const filterType = filter.filterType || "select";
  const [open, setOpen] = useState(false);
  return (
    <div className="Filter">
      <h4 onClick={() => setOpen(!open)}>
        {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
        {filter.name}
      </h4>
      <div className={"Attribute__content__" + (open ? "open" : "closed")}>
        {filterType === "select" &&
          (!!filter.vocabulary
            ? (
              <HierarchicalRefinementList
                attribute={filter.id}
                limit={1000}
                sortBy={sortLabels}
                vocabulary={filter.vocabulary}
              />
            )
            : (
              <RefinementList
                attribute={filter.id}
                limit={1000}
                sortBy={sortLabels}
              />
            ))}
        {filterType === "range" && <RangeInput attribute={filter.id} />}
        {filterType === "intervals" && (
          <RefinementList
            attribute={filter.id}
            sortBy={sortIntervals}
            limit={100}
          />
        )}
      </div>
    </div>
  );
};
