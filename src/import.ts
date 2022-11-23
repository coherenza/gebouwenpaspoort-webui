import { Index, MeiliSearch } from 'meilisearch'
import testData from '../testData.json'
import { indexName, server } from './config';
import { filterProps, GBPObject } from './schema';

function mapLocation(location: any): GBPObject {
  // e.g. "52.106468,5.090403"
  let str = location["bwk-num-lat-lon"];
  if (!str) {
    return location;
  }
  let arr = str.split(",");
  let lat = parseFloat(arr[0]);
  let lng = parseFloat(arr[1]);

  return {
    ...location,
    _geo: {
      lat,
      lng,
    },
  };
}

const filterableProps = filterProps.map((prop) => prop.propKey);
filterableProps.push("_geo");

export async function importData() {
  const client = new MeiliSearch({ host: server })
  // await client.deleteIndex(indexName)
  const index = client.index(indexName);
  // createSolrQuery(index);
  index.updateFilterableAttributes(filterableProps);
  index.updateSynonyms({
    "afval": ["vuilnis", "container"],
    "vuilnis": ["afval", "container"],
  })
  index.updateSortableAttributes(["bag-num-volledig", "bag-num-huisnummer"]);
}

// export async function importDataDemo() {
//   const client = new MeiliSearch({ host: server })
//   await client.deleteIndex(indexName)
//   const index = client.index(indexName);
//   index.addDocuments(testData)
//   index.updateFilterableAttributes(filterProps.map((prop) => prop.propKey))
//   index.updateSortableAttributes(["bag-num-volledig"])
//   index.updateSynonyms(synonyns)
// }
