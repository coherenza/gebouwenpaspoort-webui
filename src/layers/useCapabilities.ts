/// Fetch the capabilities of a WFS server
export async function getCapabilitiesWFS(baseUrl: string) {
  const url = `${baseUrl}?request=GetCapabilities&service=WFS`;
  const response = await fetch(url);
  const text = await response.text();
  return text;
}

import { useState, useEffect } from "react";
import { LayerI } from "./LayerTypes";
import { WFSService } from "./LayerTypes";

interface UseWFSCapabilitiesResult {
  layers: LayerI[];
  loading: boolean;
  error: Error | null;
  name: string;
}

export function useWFSCapabilities(
  service: WFSService
): UseWFSCapabilitiesResult {
  const [layers, setLayers] = useState<LayerI[]>([]);
  const [name, setName] = useState<string>(service.url.split("/").pop() || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCapabilities() {
      try {
        const capabilitiesURL = `${service.url}?request=GetCapabilities&service=WFS`;
        const response = await fetch(capabilitiesURL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        // Parse XML and extract feature types
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        const featureTypeNodes = xmlDoc.getElementsByTagName("FeatureType");

        setName(
          featureTypeNodes[0]?.getElementsByTagName("ows:Title")[0]
            ?.textContent || service.name
        );

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

        setLayers(layers);
        setError(null);
      } catch (err) {
        console.error("Error fetching capabilities:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to fetch capabilities")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCapabilities();
  }, [service]);

  return { layers, loading, error, name };
}
