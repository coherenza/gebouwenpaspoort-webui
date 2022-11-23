import "./Header.css";
import React from "react";
import { AppContext, hitCount } from "./App";
import { SearchBox } from "./Searchbox";
import { useHits } from "react-instantsearch-hooks-web";

export function Header() {
  const { setShowFilter, setShowResults, showFilter, showResults } =
    React.useContext(AppContext);
  const { current, setCurrent } = React.useContext(AppContext);

  function handleAddresses() {
    setShowResults(!showResults);
    setCurrent(undefined);
  }
  let {
    results: { nbHits },
    hits,
  } = useHits()

  return (
    <div className="app-header">
      <div className="header">
        <h2 className="logo">Gebouwenpaspoort</h2>
        <div className="header--buttons">
          <button onClick={() => setShowFilter(!showFilter)}>Filters</button>
          <button onClick={handleAddresses}>Adressen</button>
          <a
            className="button"
            rel="noopener noreferrer"
            target="_blank"
            href="https://forms.gle/nxGbtVxoCiYgB83S6"
          >
            Feedback
          </a>
        </div>
      </div>
      <div className="search-bar-wrapper">
        <SearchBox />
      </div>
      <div className="app-header__results-count">{hits.length} / {nbHits} resultaten zichtbaar</div>
    </div>
  );
}
