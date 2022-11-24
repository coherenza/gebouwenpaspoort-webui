// Custom styles
import "./reset.css";
import "./App.css";
import "./global.css";

import React, { createContext, useEffect, useMemo } from "react";
import { InstantSearch, Configure } from "react-instantsearch-hooks-web";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { GBPObject, sortProps } from "./schema";
import { indexName, meiliKey, server } from "./config";
import { Map } from "./Map";
import { Details } from "./Details";
import { Results } from "./Results";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { KeyboardHandler } from "./KeyboardHandler";
import { MapProvider } from "react-map-gl";
import { useLocalStorage } from "./useLocalStorage";

interface AppContextI {
  setCurrent: (gebouw: GBPObject) => void;
  current: GBPObject | undefined;
  setShowResults: (b: boolean) => void;
  showResults: boolean;
  setShowFilter: (b: boolean) => void;
  showFilter: boolean;
}

export const AppContext = createContext<AppContextI>(undefined);
export const hitCount = 500;

function init() {
  // Remove HTTPS because of CORS
  let url = window.location.href
  if (url.startsWith('https')) {
    url.replace('https', 'http')
  }
  window.location.replace(url)
}

// init();

const App = () => {
  const [current, setCurrent] = React.useState(undefined);
  const [showFilter, setShowFilter] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const [apiKeyTemp, setApiKeyTemp] = React.useState("");
  const [validApiKey, setValidApiKey] = React.useState(false);
  const [apiKey, setApiKey] = useLocalStorage("apiKey", meiliKey);

  const searchClient = useMemo(() => {
    return instantMeiliSearch(server, apiKey);
  }, [apiKey]);

  async function handleSetApiKey(e) {
    e.preventDefault();
    setApiKey(apiKeyTemp);
  }

  // try API key, set invalid if not correct
  useEffect(() => {
    console.log("APIKEY: ", apiKey);
    fetch(server + "/indexes", {
      headers: {
        Authorization: "Bearer " + apiKey,
      },
    }).then((res) => {
      if (res.ok) {
        setValidApiKey(true);
      } else {
        setValidApiKey(false);
      }
    });
  }, [apiKey]);

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
          <KeyboardHandler>
            {!validApiKey ? (
              <form onSubmit={handleSetApiKey} className="app__api-key">
                <input
                  autoFocus
                  placeholder="Voer de sleutel in"
                  value={apiKeyTemp}
                  onChange={(e) => setApiKeyTemp(e.target.value)}
                />
                <button type="submit">opslaan</button>
              </form>
            ) : (
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
            )}
          </KeyboardHandler>
        </InstantSearch>
      </MapProvider>
    </AppContext.Provider>
  );
};

export default App;
