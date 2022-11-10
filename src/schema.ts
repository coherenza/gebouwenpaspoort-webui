export interface FilterProp {
  label: string;
  propKey: string;
  type: "single" | "multi" | "geo" | "date" | "range";
}

export const filterProps: FilterProp[] = [
  { propKey: "bag-aob-gebruiksdoel", label: "Gebruiksdoel", type: "multi" },
  { propKey: "bag-aob-oppervlakte", label: "Oppervlakte (m2)", type: "range" },
  { propKey: "epl_pand_gebouwtype_s", label: "Gebouwtype", type: "single" },
  { propKey: "bag-aob-voorkomen", label: "Voorkomen", type: "single" },
  { propKey: "epl_pand_energieklasse_s", label: "Energieklasse", type: "single" },
];

export interface Gebouw {
  id: string;
  "gbp-collection": string;
  "bag-aob-id": string[];
  "bag-object-type": string;
  "pdok-locatie-id": string[];
  "bag-aob-gebruiksdoel": string[];
  "bag-aob-oppervlakte": number;
  "bag-aob-status": string;
  "bag-aob-documentdatum": Date;
  "bag-aob-documentnummer": string;
  "bag-aob-voorkomen": number;
  "bag-aob-geo-point-x": number;
  "bag-aob-geo-point-y": number;
  "bag-aob-geo-point-z": number;
  "bag-num-id": string;
  "bag-num-volledig": string;
  "bag-num-postcode": string;
  "bag-num-huisnummer": number;
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
  "bag-pnd-oorspronkelijk-bouwjaar": number[];
  "bag-pnd-status": string[];
  "bwk-num-nadergebruiksdoel": string;
  "bwk-num-status": string;
  "bwk-num-adrestype": string;
  "bwk-num-lat-lon": string;
  "bwk-num-geo-point-x": number;
  "bwk-num-geo-point-y": number;
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
  epl_pand_gebouwklasse_s: string;
  epl_pand_opnamedatum_s: string;
  epl_pand_energieklasse_s: string;
  epl_pand_gebouwtype_s: string;
  "squitxo_zaaktype-naam_ss": string[];
  squitxo_omschrijving_ss: string[];
  squitxo_zaaknummer_ss: string[];
  squitxo_startdatum_dts: Date[];
  "squitxo_zaak-status_ss": string[];
  squitxo_status_ss: string[];
  squitxo_einddatum_dts: Date[];
  squitxo_categorie_ss: string[];
  stl_inspecteur_s: string;
  stl_stalenliggers_s: string;
  stl_hekwerk_s: string;
  stl_balkon_s: string;
  stl_inspectiedatum_s: string;
  stl_uitkragendebalkons_s: string;
  _version_: number;
}
