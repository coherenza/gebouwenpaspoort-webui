import { useContext } from "react";
import { Layer, RasterLayer, Source } from "react-map-gl";
import { AppContext } from "./App";

export const layersDefault: LayerI[] = [
  {
    name: "Luchtfoto",
    id: "2022_orthoHR",
    visible: false,
    url: "https://service.pdok.nl/hwh/luchtfotocir/wms/v1_0",
  },
  {
    name: "CBS Buurten 2021",
    id: "cbs_buurten_2021",
    visible: false,
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2021/wms/v1_0",
  },
  {
    name: "CBS Wijken 2021",
    id: "cbs_wijken_2021",
    visible: false,
    url: "https://service.pdok.nl/cbs/wijkenbuurten/2021/wms/v1_0",
  },
];

export function LayerSelector() {
  const { showLayerSelector, setShowLayerSelector, setLayers, layers } =
    useContext(AppContext);

  // When clicking on a layers, toggle the visibility
  const toggleLayer = (layer: LayerI) => {
    const newLayers = layers.map((l) => {
      if (l.id === layer.id) {
        return { ...l, visible: !l.visible };
      }
      return l;
    });
    setLayers(newLayers);
  };

  return (
    <div
      className={`Sidebar filter-panel ${
        showLayerSelector ? "filter-panel--open" : ""
      }`}
    >
      <div className="Titlebar">
        <h3>Lagen</h3>
        <button onClick={() => setShowLayerSelector(false)}>Sluit</button>
      </div>
      <div className="layers-checkboxes">
        {layers.map((layer) => (
          <div>
            <label key={layer.id}>
              <input
                type="checkbox"
                checked={layer.visible}
                onChange={() => toggleLayer(layer)}
              ></input>
              {layer.name}
            </label>
          </div>
        ))}
      </div>
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
