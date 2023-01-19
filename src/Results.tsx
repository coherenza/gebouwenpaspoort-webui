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
import { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "./App";
import { CurrentRefinements } from "./CurrentRefinements";
import { Cross1Icon } from "@radix-ui/react-icons";

export const LocationFilterContext = createContext(undefined);

export function Results() {
  const { showResults, setShowResults } = useContext(AppContext);
  const [isCopied, setIsCopied] = useState(false);

  let {
    results: { nbHits },
    hits,
  } = useHits({
    escapeHTML: false,
  });

  useEffect(() => {
    setIsCopied(false);
  }, [nbHits]);

  if (!showResults) {
    return null;
  }

  function handleLinkShare() {
    const url = new URL(window.location.href);
    navigator.clipboard.writeText(url.toString());
    setIsCopied(true);
  }

  return (
    <div className={`Sidebar Results ${open ? "Results--open" : ""}`}>
      <div className="Titlebar Titlebar--padded">
        <h3>Resultaten</h3>
        <HitsPerPage
          items={[
            { label: "50 per pagina", value: 50 },
            { label: "200 per pagina", value: 200, default: true},
            { label: "1.000 hits per page", value: 1000 },
          ]}
        />
        <button onClick={handleLinkShare}>{isCopied ? 'Link gekopieerd!' : 'Delen'}</button>
        <button title="Resultaten sluiten" onClick={() => setShowResults(false)}><Cross1Icon/></button>
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
