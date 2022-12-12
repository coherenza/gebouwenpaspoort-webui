import { Configure, SortBy, useConnector } from "react-instantsearch-hooks-web";
import { setIndexes } from "./import";
import { Filter } from "./Property";
import "./Filters.css";
import { filterProps, FilterSchema, sortProps } from "./schema";
import { useContext } from "react";
import { AppContext } from "./App";
import { AttributeCollapsible } from "./Attributes";

export function Filters({}) {
  const { showFilter, setShowFilter, locationFilter, setLocationFilter } =
    useContext(AppContext);
  const clearLocationFilter = () => setLocationFilter(undefined);
  return (
    <div
      className={`Sidebar filter-panel ${
        showFilter ? "filter-panel--open" : ""
      }`}
    >
      <div className="Titlebar">
        <h3>Filters</h3>
        <button onClick={() => setShowFilter(false)}>Sluit</button>
      </div>
      <div className="filters">
        {locationFilter && (
          <div>
            Zoek binnen{" "}
            <span className="filterValue">{locationFilter.name}</span>
            <button className="clear" onClick={clearLocationFilter}>
              x
            </button>
          </div>
        )}

        {/* {"sorteren op:"}
        <SortBy
          items={sortProps.map((item) => {
            return {
              value: item.sortBy,
              label: item.label,
            };
          })}
        /> */}

        {FilterSchema.map((attribute) => {
          return (
            <AttributeCollapsible attribute={attribute}>
              {attribute.attributes?.map((att) => {
                return <Filter key={att?.name} {...att} />;
              })}
            </AttributeCollapsible>
          );
        })}

        {window.location.href.includes("localhost") && (
          <button onClick={setIndexes}>set indexes</button>
        )}
      </div>
    </div>
  );
}
