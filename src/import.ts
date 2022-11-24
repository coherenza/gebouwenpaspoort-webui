import { MeiliSearch } from 'meilisearch'
import { indexName, meiliKey, server } from './config';
import { searchableAttributes, filterProps, GBPObject } from './schema';

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

export async function setIndexes() {
  const client = new MeiliSearch({ host: server, apiKey: meiliKey })
  const index = client.index(indexName);
  index.updateSearchableAttributes(searchableAttributes);
  index.updateFilterableAttributes(filterableProps);
  index.updateSortableAttributes(["bag-num-volledig", "bag-num-huisnummer"]);
}
