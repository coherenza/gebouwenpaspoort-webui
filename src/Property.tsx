import { Panel } from "./Panel";
import { FilterProp } from "./schema";
import React from "react";
import {
  RefinementList,
  RangeInput,
  Menu,
} from "react-instantsearch-dom";

export const Filter = (filter: FilterProp) => {
  console.log('filter', filter);
  return (
    <Panel title={filter.label} id={filter.propKey}>
      {filter.type === "single" && (<Menu attribute={filter.propKey} />)}
      {filter.type === "multi" && (<RefinementList attribute={filter.propKey} operator="and" />)}
      {/* {filter.type === "range" && (<RangeInput attribute={filter.propKey} defaultRefinement={{ min: 0, max: 1000 }} />)} */}
    </Panel>
  );
};
