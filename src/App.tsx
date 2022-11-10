import "instantsearch.css/themes/algolia-min.css";
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
import "./App.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { importData, indexName, server } from "./import";
import { Hit } from "./Hit";
import { filterProps } from "./schema";
import { Panel } from "./Panel";

const searchClient = instantMeiliSearch(server);

const App = () => (
  <div className="ais-InstantSearch">
    <h1>Gebouwenpaspoort</h1>
    <InstantSearch indexName={indexName} searchClient={searchClient}>
      <div className="app">
        <div className="left-panel">
          <button onClick={importData}>import</button>
          <ClearRefinements />
          {/* <SortBy
          defaultRefinement={indexName}
          items={[
            { value: indexName, label: "Relevant" },
            {
              value: "steam-video-games:recommendationCount:desc",
              label: "Most Recommended"
            },
            {
              value: "steam-video-games:recommendationCount:asc",
              label: "Least Recommended"
            }
          ]}
        /> */}
          {filterProps.map((prop) => (
            <Panel title={prop} id={prop} >
              <RefinementList attribute={prop} />
            </Panel>
          ))}
          <Configure
            hitsPerPage={6}
            attributesToSnippet={["description:50"]}
            snippetEllipsisText={"..."}
          />
        </div>
        <div className="right-panel">
          <SearchBox />
          <Hits hitComponent={Hit} />
          <Pagination showLast={true} />
        </div>
      </div>
    </InstantSearch>
  </div>
);

export default App;
