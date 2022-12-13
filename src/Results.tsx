import {
  Hits,
  Pagination,
  SortBy,
  useRefinementList,
  useHits,
  HitsPerPage,
} from "react-instantsearch-hooks-web";
import { HitLine } from "./HitLine";
import "./Results.css";
import { createContext, useContext } from "react";
import { AppContext } from "./App";

export const LocationFilterContext = createContext(undefined);

export function Results() {
  const { showResults, setShowResults } = useContext(AppContext);

  let {
    results: { nbHits },
    hits,
  } = useHits();

  if (!showResults) {
    return null;
  }

  return (
    <div className={`Sidebar Results ${open ? "Results--open" : ""}`}>
      <div className="Titlebar Titlebar--padded">
        <h3>Resultaten</h3>
        <HitsPerPage
          items={[
            { label: "50 per pagina", value: 50, default: true },
            { label: "200 per pagina", value: 200 },
            // Seems to be hard-capped at 200
            // { label: "1.000 hits per page", value: 1000 },
          ]}
        />
        <button onClick={() => setShowResults(false)}>Sluit</button>
      </div>
      <div className="app-header__results-count">
        {hits.length} / {nbHits == 1000 ? "1000+" : nbHits} resultaten zichtbaar
      </div>
      {/* @ts-ignore */}
      <Hits hitComponent={HitLine} escapeHTML={false} />
      <Pagination showLast={true} />
    </div>
  );
}
