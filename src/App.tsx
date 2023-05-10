// Custom styles
import "./reset.css";
import "./App.css";
import "./global.css";

import React, { createContext, useEffect, useMemo } from "react";
import {
  InstantSearch,
  Configure,
  useRefinementList,
  useClearRefinements,
} from "react-instantsearch-hooks-web";
import { TourProvider, useTour } from "@reactour/tour";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { GBPObject, LocationFilter, sortProps } from "./schema";
import { indexName, meiliKey, server } from "./config";
import { Map } from "./Map";
import { Details } from "./Details";
import { Results } from "./Results";
import { Filters } from "./Filters";
import { KeyboardHandler } from "./KeyboardHandler";
import { MapProvider } from "react-map-gl";
import { useLocalStorage } from "./useLocalStorage";
import { LayerI, layersDefault, LayerSelector } from "./Layers";
import { tourSteps as steps } from "./Tour";


type InteractionOrigin = "map" | "text" | "results" | undefined;

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
  /** Where the user had its last interaction */
  lastInteractionOrigin: InteractionOrigin;
  setLastInteractionOrigin: (origin: InteractionOrigin) => void;
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
    <TourProvider showBadge={false} steps={stepsModified}>
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
  const [lastInteractionOrigin, setLastInteractionOrigin] =
    React.useState(undefined);
  const [showFilter, setShowFilter] = useLocalStorage("showFilter", true);
  const [showResults, setShowResults] = useLocalStorage("showResults", true);
  const [showLayers, setShowLayers] = useLocalStorage("showLayers", false);
  const [layers, setLayers] = React.useState<LayerI[]>(layersDefault);
  const [locationFilter, setLocationFilterInternal] = React.useState<
    LocationFilter | undefined
  >(undefined);
  const [apiKeyTemp, setApiKeyTemp] = React.useState("");
  const [validApiKey, setValidApiKey] = React.useState(false);
  const { setIsOpen } = useTour();

  const { refine } = useRefinementList({ attribute: "pdok-locatie-id" });
  const { refine: clearLocationFilter } = useClearRefinements({
    includedAttributes: ["pdok-locatie-id"],
  });
  const setLocationFilter = (locationFilter: LocationFilter | undefined) => {
    setLocationFilterInternal(locationFilter);
    locationFilter ? refine(locationFilter.id) : clearLocationFilter();
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
        lastInteractionOrigin,
        setLastInteractionOrigin,
        setShowLayerSelector: setShowLayers,
        showLayerSelector: showLayers,
        setShowResults,
        setLocationFilter,
        locationFilter,
      }}
    >
      <MapProvider>
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
      </MapProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
