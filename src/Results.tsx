import { Hits, Pagination, SortBy } from "react-instantsearch-hooks-web";
import { HitLine } from "./HitLine";
import "./Results.css";
import { useContext } from "react";
import { AppContext } from "./App";

export function Results() {
  const { setShowResults, showResults } = useContext(AppContext);
  if (!showResults) {
    return null;
  }
  return (
    <div className={`Sidebar Results ${open ? "Results--open" : ""}`}>
      <div className="Titlebar Titlebar--padded">
        <h3>Resultaten</h3>
        <button onClick={() => setShowResults(false)}>Sluit</button>
      </div>
      {/* @ts-ignore */}
      <Hits hitComponent={HitLine} />
      <Pagination showLast={true} />
    </div>
  );
}
