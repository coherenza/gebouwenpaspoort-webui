import { MeiliSearch } from 'meilisearch'
import data from './data.json'

const client = new MeiliSearch({ host: 'http://localhost:7700' })
client.index('movies').addDocuments(data)
  .then((res) => console.log(res))
