
/** Where meilisearch is hosted */
export const server = import.meta.env["VITE_MEILI_SERVER"] || "https://lobster-app-fn4s9.ondigitalocean.app/";
/** Name of the Meilisearch Index */
export const indexName = 'gbp';
/** Meilisearch key that needs to provide permission to query, or import (if you use browser import button) */
export const meiliKey = import.meta.env["VITE_MEILI_API_KEY"];
