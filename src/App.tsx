// Custom styles
import "./reset.css";
import "./App.css";
import "./global.css";

import React from "react";
import {
  InstantSearch,
  Hits,
  SortBy,
  SearchBox,
  Pagination,
  ClearRefinements,
  CurrentRefinements,
  Configure,
} from "react-instantsearch-dom";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { importData } from "./import";
import { Hit } from "./Hit";
import { filterProps, sortProps } from "./schema";
import { Filter } from "./Property";
import { indexName, server } from "./config";

const searchClient = instantMeiliSearch(server);

const App = () => (
  <div className="ais-InstantSearch">
    <InstantSearch indexName={indexName} searchClient={searchClient}>
      <div className="app">
        <div className="left-panel">
          <h2 className="logo">Gebouwenpaspoort</h2>
          {/* <CurrentRefinements /> */}
          <ClearRefinements />
          {filterProps.map((prop) => {
            return <Filter {...prop} />;
          })}
          <Configure
            hitsPerPage={50}
            attributesToSnippet={["description:50"]}
            snippetEllipsisText={"..."}
          />
        </div>
        <div className="right-panel">
          <div className="search-bar-wrapper">
            <SearchBox autoFocus translations={{submitTitle: "Zoeken..."}} />
            <button onClick={importData}>run import</button>
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
          <Hits hitComponent={Hit} />
          <Pagination showLast={true} />
        </div>
      </div>
    </InstantSearch>
  </div>
);

export default App;
