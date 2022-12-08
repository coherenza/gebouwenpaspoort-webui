import { Hits, Pagination, useHits } from "react-instantsearch-hooks-web";
import { HitLine } from "./HitLine";
import "./Results.css";
import { useContext } from "react";
import { AppContext } from "./App";

export function Results() {
  const { setShowResults, showResults } = useContext(AppContext);
  if (!showResults) {
    return null;
  }

  let {
    results: { nbHits },
    hits,
  } = useHits()

  return (
    <div className={`Sidebar Results ${open ? "Results--open" : ""}`}>
      <div className="Titlebar Titlebar--padded">
        <h3>Resultaten</h3>
        <button onClick={() => setShowResults(false)}>Sluit</button>
      </div>
      <div className="app-header__results-count">{hits.length} / {nbHits == 1000 ? '1000+' : nbHits} resultaten zichtbaar</div>
      {/* @ts-ignore */}
      <Hits hitComponent={HitLine} />
      <Pagination showLast={true} />
    </div>
  );
}
