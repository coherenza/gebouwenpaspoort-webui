import { Cross1Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Layer,
  RasterLayer,
  FillLayer,
  Source,
  SymbolLayer,
} from "react-map-gl";
import { AnyLayer } from "react-map-gl/dist/esm/types";
import { AppContext } from "./App";
import "./Layers.css";

export const bagLayerId = "points";

export const layersDefault: LayerI[] = [
  {
    name: "BAG items",
    id: bagLayerId,
    visible: true,
    type: "symbol",
    //url: "https://service.pdok.nl/lv/bag/wms/v2_0" // "https://geodata.nationaalgeoregister.nl/bag/wfs/v1_1",
  },
  {
    name: "Luchtfoto",
    id: "2022_orthoHR",
    type: "raster",
    visible: false,
    url: "https://service.pdok.nl/hwh/luchtfotocir/wms/v1_0",
  },
  {
    name: "CBS Buurten 2020",
    type: "raster",
    id: "cbs_buurten_2020",
    visible: false,
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2020/wms/v1_0",
  },
  {
    name: "CBS Wijken 2020",
    type: "raster",
    id: "cbs_wijken_2020",
    visible: false,
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2020/wms/v1_0",
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
  // {
  //   name: "NAP Peilmerken",
  //   id: "napinfo:nappeilmerken",
  //   visible: false,
  //   type: "symbol",
  //   textField: "nap_hoogte",
  //   // https://service.pdok.nl/rws/napinfo/wms/v1_0?request=getCapabilities&service=WMS
  //   url: "https://geodata.nationaalgeoregister.nl/napinfo/wfs",
  // },
  /*{
    name: "AHN3",
    id: "ahn3_05m_dtm",
    visible: false,
    type: "raster",
    url: "https://service.pdok.nl/rws/ahn3/wms/v1_0",
  },*/
];

/** Layer for clickable Address items */
export const bagLayer: SymbolLayer = {
  id: bagLayerId,
  source: bagLayerId,
  type: "symbol",
  layout: {
    // get the title name and icon from the source's properties
    "text-field": ["get", "title"],
    // Show icon depending on type
    "icon-image": ["get", "icon"],
    "icon-size": ["get", "size"],
    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    "text-offset": [0, 1.25],
    "text-anchor": "top",
    "symbol-sort-key": ["get", "sort-key"],
    "text-size": ["get", "text-size"],
    "icon-padding": 1,
  },
  paint: {
    "text-halo-color": "rgba(255,255,255,0.75)",
    "text-halo-width": 1,
    "icon-color": ["get", "color"],
  },
};

/** Get XML metadata description from PDOK */
async function getDescription(layer: LayerI): Promise<string> {
  const wmsURL = `${layer.url}?request=getcapabilities&service=wms`;
  const wmsCapabilities = await fetch(wmsURL);
  const wmsCapabilitiesXML = await wmsCapabilities.text();
  const parser = new DOMParser();
  const wmsCapabilitiesDOM = parser.parseFromString(
    wmsCapabilitiesXML,
    "text/xml"
  );
  const wmsAbstract =
    wmsCapabilitiesDOM.querySelector("Service > Abstract")?.textContent;
  return wmsAbstract;
}

/** Fetches description from PDOK XML metadata */
export function LayerSelector() {
  const { showLayerSelector, setShowLayerSelector, layers } =
    useContext(AppContext);

  return (
    <div
      className={`Sidebar filter-panel ${
        showLayerSelector ? "filter-panel--open" : ""
      }`}
    >
      <div className="Titlebar">
        <h3>Lagen</h3>
        <button
          title="Lagen sluiten"
          onClick={() => setShowLayerSelector(false)}
        >
          <Cross1Icon />
        </button>
      </div>
      <div className="layers-checkboxes">
        {layers.map((layer) => (
          <LayerCheckbox layer={layer} key={layer.id} />
        ))}
      </div>
    </div>
  );
}

function LayerCheckbox({ layer }) {
  const { setLayers, layers } = useContext(AppContext);
  // const [showDescription, setShowDescription] = useState(false);

  // let [description, setDescription] = useState("");
  // useEffect(() => {
  //   getDescription(layer).then((desc) => setDescription(desc));
  // }, [layer]);

  // if (layer.id == bagLayerId) {
  //   description =
  //     "Adressen uit het Basisregistratie Adressen en Gebouwen (BAG)";
  // }

  // When clicking on a layers, toggle the visibility
  const toggleLayer = useCallback(
    (layer: LayerI) => {
      const newLayers = layers.map((l) => {
        if (l.id === layer.id) {
          return { ...l, visible: !l.visible };
        }
        return l;
      });
      setLayers(newLayers);
    },
    [layers]
  );

  return (
    <div key={layer.name}>
      <label>
        <input
          type="checkbox"
          checked={layer.visible}
          onChange={() => toggleLayer(layer)}
        ></input>
        {layer.name}{" "}
      </label>
      {/* <span
        className="Layer__info-button"
        title={description}
        onClick={() => setShowDescription(!showDescription)}
      >
        <InfoCircledIcon />
      </span> */}
      {/* {showDescription && <p className="Layer__description">{description}</p>} */}
    </div>
  );
}

/** This should describe Utrecht bounds */
const boundsUtrecht: [number, number, number, number] = [
  4.93038, 51.986783, 5.25482, 52.166141,
];
const boundsNL = [3, 50, 7.4, 54];

/** Component that mounts the Source and Layer components, required by React-Map-gl */
export function LayerSource({ layer }: { layer: LayerI }) {
  if (layer.id == bagLayerId) {
    return null;
  }
  let mapBoxLayer = makeMapBoxLayer(layer);

  if (layer.type == "raster") {
    return (
      <Source
        type="raster"
        tileSize={1000}
        bounds={boundsUtrecht}
        tiles={[makeWmsUrl(layer)]}
        scheme="xyz"
      >
        <Layer {...mapBoxLayer} beforeId={bagLayerId} />
      </Source>
    );
  }

  return (
    <Source id={layer.id} type="geojson" data={makeWfsUrl(layer)}>
      <Layer {...mapBoxLayer} key={layer.id} id={layer.id} />
    </Source>
  );
}

function makeMapBoxLayer(layer: LayerI): AnyLayer {
  if (layer.type == "fill") {
    return makeFillLayer(layer);
  } else if (layer.type == "symbol") {
    return makeSymbolLayer(layer);
  } else {
    return makeRasterLayer(layer);
  }
}

const makeSymbolLayer = (layer: LayerI): SymbolLayer => ({
  id: layer.id,
  source: layer.id,
  type: "symbol",
  layout: {
    // get the title name and icon from the source's properties
    "text-field": ["get", layer.textField],
    // "text-field": "test",
    // Show icon depending on type
    "icon-image": "marker",
    "icon-size": ["get", "size"],
    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    // "text-offset": [0, 1.25],
    // "text-anchor": "top",
    "symbol-sort-key": ["get", "sort-key"],
    "text-size": 12,
    "icon-padding": 1,
  },
  paint: {
    "text-halo-color": "rgba(255,255,255,0.75)",
    "text-halo-width": 1,
    "icon-color": ["get", "color"],
  },
});

const makeFillLayer = (layer: LayerI): FillLayer => ({
  id: layer.id,
  source: layer.id,
  type: "fill",
  paint: {
    "fill-color": stringToColor(layer.id),
    "fill-opacity": 0.8,
  },
});

const makeRasterLayer = (layer: LayerI): RasterLayer => ({
  id: layer.id,
  type: "raster",
  source: "raster-tiles",
  minzoom: 0,
  maxzoom: 22,
});

export interface LayerI {
  /** Visible in front-end */
  name: string;
  /** PDOK ID, e.g. cbs_buurten_2021 */
  id: string;
  visible: boolean;
  /** Optionally overwrite URL */
  url?: string;
  type: "raster" | "fill" | "symbol";
  /** Which property is used to draw the text. Only for "symbol" types */
  textField?: string;
}

// Convert object to searchParams
function objectToSearchParams(obj: { [key: string]: any }) {
  const params = new URLSearchParams();
  Object.keys(obj).forEach((key) => {
    params.set(key, obj[key]);
  });
  return params;
}

export function makeWfsUrl(layer: LayerI) {
  let url = new URL(layer.url);
  // See https://docs.geoserver.org/stable/en/user/services/wfs/reference.html
  let params = {
    SERVICE: "WFS",
    VERSION: "1.1.0",
    REQUEST: "GetFeature",
    outputFormat: "application/json",
    acceptsFormat: "application/json",
    typeNames: layer.id,
    srsName: "EPSG:4326",
    bbox: `${boundsUtrecht.toString()},EPSG:4326`,
  };
  url.search = objectToSearchParams(params).toString();
  return url.toString();
}

export function makeWmsUrl(layer: LayerI) {
  let url = new URL(layer.url);
  let params = {
    SERVICE: "WMS",
    VERSION: "1.3.0",
    REQUEST: "GetMap",
    FORMAT: "image/png",
    TRANSPARENT: "true",
    layers: layer.id,
    DPI: "113",
    CRS: "EPSG:3857",
    FORMAT_OPTIONS: "dpi:113",
    WIDTH: "1000",
    HEIGHT: "1000",
    STYLES: "",
  };
  url.search = objectToSearchParams(params).toString();

  // The BBOX values are set by MapBoxGL, and it parses this URL to replace the bbox part. So we can't use the URLSearchParams here.
  const generated = `${url.toString()}&BBOX={bbox-epsg-3857}`;
  return generated;
}

// unique color from hash of string
function stringToColor(str: string) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var h = hash % 256;
  return "hsl(" + h + ", 90%, 50%)";
}
