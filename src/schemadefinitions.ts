/**
 * Attributes represent properties that, together, describe the schema of the data.
 * These are used to render both the list of Filter options and the Details page.
 * Attributes are recursive, so that they can be used to describe nested objects.
 */
export interface Attribute {
  /** JSON key */
  id: string;
  /** Human readable string, shown in the front-end */
  name: string;
  /** Type of the attribute */
  type?: "string" | "URL";
  /** Type of filter on the attribute */
  filterType?: "select" | "range" | "intervals";
  /** sub-attributes */
  attributes?: Attribute[];
}

export const Attributes : {[index: string]: Attribute} = {
  "zk_status": {
    "name": "Voortgangsstatus",
    "type": "string",
    "id": "zk-status"
  },
  "bag_opr_id": {
    "name": "",
    "id": "bag-opr-id"
  },
  "bwk_num_buurtnaam": {
    "name": "Buurt",
    "id": "bwk-num-buurtnaam"
  },
  "bag_pnd_geo": {
    "name": "Coördinaten",
    "id": "bag-pnd-geo"
  },
  "bwk_num_subbuurtid": {
    "name": "Subbuurt identificatie",
    "type": "string",
    "id": "bwk-num-subbuurtid"
  },
  "ob_documenttype": {
    "name": "Documenttype",
    "type": "string",
    "id": "ob-documenttype"
  },
  "bag_num_huisnummertoevoeging_neven": {
    "name": "Huisnummertoevoeging",
    "id": "bag-num-huisnummertoevoeging-neven"
  },
  "bag_pnd_status": {
    "name": "Status",
    "id": "bag-pnd-status"
  },
  "zk_nummer": {
    "name": "Zaaknummer",
    "type": "string",
    "id": "zk-nummer"
  },
  "bag_num_status": {
    "name": "BAG status",
    "id": "bag-num-status"
  },
  "bag_wpl_naam": {
    "name": "Woonplaats",
    "id": "bag-wpl-naam"
  },
  "bwk_num_wijkcode": {
    "name": "Wijkcode",
    "type": "string",
    "id": "bwk-num-wijkcode"
  },
  "bwk_vbo_toegangbouwlaag": {
    "name": "Soort toegang bouwlaag",
    "type": "string",
    "id": "bwk-vbo-toegangbouwlaag"
  },
  "bag_object_type": {
    "name": "Object type",
    "id": "bag-object-type"
  },
  "bag_opr_naam": {
    "name": "Openbare ruimte",
    "id": "bag-opr-naam"
  },
  "cbs_wk_brt": {
    "name": "CBS wijk\/buurt",
    "type": "string",
    "id": "cbs-wk-brt"
  },
  "bag_pnd_documentdatum": {
    "name": "Documentdatum",
    "type": "string",
    "id": "bag-pnd-documentdatum"
  },
  "zk_aanvraagdatum": {
    "name": "Aanvraagdatum",
    "type": "string",
    "id": "zk-aanvraagdatum"
  },
  "bag_num_documentdatum": {
    "name": "Documentdatum",
    "type": "string",
    "id": "bag-num-documentdatum"
  },
  "bag_num_huisnummer_neven": {
    "name": "Huisnummer",
    "id": "bag-num-huisnummer-neven"
  },
  "omschrijving": {
    "name": "Omschrijving",
    "type": "string",
    "id": "omschrijving"
  },
  "bwk_num_subbuurtnaam": {
    "name": "Subbuurt",
    "type": "string",
    "id": "bwk-num-subbuurtnaam"
  },
  "zk_einddatum_gepland": {
    "name": "Geplande einddatum",
    "type": "string",
    "id": "zk-einddatum-gepland"
  },
  "titel": {
    "name": "Titel",
    "type": "string",
    "id": "titel"
  },
  "bwk_datum": {
    "name": "Datum",
    "id": "bwk-datum"
  },
  "bag_num_postcode_neven": {
    "name": "Postcode",
    "id": "bag-num-postcode-neven"
  },
  "bag_num_volledig": {
    "name": "Hoofdadres",
    "id": "bag-num-volledig"
  },
  "bag_num_huisnummer_letter_aanduiding_neven": {
    "name": "Huisnummer-letter-aanduiding",
    "id": "bag-num-huisnummer-letter-aanduiding-neven"
  },
  "bag_num_voorkomen": {
    "name": "Voorkomen",
    "id": "bag-num-voorkomen"
  },
  "zk_soort": {
    "name": "Zaaksoort",
    "type": "string",
    "id": "zk-soort"
  },
  "bag_wpl_id_neven": {
    "name": "",
    "id": "bag-wpl-id-neven"
  },
  "zk_einddatum": {
    "name": "Einddatum",
    "type": "string",
    "id": "zk-einddatum"
  },
  "bag_opr_type_neven": {
    "name": "Type",
    "id": "bag-opr-type-neven"
  },
  "bag_opr_id_neven": {
    "name": "",
    "id": "bag-opr-id-neven"
  },
  "bwk_vbo_hoogstebouwlaag": {
    "name": "Hoogste bouwlaag",
    "type": "string",
    "id": "bwk-vbo-hoogstebouwlaag"
  },
  "href_utrechtsarchief": {
    "name": "Utrechts archief",
    "type": "URL",
    "id": "href-utrechtsarchief"
  },
  "bag_num_id": {
    "name": "Identificatie adresseerbaar object",
    "type": "string",
    "id": "bag-num-id"
  },
  "bag_pnd_id": {
    "name": "",
    "id": "bag-pnd-id"
  },
  "besluitdatum": {
    "name": "Besluitdatum",
    "type": "string",
    "id": "besluitdatum"
  },
  "bag_aob_oppervlakte": {
    "name": "Oppervlakte",
    "filterType": "range",
    "id": "bag-aob-oppervlakte"
  },
  "bag_wpl_naam_neven": {
    "name": "Woonplaats",
    "id": "bag-wpl-naam-neven"
  },
  "bag_pnd_oorspronkelijk_bouwjaar": {
    "name": "Bouwjaar",
    "filterType": "range",
    "id": "bag-pnd-oorspronkelijk-bouwjaar"
  },
  "bwk_num_subwijkid": {
    "name": "Subwijk identificatie",
    "type": "string",
    "id": "bwk-num-subwijkid"
  },
  "bag_num_huisletter": {
    "name": "Huisletter",
    "id": "bag-num-huisletter"
  },
  "bag_opr_naam_neven": {
    "name": "Openbare ruimte",
    "id": "bag-opr-naam-neven"
  },
  "bwk_vbo_laagstebouwlaag": {
    "name": "Laagste bouwlaag",
    "type": "string",
    "id": "bwk-vbo-laagstebouwlaag"
  },
  "date": {
    "name": "Datum",
    "type": "string",
    "id": "date"
  },
  "bwk_num_buurtcode": {
    "name": "Buurtcode",
    "id": "bwk-num-buurtcode"
  },
  "bag_pnd_geo_EPSG28992": {
    "name": "Coördinaten",
    "id": "bag-pnd-geo-EPSG28992"
  },
  "bag_opr_documentdatum": {
    "name": "Documentdatum",
    "type": "string",
    "id": "bag-opr-documentdatum"
  },
  "bag_num_volledig_neven": {
    "name": "Nevenadres",
    "id": "bag-num-volledig-neven"
  },
  "bwk_num_subwijknaam": {
    "name": "Subwijk",
    "type": "string",
    "id": "bwk-num-subwijknaam"
  },
  "bwk_num_wijkid": {
    "name": "Wijk identificatie",
    "type": "string",
    "id": "bwk-num-wijkid"
  },
  "bag_aob_documentnummer": {
    "name": "Documentnummer",
    "id": "bag-aob-documentnummer"
  },
  "bag_opr_voorkomen": {
    "name": "Voorkomen",
    "id": "bag-opr-voorkomen"
  },
  "bag_wpl_documentdatum": {
    "name": "Documentdatum",
    "type": "string",
    "id": "bag-wpl-documentdatum"
  },
  "bag_wpl_documentnummer": {
    "name": "Documentnummer",
    "id": "bag-wpl-documentnummer"
  },
  "bag_aob_documentdatum": {
    "name": "Documentdatum",
    "type": "string",
    "id": "bag-aob-documentdatum"
  },
  "object_type_sort_order": {
    "name": "Sortering van object",
    "id": "object-type-sort-order"
  },
  "_geo": {
    "name": "latitude-longitude geo coordinaten",
    "attributes": [
      {
        "name": "latitude",
        "type": "string",
        "id": "lat"
      },
      {
        "name": "longitude",
        "type": "string",
        "id": "lng"
      }
    ],
    "id": "_geo"
  },
  "ob_onderwerp": {
    "name": "Onderwerp",
    "type": "string",
    "id": "ob-onderwerp"
  },
  "bwk_num_subbuurtcode": {
    "name": "Subbuurtcode",
    "type": "string",
    "id": "bwk-num-subbuurtcode"
  },
  "bag_wpl_voorkomen": {
    "name": "Voorkomen",
    "id": "bag-wpl-voorkomen"
  },
  "url_vindplaats": {
    "name": "Vindplaats",
    "type": "URL",
    "id": "url-vindplaats"
  },
  "bag_aob_voorkomen": {
    "name": "Voorkomen",
    "id": "bag-aob-voorkomen"
  },
  "bag_aob_status": {
    "name": "BAG status",
    "id": "bag-aob-status"
  },
  "bag_num_id_neven": {
    "name": "",
    "id": "bag-num-id-neven"
  },
  "bag_opr_documentnummer": {
    "name": "Documentnummer",
    "id": "bag-opr-documentnummer"
  },
  "bwk_num_wijknaam": {
    "name": "Wijknaam",
    "type": "string",
    "id": "bwk-num-wijknaam"
  },
  "bwk_num_status": {
    "name": "Adresstatus",
    "type": "string",
    "id": "bwk-num-status"
  },
  "bag_wpl_status": {
    "name": "BAG status",
    "id": "bag-wpl-status"
  },
  "bwk_num_adrestype": {
    "name": "Adrestype",
    "id": "bwk-num-adrestype"
  },
  "href_luchtfoto": {
    "name": "Luchtfoto",
    "type": "URL",
    "id": "href-luchtfoto"
  },
  "bag_num_huisletter_neven": {
    "name": "Huisletter",
    "id": "bag-num-huisletter-neven"
  },
  "zk_besluit": {
    "name": "Besluit",
    "type": "string",
    "id": "zk-besluit"
  },
  "identificatie": {
    "name": "Identificatie",
    "type": "string",
    "id": "identificatie"
  },
  "bwk_vbo_lagen": {
    "name": "Aantal bouwlagen",
    "type": "string",
    "id": "bwk-vbo-lagen"
  },
  "publicatiedatum": {
    "name": "Publicatiedatum",
    "type": "string",
    "id": "publicatiedatum"
  },
  "bag_opr_status": {
    "name": "BAG status",
    "id": "bag-opr-status"
  },
  "bag_num_huisnummertoevoeging": {
    "name": "Huisnummertoevoeging",
    "id": "bag-num-huisnummertoevoeging"
  },
  "bag_pnd_oorspronkelijk_bouwjaar_interval": {
    "name": "bouwjaar",
    "filterType": "intervals",
    "id": "bag-pnd-oorspronkelijk-bouwjaar-interval"
  },
  "bwk_num_nadergebruiksdoel": {
    "name": "Nader gebruiksdoel",
    "type": "string",
    "id": "bwk-num-nadergebruiksdoel"
  },
  "bag_aob_oppervlakte_interval": {
    "name": "Oppervlakte",
    "filterType": "intervals",
    "id": "bag-aob-oppervlakte-interval"
  },
  "zk_startdatum_gepland": {
    "name": "Geplande startdatum",
    "type": "string",
    "id": "zk-startdatum-gepland"
  },
  "links": {
    "name": "Externe referenties",
    "attributes": [
      {
        "name": null,
        "type": "URL",
        "id": "href-luchtfoto"
      },
      {
        "name": null,
        "type": "URL",
        "id": "href-streetview"
      },
      {
        "name": null,
        "type": "URL",
        "id": "href-utrechtsarchief"
      },
      {
        "name": null,
        "type": "URL",
        "id": "href-topotijdreis"
      },
      {
        "name": null,
        "type": "URL",
        "id": "href-ruimtelijkeplannen"
      }
    ],
    "id": "links"
  },
  "bag_pnd_geconstateerd": {
    "name": "Geconstateerd",
    "id": "bag-pnd-geconstateerd"
  },
  "pdok_locatie_id": {
    "name": "Locatie identificaties",
    "type": "string",
    "id": "pdok-locatie-id"
  },
  "href_topotijdreis": {
    "name": "Topo tijdreis",
    "type": "URL",
    "id": "href-topotijdreis"
  },
  "location_sort_value": {
    "name": "Sortering van locatie",
    "id": "location-sort-value"
  },
  "zk_fase": {
    "name": "Fase",
    "type": "string",
    "id": "zk-fase"
  },
  "id": {
    "name": "Meili identificatie",
    "id": "id"
  },
  "bag_num_huisnummer": {
    "name": "Huisnummer",
    "id": "bag-num-huisnummer"
  },
  "bwk_num_geo_lat_lon": {
    "name": "Lat\/Lon coordinaten",
    "type": "string",
    "id": "bwk-num-geo-lat-lon"
  },
  "zk_startdatum": {
    "name": "Startdatum",
    "type": "string",
    "id": "zk-startdatum"
  },
  "href_streetview": {
    "name": "Google Streetview",
    "type": "URL",
    "id": "href-streetview"
  },
  "bwk_num_buurtid": {
    "name": "",
    "id": "bwk-num-buurtid"
  },
  "bag_num_postcode": {
    "name": "Postcode",
    "id": "bag-num-postcode"
  },
  "bwk_num_geo_EPSG28992": {
    "name": "Coördinaten",
    "id": "bwk-num-geo-EPSG28992"
  },
  "bag_num_huisnummer_letter_aanduiding": {
    "name": "Huisnummer-letter-aanduiding",
    "id": "bag-num-huisnummer-letter-aanduiding"
  },
  "bag_aob_id": {
    "name": "Identificatie adresseerbaar object",
    "type": "string",
    "id": "bag-aob-id"
  },
  "bag_wpl_id": {
    "name": "",
    "id": "bag-wpl-id"
  },
  "bwk_vbo_typetoegang": {
    "name": "Soort toegang",
    "type": "string",
    "id": "bwk-vbo-typetoegang"
  },
  "bouwtechnisch_kenmerk": {
    "name": "Bouwtechnisch kenmerk",
    "type": "string",
    "id": "bouwtechnisch-kenmerk"
  },
  "wijzigingsdatum": {
    "name": "Wijzigingsdatum",
    "type": "string",
    "id": "wijzigingsdatum"
  },
  "bag_aob_gebruiksdoel": {
    "name": "Gebruiksdoel",
    "id": "bag-aob-gebruiksdoel"
  },
  "bwk_num_subwijkcode": {
    "name": "Subwijkcode",
    "type": "string",
    "id": "bwk-num-subwijkcode"
  },
  "geo_EPSG28992": {
    "name": "x,y of x,y,z coordinaten volgens Rijksdriehoek systeem",
    "type": "string",
    "id": "geo-EPSG28992"
  },
  "bag_num_documentnummer": {
    "name": "Documentnummer",
    "id": "bag-num-documentnummer"
  },
  "naam": {
    "name": "Adres",
    "type": "string",
    "id": "naam"
  },
  "bag_identificatie": {
    "name": "Identificatie van een BAG-object",
    "id": "bag-identificatie"
  },
  "bag_pnd_documentnummer": {
    "name": "Documentnummer",
    "id": "bag-pnd-documentnummer"
  },
  "bag_opr_type": {
    "name": "Type",
    "id": "bag-opr-type"
  }
};

/**
 * The current schema, used for rendering the details page.
 * The ordering of the collections defines how they are shown in the front-end.
 * The first Attribute of the entire array is used as the title of the Details page.
 * For each sub-attribute, the first Attribute is used as the title of the sub-section.
 */
export const displayAttributes: Attribute[] =   [
    Attributes.bag_object_type,
    Attributes.naam,
    Attributes.bag_aob_gebruiksdoel,
    Attributes.bag_aob_oppervlakte,
    Attributes.bag_aob_status,
    Attributes.links,
    
  { id : "bag-pnd",
    name : "Pand",
    attributes:
      [
      Attributes.bag_pnd_oorspronkelijk_bouwjaar,
      Attributes.bag_pnd_status
    ]
  },
    
  { id : "bwk",
    name : "Wijk/buurt",
    attributes:
      [
      Attributes.bwk_num_nadergebruiksdoel,
      Attributes.bwk_num_wijknaam,
      Attributes.bwk_num_subwijknaam,
      Attributes.bwk_num_buurtnaam,
      Attributes.bwk_num_subbuurtnaam
    ]
  },
    
  { id : "hoofdadres",
    name : "Adres",
    attributes:
      [
      Attributes.bag_num_volledig,
      Attributes.bag_num_postcode,
      Attributes.bag_num_huisnummer,
      Attributes.bag_num_huisletter,
      Attributes.bag_num_huisnummertoevoeging,
      Attributes.bag_num_huisnummer_letter_aanduiding,
      Attributes.bag_num_status,
      Attributes.bag_opr_naam,
      Attributes.bag_wpl_naam
    ]
  },
    
  { id : "nevenadres",
    name : "Nevenadres",
    attributes:
      [
      Attributes.bag_num_volledig_neven,
      Attributes.bag_num_postcode_neven,
      Attributes.bag_num_huisnummer_neven,
      Attributes.bag_num_huisletter_neven,
      Attributes.bag_num_huisnummertoevoeging_neven,
      Attributes.bag_num_huisnummer_letter_aanduiding_neven,
      Attributes.bag_opr_naam_neven,
      Attributes.bag_wpl_naam_neven
    ]
  },
    
  { id : "pand-vergunningen",
    name : "Pand Vergunningen",
    attributes:
      [
      Attributes.zk_nummer,
      Attributes.zk_soort,
      Attributes.zk_status
    ]
  }
  ];

/**
 * Filterable attributes, used for rendering filters and facets.
 */
export const filterAttributes: Attribute[] =   [
    Attributes.pdok_locatie_id,
    Attributes.bag_aob_gebruiksdoel,
    Attributes.bag_aob_oppervlakte_interval,
    Attributes.bag_aob_status,
    
  { id : "bag-pnd",
    name : "Pand",
    attributes:
      [
      Attributes.bag_pnd_oorspronkelijk_bouwjaar_interval,
      Attributes.bag_pnd_status
    ]
  }
  ];

/**
 * The searchableAttributes determines the attribute ranking order (and also which attributes are searchable).
 * It is also possible to use object-type-sort-order to sort instead of using relevance ranking.
 **/
export const searchableAttributes = [
  "id",
  "naam",
  "_geo",
  "geo-EPSG28992",
  "bag-aob-id",
  "bag-num-id",
  "bag-aob-gebruiksdoel",
  "bag-aob-oppervlakte",
  "bag-num-id-neven",
  "bag-num-postcode",
  "bag-num-postcode-neven",
  "bag-num-volledig",
  "bag-num-volledig-neven",
  "bag-opr-id",
  "bag-opr-id-neven",
  "bag-opr-naam",
  "bag-opr-naam-neven",
  "bag-pnd-geo",
  "bag-pnd-geo-EPSG28992",
  "bag-pnd-id",
  "bag-pnd-oorspronkelijk-bouwjaar",
  "bag-wpl-id",
  "bag-wpl-id-neven",
  "bag-wpl-naam",
  "bag-wpl-naam-neven",
  "bwk-num-buurtnaam",
  "bwk-num-geo-EPSG28992",
  "bwk-num-geo-lat-lon",
  "bwk-num-nadergebruiksdoel",
  "bwk-num-subbuurtnaam",
  "bwk-num-subwijknaam",
  "bwk-num-wijknaam"
];

export interface GBPObject {
  "id" : string;
  "bag-aob-id" : string;
  "bag-num-id" : string[];
  "bag-pnd-id" : string[];
  "bag-object-type" : string;
  "naam" : string;
  "object-type-sort-order" : string;
  "location-sort-value" : string;
  "pdok-locatie-id" : string[];
  "bag-aob-gebruiksdoel" : string[];
  "bag-aob-oppervlakte" : string;
  "bag-aob-oppervlakte-interval" : string;
  "bag-aob-status" : string;
  "bag-aob-documentdatum" : Date;
  "bag-aob-documentnummer" : string;
  "bag-aob-voorkomen" : string;
  "geo-EPSG28992" : number[];
  "_geo" : string;
  "links" : string;
  "bag-pnd" : { "bag-pnd-id" : string; "bag-pnd-oorspronkelijk-bouwjaar" : string; "bag-pnd-oorspronkelijk-bouwjaar-interval" : string; "bag-pnd-status" : string; "bag-pnd-geconstateerd" : string; "bag-pnd-documentdatum" : Date; "bag-pnd-documentnummer" : string; "bag-pnd-geo" : string; "bag-pnd-geo-EPSG28992" : string; };
  "bwk" : { "bwk-num-nadergebruiksdoel" : string; "bwk-num-status" : string; "bwk-num-adrestype" : string; "bwk-num-wijkid" : string; "bwk-num-wijkcode" : string; "bwk-num-wijknaam" : string; "bwk-num-subwijkid" : string; "bwk-num-subwijkcode" : string; "bwk-num-subwijknaam" : string; "bwk-num-buurtid" : string; "bwk-num-buurtcode" : string; "bwk-num-buurtnaam" : string; "bwk-num-subbuurtid" : string; "bwk-num-subbuurtcode" : string; "bwk-num-subbuurtnaam" : string; "bwk-vbo-laagstebouwlaag" : string; "bwk-vbo-hoogstebouwlaag" : string; "bwk-vbo-toegangbouwlaag" : string; "bwk-vbo-lagen" : string; "bwk-vbo-typetoegang" : string; "bwk-datum" : string; "bwk-num-geo-EPSG28992" : string; "bwk-num-geo-lat-lon" : string; };
  "hoofdadres" : { "bag-num-id" : string; "bag-num-volledig" : string; "bag-num-postcode" : string; "bag-num-huisnummer" : string; "bag-num-huisletter" : string; "bag-num-huisnummertoevoeging" : string; "bag-num-huisnummer-letter-aanduiding" : string; "bag-num-status" : string; "bag-num-documentdatum" : Date; "bag-num-documentnummer" : string; "bag-num-voorkomen" : string; "bag-opr-id" : string; "bag-opr-naam" : string; "bag-opr-type" : string; "bag-opr-status" : string; "bag-opr-documentdatum" : Date; "bag-opr-documentnummer" : string; "bag-opr-voorkomen" : string; "bag-wpl-id" : string; "bag-wpl-naam" : string; "bag-wpl-status" : string; "bag-wpl-documentdatum" : Date; "bag-wpl-documentnummer" : string; "bag-wpl-voorkomen" : string; };
  "nevenadres" : { "bag-num-id-neven" : string; "bag-num-volledig-neven" : string; "bag-num-postcode-neven" : string; "bag-num-huisnummer-neven" : string; "bag-num-huisletter-neven" : string; "bag-num-huisnummertoevoeging-neven" : string; "bag-num-huisnummer-letter-aanduiding-neven" : string; "bag-opr-id-neven" : string; "bag-opr-naam-neven" : string; "bag-opr-type-neven" : string; "bag-wpl-id-neven" : string; "bag-wpl-naam-neven" : string; };
  "officiele-bekendmakingen" : { "identificatie" : string; "titel" : string; "ob-documenttype" : string[]; "wijzigingsdatum" : Date; "publicatiedatum" : Date; "ob-onderwerp" : string[]; "url-vindplaats" : string; };
  "pand-vergunningen" : { "zk-nummer" : string; "omschrijving" : string; "zk-soort" : string; "zk-status" : string; "besluitdatum" : Date; };
}
