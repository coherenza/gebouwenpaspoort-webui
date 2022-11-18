import { useCallback, useEffect, useState } from "react";
import { useClearRefinements, useSearchBox } from "react-instantsearch-hooks-web";
import { startBounds } from "./Map";
import "./Searchbox.css";
import useDebounce from "./useDebounce";
import { useGeoSearch } from "./useGeoSearch";

export const SearchBox = () => {
  const { refine, clear, } = useSearchBox();
  let {refine: clearRefinements} = useClearRefinements();
  let {refine: clearGeo} = useGeoSearch();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 100);

  let handleReset = useCallback(e => {
    e.preventDefault();
    refine("");
    clear();
    clearGeo(startBounds);
    clearRefinements();
    setSearchTerm("");
  }, []);

  let handleSetSearchTerm = useCallback(e => {
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
    <form noValidate action="" role="search" className="Searchbox">
      <input type="search" value={searchTerm} placeholder="Zoek op adres, eigenschap, zaakonderwerp... " onChange={handleSetSearchTerm} autoFocus/>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
};
