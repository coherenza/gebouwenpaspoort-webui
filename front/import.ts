import { filterProps, sortProps, synonyns, Gebouw } from '../common/schema';
import { Index, MeiliSearch } from 'meilisearch'
import testData from '../testData.json'
import { indexName, server } from '../common/config';

function createSolrQuery(index: Index) {

  let pagesize = 100;
  let pages = 5;
  let start = 0;
  let documents = [];
  for (let i = 0; i < pages; i++) {
    let url = `http://localhost:8983/solr/#/gbp/query?q=*:*&q.op=OR&indent=true&rows=${pagesize}&start=${start}&sort=id%20asc`;
    console.log('fetching', url);
    start += pagesize;
    let resp = fetch(url);
    let docs = parseResponse(resp);
    index.addDocuments(docs);
  }

}

function parseResponse(response: any): Gebouw[] {
  let gebouwen = [];
  (r) => r.json().then((r) => {
    r['response']['docs'].forEach((doc: any) => {
      console.log('doc', doc);
      gebouwen.push(doc as Gebouw)
  })})
  return gebouwen
}

export async function importData() {
  const client = new MeiliSearch({ host: server })
  await client.deleteIndex(indexName)
  const index = client.index(indexName);
  createSolrQuery(index);
  index.updateFilterableAttributes(filterProps.map((prop) => prop.propKey))
  index.updateSortableAttributes(["bag-num-volledig"])
  index.updateSynonyms(synonyns)
}

export async function importDataDemo() {
  const client = new MeiliSearch({ host: server })
  await client.deleteIndex(indexName)
  const index = client.index(indexName);
  index.addDocuments(testData)
  index.updateFilterableAttributes(filterProps.map((prop) => prop.propKey))
  index.updateSortableAttributes(["bag-num-volledig"])
  index.updateSynonyms(synonyns)
}
