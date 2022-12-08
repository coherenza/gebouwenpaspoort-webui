import { useCallback, useEffect, useState } from "react";
import {
  useClearRefinements,
  useHits,
  useSearchBox,
  useSortBy,
} from "react-instantsearch-hooks-web";
import { useMap } from "react-map-gl";
import { startBounds, startBoundsInstant } from "./Map";
import "./Searchbox.css";
import useDebounce from "./useDebounce";
import { useGeoSearch } from "./useGeoSearch";

export const SearchBox = () => {
  const { refine, clear } = useSearchBox();
  let { refine: clearRefinements } = useClearRefinements();
  let { refine: clearGeo } = useGeoSearch();
  let { mainMap: map } = useMap();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 100);

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

  let handleSetSearchTerm = useCallback((e) => {
    setSearchTerm(e.target.value);
    if (e.target.value == "") {
      handleReset(e);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      refine(searchTerm);
    } else {
      refine("");
    }
  }, [debouncedSearchTerm]);

  return (
    <form
      noValidate
      action=""
      role="search"
      className="Searchbox"
      onSubmit={(e) => e.preventDefault()}
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
      <button type="button" onClick={handleReset}>Reset</button>
    </form>
  );
};
