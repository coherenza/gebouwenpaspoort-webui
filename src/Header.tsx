import "./Header.css";
import React, { useState } from "react";
import { SearchBox } from "./Searchbox";
import { InfoPage } from "./InfoPage";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useTour } from "@reactour/tour";

export function Header() {
  const [showInfoPage, setShowInfoPage] = useState(false);
  const { setIsOpen }  = useTour();

  if (showInfoPage) {
    return (
      <div className="infopage">
        <button title="Sluiten" className="infopage__close" onClick={() => setShowInfoPage(false)}>
          <Cross1Icon />
        </button>
        <InfoPage />
      </div>
    );
  }

  return (
    <div className="app-header">
      <div className="header">
        <h2 className="logo">Gebouwenpaspoort</h2>
        <div className="header--buttons">
          <a
            className="button"
            rel="noopener noreferrer"
            target="_blank"
            id="feedback-button"
            href="https://forms.gle/nxGbtVxoCiYgB83S6"
          >
            Feedback
          </a>
          <button
            className="button"
            onClick={() => setShowInfoPage(!showInfoPage)}
          >
            Info
          </button>
          <button
            onClick={() => setIsOpen(true)}
          >
            Help
          </button>
        </div>
      </div>
      <div className="search-bar-wrapper">
        <SearchBox />
      </div>
    </div>
  );
}
