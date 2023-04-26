/** Where meilisearch is hosted */
export const server =
  import.meta.env["VITE_MEILI_SERVER"] || "https://green.pandata.nl";
/** Name of the Meilisearch Index */
export const indexName = "gbp";
/** Meilisearch key that needs to provide permission to query, or import (if you use browser import button) */
export const meiliKey = import.meta.env["VITE_MEILI_API_KEY"];
/** 'production' or 'development' */
export const mode = import.meta.env.MODE;
export const mapboxToken =
  "pk.eyJ1Ijoiam9lcGlvIiwiYSI6ImNqbTIzanZ1bjBkanQza211anFxbWNiM3IifQ.2iBrlCLHaXU79_tY9SVpXA";
