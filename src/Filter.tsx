import { Attribute } from "./schema";
import React from "react";
import {
  RangeInput,
  RefinementList,
} from "react-instantsearch-hooks-web";
import "./Filter.css";
import { RangeSlider } from "./RangeSlider";

export const Filter = (filter: Attribute) => {
  const filterType = filter.filterType || "select";

  return (
    <div className="Filter">
      <h4>{filter.name}</h4>
      {filterType === "select" && (<RefinementList attribute={filter.id} operator="and" />)}
      {/* {filterType === "range" && (<RangeSlider attribute={filter.id} />)} */}
      {filterType === "range" && (<RangeInput attribute={filter.id} />)}
    </div>
  );
};
