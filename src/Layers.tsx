import { Cross1Icon, MagnifyingGlassIcon, EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useMemo, useState } from "react";

import { AppContext } from "./App";
import "./Layers.css";
import { BoundsMatrix } from "./bounds";
import { useWFSCapabilities, useWMSCapabilities } from "./layers/useCapabilities";
import { LayerGroup } from "./layers/LayerGroup";
import { LayerI } from "./layers/LayerTypes";
import { useLayerGroups } from "./layers/useLayerGroups";
import { wfsServices, wmsServices } from "./layers/defaultLayers";
import { CustomCheckbox } from "./components/CustomCheckbox";
import "./components/CustomCheckbox.css";

export const bagLayerId = "points";

/** Fetches and displays available map layers */
export function LayerSelector() {
  const {
    showLayerSelector,
    setShowLayerSelector,
    layers,
    setLayers,
    showBagLayer,
    setShowBagLayer
  } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  // Create an array of hooks for each WFS service
  const wfsServicesResults = wfsServices.map(service =>
    useWFSCapabilities(service)
  );

  // Create an array of hooks for each WMS service
  const wmsServicesResults = wmsServices.map(service =>
    useWMSCapabilities(service)
  );

  // Add WFS layers to existing layers if not already present
  useEffect(() => {
    const allWfsLayers = wfsServicesResults.flatMap(({ layers = [], error }) => {
      if (error) {
        console.error('Error loading WFS service:', error);
        return [];
      }
      return layers;
    });

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
  }, [wfsServicesResults, setLayers]);

  // Add WMS layers to existing layers if not already present
  useEffect(() => {
    const allWmsLayers = wmsServicesResults.flatMap(({ layers = [], error }) => {
      if (error) {
        console.error('Error loading WMS service:', error);
        return [];
      }
      return layers;
    });

    if (allWmsLayers.length > 0) {
      setLayers(prevLayers => {
        // Only add layers that don't already exist
        const newLayers = allWmsLayers.filter(
          wmsLayer => !prevLayers.some(layer =>
            layer.id === wmsLayer.id && layer.url === wmsLayer.url
          )
        );
        return newLayers.length > 0 ? [...prevLayers, ...newLayers] : prevLayers;
      });
    }
  }, [wmsServicesResults, setLayers]);

  // Group layers using the hook
  const layerGroups = useLayerGroups(layers);

  // Get selected layers
  const selectedLayers = useMemo(() => {
    return layers.filter(layer => layer.visible);
  }, [layers]);

  // Handle removing a layer
  const handleRemoveLayer = (layerId: string) => {
    setLayers(prevLayers =>
      prevLayers.map(layer =>
        layer.id === layerId ? { ...layer, visible: false } : layer
      )
    );
  };

  // Filter layer groups based on search term
  const filteredLayerGroups = useMemo(() => {
    if (!searchTerm) return layerGroups;

    const searchTermLower = searchTerm.toLowerCase();
    return layerGroups.map(group => ({
      ...group,
      layers: group.layers.filter(layer => {
        const matchesName = layer.name.toLowerCase().includes(searchTermLower);
        const matchesId = layer.id.toLowerCase().includes(searchTermLower);
        const matchesService = group.title.toLowerCase().includes(searchTermLower);

        // Check in both WFS and WMS services for descriptions
        let matchesDescription = false;

        // Check WFS service descriptions
        if (group.serviceId && !group.serviceId.startsWith('WMS:')) {
          matchesDescription = wfsServices.find(s => s.name === layer.serviceId)?.description?.toLowerCase().includes(searchTermLower) || false;
        }

        // Check WMS service (no descriptions in WMS services currently, but added for future)
        if (group.serviceId && group.serviceId.startsWith('WMS:')) {
          const wmsServiceName = group.serviceId.substring(5);
          matchesDescription = wmsServices.find(s => s.name === wmsServiceName)?.description?.toLowerCase().includes(searchTermLower) || false;
        }

        return matchesName || matchesId || matchesService || matchesDescription;
      })
    })).filter(group => group.layers.length > 0);
  }, [layerGroups, searchTerm]);

  return (
    <div className={`Sidebar filter-panel ${showLayerSelector ? "filter-panel--open" : ""}`}>
      <div className="Titlebar">
        <h3>Lagen</h3>
        <button title="Lagen sluiten" onClick={() => setShowLayerSelector(false)}>
          <Cross1Icon />
        </button>
      </div>

         <div className="selected-layers">
          <h4>Geselecteerde lagen</h4>
          <div className="selected-layers-list">
          <div className="selected-layer-item">
            <span>Zoekresultaten</span>
            <button
              onClick={() => setShowBagLayer(!showBagLayer)}
              title={showBagLayer ? "Verberg zoekresultaten" : "Toon zoekresultaten"}
              className={`toggle-layer-button ${showBagLayer ? 'active' : ''}`}
            >
              {showBagLayer ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </button>
          </div>
            {selectedLayers.map(layer => (
              <div key={layer.id} className="selected-layer-item">
                <span>{layer.name}</span>
                <button
                  onClick={() => handleRemoveLayer(layer.id)}
                  title="Verwijder laag"
                  className="remove-layer-button"
                >
                  <Cross1Icon />
                </button>
              </div>
            ))}
          </div>
        </div>

      <div className="search-container">
        <MagnifyingGlassIcon className="search-icon" />
        <input
          type="text"
          placeholder="Zoek lagen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button
            className="search-clear-button"
            onClick={() => setSearchTerm("")}
            title="Zoekopdracht wissen"
          >
            <Cross1Icon />
          </button>
        )}
      </div>
      <div className="layers-checkboxes">
        {filteredLayerGroups.map(group => (
          <LayerGroup
            key={group.serviceId}
            title={group.title}
            layers={group.layers}
            isExpanded={!!searchTerm}
            setSearchTerm={setSearchTerm}
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
