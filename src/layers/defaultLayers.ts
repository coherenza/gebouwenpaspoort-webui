import { LayerI } from "./LayerTypes";
import { bagLayerId } from "./LayerTypes";

// Keep the BAG layer definition for reference, but don't include it in the default layers
export const BAGLayer: LayerI = {
  name: "BAG items",
  id: bagLayerId,
  visible: true,
  type: "symbol",
};

export const layersDefault: LayerI[] = [
  // BAGLayer is now controlled separately via context
  {
    name: "Luchtfoto",
    id: "2022_orthoHR",
    type: "raster",
    visible: false,
    url: "https://service.pdok.nl/hwh/luchtfotocir/wms/v1_0",
  },
  {
    name: "Funderingsproblematiek",
    type: "raster",
    id: "indgebfunderingsproblematiek",
    visible: false,
    url: "https://service.pdok.nl/rvo/indgebfunderingsproblematiek/wms/v1_0",
  },
];

import { WFSService, WMService } from "./LayerTypes";

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
  // {
  //   name: "Monumenten",
  //   url: "https://data.geo.cultureelerfgoed.nl/openbaar/wfs/2.0",
  //   description: "Monumenten",
  //   noSRS: true,
  // },
  {
    name: "Bestuurlijke Gebieden",
    url: "https://service.pdok.nl/kadaster/bestuurlijkegebieden/wfs/v1_0",
    description: "Bestuurlijke gebieden",
  },
  {
    name: "Utrecht",
    url: "https://geodata.utrecht.nl/geoserver/UtrechtOpen/wfs",
  },
];

export const wmsServices: WMService[] = [
  {
    name: "Luchtfoto",
    url: "https://service.pdok.nl/hwh/luchtfotocir/wms/v1_0",
  },
  {
    name: "Actueel Hoogtebestand Nederland",
    url: "https://service.pdok.nl/hwh/hoogtebestand/wms/v1_0",
  },
];
