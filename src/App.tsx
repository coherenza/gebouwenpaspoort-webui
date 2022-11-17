// Custom styles
import "./reset.css";
import "./App.css";
import "./global.css";

import React, { createContext } from "react";
import {
  InstantSearch,
  Hits,
  SortBy,
  Pagination,
  ClearRefinements,
  Configure,
} from "react-instantsearch-hooks-web";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { importData } from "./import";
import { HitLine, HitProps } from "./HitLine";
import { filterProps, Gebouw, sortProps } from "./schema";
import { Filter } from "./Property";
import { indexName, server } from "./config";
import { Map } from "./Map";
import { Details } from "./Details";
import { SearchBox } from "./Searchbox";

interface AppContextI {
  setCurrent: (gebouw: Gebouw) => void;
  current: Gebouw | undefined;
}

const searchClient = instantMeiliSearch(server);
export const AppContext = createContext<AppContextI>(undefined);

const App = () => {
  const [current, setCurrent] = React.useState(undefined);
  const [showFilter, setShowFilter] = React.useState(false);
  const [showMap, setShowMap] = React.useState(true);

  return (
    <AppContext.Provider value={{ setCurrent, current }}>
      <div className="ais-InstantSearch">
        <InstantSearch indexName={indexName} searchClient={searchClient}>
          <div className="app">
            <div
              className={`filter-panel ${
                showFilter ? "filter-panel--show" : ""
              }`}
            >
              <h3>Filters</h3>
              {/* <CurrentRefinements /> */}
              {filterProps.map((prop) => {
                return <Filter {...prop} />;
              })}
              <Configure
                hitsPerPage={30}
                attributesToSnippet={["description:50"]}
                snippetEllipsisText={"..."}
              />
              <button onClick={importData}>run import</button>
            </div>
            <div className="results-panel">
              <div className="header">
                <h2 className="logo">Gebouwenpaspoort</h2>
                <div className="header--buttons">
                  <button onClick={() => setShowFilter(!showFilter)}>
                    Filters
                  </button>
                  <button onClick={() => setShowMap(!showMap)}>Kaart</button>
                  <ClearRefinements />
                </div>
              </div>
              <div className="search-bar-wrapper">
                <SearchBox />
              </div>
              {showMap && <Map />}
              <div className="sort-wrapper">
                <h3>Resultaten</h3>
                {"sorteren op:"}
                <SortBy
                  items={sortProps.map((item) => {
                    return {
                      value: item.sortBy,
                      label: item.label,
                    };
                  })}
                  defaultRefinement={sortProps[0].sortBy}
                />
              </div>
              <Hits hitComponent={HitLine} />
              <Pagination showLast={true} />
            </div>
            <Details />
          </div>
        </InstantSearch>
      </div>
    </AppContext.Provider>
  );
};

export default App;
