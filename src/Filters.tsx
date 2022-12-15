import { SortBy } from "react-instantsearch-hooks-web";
import { setIndexes } from "./import";
import { Filter } from "./Filter";
import "./Filters.css";
import { useContext } from "react";
import { AppContext } from "./App";
import { AttributeCollapsible } from "./Attributes";
import { filterAttributes, sortProps } from "./schema";

export function Filters({}) {
  const { showFilter, setShowFilter } =
    useContext(AppContext);
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

        {/* Zonder SortBy widget vindt er geen sortering plaats. */}
        <SortBy
          style={{ display: "none" }}
          items={sortProps.map((item) => {
            return {
              value: item.sortBy,
              label: item.label,
            };
          })}
        ></SortBy>
        {filterAttributes.map((attribute) => {
          return (
            <AttributeCollapsible attribute={attribute} key={attribute.name || attribute.id}>
              {attribute.attributes?.map((att) => {
                return <Filter key={att?.name} {...att} />;
              })}
            </AttributeCollapsible>
          );
        })}
        { (["localhost", "127.0.0.1"].includes(window.location.hostname) || location.search === "?iamadeveloper") &&
          <div style={{'marginTop':'2em'}}><button onClick={setIndexes}>set index properties</button></div>
        }
      </div>
    </div>
  );
}
