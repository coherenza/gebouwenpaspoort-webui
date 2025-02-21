import { Cross1Icon } from "@radix-ui/react-icons";
import { useContext, useEffect, useMemo } from "react";

import { AppContext } from "./App";
import "./Layers.css";
import { BoundsMatrix } from "./bounds";
import { useWFSCapabilities } from "./useCapabilities";
import { wfsServices } from './config/wfsServices';
import { LayerGroup } from "./layers/LayerGroup";
import { LayerI } from "./layers/LayerTypes";

export const bagLayerId = "points";

/** Fetches description from PDOK XML metadata */
export function LayerSelector() {
  const { showLayerSelector, setShowLayerSelector, layers, setLayers } = useContext(AppContext);

  // Create an array of hooks for each service
  const servicesResults = wfsServices.map(service =>
    useWFSCapabilities(`${service.url}?request=GetCapabilities&service=WFS`)
  );

  // Combine the results with services
  const servicesData = useMemo(() =>
    wfsServices.map((service, index) => ({
      service,
      ...servicesResults[index]
    })), [servicesResults]);

  // Convert WFS feature types to LayerI format - memoized
  const allWfsLayers = useMemo(() =>
    servicesData.flatMap(({ service, featureTypes = [] }) =>
      featureTypes.map(feature => ({
        name: feature.Title || feature.Name,
        id: feature.Name,
        visible: false,
        // This is dubious, but it works for now
        type: "vector" as const,
        url: service.url,
        textField: service.textField,
        serviceId: service.id
      }))
    ), [servicesData]);

  // Group layers by service - memoized
  const layerGroups = useMemo(() => ({
    base: {
      title: "Basiskaarten",
      filter: (layer: LayerI) => !layer.serviceId // Only include layers without a serviceId
    },
    ...Object.fromEntries(
      wfsServices.map(service => [
        service.id,
        {
          title: service.name,
          filter: (layer: LayerI) => layer.serviceId === service.id
        }
      ])
    )
  }), []);

  // Add WFS layers to existing layers if not already present
  useEffect(() => {
    if (allWfsLayers.length > 0) {
      setLayers(prevLayers => {
        // Only add layers that don't already exist
        const newLayers = allWfsLayers.filter(
          wfsLayer => !prevLayers.some(layer =>
            layer.id === wfsLayer.id && layer.url === wfsLayer.url
          )
        );
        return newLayers.length > 0 ? [...prevLayers, ...newLayers] : prevLayers;
      });
    }
  }, [allWfsLayers, setLayers]);

  return (
    <div className={`Sidebar filter-panel ${showLayerSelector ? "filter-panel--open" : ""}`}>
      <div className="Titlebar">
        <h3>Lagen</h3>
        <button title="Lagen sluiten" onClick={() => setShowLayerSelector(false)}>
          <Cross1Icon />
        </button>
      </div>
      <div className="layers-checkboxes">
        {Object.entries(layerGroups).map(([key, group]) => (
          <LayerGroup
            key={key}
            title={group.title}
            layers={layers.filter(group.filter)}
          />
        ))}
      </div>
    </div>
  );
}

/** This should describe Utrecht bounds */
const boundsUtrecht: BoundsMatrix = [
  4.93038,
  51.986783,
  5.25482,
  52.166141,
];

// Convert object to searchParams
function objectToSearchParams(obj: { [key: string]: any }) {
  const params = new URLSearchParams();
  Object.keys(obj).forEach((key) => {
    params.set(key, obj[key]);
  });
  return params;
}

export function makeWfsUrl(layer: LayerI, bounds?: BoundsMatrix) {
  let url = new URL(layer.url);
  bounds = bounds ? bounds : boundsUtrecht;
  // See https://docs.geoserver.org/stable/en/user/services/wfs/reference.html
  let params = {
    SERVICE: "WFS",
    VERSION: "1.1.0",
    REQUEST: "GetFeature",
    outputFormat: "application/json",
    acceptsFormat: "application/json",
    typeNames: layer.id,
    srsName: "EPSG:4326",
    bbox: `${bounds.join(",")},EPSG:4326`
  };
  url.search = objectToSearchParams(params).toString();
  return url.toString();
}

export function makeWmsUrl(layer: LayerI, _bounds?: BoundsMatrix) {
  const params = {
    SERVICE: "WMS",
    VERSION: "1.3.0",
    REQUEST: "GetMap",
    FORMAT: "image/png",
    TRANSPARENT: "true",
    LAYERS: layer.id,
    DPI: "113",
    CRS: "EPSG:3857",
    FORMAT_OPTIONS: "dpi:113",
    WIDTH: "1000",
    HEIGHT: "1000",
    STYLES: "",
    bbox: "{bbox-epsg-3857}",
  };

  // Build the query string manually to ensure the BBOX parameter is not encoded
  const queryString = Object.entries(params)
    .map(([key, value]) =>
      key.toLowerCase() === "bbox" ? `${key}=${value}` : `${key}=${encodeURIComponent(value)}`
    )
    .join("&");

  return `${layer.url}?${queryString}`;
}
