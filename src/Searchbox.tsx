import { useCallback, useContext, useEffect, useState, useRef } from "react";
import {
  useClearRefinements,
  useGeoSearch,
  useSearchBox,
  useSortBy,
} from "react-instantsearch";
import { useMap } from "react-map-gl";
import { AppContext } from "./App";
import { indexName } from "./config";
import { mapStartState, startBounds, startBoundsInstant } from "./Map";
import { sortProps } from "./schema";
import "./Searchbox.css";
import useDebounce from "./useDebounce";
import { LngLatBoundsLike } from "mapbox-gl";

const defaultSort = sortProps[0].sortBy;
const sortOptions = {
  items: sortProps.map((s) => {
    return { value: s.sortBy, label: s.label };
  }),
  defaultSort: defaultSort,
};

export const SearchBox = () => {
  const { refine, clear } = useSearchBox();
  let { refine: clearGeo } = useGeoSearch();
  let { mainMap: map } = useMap();
  let { refine: setSortBySlow, currentRefinement: sortBySlow } =
    useSortBy(sortOptions);
  let [sortByQuick, setSortByQuick] = useState(defaultSort);
  let [exact, setExact] = useState(false);
  let {
    setLastInteractionOrigin,
    setLocationFilter,
    setCurrent,
    setShowDetails,
  } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const { refine: clearRefinements } = useClearRefinements();

  // Add a ref to track the previous debounced search term
  const prevDebouncedTermRef = useRef(debouncedSearchTerm);

  // We keep track of the `sortBy` in a more efficient way to prevent unnecessary searches
  let setSort = useCallback((sort: string) => {
    setSortBySlow(sort);
    setLastInteractionOrigin("filter");
    setSortByQuick(sort);
  }, []);

  let handleReset = useCallback(
    (e) => {
      console.log("handleReset called");
      clear();
      // refine("*");
      setCurrent(undefined);
      setLastInteractionOrigin("query");
      clearGeo(startBoundsInstant);
      // Convert startBounds array to LngLatBoundsLike format
      map?.fitBounds([
        [startBounds[0], startBounds[1]], // Southwest corner [lng, lat]
        [startBounds[2], startBounds[3]]  // Northeast corner [lng, lat]
      ] as LngLatBoundsLike);
      clearRefinements();
      setSearchTerm("");
      setLocationFilter(undefined);
      window.location.href = "/";
    },
    [map, clear, refine, clearGeo, startBoundsInstant, clearRefinements],
  );

  let handleSetSearchTerm = useCallback(
    (e) => {
      // when there are numerical values in the search term,
      // we want to sort by relevance instead of sorting by RankType.
      // But we should not call `setSortBy` too often, as it will trigger a search.
      const hasNumber = /\d/.test(e.target.value);
      let q = e.target.value;

      if (sortByQuick == defaultSort) {
        if (hasNumber) {
          // Sorting by indexName = sorting by relevance
          setSort(indexName);
        }
      } else {
        if (!hasNumber) {
          // Use the default sort
          setSort(defaultSort);
        }
      }
      setSearchTerm(q);
    },
    [searchTerm, sortByQuick, sortByQuick],
  );

  const clearSearchQuery = useCallback(() => {
    console.log("clearSearchQuery called");
    setLocationFilter(undefined);
    // map?.flyTo(mapStartState);
  }, [map]);

  let handleSearch = useCallback(
    (query, exactOnly) => {
      console.log("handleSearch called", query, exactOnly);
      if (query) {
        setShowDetails(false);
        const modifiedQuery = exactOnly ? `"${query}"` : query;

        // Only set lastInteractionOrigin if this is a user-initiated search
        // (not from the debounced effect)
        const isUserInitiated = query === searchTerm;
        if (isUserInitiated) {
          setLastInteractionOrigin("query");
        }

        refine(modifiedQuery);
        clearGeo(startBoundsInstant);
      } else {
        clearSearchQuery();
      }
    },
    [refine, setShowDetails, setLastInteractionOrigin, clearGeo, clearSearchQuery, searchTerm],
  );

  // On enter, we want to search
  let handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      handleSearch(searchTerm, exact);
    },
    [searchTerm, exact, handleSearch],
  );

  // When the debounced search term changes, we want to search
  useEffect(() => {
    // Only search if the debounced term has actually changed
    if (debouncedSearchTerm && debouncedSearchTerm !== prevDebouncedTermRef.current) {
      console.log("Debounced search term changed, searching for:", debouncedSearchTerm);
      handleSearch(debouncedSearchTerm, exact);
      prevDebouncedTermRef.current = debouncedSearchTerm;
    }
  }, [debouncedSearchTerm, exact, handleSearch]);

  const handleToggleExact = useCallback(
    (e) => {
      e.preventDefault();
      handleSearch(searchTerm, !exact);
      setExact(!exact);
    },
    [exact, searchTerm],
  );

  return (
    <form
      noValidate
      action=""
      role="search"
      className="Searchbox"
      onSubmit={handleSubmit}
    >
      <input
        // we use id for focus from keyboard
        id="search-box"
        type="search"
        value={searchTerm}
        placeholder="Zoek op locatie"
        onChange={handleSetSearchTerm}
        autoFocus
      />
      <button
        title="Toon alleen resultaten die exact overeenkomen met de zoekopdracht."
        type="button"
        style={{
          fontWeight: exact ? "bold" : "normal",
        }}
        onClick={handleToggleExact}
      >
        {/* {exact ? <CheckboxIcon /> : <BoxIcon />} */}
        Exact
      </button>
      <button
        title="Verwijder de filters, de zoekopdracht en zoom uit naar de startpositie."
        id="reset"
        type="button"
        onClick={handleReset}
      >
        Reset
      </button>
    </form>
  );
};
