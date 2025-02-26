import { Cross1Icon, MagnifyingGlassIcon, EyeOpenIcon, EyeClosedIcon, PlusIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useMemo, useState } from "react";

import { AppContext } from "./App";
import "./Layers.css";
import { BoundsMatrix } from "./bounds";
import { LayerGroup } from "./layers/LayerGroup";
import { LayerI } from "./layers/LayerTypes";
import { useLayerGroups } from "./layers/useLayerGroups";
import { wfsServices, wmsServices } from "./layers/defaultServices";
import { CustomCheckbox } from "./components/CustomCheckbox";
import "./components/CustomCheckbox.css";
import { detectServiceType } from "./layers/detectService";
import { useAllServices } from "./layers/useAllServices";

export const bagLayerId = "points";

/** Fetches and displays available map layers */
export function LayerSelector() {
  // Context hooks must be at the top
  const {
    showLayerSelector,
    setShowLayerSelector,
    layers,
    setLayers,
    showBagLayer,
    setShowBagLayer
  } = useContext(AppContext);

  // All useState hooks must be called before any conditional logic
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceUrl, setServiceUrl] = useState("");
  const [isAddingService, setIsAddingService] = useState(false);
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [serviceSuccess, setServiceSuccess] = useState<string | null>(null);
  // Add a counter to track service updates
  const [serviceUpdateCounter, setServiceUpdateCounter] = useState(0);

  // Add a console log to check the WMS services before passing to useAllServices
  console.log("WMS Services before passing to useAllServices:", wmsServices);

  // Use our new hook to fetch all services at once
  const { allLayers: serviceLayers, isLoading, errors } = useAllServices(wfsServices, wmsServices, serviceUpdateCounter);

  // Add debug logging
  useEffect(() => {
    console.log("WMS Services:", wmsServices);
    console.log("WMS Services length:", wmsServices.length);
    console.log("Service Layers:", serviceLayers);
    console.log("WMS Layers:", serviceLayers.filter(layer => layer.type === "raster"));
  }, [serviceLayers]);

  // Group layers using the hook
  const layerGroups = useLayerGroups(layers);

  // Add debug logging for layer groups
  useEffect(() => {
    console.log("Layer Groups:", layerGroups);
  }, [layerGroups]);

  // Get selected layers
  const selectedLayers = useMemo(() => {
    return layers.filter(layer => layer.visible);
  }, [layers]);

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

  // Add service layers to existing layers if not already present
  useEffect(() => {
    if (serviceLayers.length > 0) {
      console.log("Adding service layers to existing layers:", serviceLayers);

      setLayers(prevLayers => {
        // Only add layers that don't already exist
        const newLayers = serviceLayers.filter(
          serviceLayer => !prevLayers.some(layer =>
            // Check for duplicate by ID and URL
            (layer.id === serviceLayer.id && layer.url === serviceLayer.url) ||
            // Also check for duplicate by ID and service ID
            (layer.id === serviceLayer.id && layer.serviceId === serviceLayer.serviceId)
          )
        );

        console.log("New layers to add:", newLayers.length);
        return newLayers.length > 0 ? [...prevLayers, ...newLayers] : prevLayers;
      });
    }
  }, [serviceLayers, setLayers]);

  // Clear success message after 5 seconds
  useEffect(() => {
    if (serviceSuccess) {
      const timer = setTimeout(() => {
        setServiceSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [serviceSuccess]);

  // Event handlers and other functions
  // Handle removing a layer
  const handleRemoveLayer = (layerId: string) => {
    setLayers(prevLayers =>
      prevLayers.map(layer =>
        layer.id === layerId ? { ...layer, visible: false } : layer
      )
    );
  };

  // Function to select the first layer from filtered results
  const selectFirstFilteredLayer = () => {
    // Find the first available layer from filtered groups
    for (const group of filteredLayerGroups) {
      if (group.layers.length > 0) {
        const firstLayer = group.layers[0];
        // Only select if not already visible
        if (!firstLayer.visible) {
          setLayers(prevLayers =>
            prevLayers.map(layer =>
              layer.id === firstLayer.id ? { ...layer, visible: true } : layer
            )
          );
          // Clear the search term after selection
          setSearchTerm("");
        }
        break;
      }
    }
  };

  // Handle key press in search input
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      selectFirstFilteredLayer();
    }
  };

  // Function to handle adding a new service
  const handleAddService = async () => {
    if (!serviceUrl.trim()) {
      setServiceError("Please enter a valid URL");
      return;
    }

    setIsAddingService(true);
    setServiceError(null);
    setServiceSuccess(null);

    try {
      const result = await detectServiceType(serviceUrl);
      console.log("Service detection result:", result);

      // If we have a service but also an error, it's a warning
      if (result.service && result.error && result.type) {
        // We can still add the service, but show the warning
        const warningMessage = result.error;

        // Add the service to the appropriate list
        if (result.type === 'WFS') {
          // Check if service already exists
          const exists = wfsServices.some(s => s.url === result.service?.url);
          if (!exists && result.service) {
            wfsServices.push(result.service as any);
            setServiceSuccess(`Added WFS service: ${result.service.name} (with warning: ${warningMessage})`);
            setServiceUrl("");
            // Increment the counter to trigger a re-fetch
            setServiceUpdateCounter(prev => prev + 1);
          } else {
            setServiceError("This service is already added");
          }
        } else if (result.type === 'WMS') {
          // Check if service already exists
          const exists = wmsServices.some(s => s.url === result.service?.url);
          if (!exists && result.service) {
            wmsServices.push(result.service as any);
            setServiceSuccess(`Added WMS service: ${result.service.name} (with warning: ${warningMessage})`);
            setServiceUrl("");
            // Increment the counter to trigger a re-fetch
            setServiceUpdateCounter(prev => prev + 1);
          } else {
            setServiceError("This service is already added");
          }
        }
        return;
      }

      if (!result.type || !result.service) {
        setServiceError(result.error || "Could not detect a valid service");
        return;
      }

      // Add the service to the appropriate list
      if (result.type === 'WFS') {
        // Check if service already exists
        const exists = wfsServices.some(s => s.url === result.service?.url);
        if (!exists && result.service) {
          wfsServices.push(result.service as any);
          setServiceSuccess(`Added WFS service: ${result.service.name}`);
          setServiceUrl("");
          // Increment the counter to trigger a re-fetch
          setServiceUpdateCounter(prev => prev + 1);
        } else {
          setServiceError("This service is already added");
        }
      } else if (result.type === 'WMS') {
        // Check if service already exists
        const exists = wmsServices.some(s => s.url === result.service?.url);
        if (!exists && result.service) {
          wmsServices.push(result.service as any);
          setServiceSuccess(`Added WMS service: ${result.service.name}`);
          setServiceUrl("");
          // Increment the counter to trigger a re-fetch
          setServiceUpdateCounter(prev => prev + 1);
        } else {
          setServiceError("This service is already added");
        }
      }
    } catch (error) {
      console.error("Error in handleAddService:", error);
      setServiceError(`Error adding service: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsAddingService(false);
    }
  };

  // Render component
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
          onKeyDown={handleSearchKeyPress}
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
        {isLoading ? (
          <div className="loading-message">Loading services...</div>
        ) : (
          filteredLayerGroups.map(group => (
            <LayerGroup
              key={group.serviceId}
              title={group.title}
              layers={group.layers}
              isExpanded={!!searchTerm}
              setSearchTerm={setSearchTerm}
            />
          ))
        )}
      </div>
      <div className="add-service-container">
        <div className="service-header">
          <h4>Voeg service toe</h4>
          <div className="service-info-tooltip">
            <InfoCircledIcon className="info-icon" />
            <div className="tooltip-content">
              <p>Voeg een WFS of WMS service toe door de URL in te voeren.</p>
              <p>Bijvoorbeeld:</p>
              <ul>
                <li>https://service.pdok.nl/hwh/luchtfotocir/wms/v1_0</li>
                <li>https://service.pdok.nl/kadaster/bestuurlijkegebieden/wfs/v1_0</li>
              </ul>
              <p>Het systeem detecteert automatisch of het een WFS of WMS service is.</p>
            </div>
          </div>
        </div>
        <div className="service-input-container">
          <input
            type="text"
            placeholder="Service URL..."
            value={serviceUrl}
            onChange={(e) => setServiceUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddService()}
            className="service-input"
            disabled={isAddingService}
          />
          <button
            onClick={handleAddService}
            title="Voeg service toe"
            className="add-service-button"
            disabled={isAddingService}
          >
            {isAddingService ? "..." : <PlusIcon />}
          </button>
        </div>
        {serviceError && <div className="service-error">{serviceError}</div>}
        {serviceSuccess && <div className="service-success">{serviceSuccess}</div>}
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
