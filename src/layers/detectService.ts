import { WFSService, WMService } from "./LayerTypes";

/**
 * Attempts to detect if a URL is a WFS or WMS service
 * @param url The URL to check
 * @returns An object with the detected service type and a service object
 */
export async function detectServiceType(url: string): Promise<{
  type: "WFS" | "WMS" | null;
  service: WFSService | WMService | null;
  error?: string;
}> {
  // Clean the URL by removing any existing query parameters
  const baseUrl = url.split("?")[0];

  try {
    // First try WFS
    const wfsResponse = await fetch(
      `${baseUrl}?request=GetCapabilities&service=WFS`
    );
    if (wfsResponse.ok) {
      const text = await wfsResponse.text();
      // Check if it's a valid WFS response by looking for WFS-specific elements
      if (
        text.includes("<wfs:WFS_Capabilities") ||
        text.includes("<WFS_Capabilities")
      ) {
        // Extract service name from capabilities if possible
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        const title =
          xmlDoc.getElementsByTagName("Title")[0]?.textContent ||
          xmlDoc.getElementsByTagName("ows:Title")[0]?.textContent ||
          baseUrl.split("/").pop() ||
          "Unknown Service";

        return {
          type: "WFS",
          service: {
            name: title,
            url: baseUrl,
            description:
              xmlDoc.getElementsByTagName("Abstract")[0]?.textContent ||
              xmlDoc.getElementsByTagName("ows:Abstract")[0]?.textContent ||
              `Automatically detected WFS service: ${title}`,
          },
        };
      }
    }

    // Then try WMS
    const wmsResponse = await fetch(
      `${baseUrl}?request=GetCapabilities&service=WMS`
    );
    if (wmsResponse.ok) {
      const text = await wmsResponse.text();
      // Check if it's a valid WMS response
      if (
        text.includes("<WMS_Capabilities") ||
        text.includes("<WMT_MS_Capabilities")
      ) {
        // Extract service name from capabilities if possible
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        const title =
          xmlDoc.getElementsByTagName("Title")[0]?.textContent ||
          baseUrl.split("/").pop() ||
          "Unknown Service";

        return {
          type: "WMS",
          service: {
            name: title,
            url: baseUrl,
            description:
              xmlDoc.getElementsByTagName("Abstract")[0]?.textContent ||
              `Automatically detected WMS service: ${title}`,
          },
        };
      }
    }

    // If we get here, we couldn't detect a valid service
    return {
      type: null,
      service: null,
      error: "Could not detect a valid WFS or WMS service at this URL",
    };
  } catch (error) {
    return {
      type: null,
      service: null,
      error: `Error detecting service: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}
