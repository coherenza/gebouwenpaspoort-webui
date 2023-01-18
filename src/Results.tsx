import {
  Hits,
  InfiniteHits,
  Pagination,
  SortBy,
  useRefinementList,
  useHits,
  HitsPerPage,
} from "react-instantsearch-hooks-web";
import { HitLine } from "./HitLine";
import "./Results.css";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContext } from "./App";
import { CurrentRefinements } from "./CurrentRefinements";
import {
  CheckIcon,
  CopyIcon,
  Cross1Icon,
  DownloadIcon,
} from "@radix-ui/react-icons";
import { Parser } from "@json2csv/plainjs";

export const LocationFilterContext = createContext(undefined);

const CSV_DELIMITER = ";";

function jsonToCSV2(items) {
  try {
    const parser = new Parser();
    const csv = parser.parse(items);
    return csv;
  } catch (err) {
    console.error(err);
  }
}

// function jsonToCsv(items) {
//   let header = Object.keys(items[0]);

//   // remove items from header
//   const removeItems = ["_highlightResult", "_snippetResult"];
//   header = header.filter((item) => !removeItems.includes(item));
//   const headerString = header.join(CSV_DELIMITER);

//   const rowItems = items.map((row) =>
//     header
//       .map((fieldName) => JSON.stringify(row[fieldName], header))
//       .join(CSV_DELIMITER)
//   );

//   // join header and body, and break into separate lines
//   const csv = [headerString, ...rowItems].join("\r\n");

//   return csv;
// }

function downloadStringAsCSV(string) {
  const blob = new Blob([string], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "resultaten.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function Results() {
  const { showResults, setShowResults } = useContext(AppContext);
  const [isCopied, setIsCopied] = useState(false);

  let {
    results: { nbHits },
    hits,
  } = useHits({
    escapeHTML: false,
  });

  const download = useCallback(() => {
    const csv = jsonToCSV2(hits);
    downloadStringAsCSV(csv);
  }, [hits]);

  useEffect(() => {
    setIsCopied(false);
  }, [nbHits]);

  if (!showResults) {
    return null;
  }

  function handleLinkShare() {
    const url = new URL(window.location.href);
    navigator.clipboard.writeText(url.toString());
    setIsCopied(true);
  }

  return (
    <div className={`Sidebar Results ${open ? "Results--open" : ""}`}>
      <div className="Titlebar Titlebar--padded">
        <h3>Resultaten</h3>
        <HitsPerPage
          items={[
            { label: "50 per pagina", value: 50 },
            { label: "200 per pagina", value: 200, default: true },
            { label: "1.000 hits per page", value: 1000 },
          ]}
        />
        <button title={"Download resultaten"} onClick={download}>
          <DownloadIcon />
        </button>
        <button title={"Kopieer link"} onClick={handleLinkShare}>
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </button>
        <button
          title="Resultaten sluiten"
          onClick={() => setShowResults(false)}
        >
          <Cross1Icon />
        </button>
      </div>
      <div className="app-header__results-count">
        {hits.length} / {nbHits == 1000 ? "1000+" : nbHits} resultaten zichtbaar
      </div>
      <CurrentRefinements />
      {/* <Hits hitComponent={HitLine} escapeHTML={false} /> */}
      <InfiniteHits
        // @ts-ignore
        hitComponent={HitLine}
        escapeHTML={false}
        showPrevious={false}
      />
      {/* <Pagination showLast={true} /> */}
    </div>
  );
}
