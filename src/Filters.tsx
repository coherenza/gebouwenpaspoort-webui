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
      <div className="Titlebar">
        <h3>Filters</h3>
        <button onClick={() => setShowFilter(false)}>Sluit</button>
      </div>
      {/* <CurrentRefinements /> */}
      {filterProps.map((prop) => {
        return <Filter key={prop.label} {...prop} />;
      })}
      <button onClick={importData}>run import</button>
    </div>
  );
}
