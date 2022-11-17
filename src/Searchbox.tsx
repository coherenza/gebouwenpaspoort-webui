import { useCallback, useEffect, useState } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";
import "./Searchbox.css";
import useDebounce from "./useDebounce";

export const SearchBox = () => {
  const { query, refine, clear, isSearchStalled, } = useSearchBox();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 0);

  let handleReset = useCallback(e => {
    e.preventDefault();
    refine("");
    clear();
    setSearchTerm("");
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
      <input type="search" value={searchTerm} placeholder="Zoeken... " onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleReset}>Reset</button>
    </form>
  );
};
