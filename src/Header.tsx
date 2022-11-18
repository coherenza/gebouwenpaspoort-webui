import "./Header.css";
import React from "react";
import { AppContext } from "./App";
import { SearchBox } from "./Searchbox";

export function Header() {
  const { setShowFilter, setShowResults, showFilter, showResults } =
    React.useContext(AppContext);

  return (
    <div className="app-header">
      <div className="Titlebar header">
        <h2 className="logo">Gebouwenpaspoort</h2>
        <div className="header--buttons">
          <button onClick={() => setShowFilter(!showFilter)}>Filters</button>
          <button onClick={() => setShowResults(!showResults)}>Adressen</button>
        </div>
      </div>
      <div className="search-bar-wrapper">
        <SearchBox />
      </div>
    </div>
  );
}
