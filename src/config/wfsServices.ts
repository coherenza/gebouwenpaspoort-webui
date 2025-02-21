import { WFSService } from "../types/wfs";

export const wfsServices: WFSService[] = [
  {
    name: "CBS Wijken en Buurten 2024",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2024/wfs/v1_0",
    description: "Statistische data per wijk en buurt van het CBS",
  },
  {
    name: "BAG pdok",
    url: "https://service.pdok.nl/lv/bag/wfs/v2_0",
    description: "Items in het BAG",
    textField: "huisnummer",
  },
  {
    name: "Kadastrale kaart",
    url: "https://service.pdok.nl/kadaster/kadastralekaart/wfs/v5_0",
    // "https://service.pdok.nl/kadaster/kadastralekaart/wfs/v5_0?request=GetCapabilities&service=WFS"
    description: "Kadastrale kaart",
    textField: "tekst",
  },
  {
    name: "Monumenten",
    url: "https://data.geo.cultureelerfgoed.nl/openbaar/wfs/2.0",
    description: "Monumenten",
    noSRS: true,
  },
];
