import { indexName } from "./config";
export type { Attribute, GBPObject } from "./schemadefinitions";
export { Attributes, displayAttributes, filterAttributes, searchableAttributes } from "./schemadefinitions";


export interface SortProp {
  sortBy: string /** {index}:{propKey}:{asc/desc} */;
  attribute: string;
  label: string;
}

/** Selectable sorts. First is default */
export const sortProps: SortProp[] = [
  {
    sortBy: `${indexName}:location-sort-value:asc`,
    attribute: "location-sort-value",
    label: "Initial sort order",
  },
  // {
  //   sortBy: `${indexName}:object-type-sort-order:asc`,
  //   attribute: "object-type-sort-order",
  //   label: "Object type",
  // },
  // { sortBy: `${indexName}:naam:asc`, attribute: "naam", label: "Naam" },
  // {
  //   sortBy: `${indexName}:bag-opr-naam:asc`,
  //   attribute: "bag-opr-naam",
  //   label: "Straat",
  // },
  // {
  //   sortBy: `${indexName}:bag-num-huisnummer:asc`,
  //   attribute: "bag-num-huisnummer",
  //   label: "Huisnummer",
  // },
  // {
  //   sortBy: `${indexName}:bag-num-huisletter:asc`,
  //   attribute: "bag-num-huisletter",
  //   label: "Huisletter",
  // },
  // {
  //   sortBy: `${indexName}:bag-num-huisnummertoevoeging:asc`,
  //   attribute: "bag-num-huisnummertoevoeging",
  //   label: "Huisnummertoevoeging",
  // },
  // { sortBy: `${indexName}`, attribute: "", label: "Relevantie" },
];

export function getObjectType(object: any): GBPObjectType {
  // get 'bag-object-type' or set to 'unknown'

  if (!object) {
    return GBPObjectTypes.unknown;
  }
  let typestring = object["bag-object-type"] || "unknown";
  let found = GBPObjectTypes[typestring];

  return found;
}

export interface GBPObjectType {
  color: string;
  isAob: boolean;
  id: string;
  icon?: string;
  label: string;
}

// https://huisstijl.utrecht.nl/basiselementen/kleur/
export const utrechtKleuren = {
  rood: "#cc0000",
  geel: "#ffcc00",
  paars: "#762cd1",
  magenta: "#f02198",
  oranje: "#ff6e00",
  lime: "#99d000",
  groen: "#32ab27",
  cyaan: "#009ed4",
  blauw: "#006dff",
  marineblauw: "#1c4181",
  bruin: "#ad643b",
};

export /** These represent the various types or classes that the index contains. */
const GBPObjectTypes: {
  readonly [index: string]: GBPObjectType;
} = {
  woonplaats: {
    color: utrechtKleuren.blauw,
    isAob: false,
    id: "woonplaats",
    icon: "houses",
    label: "Woonplaats",
  },
  wijk: {
    color: utrechtKleuren.geel,
    isAob: false,
    id: "wijk",
    icon: "houses",
    label: "Wijk",
  },
  buurt: {
    color: utrechtKleuren.paars,
    isAob: false,
    id: "buurt",
    icon: "houses",
    label: "Buurt",
  },
  openbareruimte: {
    color: utrechtKleuren.oranje,
    isAob: false,
    id: "openbareruimte",
    label: "Openbare ruimte",
  },
  postcode: {
    color: utrechtKleuren.magenta,
    isAob: false,
    id: "postcode",
    label: "Postcode",
  },
  adres: {
    color: utrechtKleuren.lime,
    isAob: false,
    id: "adres",
    icon: "my-marker",
    label: "Adres",
  },
  verblijfsobject: {
    color: utrechtKleuren.rood,
    isAob: true,
    id: "verblijfsobject",
    label: "Verblijfsobject",
  },
  standplaats: {
    color: utrechtKleuren.cyaan,
    isAob: true,
    id: "standplaats",
    label: "Standplaats",
  },
  ligplaats: {
    color: utrechtKleuren.blauw,
    isAob: true,
    id: "ligplaats",
    label: "Ligplaats",
  },
  unknown: {
    color: utrechtKleuren.rood,
    isAob: false,
    id: "unknown",
    label: "Onbekend",
  },
};

export interface LocationFilter {
  id: string;
  name: string;
}
