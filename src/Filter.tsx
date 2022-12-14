import { Attribute } from "./schema";
import React from "react";
import {
  RangeInput,
  RefinementList,
  RefinementListProps,
} from "react-instantsearch-hooks-web";
import "./Filter.css";
import { RangeSlider } from "./RangeSlider";

// Sort strings that we use to indicate numeric intervals.
const intervalSortValue = function(x: string) {
  const value = x.replace(/^\D+/, '0.').replace(/\D+$/, '.0').replace(/\s*-\s*/, '.');
  return Number.parseFloat(value);
};
  
const sortIntervals: RefinementListProps['sortBy'] = (a, b) => {
  return intervalSortValue(a.name) < intervalSortValue(b.name) ? -1 : 1;
};

export const Filter = (filter: Attribute) => {
  const filterType = filter.filterType || "select";
  return (
    <div className="Filter">
      <h4>{filter.name}</h4>
      {filterType === "select" && (<RefinementList attribute={filter.id} operator="or"/>)}
      {/* {filterType === "range" && (<RangeSlider attribute={filter.id}/>)} */}
      {filterType === "range" && (<RangeInput attribute={filter.id}/>)}
      {filterType === "intervals" && (<RefinementList attribute={filter.id} sortBy={sortIntervals} operator="or"/>)}
    </div>
  );
};
