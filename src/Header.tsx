import "./Header.css";
import React from "react";
import { AppContext } from "./App";
import { SearchBox } from "./Searchbox";
import { useHits } from "react-instantsearch-hooks-web";

export function Header() {

  let {
    results: { nbHits },
    hits,
  } = useHits()

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
        <SearchBox/>
      </div>
      <div className="app-header__results-count">{hits.length} / {nbHits} resultaten zichtbaar</div>
    </div>
  );
}
