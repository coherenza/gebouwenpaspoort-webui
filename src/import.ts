import { MeiliSearch } from "meilisearch";
import { indexName, meiliKey, server } from "./config";
import {
  Attributes,
  filterAttributes,
  searchableAttributes,
  sortProps,
} from "./schema";

function equalArrays(xs: any[], ys: any[]) {
  return (
    xs.length == ys.length &&
    xs.every((val: any, index: number) => val === ys[index])
  );
}

export const filterableAttributes = filterAttributes
  .map((prop) => prop?.attributes?.map((attr) => attr.id))
  .flat();
filterableAttributes.push("_geo",); // is not added automatically

const sortableAttributes = sortProps.map((prop) => prop.attribute);

// https://docs.meilisearch.com/learn/advanced/sorting.html#customize-ranking-rule-order-optional
const rankingRules = [
  // Sort in first place to make sure Gebieden are always on top
  "sort",
  "words",
  "typo",
  "proximity",
  "attribute",
  "exactness",
];

export async function setIndexes() {
  const client = new MeiliSearch({ host: server, apiKey: meiliKey });
  const index = client.index(indexName);
  const currentSearchableAttributes = await index.getSearchableAttributes();
  if (equalArrays(currentSearchableAttributes, searchableAttributes)) {
    console.info("No update needed for searchableAttributes");
  } else {
    console.info("Updating searchableAttributes");
    index.updateSearchableAttributes(searchableAttributes);
  }
  const currentFilterableAttributes = await index.getFilterableAttributes();
  if (equalArrays(currentFilterableAttributes, filterableAttributes)) {
    console.info("No update needed for filterableAttributes");
  } else {
    console.info("Updating filterableAttributes");
    index.updateFilterableAttributes(filterableAttributes);
  }
  const currentSortableAttributes = await index.getSortableAttributes();
  if (equalArrays(currentSortableAttributes, sortableAttributes)) {
    console.info("No update needed for sortableAttributes");
  } else {
    console.info("Updating sortableAttributes");
    index.updateSortableAttributes(sortableAttributes);
  }
  const currentRankingRules = await index.getRankingRules();
  if (equalArrays(currentRankingRules, rankingRules)) {
    console.info("No update needed for rankingRules");
  } else {
    console.info("Updating rankingRules");
    index.updateRankingRules(rankingRules);
  }

  const reportSetIndexesProgress = function () {
    const progressElement = document.getElementById("set-indexes-progress");
    fetch(`${server}/tasks/`, {
      headers: {
        Authorization: `Bearer ${meiliKey}`,
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          const lines = json.results
            .filter(
              (r) => r.type == "settingsUpdate" && r.status != "succeeded"
            )
            .map((r) => `<div>${Object.keys(r.details)}: ${r.status}</div>`);
          console.log(`report set-index progress, ${lines.length} processes`);
          progressElement.innerHTML = lines.join("");
          if (lines.length > 0) setTimeout(reportSetIndexesProgress, 2000);
        });
      }
    });
  };
  reportSetIndexesProgress();
}
