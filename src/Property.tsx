import { Attribute, FilterProp } from "./schema";
import React from "react";
import {
  RefinementList,
  RangeInput,
  Menu,
} from "react-instantsearch-hooks-web";

export const Filter = (filter: Attribute) => {
  return (
    <>
      <h4>{filter.name}</h4>
      {filter.filterType === "select" && (<RefinementList attribute={filter.id} operator="and" />)}
      {filter.filterType === "range" && (<RangeInput attribute={filter.id} />)}
    </>
  );
};
