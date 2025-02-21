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
];
