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
  console.log("Attempting to detect service type for URL:", baseUrl);

  try {
    // First try WFS
    console.log("Trying WFS capabilities...");
    let wfsResponse;
    try {
      wfsResponse = await fetch(
        `${baseUrl}?request=GetCapabilities&service=WFS`
      );
      console.log("WFS response status:", wfsResponse.status);
    } catch (fetchError) {
      console.error("Error fetching WFS capabilities:", fetchError);
      // Continue to try WMS
    }

    if (wfsResponse && wfsResponse.ok) {
      const text = await wfsResponse.text();
      console.log("WFS response received, length:", text.length);

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

        console.log("Detected WFS service with title:", title);
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
      } else {
        console.log("Response doesn't contain WFS capabilities markers");
      }
    }

    // Then try WMS
    console.log("Trying WMS capabilities...");
    let wmsResponse;
    try {
      wmsResponse = await fetch(
        `${baseUrl}?request=GetCapabilities&service=WMS`
      );
      console.log("WMS response status:", wmsResponse.status);
    } catch (fetchError) {
      console.error("Error fetching WMS capabilities:", fetchError);
      return {
        type: null,
        service: null,
        error: `Network error: ${fetchError.message}. This might be due to CORS restrictions or the service being unavailable.`,
      };
    }

    if (wmsResponse && wmsResponse.ok) {
      const text = await wmsResponse.text();
      console.log("WMS response received, length:", text.length);
      console.log("First 200 chars of response:", text.substring(0, 200));

      // Check if it's a valid WMS response
      if (
        text.includes("<WMS_Capabilities") ||
        text.includes("<WMT_MS_Capabilities") ||
        text.includes('xmlns="http://www.opengis.net/wms"') ||
        text.includes("xmlns:esri_wms")
      ) {
        // Extract service name from capabilities if possible
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        // Try multiple ways to get the service name
        let title = null;

        // First try to get the Service Title
        const serviceTitleElement = xmlDoc.querySelector("Service > Title");
        if (serviceTitleElement && serviceTitleElement.textContent) {
          title = serviceTitleElement.textContent;
        }

        // If that fails, try the first Layer Title
        if (!title) {
          const layerTitleElement = xmlDoc.querySelector("Layer > Title");
          if (layerTitleElement && layerTitleElement.textContent) {
            title = layerTitleElement.textContent;
          }
        }

        // If still no title, try any Title element
        if (!title) {
          const anyTitleElement = xmlDoc.getElementsByTagName("Title")[0];
          if (anyTitleElement && anyTitleElement.textContent) {
            title = anyTitleElement.textContent;
          }
        }

        // For ESRI WMS servers, try to get the root Layer name
        if (!title || title === "WMS") {
          // Try to get the root Layer name which often contains the actual service name
          const rootLayerName = xmlDoc.querySelector("Layer > Name");
          if (rootLayerName && rootLayerName.textContent) {
            title = rootLayerName.textContent;
          }

          // If that fails, try to get the first child Layer name
          if (!title || title === "WMS") {
            const childLayerName = xmlDoc.querySelector("Layer > Layer > Name");
            if (childLayerName && childLayerName.textContent) {
              title = childLayerName.textContent;
            }
          }
        }

        // If all else fails, extract a name from the URL
        if (!title || title === "WMS") {
          // Extract a meaningful name from the URL path
          const urlParts = baseUrl.split("/");
          // Find the most descriptive part of the URL (usually before MapServer/WMSServer)
          for (let i = urlParts.length - 2; i >= 0; i--) {
            if (
              urlParts[i] &&
              !["MapServer", "WMSServer", "server", "services"].includes(
                urlParts[i]
              )
            ) {
              title = urlParts[i].replace(/_/g, " ");
              // Capitalize first letter of each word
              title = title
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              break;
            }
          }

          // If still no title, use the last part of the URL
          if (!title || title === "WMS") {
            title = urlParts.pop() || "WMS Service";
          }
        }

        // Special case for ESRI MapServer WMS services
        if (baseUrl.includes("MapServer/WMSServer")) {
          // Extract the service name from the URL path
          const urlParts = baseUrl.split("/");
          const mapServerIndex = urlParts.findIndex(
            (part) => part === "MapServer"
          );

          if (mapServerIndex > 0) {
            // Look for the service name in the URL path
            // It's usually the part before MapServer
            const servicePart = urlParts[mapServerIndex - 1];

            if (
              servicePart &&
              servicePart !== "services" &&
              servicePart !== "server"
            ) {
              // Format the service name
              title = servicePart.replace(/_/g, " ");
              // Capitalize first letter of each word
              title = title
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              console.log("Extracted ESRI MapServer service name:", title);
            }
          }
        }

        // Get description if available
        let description = null;
        const abstractElement =
          xmlDoc.querySelector("Service > Abstract") ||
          xmlDoc.querySelector("Abstract");
        if (abstractElement && abstractElement.textContent) {
          description = abstractElement.textContent;
        } else {
          description = `Automatically detected WMS service: ${title}`;
        }

        console.log("Detected WMS service with title:", title);
        return {
          type: "WMS",
          service: {
            name: title,
            url: baseUrl,
            description: description,
          },
        };
      } else {
        console.log("Response doesn't contain WMS capabilities markers");

        // Check if the response contains an error message
        if (
          text.includes("not allowed") ||
          text.includes("access denied") ||
          text.includes("unauthorized")
        ) {
          return {
            type: null,
            service: null,
            error: "Access to this service is restricted or not allowed.",
          };
        }

        // Try to create a service anyway if we got a response but couldn't parse it
        if (text.length > 0) {
          // Extract a name from the URL
          const urlParts = baseUrl.split("/");
          let title = "Unknown Service";

          // Find the most descriptive part of the URL
          for (let i = urlParts.length - 2; i >= 0; i--) {
            if (
              urlParts[i] &&
              !["MapServer", "WMSServer", "server", "services"].includes(
                urlParts[i]
              )
            ) {
              title = urlParts[i].replace(/_/g, " ");
              // Capitalize first letter of each word
              title = title
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              break;
            }
          }

          console.log("Creating WMS service from URL with title:", title);

          // If the URL ends with WMSServer, assume it's a WMS service
          if (baseUrl.endsWith("WMSServer")) {
            return {
              type: "WMS",
              service: {
                name: title,
                url: baseUrl,
                description: `WMS service from: ${baseUrl}`,
              },
              error:
                "Warning: Service responded but couldn't be fully validated. Some layers may not load correctly.",
            };
          }
        }
      }
    } else if (wmsResponse) {
      return {
        type: null,
        service: null,
        error: `Service returned status ${wmsResponse.status}: ${wmsResponse.statusText}`,
      };
    }

    // If we get here, we couldn't detect a valid service
    return {
      type: null,
      service: null,
      error:
        "Could not detect a valid WFS or WMS service at this URL. Check the console for more details.",
    };
  } catch (error) {
    console.error("Error in detectServiceType:", error);
    return {
      type: null,
      service: null,
      error: `Error detecting service: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}
