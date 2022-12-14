import { indexName } from "./config";

/** A single type of Attribute */
export interface Attribute {
  /** Human readable string, shown in the front-end */
  name: string;
  /** JSON key */
  id?: string;
  /** Type of the attribute */
  type?: "string";
  attributes?: Attribute[];
  filterType?: "select" | "range";
}

/** All attributes should be here */
export const Attributes = {
  "aob_id" : {name: "BAG id", id: "bag-aob-id"},
  "bouwjaar": {
    name: "bouwjaar",
    id: "bag-pnd-oorspronkelijk-bouwjaar",
    // filterType: "range",
  },
  "pand_id": {
    name: "BAG id",
    id: "bag-pnd-id",
  },
  "pand_status": {
    name: "pand status",
    id: "bag-pnd-status",
  },
  "gebruiksdoel": {
    name: "gebruiksdoel",
    id: "bag-aob-gebruiksdoel",
  },
  "oppervlakte": {
    name: "Oppervlakte (m2)",
    id: "bag-aob-oppervlakte",
    // filterType: "range",
  },
  "bag_status": {
    name: "bag status",
    id: "bag-aob-status",
  },
  "object_type": {
    name: "object-type",
    id: "bag-object-type",
  },
  "pand_energieklasse": {
    name: "Energie klasse",
    id: "epl.pand_energieklasse",
  },
};


/** The current schema, used for rendering the Details page.
 *  The ordering of the Collections defines how they are shown in the front-end.
 */
export const displayAttributes: Attribute[] = [
  {
    name: "Hoofdadres",
    id: "bag-num-volledig",
  },
  { name: "BAG", 
    attributes: [Attributes.aob_id]
  },
  {
    name: "Pand",
    attributes: [
      Attributes.pand_id,
      Attributes.bouwjaar,
    ],
  },
  {
    name: "Verblijfsobject",
    attributes: [
      Attributes.gebruiksdoel,
      Attributes.oppervlakte,
      Attributes.pand_status,
    ],
  },
  {
    name: "Squit",
    id: "squitxo",
    attributes: [
      {
        name: "categorie",
        id: "categorie",
      },
      {
        name: "fase",
        id: "fase",
      },
      {
        name: "omschrijving",
        id: "omschrijving",
      },
      {
        name: "status",
        id: "status",
      },
      {
        name: "zaak-status",
        id: "zaak-status",
      },
      {
        name: "zaaknummer",
        id: "zaaknummer",
      },
      {
        name: "zaaktype-naam",
        id: "zaaktype-naam",
      },
    ],
  },
  {
    name: "Energielabel",
    id: "epl",
    attributes: [
      {
        name: "Energie klasse",
        id: "pand_energieklasse",
      },
      {
        name: "Gebouwtype",
        id: "pand_gebouwtype",
      },
      {
        name: "Gebouwklasse",
        id: "pand_gebouwklasse",
      },
      {
        name: "Datum opname",
        id: "pand_opnamedatum",
      },
    ],
  },
  {
    name: "Stalen liggers",
    id: "stl",
    attributes: [
      {
        name: "inspectiedatum",
        id: "inspectiedatum",
      },
      {
        name: "Balkon",
        id: "balkon",
      },
      {
        name: "Hekwerk",
        id: "hekwerk",
      },
      {
        name: "stalenliggers",
        id: "stalenliggers",
      },
      {
        name: "uitkragende balkons",
        id: "uitkragendebalkons",
      },
    ],
  },

  {
    name: "Buurten en wijken",
    attributes: [
      {
        name: "naam wijk",
        id: "bwk-num-wijknaam",
        type: "string",
      },
      {
        name: "naam subwijk",
        id: "bwk-num-subwijknaam",
        type: "string",
      },
      {
        name: "naam subbuurt",
        id: "bwk-num-subbuurtnaam",
        type: "string",
      },
    ],
  },
];

export const filterAttributes: Attribute[] = [
  {
    name: "BAG / CBS Algemeen",
    attributes: [
      Attributes.pand_status,
      Attributes.gebruiksdoel,
    ],
  },
  {
    name: "Bouwtechnisch",
    attributes: [
      Attributes.bouwjaar,
      Attributes.oppervlakte,
    ]
  },
  {
    name: "Energie",
    attributes: [
      Attributes.pand_energieklasse,
    ]
  },
  {
    name: "Milieu",
  }
];

/**
 * The searchableAttributes determines the attribute ranking order (and also which attributes are searchable).
 * It is also possible to use object-type-sort-order to sort instead of using relevance ranking.
 **/
export const searchableAttributes = [
  "id",
  "naam",

  "bag-wpl-naam",
  "bwk-num-wijknaam",
  "bwk-num-subwijknaam",
  "bwk-num-buurtnaam",
  "bwk-num-subbuurtnaam",
  "bag-num-postcode",
  "bag-num-postcode-neven",
  "bag-opr-naam",
  "bag-opr-naam-neven",
  "bag-num-volledig",
  "bag-num-volledig-neven",

  "bag-aob-oppervlakte",
  "bag-pnd-oorspronkelijk-bouwjaar",
  "bag-aob-gebruiksdoel",
  "bwk-num-nadergebruiksdoel",

  "_geo",
  "bag-aob-geo-EPSG28992",
  "bwk-num-geo-EPSG28992",

  "pdok-locatie-id",
  "bag-pnd-id",
  "bag-aob-id",
  "bag-num-id",
  "bag-num-id-neven",
  "bag-opr-id",
  "bag-opr-id-neven",
  "bwk-num-subbuurtid",
  "bwk-num-buurtid",
  "bwk-num-subwijkid",
  "bwk-num-wijkid",
  "bag-wpl-id",
  "bag-wpl-id-neven",
];

export interface SortProp {
  sortBy: string /** {index}:{propKey}:{asc/desc} */;
  attribute: string;
  label: string;
}

/** Selectable sorts. First is default */
export const sortProps: SortProp[] = [
  { sortBy: `${indexName}:location-sort-value:asc`, attribute: 'location-sort-value',  label: "Initial sort order" },
  { sortBy: `${indexName}:object-type-sort-order:asc`, attribute: 'object-type-sort-order',  label: "Object type" },
  { sortBy: `${indexName}:naam:asc`, attribute: "naam", label: "Naam" },
  { sortBy: `${indexName}:bag-opr-naam:asc`, attribute: "bag-opr-naam", label: "Straat" },
  { sortBy: `${indexName}:bag-num-huisnummer:asc`, attribute: "bag-num-huisnummer", label: "Huisnummer" },
  { sortBy: `${indexName}:bag-num-huisletter:asc`, attribute: "bag-num-huisletter", label: "Huisletter" },
  { sortBy: `${indexName}:bag-num-huisnummertoevoeging:asc`, attribute: "bag-num-huisnummertoevoeging", label: "Huisnummertoevoeging" },
  //{ sortBy: `${indexName}`, attribute: "", label: "Relevantie" },
];

export interface FilterProp {
  label: string;
  propKey: string;
  type: "single" | "multi" | "geo" | "date" | "range";
  display?: "none"
}

export interface GBPObjectTypeProperties {
  readonly [index: string] : {
    color: string;
    isAob: boolean;
  }
}

// https://huisstijl.utrecht.nl/basiselementen/kleur/
export const utrechtKleuren = {
  "rood": "#cc0000",
  "geel": "#ffcc00",
  "paars": "#762cd1",
  "magenta": "#f02198",
  "oranje": "#ff6e00",
  "lime": "#99d000",
  "groen": "#32ab27",
  "cyaan": "#009ed4",
  "blauw": "#006dff",
  "marineblauw": "#1c4181",
  "bruin": "#ad643b",
}

export const GBPObjectTypes: GBPObjectTypeProperties = {
  "woonplaats" : { color: utrechtKleuren.blauw, isAob: false },
  "wijk" : { color: utrechtKleuren.bruin, isAob: false },
  "buurt" : { color: utrechtKleuren.oranje, isAob: false },
  "openbareruimte" : { color: utrechtKleuren.rood, isAob: false },
  "postcode" : { color: utrechtKleuren.magenta, isAob: false },
  "adres" : { color: utrechtKleuren.oranje, isAob: false },
  "verblijfsobject" : { color: utrechtKleuren.geel, isAob: true },
  "standplaats" : { color: utrechtKleuren.cyaan, isAob: true },
  "ligplaats" : { color: utrechtKleuren.blauw, isAob: true },
};

export interface GBPObject {
  id: string;
  naam: string;
  "gbp-collection": string;
  "bag-aob-id": string;
  "bag-object-type": string;
  "object-type-sort-order": number;
  "location-sort-value": string;
  "pdok-locatie-id": string[];
  "bag-aob-gebruiksdoel": string[];
  "bag-aob-oppervlakte": number;
  "bag-aob-status": string;
  "bag-aob-documentdatum": Date;
  "bag-aob-documentnummer": string;
  "bag-aob-voorkomen": number;
  "bag-num-id": string;
  "bag-num-volledig": string;
  "bag-num-postcode": string;
  "bag-num-huisnummer": string;
  "bag-num-huisletter": string;
  "bag-num-huisnummertoevoeging": string;
  "bag-num-huisnummer-letter-aanduiding": string;
  "bag-num-status": string;
  "bag-num-documentdatum": Date;
  "bag-num-documentnummer": string;
  "bag-num-voorkomen": number;
  "bag-opr-id": string;
  "bag-opr-naam": string;
  "bag-opr-type": string;
  "bag-opr-status": string;
  "bag-opr-documentdatum": Date;
  "bag-opr-documentnummer": string;
  "bag-opr-voorkomen": number;
  "bag-wpl-id": string;
  "bag-wpl-naam": string;
  "bag-wpl-status": string;
  "bag-wpl-documentdatum": Date;
  "bag-wpl-documentnummer": string;
  "bag-wpl-voorkomen": number;
  "bag-pnd-id": string[];
  "bag-num-id-neven": string[];
  "bag-opr-id-neven": string[];
  "bag-wpl-id-neven": string[];
  "bag-num-volledig-neven": string[];
  "bag-num-postcode-neven": string[];
  "bag-opr-naam-neven": string[];
  "bag-pnd-oorspronkelijk-bouwjaar": number[];
  "bag-pnd-status": string[];
  "bwk-num-nadergebruiksdoel": string[];
  "bwk-num-status": string[];
  "bwk-num-adrestype": string[];
  _geo: { lat: number; lng: number };
  "bag-aob-geo-EPSG28992": { x: number; y: number; z: number };
  "bwk-num-geo-EPSG28992": { x: number; y: number };
  geo_bbox: { lat: number; lng: number }[];
  geo_polygon: number[];
  "bwk-num-wijkid": string;
  "bwk-num-wijkcode": string;
  "bwk-num-wijknaam": string;
  "bwk-num-subwijkid": string;
  "bwk-num-subwijkcode": string;
  "bwk-num-subwijknaam": string;
  "bwk-num-buurtid": string;
  "bwk-num-buurtcode": string;
  "bwk-num-buurtnaam": string;
  "bwk-num-subbuurtid": string;
  "bwk-num-subbuurtcode": string;
  "bwk-num-subbuurtnaam": string;
  stl: undefined | Record<string, any>[];
  squitxo: undefined | Record<string, any>[];
  bekendmakingen: undefined | Record<string, any>[];
}

export interface LocationFilter {
  id : string;
  name : string;
}
