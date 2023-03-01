import "./Header.css";
import React, { useState } from "react";
import { SearchBox } from "./Searchbox";
import { InfoPage } from "./InfoPage";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useTour } from "@reactour/tour";
import { useCallback } from "react";
import { useContext } from "react";
import { AppContext } from "./App";

export function Header() {
  const [showInfoPage, setShowInfoPage] = useState(false);
  const { setIsOpen, setCurrentStep } = useTour();
  const { setShowFilter, setShowResults } = useContext(AppContext);

  const startTour = useCallback(() => {
    setCurrentStep(0);
    setIsOpen(true);
    setShowResults(true);
    setShowFilter(true);
  }, []);

  if (showInfoPage) {
    return (
      <div className="infopage">
        <div className="infopage__buttons">
          <button onClick={startTour}>Start Tour</button>
          <button title="Sluiten" onClick={() => setShowInfoPage(false)}>
            <Cross1Icon />
          </button>
        </div>
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
            title="Geef feedback over deze app."
          >
            Feedback
          </a>
          <button
            className="button"
            title="Toon informatie over deze app."
            onClick={() => setShowInfoPage(!showInfoPage)}
          >
            Info
          </button>
        </div>
      </div>
      <div className="search-bar-wrapper">
        <SearchBox />
      </div>
    </div>
  );
}
