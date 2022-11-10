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
  Configure,
  Snippet,
} from "react-instantsearch-dom";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { importData, indexName, server } from "./import";
import { Hit } from "./Hit";
import { filterProps } from "./schema";
import { Filter } from "./Property";

const searchClient = instantMeiliSearch(server);

const App = () => (
  <div className="ais-InstantSearch">
    <h1>
      Gebouwenpaspoort <button onClick={importData}>run import</button>
    </h1>
    <InstantSearch indexName={indexName} searchClient={searchClient}>
      <div className="app">
        <div className="left-panel">
          <ClearRefinements />
          {filterProps.map((prop) => {
            return <Filter {...prop} />;
          })}
          {/* <RefinementList attribute={filterProps[3].key} /> */}
          <Configure
            hitsPerPage={50}
            attributesToSnippet={["description:50"]}
            snippetEllipsisText={"..."}
          />
        </div>
        <div className="right-panel">
          <SearchBox autoFocus/>
          <Hits hitComponent={Hit} />
          <Pagination showLast={true} />
        </div>
      </div>
    </InstantSearch>
  </div>
);

export default App;
