import { Configure } from "react-instantsearch-hooks-web";
import { importData } from "./import";
import { Filter } from "./Property";
import "./Filters.css";
import { filterProps } from "./schema";
import { useContext } from "react";
import { AppContext } from "./App";

export function Filters({}) {
  const { showFilter, setShowFilter } = useContext(AppContext);
  if (!showFilter) {
    return null;
  }
  return (
    <div className={`filter-panel ${showFilter ? "filter-panel--show" : ""}`}>
      <h3>Filters</h3>
      {/* <CurrentRefinements /> */}
      {filterProps.map((prop) => {
        return <Filter key={prop.label} {...prop} />;
      })}
      <button onClick={importData}>run import</button>
    </div>
  );
}
