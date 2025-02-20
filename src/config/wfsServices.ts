import { WFSService } from "../types/wfs";

export const wfsServices: WFSService[] = [
  {
    id: "cbs-wijkenbuurten-2024",
    name: "CBS Wijken en Buurten 2024",
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2024/wfs/v1_0",
    description: "Statistische data per wijk en buurt van het CBS",
  },
  {
    id: "bag",
    name: "BAG items",
    url: "https://service.pdok.nl/lv/bag/wfs/v2_0",
    description: "Items in het BAG",
  },
];
