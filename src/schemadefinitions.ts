
/** THIS FILE IS GENERATED. DO NOT EDIT!
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
  type?: "string" | "URL" | "date" | "dateTime";
  /** Type of filter on the attribute */
  filterType?: "select" | "range" | "intervals";
  /** sub-attributes */
  attributes?: Attribute[];
  /** Terms from the vocabulary, if applicable. */
  vocabulary?: any[];
}

export const Attributes : {[index: string]: Attribute} = {
  "zk_status": {
    "name": "Voortgangsstatus",
    "type": "string",
    "id": "zk-status"
  },
  "bag_opr_id": {
    "name": "Identificatie openbare ruimte",
    "type": "string",
    "id": "bag-opr-id"
  },
  "bag_pnd_geo": {
    "name": "Coördinaten",
    "type": "string",
    "id": "bag-pnd-geo"
  },
  "ob_documenttype": {
    "name": "Documenttype",
    "type": "string",
    "id": "ob-documenttype"
  },
  "monumenttype": {
    "name": "Monumenttype",
    "type": "string",
    "id": "monumenttype"
  },
  "bag_num_huisnummertoevoeging_neven": {
    "name": "Huisnummertoevoeging",
    "type": "string",
    "id": "bag-num-huisnummertoevoeging-neven"
  },
  "bag_pnd_status": {
    "name": "Status",
    "type": "string",
    "id": "bag-pnd-status"
  },
  "zk_nummer": {
    "name": "Zaaknummer",
    "type": "string",
    "id": "zk-nummer"
  },
  "dataset_id": {
    "name": "Herkomst",
    "type": "string",
    "id": "dataset-id"
  },
  "bag_num_status": {
    "name": "BAG status",
    "type": "string",
    "id": "bag-num-status"
  },
  "bag_wpl_naam": {
    "name": "Woonplaats",
    "type": "string",
    "id": "bag-wpl-naam"
  },
  "bag_object_type": {
    "name": "Object type",
    "type": "string",
    "id": "bag-object-type"
  },
  "bag_opr_naam": {
    "name": "Openbare ruimte",
    "type": "string",
    "id": "bag-opr-naam"
  },
  "cbs_wk_brt": {
    "name": "CBS wijk\/buurt",
    "type": "string",
    "id": "cbs-wk-brt"
  },
  "bag_pnd_documentdatum": {
    "name": "Documentdatum",
    "type": "date",
    "id": "bag-pnd-documentdatum"
  },
  "zk_aanvraagdatum": {
    "name": "Aanvraagdatum",
    "type": "date",
    "id": "zk-aanvraagdatum"
  },
  "bag_num_documentdatum": {
    "name": "Documentdatum",
    "type": "date",
    "id": "bag-num-documentdatum"
  },
  "imported": {
    "name": "Geimporteerd op",
    "type": "dateTime",
    "id": "imported"
  },
  "bag_num_huisnummer_neven": {
    "name": "Huisnummer",
    "type": "string",
    "id": "bag-num-huisnummer-neven"
  },
  "omschrijving": {
    "name": "Omschrijving",
    "type": "string",
    "id": "omschrijving"
  },
  "bag_opr_geconstateerd": {
    "name": "BAG status",
    "type": "string",
    "id": "bag-opr-geconstateerd"
  },
  "btk_inspectiedatum": {
    "name": "Inspectiedatum",
    "type": "date",
    "id": "btk-inspectiedatum"
  },
  "zk_einddatum_gepland": {
    "name": "Geplande einddatum",
    "type": "date",
    "id": "zk-einddatum-gepland"
  },
  "titel": {
    "name": "Titel",
    "type": "string",
    "id": "titel"
  },
  "bag_num_postcode_neven": {
    "name": "Postcode",
    "type": "string",
    "id": "bag-num-postcode-neven"
  },
  "bag_num_volledig": {
    "name": "Hoofdadres",
    "type": "string",
    "id": "bag-num-volledig"
  },
  "bag_num_huisnummer_letter_aanduiding_neven": {
    "name": "Huisnummer-letter-aanduiding",
    "type": "string",
    "id": "bag-num-huisnummer-letter-aanduiding-neven"
  },
  "bag_num_voorkomen": {
    "name": "Voorkomen",
    "type": "string",
    "id": "bag-num-voorkomen"
  },
  "zk_soort": {
    "name": "Zaaksoort",
    "type": "string",
    "id": "zk-soort"
  },
  "href_monumentenregister": {
    "name": "Monumentenregister",
    "type": "URL",
    "id": "href-monumentenregister"
  },
  "bag_wpl_id_neven": {
    "name": "Identificatie woonplaats",
    "type": "string",
    "id": "bag-wpl-id-neven"
  },
  "zk_einddatum": {
    "name": "Einddatum",
    "type": "date",
    "id": "zk-einddatum"
  },
  "bag_opr_type_neven": {
    "name": "Type",
    "type": "string",
    "id": "bag-opr-type-neven"
  },
  "bwk_subwijknaam": {
    "name": "Subwijk",
    "type": "string",
    "id": "bwk-subwijknaam"
  },
  "bag_opr_id_neven": {
    "name": "Identificatie openbare ruimte",
    "type": "string",
    "id": "bag-opr-id-neven"
  },
  "btk_actie_nodig": {
    "name": "Actie nodig voor stalen ligger",
    "type": "string",
    "id": "btk-actie-nodig"
  },
  "bag_num_id": {
    "name": "Identificatie nummeraanduiding",
    "type": "string",
    "id": "bag-num-id"
  },
  "bag_pnd_id": {
    "name": "Identificatie pand",
    "type": "string",
    "id": "bag-pnd-id"
  },
  "besluitdatum": {
    "name": "Besluitdatum",
    "type": "date",
    "id": "besluitdatum"
  },
  "bag_aob_oppervlakte": {
    "name": "Oppervlakte",
    "filterType": "range",
    "type": "string",
    "id": "bag-aob-oppervlakte"
  },
  "bag_wpl_naam_neven": {
    "name": "Woonplaats",
    "type": "string",
    "id": "bag-wpl-naam-neven"
  },
  "bwk_subbuurtnaam": {
    "name": "Subbuurt",
    "type": "string",
    "id": "bwk-subbuurtnaam"
  },
  "bag_pnd_oorspronkelijk_bouwjaar": {
    "name": "Bouwjaar",
    "filterType": "range",
    "type": "string",
    "id": "bag-pnd-oorspronkelijk-bouwjaar"
  },
  "bag_num_huisletter": {
    "name": "Huisletter",
    "type": "string",
    "id": "bag-num-huisletter"
  },
  "bag_opr_naam_neven": {
    "name": "Openbare ruimte",
    "type": "string",
    "id": "bag-opr-naam-neven"
  },
  "date": {
    "name": "Datum",
    "type": "date",
    "id": "date"
  },
  "bag_pnd_geo_EPSG28992": {
    "name": "Coördinaten",
    "type": "string",
    "id": "bag-pnd-geo-EPSG28992"
  },
  "bag_opr_documentdatum": {
    "name": "Documentdatum",
    "type": "date",
    "id": "bag-opr-documentdatum"
  },
  "bag_num_volledig_neven": {
    "name": "Nevenadres",
    "type": "string",
    "id": "bag-num-volledig-neven"
  },
  "bag_aob_documentnummer": {
    "name": "Documentnummer",
    "id": "bag-aob-documentnummer"
  },
  "bag_opr_voorkomen": {
    "name": "Voorkomen",
    "type": "string",
    "id": "bag-opr-voorkomen"
  },
  "bag_wpl_documentdatum": {
    "name": "Documentdatum",
    "type": "date",
    "id": "bag-wpl-documentdatum"
  },
  "bag_wpl_documentnummer": {
    "name": "Documentnummer",
    "type": "string",
    "id": "bag-wpl-documentnummer"
  },
  "bag_aob_documentdatum": {
    "name": "Documentdatum",
    "type": "date",
    "id": "bag-aob-documentdatum"
  },
  "object_type_sort_order": {
    "name": "Sortering van object",
    "type": "string",
    "id": "object-type-sort-order"
  },
  "_geo": {
    "name": "Latitude-longitude geo coordinaten",
    "attributes": [
      {
        "name": "Latitude",
        "type": "string",
        "id": "lat"
      },
      {
        "name": "Longitude",
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
  "bag_wpl_voorkomen": {
    "name": "Voorkomen",
    "type": "string",
    "id": "bag-wpl-voorkomen"
  },
  "url_vindplaats": {
    "name": "Vindplaats",
    "type": "URL",
    "id": "url-vindplaats"
  },
  "bag_aob_voorkomen": {
    "name": "Voorkomen",
    "type": "string",
    "id": "bag-aob-voorkomen"
  },
  "bag_aob_status": {
    "name": "BAG status",
    "type": "string",
    "id": "bag-aob-status"
  },
  "bag_num_id_neven": {
    "name": "Identificatie nummeraanduiding",
    "type": "string",
    "id": "bag-num-id-neven"
  },
  "bag_opr_documentnummer": {
    "name": "Documentnummer",
    "type": "string",
    "id": "bag-opr-documentnummer"
  },
  "bag_wpl_status": {
    "name": "BAG status",
    "type": "string",
    "id": "bag-wpl-status"
  },
  "bag_num_huisletter_neven": {
    "name": "Huisletter",
    "type": "string",
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
  "bwk_buurtid": {
    "name": "Buurt identificatie",
    "type": "string",
    "id": "bwk-buurtid"
  },
  "publicatiedatum": {
    "name": "Publicatiedatum",
    "type": "date",
    "id": "publicatiedatum"
  },
  "bwk_wijkid": {
    "name": "Wijk identificatie",
    "type": "string",
    "id": "bwk-wijkid"
  },
  "bag_opr_status": {
    "name": "BAG status",
    "type": "string",
    "id": "bag-opr-status"
  },
  "bag_num_huisnummertoevoeging": {
    "name": "Huisnummertoevoeging",
    "type": "string",
    "id": "bag-num-huisnummertoevoeging"
  },
  "bag_pnd_oorspronkelijk_bouwjaar_interval": {
    "name": "Bouwjaar",
    "filterType": "intervals",
    "type": "string",
    "id": "bag-pnd-oorspronkelijk-bouwjaar-interval"
  },
  "bag_aob_oppervlakte_interval": {
    "name": "Oppervlakte",
    "filterType": "intervals",
    "type": "string",
    "id": "bag-aob-oppervlakte-interval"
  },
  "zk_startdatum_gepland": {
    "name": "Geplande startdatum",
    "type": "date",
    "id": "zk-startdatum-gepland"
  },
  "links": {
    "name": "Externe referenties",
    "attributes": [
      {
        "name": "Luchtfoto",
        "type": "URL",
        "id": "href-luchtfoto"
      },
      {
        "name": "Google Streetview",
        "type": "URL",
        "id": "href-streetview"
      },
      {
        "name": "Topo tijdreis",
        "type": "URL",
        "id": "href-topotijdreis"
      },
      {
        "name": "Utrechts archief",
        "type": "URL",
        "id": "href-utrechtsarchief"
      },
      {
        "name": "Rumtelijke plannen",
        "type": "URL",
        "id": "href-ruimtelijkeplannen"
      }
    ],
    "id": "links"
  },
  "bag_pnd_geconstateerd": {
    "name": "Geconstateerd",
    "type": "string",
    "id": "bag-pnd-geconstateerd"
  },
  "object_type": {
    "name": "Type van object",
    "type": "string",
    "id": "object-type"
  },
  "pdok_locatie_id": {
    "name": "Locatie identificaties",
    "type": "string",
    "id": "pdok-locatie-id"
  },
  "bwk_buurtnaam": {
    "name": "Buurt",
    "type": "string",
    "id": "bwk-buurtnaam"
  },
  "location_sort_value": {
    "name": "Sortering van locatie",
    "type": "string",
    "id": "location-sort-value"
  },
  "bag_opr_volledig": {
    "name": "Openbare ruimte",
    "type": "string",
    "id": "bag-opr-volledig"
  },
  "id": {
    "name": "Identificatie",
    "type": "string",
    "id": "id"
  },
  "bag_num_huisnummer": {
    "name": "Huisnummer",
    "type": "string",
    "id": "bag-num-huisnummer"
  },
  "bwk_wijknaam": {
    "name": "Wijk",
    "type": "string",
    "id": "bwk-wijknaam"
  },
  "monumentnummer": {
    "name": "Monumentnummer",
    "type": "string",
    "id": "monumentnummer"
  },
  "btk_kenmerk_id": {
    "name": "Bouwtechnisch kenmerk",
    "type": "string",
    "id": "btk-kenmerk-id"
  },
  "zk_startdatum": {
    "name": "Startdatum",
    "type": "date",
    "id": "zk-startdatum"
  },
  "bag_num_postcode": {
    "name": "Postcode",
    "type": "string",
    "id": "bag-num-postcode"
  },
  "bag_num_huisnummer_letter_aanduiding": {
    "name": "Huisnummer-letter-aanduiding",
    "type": "string",
    "id": "bag-num-huisnummer-letter-aanduiding"
  },
  "bag_aob_id": {
    "name": "Identificatie adresseerbaar object",
    "type": "string",
    "id": "bag-aob-id"
  },
  "bag_wpl_id": {
    "name": "Identificatie woonplaats",
    "type": "string",
    "id": "bag-wpl-id"
  },
  "wijzigingsdatum": {
    "name": "Wijzigingsdatum",
    "type": "date",
    "id": "wijzigingsdatum"
  },
  "bag_aob_gebruiksdoel": {
    "name": "Gebruiksdoel",
    "id": "bag-aob-gebruiksdoel"
  },
  "geo_EPSG28992": {
    "name": "Coördinatenordinaten volgens Rijksdriehoek systeem",
    "type": "string",
    "id": "geo-EPSG28992"
  },
  "bag_num_documentnummer": {
    "name": "Documentnummer",
    "type": "string",
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
    "type": "string",
    "id": "bag-pnd-documentnummer"
  },
  "bag_opr_type": {
    "name": "Type",
    "type": "string",
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
    
  { id : "naam",
    name : "Adres",
    type : "string",
  },
    
  { id : "links",
    name : "Externe referenties",
    attributes:    [
      
    { id : "href-luchtfoto",
      name : "Luchtfoto",
      type : "URL",
    },
      
    { id : "href-streetview",
      name : "Google Streetview",
      type : "URL",
    },
      
    { id : "href-topotijdreis",
      name : "Topo tijdreis",
      type : "URL",
    },
      
    { id : "href-utrechtsarchief",
      name : "Utrechts archief",
      type : "URL",
    },
      
    { id : "href-ruimtelijkeplannen",
      name : "Rumtelijke plannen",
      type : "URL",
    }
    ]
  },
    
  { id : "bag-aob",
    name : "Adresseerbaar object",
    attributes:    [
      
    { id : "bag-aob-id",
      name : "Identificatie adresseerbaar object",
      type : "string",
    },
      
    { id : "bag-object-type",
      name : "Object type",
      type : "string",
    },
      
    { id : "bag-aob-gebruiksdoel",
      name : "Gebruiksdoel",
    },
      
    { id : "bag-aob-oppervlakte",
      name : "Oppervlakte",
      type : "string",
      filterType : "range",
    },
      
    { id : "bag-aob-status",
      name : "BAG status",
      type : "string",
    },
      
    { id : "dataset-id",
      name : "Herkomst",
      type : "string",
    },
      
    { id : "imported",
      name : "Geimporteerd op",
      type : "dateTime",
    }
    ]
  },
    
  { id : "bag-opr",
    name : "Openbare Ruimte",
    attributes:    [
      
    { id : "bag-object-type",
      name : "Object type",
      type : "string",
    },
      
    { id : "bag-opr-naam",
      name : "Openbare ruimte",
      type : "string",
    },
      
    { id : "bag-opr-volledig",
      name : "Openbare ruimte",
      type : "string",
    }
    ]
  },
    
  { id : "bag-pnd",
    name : "Pand",
    attributes:    [
      
    { id : "bag-pnd-oorspronkelijk-bouwjaar",
      name : "Bouwjaar",
      type : "string",
      filterType : "range",
    },
      
    { id : "bag-pnd-status",
      name : "Status",
      type : "string",
    },
      
    { id : "dataset-id",
      name : "Herkomst",
      type : "string",
    },
      
    { id : "imported",
      name : "Geimporteerd op",
      type : "dateTime",
    }
    ]
  },
    
  { id : "bouwtechnische-kenmerken",
    name : "Bouwtechnische kenmerken",
    attributes:    [
      
    { id : "btk-kenmerk-id",
      name : "Bouwtechnisch kenmerk",
      type : "string",
      vocabulary : [  [  { id: 'gbp-btk-0010', label: 'Balkon (info)' } ,   { id: 'gbp-btk-00101', label: 'Balkon aanwezig' } ,   { id: 'gbp-btk-00102', label: 'Balkon, goed' } ,   { id: 'gbp-btk-00103', label: 'Balkon, matig' } ,   { id: 'gbp-btk-00104', label: 'Balkon, slecht' } ,   { id: 'gbp-btk-00105', label: 'Balkon met stalen liggers' } ,   { id: 'gbp-btk-00106', label: 'Balkon, geen stalen liggers' } ,   { id: 'gbp-btk-00107', label: 'Balkon, stalen liggers n.v.t.' } ,   { id: 'gbp-btk-00108', label: 'Balkon afwezig' } ,   { id: 'gbp-btk-00109', label: 'Balkon onbekend' } ,  ] ,   { id: 'gbp-btk-0020', label: 'Dak' } ,   { id: 'gbp-btk-0030', label: 'Dakkapel' } ,   { id: 'gbp-btk-0040', label: 'Dakrand' } ,   { id: 'gbp-btk-0050', label: 'Erker' } ,   { id: 'gbp-btk-0060', label: 'Fundering' } ,   { id: 'gbp-btk-0070', label: 'Galerij' } ,   { id: 'gbp-btk-0080', label: 'Gevel' } ,   { id: 'gbp-btk-0090', label: 'Goot' } ,   [  { id: 'gbp-btk-0100', label: 'Hekwerk (info)' } ,   { id: 'gbp-btk-01001', label: 'Hekwerk aanwezig' } ,   { id: 'gbp-btk-01002', label: 'Hekwerk afwezig' } ,   { id: 'gbp-btk-01009', label: 'Hekwerk onbekend' } ,  ] ,   { id: 'gbp-btk-0110', label: 'Kozijn' } ,   { id: 'gbp-btk-0120', label: 'Raam/deur' } ,   { id: 'gbp-btk-0130', label: 'Schoorsteen' } ,   { id: 'gbp-btk-0140', label: 'Tuin' } ,  ]
    },
      
    { id : "btk-inspectiedatum",
      name : "Inspectiedatum",
      type : "date",
    },
      
    { id : "btk-actie-nodig",
      name : "Actie nodig voor stalen ligger",
      type : "string",
    },
      
    { id : "dataset-id",
      name : "Herkomst",
      type : "string",
    },
      
    { id : "imported",
      name : "Geimporteerd op",
      type : "dateTime",
    }
    ]
  },
    
  { id : "bwk",
    name : "Wijk/buurt",
    attributes:    [
      
    { id : "bwk-wijknaam",
      name : "Wijk",
      type : "string",
    },
      
    { id : "bwk-subwijknaam",
      name : "Subwijk",
      type : "string",
    },
      
    { id : "bwk-buurtnaam",
      name : "Buurt",
      type : "string",
    },
      
    { id : "bwk-subbuurtnaam",
      name : "Subbuurt",
      type : "string",
    },
      
    { id : "dataset-id",
      name : "Herkomst",
      type : "string",
    },
      
    { id : "imported",
      name : "Geimporteerd op",
      type : "dateTime",
    }
    ]
  },
    
  { id : "hoofdadres",
    name : "Adres",
    attributes:    [
      
    { id : "bag-num-volledig",
      name : "Hoofdadres",
      type : "string",
    },
      
    { id : "bag-num-postcode",
      name : "Postcode",
      type : "string",
    },
      
    { id : "bag-num-huisnummer",
      name : "Huisnummer",
      type : "string",
    },
      
    { id : "bag-num-huisletter",
      name : "Huisletter",
      type : "string",
    },
      
    { id : "bag-num-huisnummertoevoeging",
      name : "Huisnummertoevoeging",
      type : "string",
    },
      
    { id : "bag-num-huisnummer-letter-aanduiding",
      name : "Huisnummer-letter-aanduiding",
      type : "string",
    },
      
    { id : "bag-num-status",
      name : "BAG status",
      type : "string",
    },
      
    { id : "bag-opr-naam",
      name : "Openbare ruimte",
      type : "string",
    },
      
    { id : "bag-wpl-naam",
      name : "Woonplaats",
      type : "string",
    }
    ]
  },
    
  { id : "monumenten",
    name : "Monumenten",
    attributes:    [
      
    { id : "monumenttype",
      name : "Monumenttype",
      type : "string",
      vocabulary : [  { id: 'voc-mnmt-tp-001', label: 'Gemeentelijk monument' } ,   { id: 'voc-mnmt-tp-002', label: 'Rijksmonument' } ,   { id: 'voc-mnmt-tp-003', label: 'Voorgesteld voor gemeentelijke lijst' } ,   { id: 'voc-mnmt-tp-004', label: 'Anderszins monumentaal' } ,  ]
    },
      
    { id : "monumentnummer",
      name : "Monumentnummer",
      type : "string",
    },
      
    { id : "href-monumentenregister",
      name : "Monumentenregister",
      type : "URL",
    },
      
    { id : "dataset-id",
      name : "Herkomst",
      type : "string",
    },
      
    { id : "imported",
      name : "Geimporteerd op",
      type : "dateTime",
    }
    ]
  },
    
  { id : "nevenadres",
    name : "Nevenadres",
    attributes:    [
      
    { id : "bag-num-volledig-neven",
      name : "Nevenadres",
      type : "string",
    },
      
    { id : "bag-num-postcode-neven",
      name : "Postcode",
      type : "string",
    },
      
    { id : "bag-num-huisnummer-neven",
      name : "Huisnummer",
      type : "string",
    },
      
    { id : "bag-num-huisletter-neven",
      name : "Huisletter",
      type : "string",
    },
      
    { id : "bag-num-huisnummertoevoeging-neven",
      name : "Huisnummertoevoeging",
      type : "string",
    },
      
    { id : "bag-num-huisnummer-letter-aanduiding-neven",
      name : "Huisnummer-letter-aanduiding",
      type : "string",
    },
      
    { id : "bag-opr-naam-neven",
      name : "Openbare ruimte",
      type : "string",
    },
      
    { id : "bag-wpl-naam-neven",
      name : "Woonplaats",
      type : "string",
    }
    ]
  },
    
  { id : "officiele-bekendmakingen",
    name : "Officiële Bekendmakingen",
    attributes:    [
      
    { id : "publicatiedatum",
      name : "Publicatiedatum",
      type : "date",
    },
      
    { id : "wijzigingsdatum",
      name : "Wijzigingsdatum",
      type : "date",
    },
      
    { id : "identificatie",
      name : "Identificatie",
      type : "string",
    },
      
    { id : "titel",
      name : "Titel",
      type : "string",
    },
      
    { id : "ob-documenttype",
      name : "Documenttype",
      type : "string",
    },
      
    { id : "ob-onderwerp",
      name : "Onderwerp",
      type : "string",
    },
      
    { id : "url-vindplaats",
      name : "Vindplaats",
      type : "URL",
    },
      
    { id : "dataset-id",
      name : "Herkomst",
      type : "string",
    },
      
    { id : "imported",
      name : "Geimporteerd op",
      type : "dateTime",
    }
    ]
  },
    
  { id : "zaakgegevens",
    name : "Zaakgegevens",
    attributes:    [
      
    { id : "zk-nummer",
      name : "Zaaknummer",
      type : "string",
    },
      
    { id : "omschrijving",
      name : "Omschrijving",
      type : "string",
    },
      
    { id : "zk-soort",
      name : "Zaaksoort",
      type : "string",
      vocabulary : [  { id: '000000', label: 'Niet ingevuld' } ,   { id: 'CHZ_CAL', label: 'Calamiteiten' } ,   [  { id: 'controlezaak', label: 'Controlezaak' } ,   { id: 'CHZ_OCA', label: 'Opleveringscontrole Asbest' } ,   { id: 'CHZ_OCBAR', label: 'Opleveringscontrole BAR' } ,   { id: 'CHZ_OCEVM', label: 'Opleveringscontrole Evenementen' } ,   { id: 'CHZ_HUIS', label: 'Opleveringscontrole Huisvesting' } ,   { id: 'CHZ_OCR', label: 'Opleveringscontrole Renovatie' } ,   { id: 'CHZ_OCS', label: 'Opleveringscontrole Sloop' } ,   { id: 'CHZ_OCB1', label: 'Opleveringscontrole bouw cat. 1' } ,   { id: 'CHZ_OCB2', label: 'Opleveringscontrole bouw cat. 2' } ,   { id: 'CHZ_OCB3', label: 'Opleveringscontrole bouw cat. 3' } ,   { id: 'CHZ_OCB4', label: 'Opleveringscontrole bouw cat. 4' } ,   { id: 'CHZ_SPL', label: 'Opleveringscontrole splitsingen' } ,   { id: 'CHZ_PCTBAR', label: 'Projectcontrole BAR' } ,   { id: 'CHZ_BRPLVL', label: 'Projectcontrole Breedplaatvloeren' } ,   { id: 'CHZ_PCGAL', label: 'Projectcontrole Galerijvloeren flatgebouwen' } ,   { id: 'CHZ_PCTOM', label: 'Projectcontrole Omzettingen' } ,   { id: 'CHZ_PCTOGI', label: 'Projectcontrole Omzettingen Geweigerd/Ingetrokken' } ,   { id: 'CHZ_BLS', label: 'Projectcontrole constructieve veiligheid balkons' } ,  ] ,   [  { id: 'klachtenzaak', label: 'Klacht/meldingzaak' } ,   { id: 'HZ_MBG', label: 'Melding brandveilig gebruik' } ,   { id: 'HZ_GBM', label: 'Gebruiksmelding' } ,   { id: 'HZ_SLM', label: 'Sloopmelding' } ,   { id: 'CHZ_KLA', label: 'Klacht/Melding' } ,   { id: 'KLA', label: 'klacht' } ,  ] ,   [  { id: 'vergunning', label: 'Vergunning' } ,   { id: 'HZ_BWT', label: 'Bouwvergunning uit BWT4all' } ,   { id: 'HZ_IOG', label: 'Inname Openbare Grond' } ,   { id: 'HZ_WABO', label: 'Omgevingsvergunning' } ,   { id: 'HZ_OAPV', label: 'Ontheffing APV (Incidentele Geluidsontheffingen tbv Civiel en Bouw)' } ,   [  { id: 'HZ_OWR', label: 'Onttrekking-/ Omzetting-/ Samenvoeging van Woonruimte' } ,   { id: 'HZ_OWR_O', label: 'Omzetting' } ,   { id: 'HZ_OWR_T', label: 'Transformatie' } ,  ] ,   { id: 'HZ_SPL', label: 'Splitsingsvergunning' } ,   { id: 'HZ_WIJ', label: 'Wijzigen Omgevingsvergunning' } ,  ] ,  ]
    },
      
    { id : "zk-status",
      name : "Voortgangsstatus",
      type : "string",
      vocabulary : [  { id: 'C', label: 'Concept' } ,   { id: 'G', label: 'Gesloten' } ,   { id: 'O', label: 'Open' } ,   { id: 'T', label: 'Toekomstig' } ,  ]
    },
      
    { id : "zk-besluit",
      name : "Besluit",
      type : "string",
      vocabulary : [  { id: 'voc-zk-besluit-001', label: 'Onbekend' } ,   { id: 'voc-zk-besluit-002', label: 'Aankondiging Intrekking' } ,   { id: 'voc-zk-besluit-003', label: 'Afgewezen' } ,   { id: 'voc-zk-besluit-004', label: 'Akkoord' } ,   { id: 'voc-zk-besluit-005', label: 'Besluit Intrekking' } ,   { id: 'voc-zk-besluit-006', label: 'Beëindigd' } ,   { id: 'voc-zk-besluit-007', label: 'Buiten behandeling gelaten' } ,   { id: 'voc-zk-besluit-008', label: 'Buiten behandeling gesteld' } ,   { id: 'voc-zk-besluit-021', label: 'Deels toegekend' } ,   { id: 'voc-zk-besluit-009', label: 'Geen afwijking' } ,   { id: 'voc-zk-besluit-010', label: 'Gelegaliseerd' } ,   { id: 'voc-zk-besluit-011', label: 'Gerepareerd' } ,   { id: 'voc-zk-besluit-012', label: 'Geweigerd' } ,   { id: 'voc-zk-besluit-013', label: 'Ingetrokken' } ,   { id: 'voc-zk-besluit-014', label: 'Niet nodig' } ,   { id: 'voc-zk-besluit-015', label: 'Toegekend' } ,   { id: 'voc-zk-besluit-019', label: 'Van rechtswege afgewezen' } ,   { id: 'voc-zk-besluit-020', label: 'Van rechtswege toegekend' } ,   { id: 'voc-zk-besluit-016', label: 'Vergunningvrij' } ,   { id: 'voc-zk-besluit-017', label: 'Verleend' } ,   { id: 'voc-zk-besluit-018', label: 'Verwerkt' } ,  ]
    },
      
    { id : "date",
      name : "Datum",
      type : "date",
    },
      
    { id : "besluitdatum",
      name : "Besluitdatum",
      type : "date",
    },
      
    { id : "zk-startdatum",
      name : "Startdatum",
      type : "date",
    },
      
    { id : "zk-startdatum-gepland",
      name : "Geplande startdatum",
      type : "date",
    },
      
    { id : "zk-einddatum",
      name : "Einddatum",
      type : "date",
    },
      
    { id : "zk-einddatum-gepland",
      name : "Geplande einddatum",
      type : "date",
    },
      
    { id : "dataset-id",
      name : "Herkomst",
      type : "string",
    },
      
    { id : "imported",
      name : "Geimporteerd op",
      type : "dateTime",
    }
    ]
  }
  ];

/**
 * Filterable attributes, used for rendering filters and facets.
 */
export const filterAttributes: Attribute[] =   [
    
  { id : "bag-aob",
    name : "Adresseerbaar object",
    attributes:    [
      
    { id : "bag-aob.bag-aob-gebruiksdoel",
      name : "Gebruiksdoel",
    },
      
    { id : "bag-aob.bag-aob-oppervlakte-interval",
      name : "Oppervlakte",
      type : "string",
      filterType : "intervals",
    },
      
    { id : "bag-aob.bag-aob-status",
      name : "BAG status",
      type : "string",
    }
    ]
  },
    
  { id : "bag-pnd",
    name : "Pand",
    attributes:    [
      
    { id : "bag-pnd.bag-pnd-oorspronkelijk-bouwjaar-interval",
      name : "Bouwjaar",
      type : "string",
      filterType : "intervals",
    },
      
    { id : "bag-pnd.bag-pnd-status",
      name : "Status",
      type : "string",
    }
    ]
  },
    
  { id : "bouwtechnische-kenmerken",
    name : "Bouwtechnische kenmerken",
    attributes:    [
      
    { id : "bouwtechnische-kenmerken.btk-kenmerk-id",
      name : "Bouwtechnisch kenmerk",
      type : "string",
      vocabulary : [  [  { id: 'gbp-btk-0010', label: 'Balkon (info)' } ,   { id: 'gbp-btk-00101', label: 'Balkon aanwezig' } ,   { id: 'gbp-btk-00102', label: 'Balkon, goed' } ,   { id: 'gbp-btk-00103', label: 'Balkon, matig' } ,   { id: 'gbp-btk-00104', label: 'Balkon, slecht' } ,   { id: 'gbp-btk-00105', label: 'Balkon met stalen liggers' } ,   { id: 'gbp-btk-00106', label: 'Balkon, geen stalen liggers' } ,   { id: 'gbp-btk-00107', label: 'Balkon, stalen liggers n.v.t.' } ,   { id: 'gbp-btk-00108', label: 'Balkon afwezig' } ,   { id: 'gbp-btk-00109', label: 'Balkon onbekend' } ,  ] ,   { id: 'gbp-btk-0020', label: 'Dak' } ,   { id: 'gbp-btk-0030', label: 'Dakkapel' } ,   { id: 'gbp-btk-0040', label: 'Dakrand' } ,   { id: 'gbp-btk-0050', label: 'Erker' } ,   { id: 'gbp-btk-0060', label: 'Fundering' } ,   { id: 'gbp-btk-0070', label: 'Galerij' } ,   { id: 'gbp-btk-0080', label: 'Gevel' } ,   { id: 'gbp-btk-0090', label: 'Goot' } ,   [  { id: 'gbp-btk-0100', label: 'Hekwerk (info)' } ,   { id: 'gbp-btk-01001', label: 'Hekwerk aanwezig' } ,   { id: 'gbp-btk-01002', label: 'Hekwerk afwezig' } ,   { id: 'gbp-btk-01009', label: 'Hekwerk onbekend' } ,  ] ,   { id: 'gbp-btk-0110', label: 'Kozijn' } ,   { id: 'gbp-btk-0120', label: 'Raam/deur' } ,   { id: 'gbp-btk-0130', label: 'Schoorsteen' } ,   { id: 'gbp-btk-0140', label: 'Tuin' } ,  ]
    },
      
    { id : "bouwtechnische-kenmerken.btk-actie-nodig",
      name : "Actie nodig voor stalen ligger",
      type : "string",
    }
    ]
  },
    
  { id : "monumenten",
    name : "Monumenten",
    attributes:    [
      
    { id : "monumenten.monumenttype",
      name : "Monumenttype",
      type : "string",
      vocabulary : [  { id: 'voc-mnmt-tp-001', label: 'Gemeentelijk monument' } ,   { id: 'voc-mnmt-tp-002', label: 'Rijksmonument' } ,   { id: 'voc-mnmt-tp-003', label: 'Voorgesteld voor gemeentelijke lijst' } ,   { id: 'voc-mnmt-tp-004', label: 'Anderszins monumentaal' } ,  ]
    }
    ]
  },
    
  { id : "officiele-bekendmakingen",
    name : "Officiële Bekendmakingen",
    attributes:    [
      
    { id : "officiele-bekendmakingen.ob-documenttype",
      name : "Documenttype",
      type : "string",
    }
    ]
  },
    
  { id : "zaakgegevens",
    name : "Zaakgegevens",
    attributes:    [
      
    { id : "zaakgegevens.zk-soort",
      name : "Zaaksoort",
      type : "string",
      vocabulary : [  { id: '000000', label: 'Niet ingevuld' } ,   { id: 'CHZ_CAL', label: 'Calamiteiten' } ,   [  { id: 'controlezaak', label: 'Controlezaak' } ,   { id: 'CHZ_OCA', label: 'Opleveringscontrole Asbest' } ,   { id: 'CHZ_OCBAR', label: 'Opleveringscontrole BAR' } ,   { id: 'CHZ_OCEVM', label: 'Opleveringscontrole Evenementen' } ,   { id: 'CHZ_HUIS', label: 'Opleveringscontrole Huisvesting' } ,   { id: 'CHZ_OCR', label: 'Opleveringscontrole Renovatie' } ,   { id: 'CHZ_OCS', label: 'Opleveringscontrole Sloop' } ,   { id: 'CHZ_OCB1', label: 'Opleveringscontrole bouw cat. 1' } ,   { id: 'CHZ_OCB2', label: 'Opleveringscontrole bouw cat. 2' } ,   { id: 'CHZ_OCB3', label: 'Opleveringscontrole bouw cat. 3' } ,   { id: 'CHZ_OCB4', label: 'Opleveringscontrole bouw cat. 4' } ,   { id: 'CHZ_SPL', label: 'Opleveringscontrole splitsingen' } ,   { id: 'CHZ_PCTBAR', label: 'Projectcontrole BAR' } ,   { id: 'CHZ_BRPLVL', label: 'Projectcontrole Breedplaatvloeren' } ,   { id: 'CHZ_PCGAL', label: 'Projectcontrole Galerijvloeren flatgebouwen' } ,   { id: 'CHZ_PCTOM', label: 'Projectcontrole Omzettingen' } ,   { id: 'CHZ_PCTOGI', label: 'Projectcontrole Omzettingen Geweigerd/Ingetrokken' } ,   { id: 'CHZ_BLS', label: 'Projectcontrole constructieve veiligheid balkons' } ,  ] ,   [  { id: 'klachtenzaak', label: 'Klacht/meldingzaak' } ,   { id: 'HZ_MBG', label: 'Melding brandveilig gebruik' } ,   { id: 'HZ_GBM', label: 'Gebruiksmelding' } ,   { id: 'HZ_SLM', label: 'Sloopmelding' } ,   { id: 'CHZ_KLA', label: 'Klacht/Melding' } ,   { id: 'KLA', label: 'klacht' } ,  ] ,   [  { id: 'vergunning', label: 'Vergunning' } ,   { id: 'HZ_BWT', label: 'Bouwvergunning uit BWT4all' } ,   { id: 'HZ_IOG', label: 'Inname Openbare Grond' } ,   { id: 'HZ_WABO', label: 'Omgevingsvergunning' } ,   { id: 'HZ_OAPV', label: 'Ontheffing APV (Incidentele Geluidsontheffingen tbv Civiel en Bouw)' } ,   [  { id: 'HZ_OWR', label: 'Onttrekking-/ Omzetting-/ Samenvoeging van Woonruimte' } ,   { id: 'HZ_OWR_O', label: 'Omzetting' } ,   { id: 'HZ_OWR_T', label: 'Transformatie' } ,  ] ,   { id: 'HZ_SPL', label: 'Splitsingsvergunning' } ,   { id: 'HZ_WIJ', label: 'Wijzigen Omgevingsvergunning' } ,  ] ,  ]
    },
      
    { id : "zaakgegevens.zk-status",
      name : "Voortgangsstatus",
      type : "string",
      vocabulary : [  { id: 'C', label: 'Concept' } ,   { id: 'G', label: 'Gesloten' } ,   { id: 'O', label: 'Open' } ,   { id: 'T', label: 'Toekomstig' } ,  ]
    }
    ]
  }
  ];

/**
 * The searchableAttributes determines the attribute ranking order (and also which attributes are searchable).
 * It is also possible to use object-type-sort-order to sort instead of using relevance ranking.
 **/
export const searchableAttributes = [
  "naam",
  "id",
  "_geo",
  "geo-EPSG28992",
  "bag-aob-id",
  "bag-aob-gebruiksdoel",
  "bag-aob-oppervlakte",
  "bag-num-id",
  "bag-num-id-neven",
  "bag-num-postcode",
  "bag-num-postcode-neven",
  "bag-num-volledig",
  "bag-num-volledig-neven",
  "bag-opr-id",
  "bag-opr-id-neven",
  "bag-opr-naam",
  "bag-opr-naam-neven",
  "bag-opr-volledig",
  "bag-pnd-geo",
  "bag-pnd-geo-EPSG28992",
  "bag-pnd-id",
  "bag-pnd-oorspronkelijk-bouwjaar",
  "bag-wpl-id",
  "bag-wpl-id-neven",
  "bag-wpl-naam",
  "bag-wpl-naam-neven",
  "bwk-wijknaam",
  "bwk-subwijknaam",
  "bwk-buurtnaam",
  "bwk-subbuurtnaam",
  "zk-nummer"
];

export interface GBPObject {
  "naam" : string;
  "id" : string;
  "object-type" : string;
  "object-type-sort-order" : string;
  "location-sort-value" : string;
  "pdok-locatie-id" : string;
  "_geo" : { "lat" : number; "lng" : number; };
  "links" : { "href-luchtfoto" : string; "href-streetview" : string; "href-topotijdreis" : string; "href-utrechtsarchief" : string; "href-ruimtelijkeplannen" : string; };
  "bag-aob" : { "bag-aob-id" : string; "bag-num-id" : string[]; "bag-pnd-id" : string[]; "bag-object-type" : string; "bag-aob-gebruiksdoel" : string[]; "bag-aob-oppervlakte" : number; "bag-aob-oppervlakte-interval" : string; "bag-aob-status" : string; "bag-aob-documentdatum" : Date; "bag-aob-documentnummer" : string; "bag-aob-voorkomen" : number; "geo-EPSG28992" : number[]; "dataset-id" : string; "imported" : Date; };
  "bag-opr" : { "bag-object-type" : string; "bag-opr-id" : string; "bag-opr-naam" : string; "bag-opr-volledig" : string; "bag-opr-type" : string; "bag-opr-status" : string; "bag-opr-geconstateerd" : string; "bag-opr-documentdatum" : Date; "bag-opr-documentnummer" : string; "bag-wpl-id" : string; };
  "bag-pnd" : { "bag-pnd-id" : string; "bag-pnd-oorspronkelijk-bouwjaar" : number; "bag-pnd-oorspronkelijk-bouwjaar-interval" : string; "bag-pnd-status" : string; "bag-pnd-geconstateerd" : string; "bag-pnd-documentdatum" : Date; "bag-pnd-documentnummer" : string; "bag-pnd-geo" : number[]; "bag-pnd-geo-EPSG28992" : number[]; "dataset-id" : string; "imported" : Date; };
  "bouwtechnische-kenmerken" : { "btk-kenmerk-id" : string[]; "btk-inspectiedatum" : Date; "btk-actie-nodig" : string; "dataset-id" : string; "imported" : Date; };
  "bwk" : { "bwk-wijkid" : string; "bwk-wijknaam" : string; "bwk-subwijknaam" : string; "bwk-buurtid" : string; "bwk-buurtnaam" : string; "bwk-subbuurtnaam" : string; "dataset-id" : string; "imported" : Date; };
  "hoofdadres" : { "bag-num-id" : string; "bag-num-volledig" : string; "bag-num-postcode" : string; "bag-num-huisnummer" : number; "bag-num-huisletter" : string; "bag-num-huisnummertoevoeging" : string; "bag-num-huisnummer-letter-aanduiding" : string; "bag-num-status" : string; "bag-num-documentdatum" : Date; "bag-num-documentnummer" : string; "bag-num-voorkomen" : number; "bag-opr-id" : string; "bag-opr-naam" : string; "bag-opr-type" : string; "bag-opr-status" : string; "bag-opr-documentdatum" : Date; "bag-opr-documentnummer" : string; "bag-opr-voorkomen" : number; "bag-wpl-id" : string; "bag-wpl-naam" : string; "bag-wpl-status" : string; "bag-wpl-documentdatum" : Date; "bag-wpl-documentnummer" : string; "bag-wpl-voorkomen" : number; };
  "monumenten" : { "bag-num-id" : string; "bag-pnd-id" : string; "monumenttype" : string; "monumentnummer" : string; "href-monumentenregister" : string[]; "dataset-id" : string; "imported" : Date; };
  "nevenadres" : { "bag-num-id-neven" : string; "bag-num-volledig-neven" : string; "bag-num-postcode-neven" : string; "bag-num-huisnummer-neven" : number; "bag-num-huisletter-neven" : string; "bag-num-huisnummertoevoeging-neven" : string; "bag-num-huisnummer-letter-aanduiding-neven" : string; "bag-opr-id-neven" : string; "bag-opr-naam-neven" : string; "bag-opr-type-neven" : string; "bag-wpl-id-neven" : string; "bag-wpl-naam-neven" : string; };
  "officiele-bekendmakingen" : { "publicatiedatum" : Date; "wijzigingsdatum" : Date; "identificatie" : string; "titel" : string; "ob-documenttype" : string[]; "ob-onderwerp" : string[]; "url-vindplaats" : string; "dataset-id" : string; "imported" : Date; };
  "zaakgegevens" : { "zk-nummer" : string; "omschrijving" : string; "zk-soort" : string[]; "zk-status" : string[]; "zk-besluit" : string[]; "date" : Date; "besluitdatum" : Date; "zk-startdatum" : Date; "zk-startdatum-gepland" : Date; "zk-einddatum" : Date; "zk-einddatum-gepland" : Date; "dataset-id" : string; "imported" : Date; };
}
