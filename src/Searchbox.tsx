import { useEffect, useState } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";
import "./Searchbox.css";
import useDebounce from "./useDebounce";

export const SearchBox = () => {
  const { query, refine, clear, isSearchStalled } = useSearchBox();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 100);

  useEffect(() => {
    if (debouncedSearchTerm) {
      refine(searchTerm);
    } else {
      refine("");
    }
  }, [debouncedSearchTerm]);

  return (
    <form noValidate action="" role="search">
      <input type="search" onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={() => refine("")}>Reset query</button>
      {isSearchStalled ? "My search is stalled" : ""}
    </form>
  );
};
