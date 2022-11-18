import "./Header.css";
import React from "react";
import { AppContext } from "./App";
import { SearchBox } from "./Searchbox";

export function Header() {
  const { setShowFilter, setShowResults, showFilter, showResults } =
    React.useContext(AppContext);
  const {current, setCurrent} = React.useContext(AppContext);

  function handleAddresses() {
    setShowResults(!showResults);
    setCurrent(undefined);
  }

  return (
    <div className="app-header">
      <div className="header">
        <h2 className="logo">Gebouwenpaspoort</h2>
        <div className="header--buttons">
          <button onClick={() => setShowFilter(!showFilter)}>Filters</button>
          <button onClick={handleAddresses}>Adressen</button>
        </div>
      </div>
      <div className="search-bar-wrapper">
        <SearchBox />
      </div>
    </div>
  );
}
