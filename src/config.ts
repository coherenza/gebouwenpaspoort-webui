/** Where meilisearch is hosted
 * The Vite Meili server is used locally on development machines.
 * The front-end server uses blue or green. This is the place where you must choose which one to use.
 */
export const server = import.meta.env["VITE_MEILI_SERVER"] || "https://green.pandata.nl";
/** Name of the Meilisearch Index */
export const indexName = "gbp";
/** Meilisearch key that needs to provide permission to query, or import (if you use browser import button) */
export const meiliKey = import.meta.env["VITE_MEILI_API_KEY"];
/** 'production' or 'development' */
/* Key Joep
export const mapboxToken = "pk.eyJ1Ijoiam9lcGlvIiwiYSI6ImNqbTIzanZ1bjBkanQza211anFxbWNiM3IifQ.2iBrlCLHaXU79_tY9SVpXA";
*/
export const mapboxToken = "pk.eyJ1IjoiY29oZXJlbnphIiwiYSI6ImNsanI4MXI0cTBmaWMzc3FuNTQwZTMwamUifQ.tolQPMM1XDvhX0DW7k3neg";
