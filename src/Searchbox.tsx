import { useCallback, useContext, useEffect, useState } from "react";
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
  const debouncedSearchTerm = useDebounce(searchTerm, 200);
  const { refine: clearRefinements } = useClearRefinements();

  // We keep track of the `sortBy` in a more efficient way to prevent unnecessary searches
  let setSort = useCallback((sort: string) => {
    setSortBySlow(sort);
    setLastInteractionOrigin("text");
    setSortByQuick(sort);
  }, []);

  let handleReset = useCallback(
    (e) => {
      e.preventDefault();
      refine("");
      setCurrent(undefined);
      setLastInteractionOrigin("text");
      clear();
      clearGeo(startBoundsInstant);
      // map?.fitBounds(startBounds);
      clearRefinements();
      setSearchTerm("");
      setLocationFilter(undefined);
      window.location.href = "/";
    },
    [map],
  );

  let handleSetSearchTerm = useCallback(
    (e) => {
      // when there are numerical values in the search term,
      // we want to sort by relevance instead of sorting by RankType.
      // But we should not call `setSortBy` too often, as it will trigger a search.
      const hasNumber = /\d/.test(e.target.value);
      let q = e.target.value;

      if (q.length > 2) {
        clearSearchQuery();
      }

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
    setLocationFilter(undefined);
    map?.flyTo(mapStartState);
  }, [map]);

  let handleSearch = useCallback(
    (query, exactOnly) => {
      if (query) {
        setShowDetails(false);
        const modifiedQuery = exactOnly ? `"${query}"` : query;
        refine(modifiedQuery);
        setLastInteractionOrigin("text");
        clearGeo(startBoundsInstant);
      } else {
        clearSearchQuery();
      }
    },
    [sortByQuick, sortBySlow],
  );

  // On enter, we want to search
  let handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      handleSearch(searchTerm, exact);
    },
    [searchTerm, exact],
  );

  // When the debounced search term changes, we want to search
  useEffect(() => {
    handleSearch(debouncedSearchTerm, exact);
  }, [debouncedSearchTerm]);

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
