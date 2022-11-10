import { filterProps } from './schema';
import { MeiliSearch } from 'meilisearch'
import testData from '../testData.json'

export const server = 'http://127.0.0.1:7700';
export const indexName = 'testData';


export function importData() {
  const client = new MeiliSearch({ host: server })
  client.index(indexName).addDocuments(testData)
    .then((res) => console.log('add document', res))
  client.index(indexName).updateFilterableAttributes(filterProps)
}
