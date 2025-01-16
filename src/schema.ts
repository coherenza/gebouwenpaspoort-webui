import { indexName } from "./config";
export type { Attribute, GBPObject } from "./schemadefinitions";
export {
  Attributes,
  displayAttributes,
  filterAttributes,
  searchableAttributes,
} from "./schemadefinitions";

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
];

export function getObjectType(object: any): GBPObjectType {
  if (!object) {
    return GBPObjectTypes.unknown;
  }
  let typestring = object["object-type"] ||
    object["bag-aob"]?.["bag-object-type"] ||
    object["bag-opr"]?.["bag-object-type"] ||
    "unknown";
  return GBPObjectTypes[typestring];
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
  subwijk: {
    color: utrechtKleuren.geel,
    isAob: false,
    id: "subwijk",
    icon: "houses",
    label: "Subwijk",
  },
  buurt: {
    color: utrechtKleuren.paars,
    isAob: false,
    id: "buurt",
    icon: "houses",
    label: "Buurt",
  },
  subbuurt: {
    color: utrechtKleuren.paars,
    isAob: false,
    id: "subbuurt",
    icon: "houses",
    label: "Subbuurt",
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
    color: utrechtKleuren.groen,
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

export interface ExportList {
  attributeIds: string[];
  name: string;
}

export const exportLists: ExportList[] = [
  {
    attributeIds: [
      "bag-aob.bag-object-type",
      "hoofdadres.bag-num-postcode",
      "hoofdadres.bag-num-huisnummer",
      "hoofdadres.bag-num-huisletter",
    ],
    name: "standaard",
  },
];
