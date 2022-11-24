
/** Where meilisearch is hosted */
export const server = import.meta.env["VITE_MEILI_SERVER"] || "http://meili.pandata.nl:7700";
/** Name of the Meilisearch Index */
export const indexName = 'gbp';
/** Meilisearch key that needs to provide permission to query, or import (if you use browser import button) */
export const meiliKey = import.meta.env["VITE_MEILI_API_KEY"];
