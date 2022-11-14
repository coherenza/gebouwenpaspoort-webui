import { filterProps, Gebouw } from './schema';
import { MeiliSearch } from 'meilisearch'
import testData from '../testData.json'
import { indexName, server } from './config';

function mapLocation(location: any): Gebouw {
  // e.g. "52.106468,5.090403"
  let str = location["bwk-num-lat-lon"];
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
  await client.deleteIndex(indexName)
  const index = client.index(indexName);
  index.addDocuments(testData.map(mapLocation))
    .then((res) => console.log('add document', res))
  index.updateFilterableAttributes(filterableProps)
    .then((res) => console.log('apply filterables', res))
  index.updateSortableAttributes(["bag-num-volledig"])
    .then((res) => console.log('apply sortables', res))
}
