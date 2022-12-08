// Custom styles
import "./reset.css";
import "./App.css";
import "./global.css";

import React, { createContext, useEffect, useMemo } from "react";
import { InstantSearch, Configure } from "react-instantsearch-hooks-web";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { GBPObject, sortProps } from "./schema";
import { indexName, meiliKey, mode, server } from "./config";
import { Map } from "./Map";
import { Details } from "./Details";
import { Results } from "./Results";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { KeyboardHandler } from "./KeyboardHandler";
import { MapProvider } from "react-map-gl";
import { useLocalStorage } from "./useLocalStorage";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

Bugsnag.start({
  apiKey: "78d53614b677831a5615d29728624fe0",
  plugins: [new BugsnagPluginReact()],
  releaseStage: mode,
  enabledReleaseStages: ["production", "staging"],
});
const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

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

const App = () => {
  const [current, setCurrent] = React.useState(undefined);
  const [showFilter, setShowFilter] = React.useState(false);
  const [showResults, setShowResults] = React.useState(true);
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
        <ErrorBoundary>
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
        </ErrorBoundary>
      </MapProvider>
    </AppContext.Provider>
  );
};

export default App;
