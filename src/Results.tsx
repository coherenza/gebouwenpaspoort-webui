import {
  Hits, InfiniteHits,
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
import { CurrentRefinements } from "./CurrentRefinements";

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
            { label: "50 per pagina", value: 50 },
            { label: "200 per pagina", value: 200, default: true},
            // Seems to be hard-capped at 200, but is not, see App.tsx, instantMeiliSearch(server, apiKey, {primaryKey: 'id', paginationTotalHits: 1000, keepZeroFacets: true})
            // { label: "1.000 hits per page", value: 1000 },
          ]}
        />
        <button onClick={() => setShowResults(false)}>Sluit</button>
      </div>
      <div className="app-header__results-count">
        {hits.length} / {nbHits == 1000 ? "1000+" : nbHits} resultaten zichtbaar
      </div>
      <CurrentRefinements />
      {/* <Hits hitComponent={HitLine} escapeHTML={false} /> */}
      {/* @ts-ignore */}
      <InfiniteHits hitComponent={HitLine} escapeHTML={false} showPrevious={false} />
      {/* <Pagination showLast={true} /> */}
    </div>
  );
}
