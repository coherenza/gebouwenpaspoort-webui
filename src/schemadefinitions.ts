
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
  "zon_zonnepanelen_2017": {
    "name": "Panelen in 2017",
    "type": "string",
    "id": "zon-zonnepanelen_2017"
  },
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
  "epl_pand_opnametype": {
    "name": "Opnametype",
    "type": "string",
    "id": "epl-pand-opnametype"
  },
  "epl_pand_eis_primaire_fossiele_energie": {
    "name": "Eis primaire fossiele energie (BENG2)",
    "type": "string",
    "id": "epl-pand-eis-primaire-fossiele-energie"
  },
  "epl_pand_aandeel_hernieuwbare_energie_EMG_forfaitair": {
    "name": "Aandeel hernieuwbare energie EMG forfaitair",
    "type": "string",
    "id": "epl-pand-aandeel-hernieuwbare-energie-EMG-forfaitair"
  },
  "bag_pnd_geo": {
    "name": "Coördinaten",
    "type": "string",
    "id": "bag-pnd-geo"
  },
  "zon_zonnepanelen_2018": {
    "name": "Panelen in 2018",
    "type": "string",
    "id": "zon-zonnepanelen_2018"
  },
  "ob_documenttype": {
    "name": "Documenttype",
    "type": "string",
    "id": "ob-documenttype"
  },
  "epl_pand_gebouwtype": {
    "name": "Gebouwtype",
    "type": "string",
    "id": "epl-pand-gebouwtype"
  },
  "monumenttype": {
    "name": "Monumenttype",
    "type": "string",
    "id": "monumenttype"
  },
  "epl_pand_eis_temperatuuroverschrijding": {
    "name": "Temperatuuroverschrijding",
    "type": "string",
    "id": "epl-pand-eis-temperatuuroverschrijding"
  },
  "bag_num_huisnummertoevoeging_neven": {
    "name": "Huisnummertoevoeging",
    "type": "string",
    "id": "bag-num-huisnummertoevoeging-neven"
  },
  "zon_zonnepanelen_2019": {
    "name": "Panelen in 2019",
    "type": "string",
    "id": "zon-zonnepanelen_2019"
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
  "epl_pand_is_op_basis_van_referentie_gebouw": {
    "name": "Is i.b.v. referentiegebouw",
    "type": "string",
    "id": "epl-pand-is-op-basis-van-referentie-gebouw"
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
  "zon_zonnepaneel_oppervlakte": {
    "name": "Oppervlakte van de zonnepanelen",
    "type": "string",
    "id": "zon-zonnepaneel_oppervlakte"
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
  "dossier_nummer": {
    "name": "Dossiernummer",
    "type": "string",
    "id": "dossier-nummer"
  },
  "bag_opr_type_neven": {
    "name": "Type",
    "type": "string",
    "id": "bag-opr-type-neven"
  },
  "jaar": {
    "name": "Jaar",
    "filterType": "range",
    "type": "string",
    "id": "jaar"
  },
  "bwk_subwijknaam": {
    "name": "Subwijk",
    "type": "string",
    "id": "bwk-subwijknaam"
  },
  "epl_pand_opnamedatum": {
    "name": "Opnamedatum",
    "type": "date",
    "id": "epl-pand-opnamedatum"
  },
  "epl_meting_geldig_tot": {
    "name": "Meting geldig tot",
    "type": "date",
    "id": "epl-meting-geldig-tot"
  },
  "bag_opr_id_neven": {
    "name": "Identificatie openbare ruimte",
    "type": "string",
    "id": "bag-opr-id-neven"
  },
  "epl_pand_primaire_fossiele_energie_EMG_forfaitair": {
    "name": "Primaire fossiele energie EMG forfaitair",
    "type": "string",
    "id": "epl-pand-primaire-fossiele-energie-EMG-forfaitair"
  },
  "epl_pand_eis_aandeel_hernieuwbare_energie": {
    "name": "Eis aandeel hernieuwbare energie (BENG3)",
    "type": "string",
    "id": "epl-pand-eis-aandeel-hernieuwbare-energie"
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
  "epl_pand_gebruiksoppervlakte_thermische_zone": {
    "name": "Gebruiksoppervlakte thermische zone",
    "type": "string",
    "id": "epl-pand-gebruiksoppervlakte-thermische-zone"
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
  "epl_pand_gebouwklasse": {
    "name": "Gebouwklasse",
    "type": "string",
    "id": "epl-pand-gebouwklasse"
  },
  "epl_pand_status": {
    "name": "Pand status",
    "type": "string",
    "id": "epl-pand-status"
  },
  "bag_pnd_oorspronkelijk_bouwjaar": {
    "name": "Bouwjaar",
    "filterType": "range",
    "type": "string",
    "id": "bag-pnd-oorspronkelijk-bouwjaar"
  },
  "epl_pand_warmtebehoefte": {
    "name": "Warmtebehoefte",
    "type": "string",
    "id": "epl-pand-warmtebehoefte"
  },
  "dataset_label": {
    "name": "Herkomst",
    "type": "string",
    "id": "dataset-label"
  },
  "bag_num_huisletter": {
    "name": "Huisletter",
    "type": "string",
    "id": "bag-num-huisletter"
  },
  "epl_pand_SBIcode": {
    "name": "SBI Code",
    "type": "string",
    "id": "epl-pand-SBIcode"
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
  "epl_pand_energiebehoefte": {
    "name": "Energiebehoefte (EP1)",
    "type": "string",
    "id": "epl-pand-energiebehoefte"
  },
  "bag_pnd_geo_EPSG28992": {
    "name": "Coördinaten",
    "type": "string",
    "id": "bag-pnd-geo-EPSG28992"
  },
  "epl_pand_berekeningstype": {
    "name": "Berekeningstype",
    "type": "string",
    "id": "epl-pand-berekeningstype"
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
  "epl_pand_primaire_fossiele_energie": {
    "name": "Primaire fossiele energie (EP2)",
    "type": "string",
    "id": "epl-pand-primaire-fossiele-energie"
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
  "epl_pand_temperatuuroverschrijding": {
    "name": "Temperatuuroverschrijding",
    "type": "string",
    "id": "epl-pand-temperatuuroverschrijding"
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
  "zon_plat_dak_oppervlakte": {
    "name": "Oppervlakte van het (platte) dak",
    "type": "string",
    "id": "zon-plat_dak_oppervlakte"
  },
  "ob_onderwerp": {
    "name": "Onderwerp",
    "type": "string",
    "id": "ob-onderwerp"
  },
  "status": {
    "name": "Status",
    "type": "string",
    "id": "status"
  },
  "epl_pand_gebouwsubtype": {
    "name": "Gebouwsubtype",
    "type": "string",
    "id": "epl-pand-gebouwsubtype"
  },
  "bag_wpl_voorkomen": {
    "name": "Voorkomen",
    "type": "string",
    "id": "bag-wpl-voorkomen"
  },
  "epl_pand_detailaanduiding": {
    "name": "Detailkenmerk",
    "type": "string",
    "id": "epl-pand-detailaanduiding"
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
  "zon_zonnepanelen_2020": {
    "name": "Panelen in 2020",
    "type": "string",
    "id": "zon-zonnepanelen_2020"
  },
  "locatie_aanduiding": {
    "name": "Locatie aanduiding",
    "type": "string",
    "id": "locatie-aanduiding"
  },
  "bag_pnd_oorspronkelijk_bouwjaar_interval": {
    "name": "Bouwjaar",
    "filterType": "intervals",
    "type": "string",
    "id": "bag-pnd-oorspronkelijk-bouwjaar-interval"
  },
  "epl_pand_energieklasse": {
    "name": "Energieklasse",
    "type": "string",
    "id": "epl-pand-energieklasse"
  },
  "bag_aob_oppervlakte_interval": {
    "name": "Oppervlakte",
    "filterType": "intervals",
    "type": "string",
    "id": "bag-aob-oppervlakte-interval"
  },
  "zon_zonnepanelen_2021": {
    "name": "Panelen in 2021",
    "type": "string",
    "id": "zon-zonnepanelen_2021"
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
      },
      {
        "name": "WOZ-waardeloket",
        "type": "URL",
        "id": "href-wozwaardeloket"
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
  "zon_zonnepanelen_2022": {
    "name": "Panelen in 2022",
    "type": "string",
    "id": "zon-zonnepanelen_2022"
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
  "epl_pand_aandeel_hernieuwbare_energie": {
    "name": "Aandeel hernieuwbare energie (EP3)",
    "type": "string",
    "id": "epl-pand-aandeel-hernieuwbare-energie"
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
  "jaar_interval": {
    "name": "Jaar",
    "filterType": "intervals",
    "type": "string",
    "id": "jaar-interval"
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
  "zon_gemeentelijk_vastgoed": {
    "name": "Gemeentelijk vastgoed",
    "type": "string",
    "id": "zon-gemeentelijk_vastgoed"
  },
  "epl_pand_energieindex_met_EMG_forfaitair": {
    "name": "Energieindex met EMG forfaitair",
    "type": "string",
    "id": "epl-pand-energieindex-met-EMG-forfaitair"
  },
  "wijzigingsdatum": {
    "name": "Wijzigingsdatum",
    "type": "date",
    "id": "wijzigingsdatum"
  },
  "epl_pand_registratiedatum": {
    "name": "Registratiedatum",
    "type": "date",
    "id": "epl-pand-registratiedatum"
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
  "epl_pand_energieindex": {
    "name": "Prestatieindex",
    "type": "string",
    "id": "epl-pand-energieindex"
  },
  "bag_opr_type": {
    "name": "Type",
    "type": "string",
    "id": "bag-opr-type"
  },
  "epl_pand_energielabel_is_prive": {
    "name": "Is privé",
    "type": "string",
    "id": "epl-pand-energielabel-is-prive"
  },
  "epl_pand_eis_energiebehoefte": {
    "name": "Eis energiebehoefte (BENG1)",
    "type": "string",
    "id": "epl-pand-eis-energiebehoefte"
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
    },
      
    { id : "href-wozwaardeloket",
      name : "WOZ-waardeloket",
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
      
    { id : "bag-num-id",
      name : "Identificatie nummeraanduiding",
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
      
    { id : "dataset-label",
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
      
    { id : "dataset-label",
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
      vocabulary : [  [  { id: "gbp-btk-0010", label: "Balkon (info)" } ,   { id: "gbp-btk-00101", label: "Balkon aanwezig" } ,   { id: "gbp-btk-00105", label: "Balkon met stalen liggers" } ,   { id: "gbp-btk-00106", label: "Balkon, geen stalen liggers" } ,   { id: "gbp-btk-00107", label: "Balkon, stalen liggers n.v.t." } ,   { id: "gbp-btk-00108", label: "Balkon afwezig" } ,  ] ,   [  { id: "gbp-btk-0100", label: "Hekwerk (info)" } ,   { id: "gbp-btk-01001", label: "Hekwerk aanwezig" } ,   { id: "gbp-btk-01002", label: "Hekwerk afwezig" } ,  ] ,  ]
    },
      
    { id : "btk-inspectiedatum",
      name : "Inspectiedatum",
      type : "date",
    },
      
    { id : "btk-actie-nodig",
      name : "Actie nodig voor stalen ligger",
      type : "string",
    },
      
    { id : "dataset-label",
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
      
    { id : "dataset-label",
      name : "Herkomst",
      type : "string",
    },
      
    { id : "imported",
      name : "Geimporteerd op",
      type : "dateTime",
    }
    ]
  },
    
  { id : "energielabels",
    name : "Energielabels",
    attributes:    [
      
    { id : "epl-pand-energieklasse",
      name : "Energieklasse",
      type : "string",
      vocabulary : [  { id: "A+++++", label: "Energieklasse A+++++" } ,   { id: "A++++", label: "Energieklasse A++++" } ,   { id: "A+++", label: "Energieklasse A+++" } ,   { id: "A++", label: "Energieklasse A++" } ,   { id: "A+", label: "Energieklasse A+" } ,   { id: "A", label: "Energieklasse A" } ,   { id: "B", label: "Energieklasse B" } ,   { id: "C", label: "Energieklasse C" } ,   { id: "D", label: "Energieklasse D" } ,   { id: "E", label: "Energieklasse E" } ,   { id: "F", label: "Energieklasse F" } ,   { id: "G", label: "Energieklasse G" } ,  ]
    },
      
    { id : "epl-pand-opnamedatum",
      name : "Opnamedatum",
      type : "date",
    },
      
    { id : "epl-pand-opnametype",
      name : "Opnametype",
      type : "string",
    },
      
    { id : "epl-pand-status",
      name : "Pand status",
      type : "string",
    },
      
    { id : "epl-pand-berekeningstype",
      name : "Berekeningstype",
      type : "string",
    },
      
    { id : "epl-pand-energieindex",
      name : "Prestatieindex",
      type : "string",
    },
      
    { id : "epl-pand-energielabel-is-prive",
      name : "Is privé",
      type : "string",
    },
      
    { id : "epl-pand-is-op-basis-van-referentie-gebouw",
      name : "Is i.b.v. referentiegebouw",
      type : "string",
      vocabulary : [  { id: "0", label: "Nee" } ,   { id: "1", label: "Ja" } ,  ]
    },
      
    { id : "epl-pand-gebouwklasse",
      name : "Gebouwklasse",
      type : "string",
      vocabulary : [  { id: "W", label: "Woningbouw" } ,   { id: "U", label: "Utiliteitsbouw" } ,  ]
    },
      
    { id : "epl-meting-geldig-tot",
      name : "Meting geldig tot",
      type : "date",
    },
      
    { id : "epl-pand-registratiedatum",
      name : "Registratiedatum",
      type : "date",
    },
      
    { id : "epl-pand-detailaanduiding",
      name : "Detailkenmerk",
      type : "string",
    },
      
    { id : "epl-pand-gebouwtype",
      name : "Gebouwtype",
      type : "string",
    },
      
    { id : "epl-pand-gebouwsubtype",
      name : "Gebouwsubtype",
      type : "string",
    },
      
    { id : "epl-pand-SBIcode",
      name : "SBI Code",
      type : "string",
      vocabulary : [  [  { id: "C", label: "[C] Industrie" } ,   { id: "18", label: "[18] Drukkerijen, reproductie van opgenomen media" } ,   { id: "20", label: "[20] Vervaardiging van chemische producten" } ,   { id: "25", label: "[25] Vervaardiging van producten van metaal (geen machines en apparaten)" } ,   { id: "31", label: "[31] Vervaardiging van meubels" } ,  ] ,   [  { id: "D", label: "[D] Productie en distributie van en handel in elektriciteit, aardgas, stoom en gekoelde lucht" } ,   { id: "35", label: "[35] Productie en distributie van en handel in elektriciteit, aardgas, stoom en gekoelde lucht" } ,  ] ,   [  { id: "E", label: "[E] Winning en distributie van water; afval- en afvalwaterbeheer en sanering" } ,   { id: "38", label: "[38] Afvalinzameling en -behandeling; voorbereiding tot recycling" } ,  ] ,   [  { id: "F", label: "[F] Bouwnijverheid" } ,   { id: "41", label: "[41] Algemene burgerlijke en utiliteitsbouw en projectontwikkeling" } ,   [  { id: "42", label: "[42] Grond-, water- en wegenbouw (geen grondverzet)" } ,   { id: "42.1", label: "[42.1] Bouw van wegen, spoorwegen en kunstwerken" } ,  ] ,   [  { id: "43", label: "[43] Gespecialiseerde werkzaamheden in de bouw" } ,   { id: "43.9", label: "[43.9] Dakbouw en overige gespecialiseerde werkzaamheden in de bouw" } ,  ] ,  ] ,   [  { id: "G", label: "[G] Groot- en detailhandel; reparatie van auto\'s" } ,   [  { id: "45", label: "[45] Handel in en reparatie van auto\'s, motorfietsen en aanhangers" } ,   [  { id: "45.2", label: "[45.2] Gespecialiseerde reparatie van auto\'s" } ,   [  { id: "45.20", label: "[45.20] Gespecialiseerde reparatie van auto\'s" } ,   { id: "45.20.3", label: "[45.20.3] Reparatie van specifieke auto-onderdelen" } ,  ] ,  ] ,   [  { id: "45.3", label: "[45.3] Handel in auto-onderdelen en -accessoires" } ,   [  { id: "45.31", label: "[45.31] Groothandel en handelsbemiddeling in auto-onderdelen en -accessoires" } ,   { id: "45.31.1", label: "[45.31.1] Groothandel en handelsbemiddeling in auto-onderdelen en -accessoires (geen banden)" } ,  ] ,  ] ,  ] ,   { id: "46", label: "[46] Groothandel en handelsbemiddeling (niet in auto\'s en motorfietsen)" } ,   [  { id: "47", label: "[47] Detailhandel (niet in auto\'s)" } ,   [  { id: "47.1", label: "[47.1] Supermarkten, warenhuizen en dergelijke winkels met een algemeen assortiment" } ,   { id: "47.11", label: "[47.11] Supermarkten en dergelijke winkels met een algemeen assortiment voedings- en genotmiddelen" } ,  ] ,   [  { id: "47.9", label: "[47.9] Detailhandel niet via winkel of markt" } ,   { id: "47.91", label: "[47.91] Detailhandel via internet" } ,   [  { id: "47.99", label: "[47.99] Colportage, straathandel en detailhandel via overige distributievormen" } ,   { id: "47.99.9", label: "[47.99.9] Detailhandel via overige distributievormen" } ,  ] ,  ] ,  ] ,  ] ,   [  { id: "H", label: "[H] Vervoer en opslag" } ,   { id: "49", label: "[49] Vervoer over land" } ,   { id: "52", label: "[52] Opslag en dienstverlening voor vervoer" } ,   [  { id: "53", label: "[53] Post en koeriers" } ,   [  { id: "53.2", label: "[53.2] Post zonder universele dienstverplichting en koeriers" } ,   [  { id: "53.20", label: "[53.20] Post zonder universele dienstverplichting en koeriers" } ,   { id: "53.20.1", label: "[53.20.1] Post zonder universele dienstverplichting" } ,  ] ,  ] ,  ] ,  ] ,   [  { id: "I", label: "[I] Logies-, maaltijd- en drankverstrekking" } ,   [  { id: "55", label: "[55] Logiesverstrekking" } ,   [  { id: "55.1", label: "[55.1] Hotels e.d." } ,   [  { id: "55.10", label: "[55.10] Hotels e.d." } ,   { id: "55.10.1", label: "[55.10.1] Hotel-restaurants" } ,  ] ,  ] ,  ] ,   [  { id: "56", label: "[56] Eet- en drinkgelegenheden" } ,   [  { id: "56.1", label: "[56.1] Restaurants, cafetaria\'s e.d." } ,   [  { id: "56.10", label: "[56.10] Restaurants, cafetaria\'s e.d. en ijssalons" } ,   { id: "56.10.2", label: "[56.10.2] Fastfoodrestaurants, cafetaria\'s,  ijssalons, eetkramen e.d." } ,  ] ,  ] ,   [  { id: "56.3", label: "[56.3] Cafés" } ,   { id: "56.30", label: "[56.30] Cafés" } ,  ] ,  ] ,  ] ,   [  { id: "J", label: "[J] Informatie en communicatie" } ,   { id: "58", label: "[58] Uitgeverijen" } ,   { id: "59", label: "[59] Productie en distributie van films en televisieprogramma´s; maken en uitgeven van geluidsopnamen" } ,   { id: "61", label: "[61] Telecommunicatie" } ,   { id: "62", label: "[62] Dienstverlenende activiteiten op het gebied van informatietechnologie" } ,   { id: "63", label: "[63] Dienstverlenende activiteiten op het gebied van informatie" } ,  ] ,   [  { id: "K", label: "[K] Financiële instellingen" } ,   [  { id: "64", label: "[64] Financiële instellingen (geen verzekeringen en pensioenfondsen)" } ,   { id: "64.3", label: "[64.3] Beleggingsinstellingen" } ,  ] ,   { id: "65", label: "[65] Verzekeringen en pensioenfondsen (geen verplichte sociale verzekeringen)" } ,   { id: "66", label: "[66] Overige financiële dienstverlening" } ,  ] ,   [  { id: "L", label: "[L] Verhuur van en handel in onroerend goed" } ,   [  { id: "68", label: "[68] Verhuur van en handel in onroerend goed" } ,   [  { id: "68.2", label: "[68.2] Verhuur van onroerend goed" } ,   [  { id: "68.20", label: "[68.20] Verhuur van onroerend goed" } ,   { id: "68.20.1", label: "[68.20.1] Woningbouwverenigingen en -stichtingen" } ,  ] ,  ] ,  ] ,  ] ,   [  { id: "M", label: "[M] Advisering, onderzoek en overige specialistische zakelijke dienstverlening" } ,   { id: "69", label: "[69] Rechtskundige dienstverlening, accountancy, belastingadvisering en administratie" } ,   { id: "70", label: "[70] Holdings (geen financiële), concerndiensten binnen eigen concern en managementadvisering" } ,   { id: "71", label: "[71] Architecten, ingenieurs en technisch ontwerp en advies; keuring en controle" } ,   { id: "72", label: "[72] Speur- en ontwikkelingswerk" } ,   { id: "73", label: "[73] Reclame en marktonderzoek" } ,   { id: "74", label: "[74] Industrieel ontwerp en vormgeving, fotografie, vertaling en overige consultancy" } ,   { id: "75", label: "[75] Veterinaire dienstverlening" } ,  ] ,   [  { id: "N", label: "[N] Verhuur van roerende goederen en overige zakelijke dienstverlening" } ,   { id: "77", label: "[77] Verhuur en lease van auto\'s, consumentenartikelen, machines en overige roerende goederen" } ,   { id: "78", label: "[78] Arbeidsbemiddeling, uitzendbureaus en personeelsbeheer" } ,   { id: "79", label: "[79] Reisbemiddeling, reisorganisatie, toeristische informatie en reserveringsbureaus" } ,   { id: "81", label: "[81] Facility management, reiniging en landschapsverzorging" } ,   [  { id: "82", label: "[82] Overige zakelijke dienstverlening" } ,   [  { id: "82.9", label: "[82.9] Overige zakelijke dienstverlening(rest)" } ,   [  { id: "82.99", label: "[82.99] Overige zakelijke dienstverlening (rest)" } ,   { id: "82.99.9", label: "[82.99.9] Overige zakelijke dienstverlening (rest)" } ,  ] ,  ] ,  ] ,  ] ,   [  { id: "O", label: "[O] Openbaar bestuur, overheidsdiensten en verplichte sociale verzekeringen" } ,   { id: "84", label: "[84] Openbaar bestuur, overheidsdiensten en verplichte sociale verzekeringen" } ,  ] ,   [  { id: "P", label: "[P] Onderwijs" } ,   [  { id: "85", label: "[85] Onderwijs" } ,   [  { id: "85.2", label: "[85.2] Primair en speciaal onderwijs" } ,   [  { id: "85.20", label: "[85.20] Primair en speciaal onderwijs" } ,   { id: "85.20.1", label: "[85.20.1] Basisonderwijs voor leerplichtigen" } ,  ] ,  ] ,  ] ,  ] ,   [  { id: "Q", label: "[Q] Gezondheids- en welzijnszorg" } ,   [  { id: "86", label: "[86] Gezondheidszorg" } ,   [  { id: "86.1", label: "[86.1] Ziekenhuizen en geestelijke gezondheids- en verslavingszorg met overnachting" } ,   [  { id: "86.10", label: "[86.10] Ziekenhuizen en geestelijke gezondheids- en verslavingszorg met overnachting" } ,   { id: "86.10.3", label: "[86.10.3] Categorale ziekenhuizen" } ,  ] ,  ] ,   [  { id: "86.2", label: "[86.2] Medische en tandheelkundige praktijken" } ,   { id: "86.21", label: "[86.21] Praktijken van huisartsen" } ,  ] ,   [  { id: "86.9", label: "[86.9] Paramedische praktijken en overige gezondheidszorg zonder overnachting" } ,   [  { id: "86.92", label: "[86.92] Overige aanbieders van gezondheidszorg zonder overnachting en gezondheidsondersteunende diensten" } ,   { id: "86.92.4", label: "[86.92.4] Medische laboratoria, trombosediensten en overig behandelingsondersteunend onderzoek" } ,  ] ,  ] ,  ] ,   { id: "87", label: "[87] Verpleging, verzorging en begeleiding met overnachting" } ,   [  { id: "88", label: "[88] Maatschappelijke dienstverlening zonder overnachting" } ,   [  { id: "88.9", label: "[88.9] Maatschappelijke dienstverlening zonder overnachting niet specifiek gericht op ouderen en gehandicapten" } ,   [  { id: "88.91", label: "[88.91] Kinderopvang en peuterspeelzaalwerk" } ,   { id: "88.91.1", label: "[88.91.1] Kinderopvang" } ,  ] ,  ] ,  ] ,  ] ,   [  { id: "R", label: "[R] Cultuur, sport en recreatie" } ,   { id: "90", label: "[90] Kunst" } ,   [  { id: "91", label: "[91] Culturele uitleencentra, openbare archieven, musea, dieren- en plantentuinen, natuurbehoud" } ,   [  { id: "91.0", label: "[91.0] Culturele uitleencentra, openbare archieven, musea, dieren- en plantentuinen, natuurbehoud" } ,   [  { id: "91.02", label: "[91.02] Musea, kunstgalerieën en –expositieruimten" } ,   { id: "91.02.1", label: "[91.02.1] Musea" } ,  ] ,  ] ,  ] ,   { id: "92", label: "[92] Loterijen en kansspelen" } ,   [  { id: "93", label: "[93] Sport en recreatie" } ,   [  { id: "93.1", label: "[93.1] Sport" } ,   [  { id: "93.12", label: "[93.12] Buitensport" } ,   { id: "93.12.1", label: "[93.12.1] Veldvoetbal" } ,  ] ,   { id: "93.13", label: "[93.13] Fitnesscentra" } ,  ] ,  ] ,  ] ,   [  { id: "S", label: "[S] Overige dienstverlening" } ,   { id: "94", label: "[94] Levensbeschouwelijke en politieke organisaties, belangen- en ideële organisaties, hobbyclubs" } ,   { id: "95", label: "[95] Reparatie van computers en consumentenartikelen" } ,   { id: "96", label: "[96] Wellness en overige dienstverlening; uitvaartbranche" } ,  ] ,  ]
    },
      
    { id : "epl-pand-gebruiksoppervlakte-thermische-zone",
      name : "Gebruiksoppervlakte thermische zone",
      type : "string",
    },
      
    { id : "epl-pand-energiebehoefte",
      name : "Energiebehoefte (EP1)",
      type : "string",
    },
      
    { id : "epl-pand-eis-energiebehoefte",
      name : "Eis energiebehoefte (BENG1)",
      type : "string",
    },
      
    { id : "epl-pand-primaire-fossiele-energie",
      name : "Primaire fossiele energie (EP2)",
      type : "string",
    },
      
    { id : "epl-pand-eis-primaire-fossiele-energie",
      name : "Eis primaire fossiele energie (BENG2)",
      type : "string",
    },
      
    { id : "epl-pand-primaire-fossiele-energie-EMG-forfaitair",
      name : "Primaire fossiele energie EMG forfaitair",
      type : "string",
    },
      
    { id : "epl-pand-aandeel-hernieuwbare-energie",
      name : "Aandeel hernieuwbare energie (EP3)",
      type : "string",
    },
      
    { id : "epl-pand-eis-aandeel-hernieuwbare-energie",
      name : "Eis aandeel hernieuwbare energie (BENG3)",
      type : "string",
    },
      
    { id : "epl-pand-aandeel-hernieuwbare-energie-EMG-forfaitair",
      name : "Aandeel hernieuwbare energie EMG forfaitair",
      type : "string",
    },
      
    { id : "epl-pand-temperatuuroverschrijding",
      name : "Temperatuuroverschrijding",
      type : "string",
    },
      
    { id : "epl-pand-eis-temperatuuroverschrijding",
      name : "Temperatuuroverschrijding",
      type : "string",
    },
      
    { id : "epl-pand-warmtebehoefte",
      name : "Warmtebehoefte",
      type : "string",
    },
      
    { id : "epl-pand-energieindex-met-EMG-forfaitair",
      name : "Energieindex met EMG forfaitair",
      type : "string",
    },
      
    { id : "dataset-label",
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
      
    { id : "bag-num-id",
      name : "Identificatie nummeraanduiding",
      type : "string",
    },
      
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
      
    { id : "bag-num-id",
      name : "Identificatie nummeraanduiding",
      type : "string",
    },
      
    { id : "monumenttype",
      name : "Monumenttype",
      type : "string",
      vocabulary : [  { id: "voc-mnmt-tp-001", label: "Gemeentelijk monument" } ,   { id: "voc-mnmt-tp-002", label: "Rijksmonument" } ,   { id: "voc-mnmt-tp-003", label: "Voorgesteld voor gemeentelijke lijst" } ,   { id: "voc-mnmt-tp-004", label: "Anderszins monumentaal" } ,  ]
    },
      
    { id : "monumentnummer",
      name : "Monumentnummer",
      type : "string",
    },
      
    { id : "href-monumentenregister",
      name : "Monumentenregister",
      type : "URL",
    },
      
    { id : "dataset-label",
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
      
    { id : "bag-num-id-neven",
      name : "Identificatie nummeraanduiding",
      type : "string",
    },
      
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
      
    { id : "jaar",
      name : "Jaar",
      type : "string",
      filterType : "range",
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
      
    { id : "dataset-label",
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
      vocabulary : [  { id: "CHZ_CAL", label: "Calamiteiten" } ,   [  { id: "controlezaak", label: "Controlezaak" } ,   { id: "CHZ_OCA", label: "Opleveringscontrole Asbest" } ,   { id: "CHZ_OCBAR", label: "Opleveringscontrole BAR" } ,   { id: "CHZ_OCEVM", label: "Opleveringscontrole Evenementen" } ,   { id: "CHZ_HUIS", label: "Opleveringscontrole Huisvesting" } ,   { id: "CHZ_OCR", label: "Opleveringscontrole Renovatie" } ,   { id: "CHZ_OCS", label: "Opleveringscontrole Sloop" } ,   { id: "CHZ_OCB1", label: "Opleveringscontrole bouw cat. 1" } ,   { id: "CHZ_OCB2", label: "Opleveringscontrole bouw cat. 2" } ,   { id: "CHZ_OCB3", label: "Opleveringscontrole bouw cat. 3" } ,   { id: "CHZ_OCB4", label: "Opleveringscontrole bouw cat. 4" } ,   { id: "CHZ_SPL", label: "Opleveringscontrole splitsingen" } ,   { id: "CHZ_PCTBAR", label: "Projectcontrole BAR" } ,   { id: "CHZ_BRPLVL", label: "Projectcontrole Breedplaatvloeren" } ,   { id: "CHZ_PCGAL", label: "Projectcontrole Galerijvloeren flatgebouwen" } ,   { id: "CHZ_BLS", label: "Projectcontrole constructieve veiligheid balkons" } ,  ] ,   [  { id: "klachtenzaak", label: "Klacht/meldingzaak" } ,   { id: "HZ_MBG", label: "Melding brandveilig gebruik" } ,   { id: "HZ_GBM", label: "Gebruiksmelding" } ,   { id: "HZ_SLM", label: "Sloopmelding" } ,   { id: "CHZ_KLA", label: "Klacht/Melding" } ,   { id: "KLA", label: "klacht" } ,  ] ,   [  { id: "vergunning", label: "Vergunning" } ,   { id: "HZ_BWT", label: "Bouwvergunning uit BWT4all" } ,   { id: "HZ_IOG", label: "Inname Openbare Grond" } ,   { id: "HZ_WABO", label: "Omgevingsvergunning" } ,   { id: "HZ_OAPV", label: "Ontheffing APV (Incidentele Geluidsontheffingen tbv Civiel en Bouw)" } ,   [  { id: "HZ_OWR", label: "Onttrekking-/ Omzetting-/ Samenvoeging van Woonruimte" } ,   { id: "HZ_OWR_O", label: "Omzetting" } ,   { id: "HZ_OWR_T", label: "Transformatie" } ,  ] ,   { id: "HZ_SPL", label: "Splitsingsvergunning" } ,   { id: "HZ_WIJ", label: "Wijzigen Omgevingsvergunning" } ,  ] ,  ]
    },
      
    { id : "zk-status",
      name : "Voortgangsstatus",
      type : "string",
      vocabulary : [  { id: "C", label: "Concept" } ,   { id: "G", label: "Gesloten" } ,   { id: "O", label: "Open" } ,   { id: "T", label: "Toekomstig" } ,  ]
    },
      
    { id : "status",
      name : "Status",
      type : "string",
    },
      
    { id : "zk-besluit",
      name : "Besluit",
      type : "string",
      vocabulary : [  { id: "voc-zk-besluit-001", label: "Onbekend" } ,   { id: "voc-zk-besluit-002", label: "Aankondiging Intrekking" } ,   { id: "voc-zk-besluit-003", label: "Afgewezen" } ,   { id: "voc-zk-besluit-004", label: "Akkoord" } ,   { id: "voc-zk-besluit-005", label: "Besluit Intrekking" } ,   { id: "voc-zk-besluit-006", label: "Beëindigd" } ,   { id: "voc-zk-besluit-007", label: "Buiten behandeling gelaten" } ,   { id: "voc-zk-besluit-008", label: "Buiten behandeling gesteld" } ,   { id: "voc-zk-besluit-021", label: "Deels toegekend" } ,   { id: "voc-zk-besluit-009", label: "Geen afwijking" } ,   { id: "voc-zk-besluit-010", label: "Gelegaliseerd" } ,   { id: "voc-zk-besluit-011", label: "Gerepareerd" } ,   { id: "voc-zk-besluit-012", label: "Geweigerd" } ,   { id: "voc-zk-besluit-013", label: "Ingetrokken" } ,   { id: "voc-zk-besluit-014", label: "Niet nodig" } ,   { id: "voc-zk-besluit-015", label: "Toegekend" } ,   { id: "voc-zk-besluit-019", label: "Van rechtswege afgewezen" } ,   { id: "voc-zk-besluit-020", label: "Van rechtswege toegekend" } ,   { id: "voc-zk-besluit-016", label: "Vergunningvrij" } ,   { id: "voc-zk-besluit-017", label: "Verleend" } ,   { id: "voc-zk-besluit-018", label: "Verwerkt" } ,  ]
    },
      
    { id : "locatie-aanduiding",
      name : "Locatie aanduiding",
      type : "string",
    },
      
    { id : "dossier-nummer",
      name : "Dossiernummer",
      type : "string",
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
      
    { id : "publicatiedatum",
      name : "Publicatiedatum",
      type : "date",
    },
      
    { id : "dataset-label",
      name : "Herkomst",
      type : "string",
    },
      
    { id : "imported",
      name : "Geimporteerd op",
      type : "dateTime",
    }
    ]
  },
    
  { id : "zonnepanelen",
    name : "Zonnepanelen",
    attributes:    [
      
    { id : "zon-zonnepanelen_2022",
      name : "Panelen in 2022",
      type : "string",
      vocabulary : [  { id: "0", label: "Nee" } ,   { id: "1", label: "Ja" } ,  ]
    },
      
    { id : "zon-zonnepanelen_2021",
      name : "Panelen in 2021",
      type : "string",
      vocabulary : [  { id: "0", label: "Nee" } ,   { id: "1", label: "Ja" } ,  ]
    },
      
    { id : "zon-zonnepanelen_2020",
      name : "Panelen in 2020",
      type : "string",
      vocabulary : [  { id: "0", label: "Nee" } ,   { id: "1", label: "Ja" } ,  ]
    },
      
    { id : "zon-zonnepanelen_2019",
      name : "Panelen in 2019",
      type : "string",
      vocabulary : [  { id: "0", label: "Nee" } ,   { id: "1", label: "Ja" } ,  ]
    },
      
    { id : "zon-zonnepanelen_2018",
      name : "Panelen in 2018",
      type : "string",
      vocabulary : [  { id: "0", label: "Nee" } ,   { id: "1", label: "Ja" } ,  ]
    },
      
    { id : "zon-zonnepanelen_2017",
      name : "Panelen in 2017",
      type : "string",
      vocabulary : [  { id: "0", label: "Nee" } ,   { id: "1", label: "Ja" } ,  ]
    },
      
    { id : "zon-gemeentelijk_vastgoed",
      name : "Gemeentelijk vastgoed",
      type : "string",
      vocabulary : [  { id: "0", label: "Nee" } ,   { id: "1", label: "Ja" } ,  ]
    },
      
    { id : "zon-plat_dak_oppervlakte",
      name : "Oppervlakte van het (platte) dak",
      type : "string",
    },
      
    { id : "zon-zonnepaneel_oppervlakte",
      name : "Oppervlakte van de zonnepanelen",
      type : "string",
    },
      
    { id : "dataset-label",
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
      vocabulary : [  [  { id: "gbp-btk-0010", label: "Balkon (info)" } ,   { id: "gbp-btk-00101", label: "Balkon aanwezig" } ,   { id: "gbp-btk-00105", label: "Balkon met stalen liggers" } ,   { id: "gbp-btk-00106", label: "Balkon, geen stalen liggers" } ,   { id: "gbp-btk-00107", label: "Balkon, stalen liggers n.v.t." } ,   { id: "gbp-btk-00108", label: "Balkon afwezig" } ,  ] ,   [  { id: "gbp-btk-0100", label: "Hekwerk (info)" } ,   { id: "gbp-btk-01001", label: "Hekwerk aanwezig" } ,   { id: "gbp-btk-01002", label: "Hekwerk afwezig" } ,  ] ,  ]
    },
      
    { id : "bouwtechnische-kenmerken.btk-actie-nodig",
      name : "Actie nodig voor stalen ligger",
      type : "string",
    }
    ]
  },
    
  { id : "energielabels",
    name : "Energielabels",
    attributes:    [
      
    { id : "energielabels.epl-pand-energieklasse",
      name : "Energieklasse",
      type : "string",
      vocabulary : [  { id: "A+++++", label: "Energieklasse A+++++" } ,   { id: "A++++", label: "Energieklasse A++++" } ,   { id: "A+++", label: "Energieklasse A+++" } ,   { id: "A++", label: "Energieklasse A++" } ,   { id: "A+", label: "Energieklasse A+" } ,   { id: "A", label: "Energieklasse A" } ,   { id: "B", label: "Energieklasse B" } ,   { id: "C", label: "Energieklasse C" } ,   { id: "D", label: "Energieklasse D" } ,   { id: "E", label: "Energieklasse E" } ,   { id: "F", label: "Energieklasse F" } ,   { id: "G", label: "Energieklasse G" } ,  ]
    },
      
    { id : "energielabels.epl-pand-SBIcode",
      name : "SBI Code",
      type : "string",
      vocabulary : [  [  { id: "C", label: "[C] Industrie" } ,   { id: "18", label: "[18] Drukkerijen, reproductie van opgenomen media" } ,   { id: "20", label: "[20] Vervaardiging van chemische producten" } ,   { id: "25", label: "[25] Vervaardiging van producten van metaal (geen machines en apparaten)" } ,   { id: "31", label: "[31] Vervaardiging van meubels" } ,  ] ,   [  { id: "D", label: "[D] Productie en distributie van en handel in elektriciteit, aardgas, stoom en gekoelde lucht" } ,   { id: "35", label: "[35] Productie en distributie van en handel in elektriciteit, aardgas, stoom en gekoelde lucht" } ,  ] ,   [  { id: "E", label: "[E] Winning en distributie van water; afval- en afvalwaterbeheer en sanering" } ,   { id: "38", label: "[38] Afvalinzameling en -behandeling; voorbereiding tot recycling" } ,  ] ,   [  { id: "F", label: "[F] Bouwnijverheid" } ,   { id: "41", label: "[41] Algemene burgerlijke en utiliteitsbouw en projectontwikkeling" } ,   [  { id: "42", label: "[42] Grond-, water- en wegenbouw (geen grondverzet)" } ,   { id: "42.1", label: "[42.1] Bouw van wegen, spoorwegen en kunstwerken" } ,  ] ,   [  { id: "43", label: "[43] Gespecialiseerde werkzaamheden in de bouw" } ,   { id: "43.9", label: "[43.9] Dakbouw en overige gespecialiseerde werkzaamheden in de bouw" } ,  ] ,  ] ,   [  { id: "G", label: "[G] Groot- en detailhandel; reparatie van auto\'s" } ,   [  { id: "45", label: "[45] Handel in en reparatie van auto\'s, motorfietsen en aanhangers" } ,   [  { id: "45.2", label: "[45.2] Gespecialiseerde reparatie van auto\'s" } ,   [  { id: "45.20", label: "[45.20] Gespecialiseerde reparatie van auto\'s" } ,   { id: "45.20.3", label: "[45.20.3] Reparatie van specifieke auto-onderdelen" } ,  ] ,  ] ,   [  { id: "45.3", label: "[45.3] Handel in auto-onderdelen en -accessoires" } ,   [  { id: "45.31", label: "[45.31] Groothandel en handelsbemiddeling in auto-onderdelen en -accessoires" } ,   { id: "45.31.1", label: "[45.31.1] Groothandel en handelsbemiddeling in auto-onderdelen en -accessoires (geen banden)" } ,  ] ,  ] ,  ] ,   { id: "46", label: "[46] Groothandel en handelsbemiddeling (niet in auto\'s en motorfietsen)" } ,   [  { id: "47", label: "[47] Detailhandel (niet in auto\'s)" } ,   [  { id: "47.1", label: "[47.1] Supermarkten, warenhuizen en dergelijke winkels met een algemeen assortiment" } ,   { id: "47.11", label: "[47.11] Supermarkten en dergelijke winkels met een algemeen assortiment voedings- en genotmiddelen" } ,  ] ,   [  { id: "47.9", label: "[47.9] Detailhandel niet via winkel of markt" } ,   { id: "47.91", label: "[47.91] Detailhandel via internet" } ,   [  { id: "47.99", label: "[47.99] Colportage, straathandel en detailhandel via overige distributievormen" } ,   { id: "47.99.9", label: "[47.99.9] Detailhandel via overige distributievormen" } ,  ] ,  ] ,  ] ,  ] ,   [  { id: "H", label: "[H] Vervoer en opslag" } ,   { id: "49", label: "[49] Vervoer over land" } ,   { id: "52", label: "[52] Opslag en dienstverlening voor vervoer" } ,   [  { id: "53", label: "[53] Post en koeriers" } ,   [  { id: "53.2", label: "[53.2] Post zonder universele dienstverplichting en koeriers" } ,   [  { id: "53.20", label: "[53.20] Post zonder universele dienstverplichting en koeriers" } ,   { id: "53.20.1", label: "[53.20.1] Post zonder universele dienstverplichting" } ,  ] ,  ] ,  ] ,  ] ,   [  { id: "I", label: "[I] Logies-, maaltijd- en drankverstrekking" } ,   [  { id: "55", label: "[55] Logiesverstrekking" } ,   [  { id: "55.1", label: "[55.1] Hotels e.d." } ,   [  { id: "55.10", label: "[55.10] Hotels e.d." } ,   { id: "55.10.1", label: "[55.10.1] Hotel-restaurants" } ,  ] ,  ] ,  ] ,   [  { id: "56", label: "[56] Eet- en drinkgelegenheden" } ,   [  { id: "56.1", label: "[56.1] Restaurants, cafetaria\'s e.d." } ,   [  { id: "56.10", label: "[56.10] Restaurants, cafetaria\'s e.d. en ijssalons" } ,   { id: "56.10.2", label: "[56.10.2] Fastfoodrestaurants, cafetaria\'s,  ijssalons, eetkramen e.d." } ,  ] ,  ] ,   [  { id: "56.3", label: "[56.3] Cafés" } ,   { id: "56.30", label: "[56.30] Cafés" } ,  ] ,  ] ,  ] ,   [  { id: "J", label: "[J] Informatie en communicatie" } ,   { id: "58", label: "[58] Uitgeverijen" } ,   { id: "59", label: "[59] Productie en distributie van films en televisieprogramma´s; maken en uitgeven van geluidsopnamen" } ,   { id: "61", label: "[61] Telecommunicatie" } ,   { id: "62", label: "[62] Dienstverlenende activiteiten op het gebied van informatietechnologie" } ,   { id: "63", label: "[63] Dienstverlenende activiteiten op het gebied van informatie" } ,  ] ,   [  { id: "K", label: "[K] Financiële instellingen" } ,   [  { id: "64", label: "[64] Financiële instellingen (geen verzekeringen en pensioenfondsen)" } ,   { id: "64.3", label: "[64.3] Beleggingsinstellingen" } ,  ] ,   { id: "65", label: "[65] Verzekeringen en pensioenfondsen (geen verplichte sociale verzekeringen)" } ,   { id: "66", label: "[66] Overige financiële dienstverlening" } ,  ] ,   [  { id: "L", label: "[L] Verhuur van en handel in onroerend goed" } ,   [  { id: "68", label: "[68] Verhuur van en handel in onroerend goed" } ,   [  { id: "68.2", label: "[68.2] Verhuur van onroerend goed" } ,   [  { id: "68.20", label: "[68.20] Verhuur van onroerend goed" } ,   { id: "68.20.1", label: "[68.20.1] Woningbouwverenigingen en -stichtingen" } ,  ] ,  ] ,  ] ,  ] ,   [  { id: "M", label: "[M] Advisering, onderzoek en overige specialistische zakelijke dienstverlening" } ,   { id: "69", label: "[69] Rechtskundige dienstverlening, accountancy, belastingadvisering en administratie" } ,   { id: "70", label: "[70] Holdings (geen financiële), concerndiensten binnen eigen concern en managementadvisering" } ,   { id: "71", label: "[71] Architecten, ingenieurs en technisch ontwerp en advies; keuring en controle" } ,   { id: "72", label: "[72] Speur- en ontwikkelingswerk" } ,   { id: "73", label: "[73] Reclame en marktonderzoek" } ,   { id: "74", label: "[74] Industrieel ontwerp en vormgeving, fotografie, vertaling en overige consultancy" } ,   { id: "75", label: "[75] Veterinaire dienstverlening" } ,  ] ,   [  { id: "N", label: "[N] Verhuur van roerende goederen en overige zakelijke dienstverlening" } ,   { id: "77", label: "[77] Verhuur en lease van auto\'s, consumentenartikelen, machines en overige roerende goederen" } ,   { id: "78", label: "[78] Arbeidsbemiddeling, uitzendbureaus en personeelsbeheer" } ,   { id: "79", label: "[79] Reisbemiddeling, reisorganisatie, toeristische informatie en reserveringsbureaus" } ,   { id: "81", label: "[81] Facility management, reiniging en landschapsverzorging" } ,   [  { id: "82", label: "[82] Overige zakelijke dienstverlening" } ,   [  { id: "82.9", label: "[82.9] Overige zakelijke dienstverlening(rest)" } ,   [  { id: "82.99", label: "[82.99] Overige zakelijke dienstverlening (rest)" } ,   { id: "82.99.9", label: "[82.99.9] Overige zakelijke dienstverlening (rest)" } ,  ] ,  ] ,  ] ,  ] ,   [  { id: "O", label: "[O] Openbaar bestuur, overheidsdiensten en verplichte sociale verzekeringen" } ,   { id: "84", label: "[84] Openbaar bestuur, overheidsdiensten en verplichte sociale verzekeringen" } ,  ] ,   [  { id: "P", label: "[P] Onderwijs" } ,   [  { id: "85", label: "[85] Onderwijs" } ,   [  { id: "85.2", label: "[85.2] Primair en speciaal onderwijs" } ,   [  { id: "85.20", label: "[85.20] Primair en speciaal onderwijs" } ,   { id: "85.20.1", label: "[85.20.1] Basisonderwijs voor leerplichtigen" } ,  ] ,  ] ,  ] ,  ] ,   [  { id: "Q", label: "[Q] Gezondheids- en welzijnszorg" } ,   [  { id: "86", label: "[86] Gezondheidszorg" } ,   [  { id: "86.1", label: "[86.1] Ziekenhuizen en geestelijke gezondheids- en verslavingszorg met overnachting" } ,   [  { id: "86.10", label: "[86.10] Ziekenhuizen en geestelijke gezondheids- en verslavingszorg met overnachting" } ,   { id: "86.10.3", label: "[86.10.3] Categorale ziekenhuizen" } ,  ] ,  ] ,   [  { id: "86.2", label: "[86.2] Medische en tandheelkundige praktijken" } ,   { id: "86.21", label: "[86.21] Praktijken van huisartsen" } ,  ] ,   [  { id: "86.9", label: "[86.9] Paramedische praktijken en overige gezondheidszorg zonder overnachting" } ,   [  { id: "86.92", label: "[86.92] Overige aanbieders van gezondheidszorg zonder overnachting en gezondheidsondersteunende diensten" } ,   { id: "86.92.4", label: "[86.92.4] Medische laboratoria, trombosediensten en overig behandelingsondersteunend onderzoek" } ,  ] ,  ] ,  ] ,   { id: "87", label: "[87] Verpleging, verzorging en begeleiding met overnachting" } ,   [  { id: "88", label: "[88] Maatschappelijke dienstverlening zonder overnachting" } ,   [  { id: "88.9", label: "[88.9] Maatschappelijke dienstverlening zonder overnachting niet specifiek gericht op ouderen en gehandicapten" } ,   [  { id: "88.91", label: "[88.91] Kinderopvang en peuterspeelzaalwerk" } ,   { id: "88.91.1", label: "[88.91.1] Kinderopvang" } ,  ] ,  ] ,  ] ,  ] ,   [  { id: "R", label: "[R] Cultuur, sport en recreatie" } ,   { id: "90", label: "[90] Kunst" } ,   [  { id: "91", label: "[91] Culturele uitleencentra, openbare archieven, musea, dieren- en plantentuinen, natuurbehoud" } ,   [  { id: "91.0", label: "[91.0] Culturele uitleencentra, openbare archieven, musea, dieren- en plantentuinen, natuurbehoud" } ,   [  { id: "91.02", label: "[91.02] Musea, kunstgalerieën en –expositieruimten" } ,   { id: "91.02.1", label: "[91.02.1] Musea" } ,  ] ,  ] ,  ] ,   { id: "92", label: "[92] Loterijen en kansspelen" } ,   [  { id: "93", label: "[93] Sport en recreatie" } ,   [  { id: "93.1", label: "[93.1] Sport" } ,   [  { id: "93.12", label: "[93.12] Buitensport" } ,   { id: "93.12.1", label: "[93.12.1] Veldvoetbal" } ,  ] ,   { id: "93.13", label: "[93.13] Fitnesscentra" } ,  ] ,  ] ,  ] ,   [  { id: "S", label: "[S] Overige dienstverlening" } ,   { id: "94", label: "[94] Levensbeschouwelijke en politieke organisaties, belangen- en ideële organisaties, hobbyclubs" } ,   { id: "95", label: "[95] Reparatie van computers en consumentenartikelen" } ,   { id: "96", label: "[96] Wellness en overige dienstverlening; uitvaartbranche" } ,  ] ,  ]
    }
    ]
  },
    
  { id : "monumenten",
    name : "Monumenten",
    attributes:    [
      
    { id : "monumenten.monumenttype",
      name : "Monumenttype",
      type : "string",
      vocabulary : [  { id: "voc-mnmt-tp-001", label: "Gemeentelijk monument" } ,   { id: "voc-mnmt-tp-002", label: "Rijksmonument" } ,   { id: "voc-mnmt-tp-003", label: "Voorgesteld voor gemeentelijke lijst" } ,   { id: "voc-mnmt-tp-004", label: "Anderszins monumentaal" } ,  ]
    }
    ]
  },
    
  { id : "officiele-bekendmakingen",
    name : "Officiële Bekendmakingen",
    attributes:    [
      
    { id : "officiele-bekendmakingen.jaar-interval",
      name : "Jaar",
      type : "string",
      filterType : "intervals",
    },
      
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
      vocabulary : [  { id: "CHZ_CAL", label: "Calamiteiten" } ,   [  { id: "controlezaak", label: "Controlezaak" } ,   { id: "CHZ_OCA", label: "Opleveringscontrole Asbest" } ,   { id: "CHZ_OCBAR", label: "Opleveringscontrole BAR" } ,   { id: "CHZ_OCEVM", label: "Opleveringscontrole Evenementen" } ,   { id: "CHZ_HUIS", label: "Opleveringscontrole Huisvesting" } ,   { id: "CHZ_OCR", label: "Opleveringscontrole Renovatie" } ,   { id: "CHZ_OCS", label: "Opleveringscontrole Sloop" } ,   { id: "CHZ_OCB1", label: "Opleveringscontrole bouw cat. 1" } ,   { id: "CHZ_OCB2", label: "Opleveringscontrole bouw cat. 2" } ,   { id: "CHZ_OCB3", label: "Opleveringscontrole bouw cat. 3" } ,   { id: "CHZ_OCB4", label: "Opleveringscontrole bouw cat. 4" } ,   { id: "CHZ_SPL", label: "Opleveringscontrole splitsingen" } ,   { id: "CHZ_PCTBAR", label: "Projectcontrole BAR" } ,   { id: "CHZ_BRPLVL", label: "Projectcontrole Breedplaatvloeren" } ,   { id: "CHZ_PCGAL", label: "Projectcontrole Galerijvloeren flatgebouwen" } ,   { id: "CHZ_BLS", label: "Projectcontrole constructieve veiligheid balkons" } ,  ] ,   [  { id: "klachtenzaak", label: "Klacht/meldingzaak" } ,   { id: "HZ_MBG", label: "Melding brandveilig gebruik" } ,   { id: "HZ_GBM", label: "Gebruiksmelding" } ,   { id: "HZ_SLM", label: "Sloopmelding" } ,   { id: "CHZ_KLA", label: "Klacht/Melding" } ,   { id: "KLA", label: "klacht" } ,  ] ,   [  { id: "vergunning", label: "Vergunning" } ,   { id: "HZ_BWT", label: "Bouwvergunning uit BWT4all" } ,   { id: "HZ_IOG", label: "Inname Openbare Grond" } ,   { id: "HZ_WABO", label: "Omgevingsvergunning" } ,   { id: "HZ_OAPV", label: "Ontheffing APV (Incidentele Geluidsontheffingen tbv Civiel en Bouw)" } ,   [  { id: "HZ_OWR", label: "Onttrekking-/ Omzetting-/ Samenvoeging van Woonruimte" } ,   { id: "HZ_OWR_O", label: "Omzetting" } ,   { id: "HZ_OWR_T", label: "Transformatie" } ,  ] ,   { id: "HZ_SPL", label: "Splitsingsvergunning" } ,   { id: "HZ_WIJ", label: "Wijzigen Omgevingsvergunning" } ,  ] ,  ]
    },
      
    { id : "zaakgegevens.zk-status",
      name : "Voortgangsstatus",
      type : "string",
      vocabulary : [  { id: "C", label: "Concept" } ,   { id: "G", label: "Gesloten" } ,   { id: "O", label: "Open" } ,   { id: "T", label: "Toekomstig" } ,  ]
    }
    ]
  },
    
  { id : "zonnepanelen",
    name : "Zonnepanelen",
    attributes:    [
      
    { id : "zonnepanelen.zon-zonnepanelen_2022",
      name : "Panelen in 2022",
      type : "string",
      vocabulary : [  { id: "0", label: "Nee" } ,   { id: "1", label: "Ja" } ,  ]
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
  "jaar",
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
  "zk-nummer",
  "locatie-aanduiding"
];

export interface GBPObject {
  "naam" : string;
  "id" : string;
  "object-type" : string;
  "object-type-sort-order" : string;
  "location-sort-value" : string;
  "pdok-locatie-id" : string;
  "_geo" : { "lat" : number; "lng" : number; };
  "links" : { "href-luchtfoto" : string; "href-streetview" : string; "href-topotijdreis" : string; "href-utrechtsarchief" : string; "href-ruimtelijkeplannen" : string; "href-wozwaardeloket" : string; };
  "bag-aob" : { "bag-aob-id" : string; "bag-num-id" : string[]; "bag-pnd-id" : string[]; "bag-object-type" : string; "bag-aob-gebruiksdoel" : string[]; "bag-aob-oppervlakte" : number; "bag-aob-oppervlakte-interval" : string; "bag-aob-status" : string; "bag-aob-documentdatum" : Date; "bag-aob-documentnummer" : string; "bag-aob-voorkomen" : number; "geo-EPSG28992" : number[]; "dataset-label" : string; "imported" : Date; };
  "bag-opr" : { "bag-object-type" : string; "bag-opr-id" : string; "bag-opr-naam" : string; "bag-opr-volledig" : string; "bag-opr-type" : string; "bag-opr-status" : string; "bag-opr-geconstateerd" : string; "bag-opr-documentdatum" : Date; "bag-opr-documentnummer" : string; "bag-wpl-id" : string; };
  "bag-pnd" : { "bag-pnd-id" : string; "bag-pnd-oorspronkelijk-bouwjaar" : number; "bag-pnd-oorspronkelijk-bouwjaar-interval" : string; "bag-pnd-status" : string; "bag-pnd-geconstateerd" : string; "bag-pnd-documentdatum" : Date; "bag-pnd-documentnummer" : string; "bag-pnd-geo" : number[]; "bag-pnd-geo-EPSG28992" : number[]; "dataset-label" : string; "imported" : Date; };
  "bouwtechnische-kenmerken" : { "btk-kenmerk-id" : string[]; "btk-inspectiedatum" : Date; "btk-actie-nodig" : string; "dataset-label" : string; "imported" : Date; };
  "bwk" : { "bwk-wijkid" : string; "bwk-wijknaam" : string; "bwk-subwijknaam" : string; "bwk-buurtid" : string; "bwk-buurtnaam" : string; "bwk-subbuurtnaam" : string; "dataset-label" : string; "imported" : Date; };
  "energielabels" : { "bag-pnd-id" : string; "epl-pand-energieklasse" : string; "epl-pand-opnamedatum" : Date; "epl-pand-opnametype" : string; "epl-pand-status" : string; "epl-pand-berekeningstype" : string; "epl-pand-energieindex" : string; "epl-pand-energielabel-is-prive" : string; "epl-pand-is-op-basis-van-referentie-gebouw" : string; "epl-pand-gebouwklasse" : string; "epl-meting-geldig-tot" : Date; "epl-pand-registratiedatum" : Date; "epl-pand-detailaanduiding" : string; "epl-pand-gebouwtype" : string; "epl-pand-gebouwsubtype" : string; "epl-pand-SBIcode" : string[]; "epl-pand-gebruiksoppervlakte-thermische-zone" : string; "epl-pand-energiebehoefte" : string; "epl-pand-eis-energiebehoefte" : string; "epl-pand-primaire-fossiele-energie" : string; "epl-pand-eis-primaire-fossiele-energie" : string; "epl-pand-primaire-fossiele-energie-EMG-forfaitair" : string; "epl-pand-aandeel-hernieuwbare-energie" : string; "epl-pand-eis-aandeel-hernieuwbare-energie" : string; "epl-pand-aandeel-hernieuwbare-energie-EMG-forfaitair" : string; "epl-pand-temperatuuroverschrijding" : string; "epl-pand-eis-temperatuuroverschrijding" : string; "epl-pand-warmtebehoefte" : string; "epl-pand-energieindex-met-EMG-forfaitair" : string; "dataset-label" : string; "imported" : Date; };
  "hoofdadres" : { "bag-num-id" : string; "bag-num-volledig" : string; "bag-num-postcode" : string; "bag-num-huisnummer" : number; "bag-num-huisletter" : string; "bag-num-huisnummertoevoeging" : string; "bag-num-huisnummer-letter-aanduiding" : string; "bag-num-status" : string; "bag-num-documentdatum" : Date; "bag-num-documentnummer" : string; "bag-num-voorkomen" : number; "bag-opr-id" : string; "bag-opr-naam" : string; "bag-opr-type" : string; "bag-opr-status" : string; "bag-opr-documentdatum" : Date; "bag-opr-documentnummer" : string; "bag-opr-voorkomen" : number; "bag-wpl-id" : string; "bag-wpl-naam" : string; "bag-wpl-status" : string; "bag-wpl-documentdatum" : Date; "bag-wpl-documentnummer" : string; "bag-wpl-voorkomen" : number; };
  "monumenten" : { "bag-num-id" : string; "bag-pnd-id" : string; "monumenttype" : string; "monumentnummer" : string; "href-monumentenregister" : string[]; "dataset-label" : string; "imported" : Date; };
  "nevenadres" : { "bag-num-id-neven" : string; "bag-num-volledig-neven" : string; "bag-num-postcode-neven" : string; "bag-num-huisnummer-neven" : number; "bag-num-huisletter-neven" : string; "bag-num-huisnummertoevoeging-neven" : string; "bag-num-huisnummer-letter-aanduiding-neven" : string; "bag-opr-id-neven" : string; "bag-opr-naam-neven" : string; "bag-opr-type-neven" : string; "bag-wpl-id-neven" : string; "bag-wpl-naam-neven" : string; };
  "officiele-bekendmakingen" : { "publicatiedatum" : Date; "wijzigingsdatum" : Date; "jaar" : number; "jaar-interval" : string; "identificatie" : string; "titel" : string; "ob-documenttype" : string[]; "ob-onderwerp" : string[]; "url-vindplaats" : string; "dataset-label" : string; "imported" : Date; };
  "zaakgegevens" : { "zk-nummer" : string; "omschrijving" : string; "zk-soort" : string[]; "zk-status" : string[]; "status" : string; "zk-besluit" : string[]; "locatie-aanduiding" : string; "dossier-nummer" : string; "date" : Date; "besluitdatum" : Date; "zk-startdatum" : Date; "zk-startdatum-gepland" : Date; "zk-einddatum" : Date; "zk-einddatum-gepland" : Date; "publicatiedatum" : Date; "dataset-label" : string; "imported" : Date; };
  "zonnepanelen" : { "zon-zonnepanelen_2022" : string; "zon-zonnepanelen_2021" : string; "zon-zonnepanelen_2020" : string; "zon-zonnepanelen_2019" : string; "zon-zonnepanelen_2018" : string; "zon-zonnepanelen_2017" : string; "zon-gemeentelijk_vastgoed" : string; "zon-plat_dak_oppervlakte" : string; "zon-zonnepaneel_oppervlakte" : string; "dataset-label" : string; "imported" : Date; };
}
