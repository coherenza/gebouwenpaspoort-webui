import { useState, useEffect } from "react";
import { LayerI, WFSService, WMService } from "./LayerTypes";

interface ServiceResult {
  layers: LayerI[];
  loading: boolean;
  error: Error | null;
}

// Timeout for service requests in milliseconds (30 seconds)
const SERVICE_REQUEST_TIMEOUT = 30000;

/**
 * Creates a promise that rejects after a specified timeout
 */
const createTimeoutPromise = (timeoutMs: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
};

// Helper function to handle CORS issues with timeout
const fetchWithCorsProxy = async (url: string): Promise<Response> => {
  try {
    // First try direct fetch with timeout
    const fetchPromise = fetch(url);
    const timeoutPromise = createTimeoutPromise(SERVICE_REQUEST_TIMEOUT);

    const directResponse = await Promise.race([fetchPromise, timeoutPromise]);
    if (directResponse.ok) {
      return directResponse;
    }
    console.log(`Direct fetch failed for ${url}, trying with CORS proxy`);

    try {
      const corsProxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      const proxyResponse = await Promise.race([
        fetch(corsProxyUrl),
        createTimeoutPromise(SERVICE_REQUEST_TIMEOUT),
      ]);
      if (proxyResponse.ok) {
        return proxyResponse;
      }
    } catch (proxyError) {
      console.error(`CORS proxy failed for ${url}`, proxyError);
    }

    // If CORS proxy fails, try with another proxy
    try {
      const altProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
        url
      )}`;
      const altProxyResponse = await Promise.race([
        fetch(altProxyUrl),
        createTimeoutPromise(SERVICE_REQUEST_TIMEOUT),
      ]);
      if (altProxyResponse.ok) {
        return altProxyResponse;
      }
    } catch (altProxyError) {
      console.error(`Alternative proxy failed for ${url}`, altProxyError);
    }

    // If all proxies fail, return the original response
    return directResponse;
  } catch (error) {
    console.error(`Error with direct fetch for ${url}`, error);

    // Try with CORS proxy
    try {
      const corsProxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      const proxyResponse = await Promise.race([
        fetch(corsProxyUrl),
        createTimeoutPromise(SERVICE_REQUEST_TIMEOUT),
      ]);
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
      const altProxyResponse = await Promise.race([
        fetch(altProxyUrl),
        createTimeoutPromise(SERVICE_REQUEST_TIMEOUT),
      ]);
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
 * Generic function to fetch service capabilities
 * @param serviceUrl The URL of the service
 * @param serviceType The type of service ('WFS' or 'WMS')
 * @returns The XML document and response text
 */
const fetchServiceCapabilities = async (
  serviceUrl: string,
  serviceType: "WFS" | "WMS"
): Promise<{ xmlDoc: Document; text: string }> => {
  const capabilitiesURL = `${serviceUrl}?request=GetCapabilities&service=${serviceType}`;
  const response = await fetchWithCorsProxy(capabilitiesURL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "text/xml");

  return { xmlDoc, text };
};

/**
 * Process WFS service capabilities and extract layers
 */
const processWfsCapabilities = (
  xmlDoc: Document,
  text: string,
  service: WFSService
): LayerI[] => {
  const featureTypeNodes = xmlDoc.getElementsByTagName("FeatureType");

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

  return layers;
};

/**
 * Process WMS service capabilities and extract layers
 */
const processWmsCapabilities = (
  xmlDoc: Document,
  text: string,
  service: WMService
): LayerI[] => {
  const layerNodes = xmlDoc.getElementsByTagName("Layer");

  // Special handling for ESRI MapServer WMS services
  const isEsriService =
    text.includes("xmlns:esri_wms") ||
    service.url.includes("MapServer/WMSServer");

  if (isEsriService) {
    console.log("Detected ESRI MapServer WMS service");
  }

  const wmsLayers: LayerI[] = [];
  const processedIds = new Set<string>(); // Track processed IDs to avoid duplicates

  // Helper function to create a unique ID for ESRI layers
  const createUniqueLayerId = (
    id: string,
    parentId: string = "",
    depth: number = 0
  ): string => {
    // For ESRI services, create a more unique ID by combining parent ID and layer ID
    if (isEsriService) {
      return parentId ? `${parentId}_${id}_${depth}` : id;
    }
    return id;
  };

  // Helper function to process a layer node and its children
  const processLayerNode = (
    node: Element,
    parentId: string = "",
    depth: number = 0
  ) => {
    const nameElement = node.getElementsByTagName("Name")[0];
    if (!nameElement) return;

    const name =
      node.getElementsByTagName("Title")[0]?.textContent ||
      nameElement.textContent ||
      "";
    const originalId = nameElement.textContent || "";

    if (name && originalId) {
      // Create a unique ID for this layer
      const uniqueId = createUniqueLayerId(originalId, parentId, depth);

      // Check if we've already processed this ID
      if (!processedIds.has(uniqueId)) {
        processedIds.add(uniqueId);

        wmsLayers.push({
          name,
          id: originalId, // Keep the original ID for the service request
          visible: false,
          type: "raster",
          url: service.url,
          serviceId: service.name,
          // Store the unique ID as a property for React keys
          uniqueId: uniqueId,
        } as LayerI);
      } else {
        console.log(
          `Skipping duplicate ESRI layer ID: ${originalId} (${uniqueId}) in service ${service.name}`
        );
      }
    }

    // Process child layers if any
    const childLayers = node.getElementsByTagName("Layer");
    for (let i = 0; i < childLayers.length; i++) {
      processLayerNode(childLayers[i], originalId, depth + 1);
    }
  };

  // Process all top-level layer nodes
  for (let i = 0; i < layerNodes.length; i++) {
    processLayerNode(layerNodes[i]);
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
            const uniqueId = `${id}_${i}`;

            if (name && id && !processedIds.has(uniqueId)) {
              processedIds.add(uniqueId);
              wmsLayers.push({
                name,
                id,
                visible: false,
                type: "raster",
                url: service.url,
                serviceId: service.name,
                uniqueId,
              } as LayerI);
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
      uniqueId: `${service.name}_${fallbackId}`,
    } as LayerI);
  }

  return wmsLayers;
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

  // Fetch both WFS and WMS services in parallel
  useEffect(() => {
    // Start both fetches in parallel
    const fetchAllServices = async () => {
      // Start WMS services first as they typically take longer
      const wmsPromise = fetchWmsServices();
      const wfsPromise = fetchWfsServices();

      // Wait for both to complete
      await Promise.all([wmsPromise, wfsPromise]);
    };

    // Function to fetch WMS services
    const fetchWmsServices = async () => {
      console.log("Starting WMS service fetch for:", wmsServices);
      const results: ServiceResult[] = [];

      // Create an array of promises for all WMS services
      const servicePromises = wmsServices.map(async (service) => {
        try {
          console.log(
            `Fetching WMS capabilities for service: ${service.name} (${service.url})`
          );
          const { xmlDoc, text } = await fetchServiceCapabilities(
            service.url,
            "WMS"
          );
          console.log(
            `Received WMS response for ${service.name}, length: ${text.length}`
          );

          const layers = processWmsCapabilities(xmlDoc, text, service);

          return {
            layers,
            loading: false,
            error: null,
          };
        } catch (err) {
          console.error("Error fetching WMS capabilities:", err);
          return {
            layers: [],
            loading: false,
            error:
              err instanceof Error
                ? err
                : new Error("Failed to fetch WMS capabilities"),
          };
        }
      });

      // Wait for all service promises to resolve
      const serviceResults = await Promise.all(servicePromises);
      setWmsResults(serviceResults);
    };

    // Function to fetch WFS services
    const fetchWfsServices = async () => {
      const results: ServiceResult[] = [];

      // Create an array of promises for all WFS services
      const servicePromises = wfsServices.map(async (service) => {
        try {
          console.log(
            `Fetching WFS capabilities for service: ${service.name} (${service.url})`
          );
          const { xmlDoc, text } = await fetchServiceCapabilities(
            service.url,
            "WFS"
          );

          const layers = processWfsCapabilities(xmlDoc, text, service);

          return {
            layers,
            loading: false,
            error: null,
          };
        } catch (err) {
          console.error("Error fetching WFS capabilities:", err);
          return {
            layers: [],
            loading: false,
            error:
              err instanceof Error
                ? err
                : new Error("Failed to fetch WFS capabilities"),
          };
        }
      });

      // Wait for all service promises to resolve
      const serviceResults = await Promise.all(servicePromises);
      setWfsResults(serviceResults);
    };

    fetchAllServices();
  }, [wfsServices, wmsServices, serviceUpdateCounter]);

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
    wfsLayers.forEach((layer) => {
      // Use uniqueId if available, otherwise create a composite ID
      const uniqueId =
        (layer as any).uniqueId ||
        `${layer.serviceId || "noservice"}-${layer.url || "nourl"}-${layer.id}`;

      if (seenIds.has(uniqueId)) {
        console.log(
          `Skipping duplicate WFS layer: ${layer.id} from service ${layer.serviceId}`
        );
      } else {
        seenIds.add(uniqueId);
        uniqueLayers.push(layer);
      }
    });

    wmsLayers.forEach((layer) => {
      // Use uniqueId if available, otherwise create a composite ID
      const uniqueId =
        (layer as any).uniqueId ||
        `${layer.serviceId || "noservice"}-${layer.url || "nourl"}-${layer.id}`;

      if (seenIds.has(uniqueId)) {
        console.log(
          `Skipping duplicate WMS layer: ${layer.id} from service ${layer.serviceId}`
        );
      } else {
        seenIds.add(uniqueId);
        uniqueLayers.push(layer);
      }
    });
    setAllLayers(uniqueLayers);

    // Only set isLoading to false when we have results for both WFS and WMS services
    // and the number of results matches the number of services
    const wfsLoaded =
      wfsServices.length > 0 ? wfsResults.length === wfsServices.length : true;
    const wmsLoaded =
      wmsServices.length > 0 ? wmsResults.length === wmsServices.length : true;

    setIsLoading(!(wfsLoaded && wmsLoaded));
  }, [wfsResults, wmsResults, wfsServices.length, wmsServices.length]);

  return { allLayers, isLoading, errors };
}
