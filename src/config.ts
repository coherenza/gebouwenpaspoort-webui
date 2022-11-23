
/** Where meilisearch is hosted */
export const server = import.meta.env["MEILI_SERVER"] || 'http://127.0.0.1:7700';
/** Name of the Meilisearch Index */
export const indexName = 'gbp';
/** Meilisearch key that needs to provide permission to query, or import (if you use browser import button) */
export const meiliKey = import.meta.env["MEILI_API_KEY"];
