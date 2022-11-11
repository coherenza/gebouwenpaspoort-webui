// Include only the reset
import "instantsearch.css/themes/reset.css";
// or include a full theme
// import 'instantsearch.css/themes/satellite.css';
// import "instantsearch.css/themes/algolia-min.css";
// Custom styles
import "./App.css";

import React from "react";
import {
  InstantSearch,
  Hits,
  SortBy,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  CurrentRefinements,
  Configure,
  Snippet,
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
    <h1>
      Gebouwenpaspoort <button onClick={importData}>run import</button>
    </h1>
    <InstantSearch indexName={indexName} searchClient={searchClient}>
      <div className="app">
        <div className="left-panel">
          <SortBy
            items={sortProps.map((item) => {return {
              value: item.sortBy,
              label: item.label,
            }})}
            defaultRefinement={sortProps[0].sortBy}
          />
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
          <SearchBox autoFocus />
          <Hits hitComponent={Hit} />
          <Pagination showLast={true} />
        </div>
      </div>
    </InstantSearch>
  </div>
);

export default App;
