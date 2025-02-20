import { LayerI } from "./LayerTypes";
import { bagLayerId } from "./LayerTypes";

export const layersDefault: LayerI[] = [
  {
    name: "BAG items",
    id: bagLayerId,
    visible: true,
    type: "symbol",
  },
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
  {
    name: "Monumenten Gemeente",
    id: "UtrechtOpen:MONUMENTEN_OPEN_GM",
    visible: false,
    type: "fill",
    url: "https://geodata.utrecht.nl/geoserver/UtrechtOpen/wfs",
  },
  {
    name: "Monument Rijk",
    id: "UtrechtOpen:MONUMENTEN_OPEN_RM",
    visible: false,
    type: "fill",
    url: "https://geodata.utrecht.nl/geoserver/UtrechtOpen/wfs",
  },
  {
    name: "NAP Peilmerken",
    id: "napinfo:nappeilmerken",
    visible: false,
    type: "symbol",
    textField: "napHoogte",
    url: "https://service.pdok.nl/rws/napinfo/wfs/v1_0",
  },
];
