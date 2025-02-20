/// Fetch the capabilities of a WFS server
export async function getCapabilitiesWFS(baseUrl: string) {
  const url = `${baseUrl}?request=GetCapabilities&service=WFS`;
  const response = await fetch(url);
  const text = await response.text();
  return text;
}

import { useState, useEffect } from "react";

interface FeatureType {
  Name: string;
  Title: string;
}

interface UseWFSCapabilitiesResult {
  featureTypes: FeatureType[];
  loading: boolean;
  error: Error | null;
}

export function useWFSCapabilities(url: string): UseWFSCapabilitiesResult {
  const [featureTypes, setFeatureTypes] = useState<FeatureType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCapabilities() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        // Parse XML and extract feature types
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        const featureTypeNodes = xmlDoc.getElementsByTagName("FeatureType");

        const types = Array.from(featureTypeNodes).map((node) => ({
          Name: node.getElementsByTagName("Name")[0]?.textContent || "",
          Title: node.getElementsByTagName("Title")[0]?.textContent || "",
        }));

        setFeatureTypes(types);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch capabilities")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCapabilities();
  }, [url]);

  return { featureTypes, loading, error };
}
