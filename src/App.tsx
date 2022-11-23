// Custom styles
import "./reset.css";
import "./App.css";
import "./global.css";

import React, { createContext } from "react";
import { InstantSearch, Configure } from "react-instantsearch-hooks-web";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { GBPObject, sortProps } from "./schema";
import { indexName, server } from "./config";
import { Map } from "./Map";
import { Details } from "./Details";
import { Results } from "./Results";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { KeyboardHandler } from "./KeyboardHandler";
import { MapProvider } from "react-map-gl";

interface AppContextI {
  setCurrent: (gebouw: GBPObject) => void;
  current: GBPObject | undefined;
  setShowResults: (b: boolean) => void;
  showResults: boolean;
  setShowFilter: (b: boolean) => void;
  showFilter: boolean;
}

const searchClient = instantMeiliSearch(server, );
export const AppContext = createContext<AppContextI>(undefined);
export const hitCount = 500;

const App = () => {
  const [current, setCurrent] = React.useState(undefined);
  const [showFilter, setShowFilter] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);

  return (
    <AppContext.Provider
      value={{
        setCurrent,
        current,
        showFilter,
        setShowFilter,
        showResults,
        setShowResults,
      }}
    >
      <MapProvider>
        <InstantSearch
          indexName={indexName}
          searchClient={searchClient}
          initialUiState={{
            gbp: {
              sortBy: sortProps[0].sortBy,
            },
          }}
        >
          <div className="app">
            <Configure
              hitsPerPage={hitCount}
              attributesToSnippet={["description:50"]}
              snippetEllipsisText={"..."}
            />
            <Map />
            <Header />
            <Filters />
            <Results />
            <Details />
          </div>
          <KeyboardHandler />
        </InstantSearch>
      </MapProvider>
    </AppContext.Provider>
  );
};

export default App;
