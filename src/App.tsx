// Custom styles
import "./reset.css";
import "./App.css";
import "./global.css";

import React, { createContext, useEffect, useMemo } from "react";
import {
  InstantSearch,
  Configure,
  useRefinementList,
} from "react-instantsearch-hooks-web";
import { TourProvider, useTour } from "@reactour/tour";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { GBPObject, LocationFilter, sortProps } from "./schema";
import { bugsnagKey, indexName, meiliKey, mode, server } from "./config";
import { Map } from "./Map";
import { Details } from "./Details";
import { Results } from "./Results";
import { Filters } from "./Filters";
import { KeyboardHandler } from "./KeyboardHandler";
import { MapProvider } from "react-map-gl";
import { useLocalStorage } from "./useLocalStorage";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import { LayerI, layersDefault, LayerSelector } from "./Layers";
import { tourSteps as steps } from "./Tour";

Bugsnag.start({
  apiKey: bugsnagKey,
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
  layers: LayerI[];
  setLayers: React.Dispatch<React.SetStateAction<LayerI[]>>;
  showLayerSelector: boolean;
  setShowLayerSelector: (b: boolean) => void;
  showFilter: boolean;
  setLocationFilter: (location: LocationFilter | undefined) => void;
  locationFilter: LocationFilter | undefined;
}

export const AppContext = createContext<AppContextI>(undefined);
export const hitCount = 150;

const AppProvider = () => {
  const [apiKey, setApiKey] = useLocalStorage("apiKey", meiliKey);
  const [hasCompletedTour, setHasCompletedTour] = useLocalStorage(
    "completedTour",
    false
  );

  const searchClient = useMemo(() => {
    let client = instantMeiliSearch(server, apiKey, {
      primaryKey: "id",
      // paginationTotalHits: 1000,
      keepZeroFacets: true,
    });
    return client;
  }, [apiKey]);

  const stepsModified = useMemo(() => {
    const stepsCopy = [...steps];
    const firstStep = stepsCopy[0];
    firstStep.action = () => setHasCompletedTour(true);
    return stepsCopy;
  }, []);

  return (
    <TourProvider steps={stepsModified}>
      <InstantSearch
        indexName={indexName}
        searchClient={searchClient}
        routing={true}
        initialUiState={{
          gbp: {
            sortBy: sortProps[0].sortBy,
          },
        }}
      >
        <App
          setApiKey={setApiKey}
          apiKey={apiKey}
          hasCompletedTour={hasCompletedTour}
        />
      </InstantSearch>
    </TourProvider>
  );
};

const App = ({ setApiKey, apiKey, hasCompletedTour }) => {
  const [current, setCurrent] = React.useState(undefined);
  const [showFilter, setShowFilter] = React.useState(true);
  const [showResults, setShowResults] = React.useState(true);
  const [showLayers, setShowLayers] = React.useState(false);
  const [layers, setLayers] = React.useState<LayerI[]>(layersDefault);
  const [locationFilter, setLocationFilterInternal] = React.useState(undefined);
  const [apiKeyTemp, setApiKeyTemp] = React.useState("");
  const [validApiKey, setValidApiKey] = React.useState(false);
  const { setIsOpen } = useTour();

  const { refine } = useRefinementList({ attribute: "pdok-locatie-id" });
  const setLocationFilter = (locationFilter: LocationFilter) => {
    setLocationFilterInternal(locationFilter);
    // TODO: Reset is not properly working
    refine(locationFilter?.id || "");
  };

  async function handleSetApiKey(e) {
    e.preventDefault();
    setApiKey(apiKeyTemp);
  }

  useEffect(() => {
    if (validApiKey && !hasCompletedTour) {
      // start the tour
      setIsOpen(true);
    }
  }, [validApiKey, hasCompletedTour]);

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
        layers,
        setLayers,
        setCurrent,
        current,
        showFilter,
        setShowFilter,
        showResults,
        setShowLayerSelector: setShowLayers,
        showLayerSelector: showLayers,
        setShowResults,
        setLocationFilter,
        locationFilter,
      }}
    >
      <MapProvider>
        <ErrorBoundary>
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

                <div className="app__columns">
                  <Filters />
                  <LayerSelector />
                  <Map />
                  <Results />
                  <Details />
                </div>
              </div>
            )}
          </KeyboardHandler>
        </ErrorBoundary>
      </MapProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
