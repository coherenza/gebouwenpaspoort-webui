import "./Header.css";
import React, { useContext } from "react";
import { AppContext } from "./App";
import { SearchBox } from "./Searchbox";

export function Header() {
  const { locationFilter, setLocationFilter } = useContext(AppContext);
  const clearLocationFilter = () => setLocationFilter(undefined);

  return (
    <div className="app-header">
      <div className="header">
        <h2 className="logo">Gebouwenpaspoort</h2>
        <div className="header--buttons">
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
      {locationFilter && (
        <div>
          Zoek binnen <span className="filterValue">{locationFilter.name}</span>
          <button className="clear" onClick={clearLocationFilter}>
            x
          </button>
        </div>
      )}
    </div>
  );
}
