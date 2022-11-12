import { Panel } from "./Panel";
import { FilterProp } from "./schema";
import React from "react";
import {
  RefinementList,
  RangeInput,
  Menu,
} from "react-instantsearch-hooks-web";

export const Filter = (filter: FilterProp) => {
  return (
    <Panel key={filter.propKey} title={filter.label} id={filter.propKey}>
      {filter.type === "single" && (<Menu attribute={filter.propKey} />)}
      {filter.type === "multi" && (<RefinementList attribute={filter.propKey} operator="and" />)}
      {filter.type === "range" && (<RangeInput attribute={filter.propKey} min={0} max={1000} />)}
    </Panel>
  );
};
