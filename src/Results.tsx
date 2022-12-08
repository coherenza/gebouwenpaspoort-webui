import { Hits, Pagination, SortBy, useRefinementList } from "react-instantsearch-hooks-web";
import { HitLine } from "./HitLine";
import "./Results.css";
import { createContext, useContext } from "react";
import { AppContext } from "./App";


export const LocationFilterContext = createContext(undefined);

export function Results() {
  const { refine } = useRefinementList({attribute: 'pdok-locatie-id'});
  const { locationFilter, setLocationFilter } = useContext(AppContext);
  const setLocationFilterId = (id: string) => {
    console.info(`location filter = ${id}`);
    setLocationFilter(id);
    refine(id);
  };
    const { setShowResults, showResults } = useContext(AppContext);
  if (!showResults) {
    return null;
  }
  return (
    <LocationFilterContext.Provider
     value={ { setLocationFilterId } }
    >
      <div className={`Sidebar Results ${open ? "Results--open" : ""}`}>
        <div className="Titlebar Titlebar--padded">
          <h3>Resultaten</h3>
          <button onClick={() => setShowResults(false)}>Sluit</button>
        </div>
        {/* @ts-ignore */}
        <Hits hitComponent={HitLine} />
        <Pagination showLast={true} />
      </div>
    </LocationFilterContext.Provider>
  );
}
