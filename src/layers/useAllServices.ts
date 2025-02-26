import { useState, useEffect } from "react";
import { LayerI, WFSService, WMService } from "./LayerTypes";

interface ServiceResult {
  layers: LayerI[];
  loading: boolean;
  error: Error | null;
}

// Helper function to handle CORS issues
const fetchWithCorsProxy = async (url: string): Promise<Response> => {
  try {
    // First try direct fetch
    const directResponse = await fetch(url);
    if (directResponse.ok) {
      return directResponse;
    }

    // If direct fetch fails, try with CORS proxy
    console.log(`Direct fetch failed for ${url}, trying with CORS proxy`);
    try {
      const corsProxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      const proxyResponse = await fetch(corsProxyUrl);
      if (proxyResponse.ok) {
        return proxyResponse;
      }
    } catch (proxyError) {
      console.error(`CORS proxy failed for ${url}`, proxyError);
    }

    // If CORS proxy fails, try with another proxy
    console.log(`CORS proxy failed for ${url}, trying with another proxy`);
    try {
      const altProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
        url
      )}`;
      const altProxyResponse = await fetch(altProxyUrl);
      if (altProxyResponse.ok) {
        return altProxyResponse;
      }
    } catch (altProxyError) {
      console.error(`Alternative proxy failed for ${url}`, altProxyError);
    }

    // If all proxies fail, return the original response
    console.log(`All proxies failed for ${url}, returning original response`);
    return directResponse;
  } catch (error) {
    console.error(`Error with direct fetch for ${url}`, error);

    // Try with CORS proxy
    try {
      const corsProxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      const proxyResponse = await fetch(corsProxyUrl);
      if (proxyResponse.ok) {
        return proxyResponse;
      }
    } catch (proxyError) {
      console.error(`CORS proxy failed for ${url}`, proxyError);
    }

    // Try with alternative proxy
    try {
      const altProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
        url
      )}`;
      const altProxyResponse = await fetch(altProxyUrl);
      if (altProxyResponse.ok) {
        return altProxyResponse;
      }
    } catch (altProxyError) {
      console.error(`Alternative proxy failed for ${url}`, altProxyError);
    }

    // If all fails, throw the original error
    throw error;
  }
};

/**
 * Custom hook to manage all WFS and WMS services in one place
 * This avoids the React hooks order issue by ensuring a fixed number of hooks
 */
export function useAllServices(
  wfsServices: WFSService[],
  wmsServices: WMService[],
  serviceUpdateCounter: number = 0
): {
  allLayers: LayerI[];
  isLoading: boolean;
  errors: Error[];
} {
  const [allLayers, setAllLayers] = useState<LayerI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Error[]>([]);

  // Use refs to store service data
  const [wfsResults, setWfsResults] = useState<ServiceResult[]>([]);
  const [wmsResults, setWmsResults] = useState<ServiceResult[]>([]);

  // Fetch WFS services
  useEffect(() => {
    const fetchWfsServices = async () => {
      const results: ServiceResult[] = [];

      for (const service of wfsServices) {
        try {
          const capabilitiesURL = `${service.url}?request=GetCapabilities&service=WFS`;
          const response = await fetchWithCorsProxy(capabilitiesURL);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const text = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(text, "text/xml");
          const featureTypeNodes = xmlDoc.getElementsByTagName("FeatureType");

          const serviceName =
            featureTypeNodes[0]?.getElementsByTagName("ows:Title")[0]
              ?.textContent || service.name;

          const layers: LayerI[] = Array.from(featureTypeNodes).map((node) => ({
            name:
              node.getElementsByTagName("Title")[0]?.textContent ||
              node.getElementsByTagName("Name")[0]?.textContent ||
              "",
            id: node.getElementsByTagName("Name")[0]?.textContent || "",
            visible: false,
            type: "vector",
            url: service.url,
            textField: service.textField,
            serviceId: service.name,
          }));

          // If no layers were found but we got a response, create a fallback layer
          if (layers.length === 0 && text.length > 0) {
            console.log(
              `No layers found for WFS service: ${service.name}. Creating fallback layer.`
            );

            // Create a fallback layer with a generic ID
            layers.push({
              name: `${service.name} (Default Layer)`,
              id: "layer",
              visible: false,
              type: "vector",
              url: service.url,
              textField: service.textField,
              serviceId: service.name,
            });
          }

          results.push({
            layers,
            loading: false,
            error: null,
          });
        } catch (err) {
          console.error("Error fetching WFS capabilities:", err);
          results.push({
            layers: [],
            loading: false,
            error:
              err instanceof Error
                ? err
                : new Error("Failed to fetch WFS capabilities"),
          });
        }
      }

      setWfsResults(results);
    };

    fetchWfsServices();
  }, [wfsServices, serviceUpdateCounter]);

  // Fetch WMS services
  useEffect(() => {
    const fetchWmsServices = async () => {
      console.log("Starting WMS service fetch for:", wmsServices);
      const results: ServiceResult[] = [];

      for (const service of wmsServices) {
        try {
          console.log(
            `Fetching WMS capabilities for service: ${service.name} (${service.url})`
          );
          const capabilitiesURL = `${service.url}?request=GetCapabilities&service=WMS`;
          const response = await fetchWithCorsProxy(capabilitiesURL);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const text = await response.text();
          console.log(
            `Received WMS response for ${service.name}, length: ${text.length}`
          );
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(text, "text/xml");
          const layerNodes = xmlDoc.getElementsByTagName("Layer");
          const serviceTitle =
            xmlDoc.getElementsByTagName("Title")[0]?.textContent ||
            service.name;

          // Special handling for ESRI MapServer WMS services
          const isEsriService =
            text.includes("xmlns:esri_wms") ||
            service.url.includes("MapServer/WMSServer");
          if (isEsriService) {
            console.log("Detected ESRI MapServer WMS service");
          }

          const wmsLayers: LayerI[] = [];

          // Process standard layer nodes
          for (let i = 0; i < layerNodes.length; i++) {
            const node = layerNodes[i];
            const nameElement = node.getElementsByTagName("Name")[0];

            if (!nameElement) continue;

            const name =
              node.getElementsByTagName("Title")[0]?.textContent ||
              nameElement.textContent ||
              "";
            const id = nameElement.textContent || "";

            if (name && id) {
              // Check if this layer ID already exists in the array
              const isDuplicate = wmsLayers.some(
                (existingLayer) => existingLayer.id === id
              );

              if (!isDuplicate) {
                wmsLayers.push({
                  name,
                  id,
                  visible: false,
                  type: "raster",
                  url: service.url,
                  serviceId: service.name,
                });
              } else {
                console.log(
                  `Skipping duplicate ESRI layer ID: ${id} in service ${service.name}`
                );
              }
            }
          }

          // If no layers were found and this is an ESRI service, try alternative approaches
          if (wmsLayers.length === 0 && isEsriService) {
            console.log(
              "No layers found in standard location, trying ESRI-specific approaches"
            );

            // Try to find layers in ESRI-specific locations
            try {
              // Try different selectors that might work for ESRI services
              const selectors = [
                "Capability Layer Layer",
                "Layer > Layer",
                "Capability > Layer > Layer",
              ];

              for (const selector of selectors) {
                const esriNodes = xmlDoc.querySelectorAll(selector);
                console.log(
                  `Found ${esriNodes.length} layers using selector: ${selector}`
                );

                if (esriNodes.length > 0) {
                  // Process these nodes
                  for (let i = 0; i < esriNodes.length; i++) {
                    const node = esriNodes[i];
                    const nameElement = node.querySelector("Name");

                    if (!nameElement) continue;

                    const name =
                      node.querySelector("Title")?.textContent ||
                      nameElement.textContent ||
                      "";
                    const id = nameElement.textContent || "";

                    if (name && id) {
                      wmsLayers.push({
                        name,
                        id,
                        visible: false,
                        type: "raster",
                        url: service.url,
                        serviceId: service.name,
                      });
                    }
                  }

                  // If we found layers, break out of the loop
                  if (wmsLayers.length > 0) {
                    console.log(
                      `Added ${wmsLayers.length} layers from ESRI-specific location`
                    );
                    break;
                  }
                }
              }
            } catch (err) {
              console.error("Error processing ESRI-specific layers:", err);
            }
          }

          // If no layers were found but we got a response, create a fallback layer
          if (wmsLayers.length === 0) {
            console.log(
              `No layers found for WMS service: ${service.name}. Creating fallback layer.`
            );

            // Extract a layer ID from the URL if possible
            let fallbackId = "";
            if (service.url.includes("MapServer")) {
              // For ESRI MapServer, use 0 as the default layer ID
              fallbackId = "0";
            } else {
              // Try to extract a meaningful ID from the URL
              const urlParts = service.url.split("/");
              const lastPart = urlParts[urlParts.length - 1];
              fallbackId = lastPart || "layer";
            }

            // Create a fallback layer
            wmsLayers.push({
              name: `${service.name} (Default Layer)`,
              id: fallbackId,
              visible: false,
              type: "raster",
              url: service.url,
              serviceId: service.name,
            });
          }

          results.push({
            layers: wmsLayers,
            loading: false,
            error: null,
          });
        } catch (err) {
          console.error("Error fetching WMS capabilities:", err);
          results.push({
            layers: [],
            loading: false,
            error:
              err instanceof Error
                ? err
                : new Error("Failed to fetch WMS capabilities"),
          });
        }
      }

      setWmsResults(results);
    };

    fetchWmsServices();
  }, [wmsServices, serviceUpdateCounter]);

  // Combine all layers and update loading state
  useEffect(() => {
    const allErrors: Error[] = [
      ...wfsResults.filter((r) => r.error).map((r) => r.error!),
      ...wmsResults.filter((r) => r.error).map((r) => r.error!),
    ];

    setErrors(allErrors);

    const wfsLayers = wfsResults.flatMap((result) => result.layers);
    const wmsLayers = wmsResults.flatMap((result) => result.layers);

    // Check for duplicate layers and create a unique set
    const uniqueLayers: LayerI[] = [];
    const seenIds = new Set<string>();

    // Process WFS layers first
    console.log(`Processing ${wfsLayers.length} WFS layers`);
    wfsLayers.forEach((layer) => {
      const compositeId = `${layer.serviceId || "noservice"}-${
        layer.url || "nourl"
      }-${layer.id}`;
      if (seenIds.has(compositeId)) {
        console.log(
          `Skipping duplicate WFS layer: ${layer.id} from service ${layer.serviceId}`
        );
      } else {
        seenIds.add(compositeId);
        uniqueLayers.push(layer);
      }
    });

    // Then process WMS layers
    console.log(`Processing ${wmsLayers.length} WMS layers`);
    wmsLayers.forEach((layer) => {
      const compositeId = `${layer.serviceId || "noservice"}-${
        layer.url || "nourl"
      }-${layer.id}`;
      if (seenIds.has(compositeId)) {
        console.log(
          `Skipping duplicate WMS layer: ${layer.id} from service ${layer.serviceId}`
        );
      } else {
        seenIds.add(compositeId);
        uniqueLayers.push(layer);
      }
    });

    console.log(
      `Total unique layers: ${uniqueLayers.length} (WFS: ${wfsLayers.length}, WMS: ${wmsLayers.length})`
    );
    setAllLayers(uniqueLayers);

    // Only set isLoading to false when we have results for both WFS and WMS services
    // and the number of results matches the number of services
    const wfsLoaded =
      wfsServices.length > 0 ? wfsResults.length === wfsServices.length : true;
    const wmsLoaded =
      wmsServices.length > 0 ? wmsResults.length === wmsServices.length : true;

    setIsLoading(!(wfsLoaded && wmsLoaded));

    // Debug logging
    console.log("WFS Results:", wfsResults);
    console.log("WMS Results:", wmsResults);
    console.log("WFS Layers:", wfsLayers);
    console.log("WMS Layers:", wmsLayers);
    console.log("Unique Layers:", uniqueLayers);
    console.log("Is Loading:", !(wfsLoaded && wmsLoaded));
  }, [wfsResults, wmsResults, wfsServices.length, wmsServices.length]);

  return { allLayers, isLoading, errors };
}
