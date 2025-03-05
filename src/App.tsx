// Custom styles
import "./reset.css";
import "./App.css";
import "./global.css";

import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  Configure,
  InstantSearch,
  useClearRefinements,
  useRefinementList,
} from "react-instantsearch";
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
import { tourSteps as steps } from "./Tour";
import { layersDefault } from "./layers/defaultServices";
import { LayerI } from "./layers/LayerTypes";
import { LayerSelector } from "./Layers";

type InteractionOrigin = "map" | "text" | "results" | undefined;

export interface AppContextI {
  setCurrent: (gebouw: GBPObject) => void;
  current: GBPObject | undefined;
  setShowDetails: (b: boolean) => void;
  showDetails: boolean;
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
  /** Whether to show BAG items (search results) on the map */
  showBagLayer: boolean;
  setShowBagLayer: (b: boolean) => void;
}

export const AppContext = createContext<AppContextI>(undefined);
export const hitCount = 150;

const AppProvider = () => {
  const [apiKey, setApiKey] = useLocalStorage("apiKey", meiliKey);
  const [hasCompletedTour, setHasCompletedTour] = useLocalStorage(
    "completedTour",
    false,
  );

  const searchClient = useMemo(() => {
    let { searchClient } = instantMeiliSearch(server, apiKey, {
      primaryKey: "id",
      // paginationTotalHits: 1000,
    });
    return searchClient;
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
  const [showDetails, setShowDetails] = useLocalStorage("showDetails", true);
  const [layers, setLayers] = React.useState<LayerI[]>([]);
  const [locationFilter, setLocationFilterInternal] = React.useState<
    LocationFilter | undefined
  >(undefined);
  const [apiKeyTemp, setApiKeyTemp] = React.useState("");
  const [validApiKey, setValidApiKey] = React.useState(false);
  const [showBagLayer, setShowBagLayer] = useLocalStorage("showBagLayer", true);

  const { refine } = useRefinementList({ attribute: "pdok-locatie-id" });
  const { refine: clearLocationFilter } = useClearRefinements({
    includedAttributes: ["pdok-locatie-id"],
  });
  const setLocationFilter = (locationFilter: LocationFilter | undefined) => {
    setLocationFilterInternal(locationFilter);
    if (locationFilter) {
      clearLocationFilter(); // Clear existing filter
      refine(locationFilter.id); // Set new filter
    } else {
      clearLocationFilter();
    }
  };

  async function handleSetApiKey(e) {
    e.preventDefault();
    setApiKey(apiKeyTemp);
  }

  useEffect(() => {
    if (validApiKey && !hasCompletedTour) {
      // start the tour
      // Temp disabled https://github.com/coherenza/gebouwenpaspoort-webui/issues/23
      // setIsOpen(true);
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

  // Reset current when locationFilter changes
  useEffect(() => {
    setCurrent(undefined);
  }, [locationFilter]);

  return (
    <AppContext.Provider
      value={{
        layers,
        setLayers,
        setCurrent,
        current,
        showFilter,
        setShowFilter,
        showDetails,
        setShowDetails,
        showResults,
        lastInteractionOrigin,
        setLastInteractionOrigin,
        setShowLayerSelector: setShowLayers,
        showLayerSelector: showLayers,
        setShowResults,
        setLocationFilter,
        locationFilter,
        showBagLayer,
        setShowBagLayer,
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
