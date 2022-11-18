import { useCallback, useContext, useEffect } from "react";
import { AppContext } from "./App";

export function KeyboardHandler() {
  const {
    current,
    setCurrent,
    showFilter,
    setShowFilter,
    showResults,
    setShowResults,
  } = useContext(AppContext);

  const handleUserKeyPress = useCallback(
    (event) => {
      const { key, keyCode } = event;

      if (event.target.tagName === 'INPUT') { return; }

      // Escape
      if (keyCode === 27) {
        console.log("Escape", showResults, !!current);
        if (current) {
          setCurrent(undefined);
        } else {
          setShowFilter(false);
          setShowResults(false);
        }
      }
      // Toggle filter on `f`
      if (keyCode === 70) {
        setShowFilter(!showFilter);
      }
      // Toggle results on `a`
      if (keyCode === 65) {
        setShowResults(!showResults);
      }

      // If `/` is pressed, focus the search box
      if (keyCode === 191) {
        event.preventDefault();
        document.getElementById("search-box")?.focus();
      }
    },
    [current, showFilter, showResults]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return <>key</>;
}
