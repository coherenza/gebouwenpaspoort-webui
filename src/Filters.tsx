import { Configure, SortBy, useConnector } from "react-instantsearch-hooks-web";
import { setIndexes } from "./import";
import { Filter } from "./Property";
import "./Filters.css";
import { filterProps, sortProps } from "./schema";
import { useContext } from "react";
import { AppContext } from "./App";

export function Filters({}) {
  const { showFilter, setShowFilter, locationFilter, setLocationFilter } = useContext(AppContext);
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

        { locationFilter &&
            <div>Zoek binnen <span className="filterValue">{locationFilter.name}</span><button className="clear" onClick={clearLocationFilter}>x</button></div>
        }

        {/* {"sorteren op:"}
        <SortBy
          items={sortProps.map((item) => {
            return {
              value: item.sortBy,
              label: item.label,
            };
          })}
        /> */}

        {filterProps.map((prop) => {
          if (prop.display == 'none') {
            return '';
          } else {
            return <Filter key={prop.label} {...prop} />;
          }
        })}

        {window.location.href.includes("localhost") && <button onClick={setIndexes}>set indexes</button>}

      </div>
    </div>
  );
}
