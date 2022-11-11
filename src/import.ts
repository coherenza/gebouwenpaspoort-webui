import { filterProps, sortProps } from './schema';
import { MeiliSearch } from 'meilisearch'
import testData from '../testData.json'
import { indexName, server } from './config';

export async function importData() {
  const client = new MeiliSearch({ host: server })
  await client.deleteIndex(indexName)
  const index = client.index(indexName);
  index.addDocuments(testData)
    .then((res) => console.log('add document', res))
  index.updateFilterableAttributes(filterProps.map((prop) => prop.propKey))
    .then((res) => console.log('apply filterables', res))
  index.updateSortableAttributes(["bag-num-volledig"])
    .then((res) => console.log('apply sortables', res))
}
