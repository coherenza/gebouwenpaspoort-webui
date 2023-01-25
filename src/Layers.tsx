import { Cross1Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useCallback, useContext, useEffect, useState } from "react";
import { Layer, RasterLayer, Source } from "react-map-gl";
import { AppContext } from "./App";
import "./Layers.css";

export const layersDefault: LayerI[] = [
  {
    name: "Luchtfoto",
    id: "2022_orthoHR",
    visible: false,
    url: "https://service.pdok.nl/hwh/luchtfotocir/wms/v1_0",
  },
  {
    name: "CBS Buurten 2020",
    id: "cbs_buurten_2020",
    visible: false,
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2020/wms/v1_0",
  },
  {
    name: "CBS Wijken 2020",
    id: "cbs_wijken_2020",
    visible: false,
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2020/wms/v1_0",
  },
  {
    name: "Funderingsproblematiek",
    id: "indgebfunderingsproblematiek",
    visible: false,
    url: "https://service.pdok.nl/rvo/indgebfunderingsproblematiek/wms/v1_0",
  },
];

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
    wmsCapabilitiesDOM.querySelector("Service > Abstract").textContent;
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
  const [showDescription, setShowDescription] = useState(false);

  const [description, setDescription] = useState("");
  useEffect(() => {
    getDescription(layer).then((desc) => setDescription(desc));
  }, [layer]);


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
      <label title={description}>
        <input
          type="checkbox"
          checked={layer.visible}
          onChange={() => toggleLayer(layer)}
        ></input>
        {layer.name}{" "}
      </label>
      <span
        className="Layer__info-button"
        title={description}
        onClick={() => setShowDescription(!showDescription)}
      >
        <InfoCircledIcon />
      </span>
      {showDescription && <p className="Layer__description">{description}</p>}
    </div>
  );
}

export function LayerSource({ layer }) {
  return (
    <Source
      type="raster"
      tileSize={1000}
      bounds={[3.21, 50.73, 7.25, 53.58]}
      tiles={[makeLayerURL(layer)]}
      scheme="xyz"
    >
      <Layer {...makeRasterLayer(layer)} />
    </Source>
  );
}

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
}

export function makeLayerURL(layer: LayerI) {
  return `${layer.url}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&layers=${layer.id}&DPI=113&MAP_RESOLUTION=113&CRS=EPSG%3A3857&STYLES=&FORMAT_OPTIONS=dpi%3A113&WIDTH=1000&HEIGHT=1000&BBOX={bbox-epsg-3857}`;
}
