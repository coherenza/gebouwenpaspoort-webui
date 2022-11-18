// Custom styles
import "./reset.css";
import "./App.css";
import "./global.css";

import React, { createContext } from "react";
import { InstantSearch, Configure } from "react-instantsearch-hooks-web";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { Gebouw } from "./schema";
import { indexName, server } from "./config";
import { Map } from "./Map";
import { Details } from "./Details";
import { Results } from "./Results";
import { Filters } from "./Filters";
import { Header } from "./Header";

interface AppContextI {
  setCurrent: (gebouw: Gebouw) => void;
  current: Gebouw | undefined;
  setShowResults: (b: boolean) => void;
  showResults: boolean;
  setShowFilter: (b: boolean) => void;
  showFilter: boolean;
}

const searchClient = instantMeiliSearch(server);
export const AppContext = createContext<AppContextI>(undefined);

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
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <div className="app">
          <Configure
            hitsPerPage={100}
            attributesToSnippet={["description:50"]}
            snippetEllipsisText={"..."}
          />
          <Map />
          <Header />
          <Filters />
          <Results/>
          <Details />
        </div>
      </InstantSearch>
    </AppContext.Provider>
  );
};

export default App;
