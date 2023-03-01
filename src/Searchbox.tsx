import { BoxIcon, CheckboxIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";
import {
  useClearRefinements,
  useSearchBox,
  useSortBy,
} from "react-instantsearch-hooks-web";
import { useMap } from "react-map-gl";
import { indexName } from "./config";
import { startBounds, startBoundsInstant } from "./Map";
import { sortProps } from "./schema";
import "./Searchbox.css";
import useDebounce from "./useDebounce";
import { useGeoSearch } from "./useGeoSearch";

const defaultSort = sortProps[0].sortBy;
console.log("defaultSort", defaultSort);
const sortOptions = {
  items: sortProps.map((s) => {
    return { value: s.sortBy, label: s.label };
  }),
  defaultSort: defaultSort,
};

export const SearchBox = () => {
  const { refine, clear } = useSearchBox();
  let { refine: clearRefinements } = useClearRefinements();
  let { refine: clearGeo } = useGeoSearch();
  let { mainMap: map } = useMap();
  let { refine: setSortBySlow, currentRefinement: sortBySlow } =
    useSortBy(sortOptions);
  let [sortByQuick, setSortByQuick] = useState(defaultSort);
  let [exact, setExact] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  // We keep track of the `sortBy` in a more efficient way to prevent unnecessary searches
  let setSort = useCallback((sort: string) => {
    console.log("setSort", sort);
    setSortBySlow(sort);
    setSortByQuick(sort);
  }, []);

  let handleReset = useCallback(
    (e) => {
      e.preventDefault();
      refine("");
      clear();
      clearGeo(startBoundsInstant);
      map?.fitBounds(startBounds);
      clearRefinements();
      setSearchTerm("");
    },
    [map]
  );

  let handleSetSearchTerm = useCallback(
    (e) => {
      // when there are numerical values in the search term,
      // we want to sort by relevance instead of sorting by RankType.
      // But we should not call `setSortBy` too often, as it will trigger a search.
      const hasNumber = /\d/.test(e.target.value);
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
      setSearchTerm(e.target.value);
    },
    [searchTerm, sortByQuick, sortByQuick]
  );

  let handleSearch = useCallback(
    (query, exactOnly) => {
      if (query) {
        const modifiedQuery = exactOnly ? `"${query}"` : query;
        refine(modifiedQuery);
        clearGeo(startBoundsInstant);
      } else {
        refine("");
      }
    },
    [sortByQuick, sortBySlow]
  );

  // On enter, we want to search
  let handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      handleSearch(searchTerm, exact);
    },
    [searchTerm, exact]
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
    [exact, searchTerm]
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
