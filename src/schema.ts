import { indexName } from "./config";

export interface FilterProp {
  label: string;
  propKey: string;
  type: "single" | "multi" | "geo" | "date" | "range";
}

export interface SortProp {
  /** {index}:{propKey}:{asc/desc} */
  sortBy: string,
  label: string,
}

export const sortProps: SortProp[] = [
  { sortBy: `${indexName}`, label: "Relevantie" },
  { sortBy: `${indexName}:bag-num-huisnummer:asc`, label: "Huisnummer" },
  { sortBy: `${indexName}:bag-num-volledig:asc`, label: "Adres" },
];

export const filterProps: FilterProp[] = [
  { propKey: "bag-aob-gebruiksdoel", label: "Gebruiksdoel", type: "multi" },
  { propKey: "bag-aob-oppervlakte", label: "Oppervlakte (m2)", type: "range" },
  { propKey: "bag-pnd-oorspronkelijk-bouwjaar", label: "Bouwjaar", type: "range" },
  {
    propKey: "epl.pand_energieklasse",
    label: "Energieklasse",
    type: "single",
  },
  {
    propKey: "bag-pnd-status",
    label: "Status",
    type: "multi",
  },
];

export interface GBPObject {
    "id" : string;
    "gbp-collection" : string;
    "bag-aob-id" : string;
    "bag-object-type" : string;
    "pdok-locatie-id" : string[];
    "bag-aob-gebruiksdoel" : string[];
    "bag-aob-oppervlakte" : number;
    "bag-aob-status" : string;
    "bag-aob-documentdatum" : Date;
    "bag-aob-documentnummer" : string;
    "bag-aob-voorkomen" : number;
    "bag-aob-geo-EPSG28992" : { "x" : number; "y" : number; "z" : number };
    "bag-num-id" : string;
    "bag-num-volledig" : string;
    "bag-num-postcode" : string;
    "bag-num-huisnummer" : string;
    "bag-num-huisletter" : string;
    "bag-num-huisnummertoevoeging" : string;
    "bag-num-huisnummer-letter-aanduiding" : string;
    "bag-num-status" : string;
    "bag-num-documentdatum" : Date;
    "bag-num-documentnummer" : string;
    "bag-num-voorkomen" : number;
    "bag-opr-id" : string;
    "bag-opr-naam" : string;
    "bag-opr-type" : string;
    "bag-opr-status" : string;
    "bag-opr-documentdatum" : Date;
    "bag-opr-documentnummer" : string;
    "bag-opr-voorkomen" : number;
    "bag-wpl-id" : string;
    "bag-wpl-naam" : string;
    "bag-wpl-status" : string;
    "bag-wpl-documentdatum" : Date;
    "bag-wpl-documentnummer" : string;
    "bag-wpl-voorkomen" : number;
    "bag-pnd-id" : string[];
    "bag-num-id-neven" : string[];
    "bag-opr-id-neven" : string[];
    "bag-wpl-id-neven" : string[];
    "bag-num-volledig-neven" : string[];
    "bag-num-postcode-neven" : string[];
    "bag-opr-naam-neven" : string[];
    "bag-pnd-oorspronkelijk-bouwjaar" : number[];
    "bag-pnd-status" : string[];
    "bwk-num-nadergebruiksdoel" : string[];
    "bwk-num-status" : string[];
    "bwk-num-adrestype" : string[];
    "_geo" : { "lat" : number; "lng" : number };
    "bwk-num-geo-EPSG28992" : { "x" : number; "y" : number };
    "bwk-num-wijkid" : string;
    "bwk-num-wijkcode" : string;
    "bwk-num-wijknaam" : string;
    "bwk-num-subwijkid" : string;
    "bwk-num-subwijkcode" : string;
    "bwk-num-subwijknaam" : string;
    "bwk-num-buurtid" : string;
    "bwk-num-buurtcode" : string;
    "bwk-num-buurtnaam" : string;
    "bwk-num-subbuurtid" : string;
    "bwk-num-subbuurtcode" : string;
    "bwk-num-subbuurtnaam" : string;
}
