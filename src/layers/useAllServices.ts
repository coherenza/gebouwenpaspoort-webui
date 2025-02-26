import { useState, useEffect } from "react";
import { LayerI, WFSService, WMService } from "./LayerTypes";

interface ServiceResult {
  layers: LayerI[];
  loading: boolean;
  error: Error | null;
}

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
          const response = await fetch(capabilitiesURL);

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
      const results: ServiceResult[] = [];

      for (const service of wmsServices) {
        try {
          const capabilitiesURL = `${service.url}?request=GetCapabilities&service=WMS`;
          const response = await fetch(capabilitiesURL);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const text = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(text, "text/xml");

          const layerNodes = xmlDoc.getElementsByTagName("Layer");
          const serviceTitle =
            xmlDoc.getElementsByTagName("Title")[0]?.textContent ||
            service.name;

          const wmsLayers: LayerI[] = [];

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
              wmsLayers.push({
                name,
                id,
                visible: false,
                type: "raster",
                url: service.url,
                serviceId: service.url,
              });
            }
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

    setAllLayers([...wfsLayers, ...wmsLayers]);
    setIsLoading(wfsResults.length === 0 || wmsResults.length === 0);
  }, [wfsResults, wmsResults]);

  return { allLayers, isLoading, errors };
}
