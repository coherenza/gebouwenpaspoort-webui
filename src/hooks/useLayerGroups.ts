import { useMemo } from "react";
import { LayerI } from "../layers/LayerTypes";
import { wfsServices } from "../config/wfsServices";

export interface LayerGroup {
  serviceId: string;
  title: string;
  layers: LayerI[];
}

export function useLayerGroups(layers: LayerI[]): LayerGroup[] {
  return useMemo(() => {
    // Create a map to store layers by group
    const groupedLayers = new Map<string, LayerI[]>();

    // Add base layers group
    groupedLayers.set(
      "base",
      layers.filter((layer) => !layer.serviceId)
    );

    // Group layers by service
    wfsServices.forEach((service) => {
      groupedLayers.set(
        service.name,
        layers.filter((layer) => layer.serviceId === service.name)
      );
    });

    // Convert map to array of LayerGroup objects
    return Array.from(groupedLayers.entries())
      .map(([serviceId, layers]) => ({
        serviceId,
        title:
          serviceId === "base"
            ? "Basiskaarten"
            : wfsServices.find((s) => s.name === serviceId)?.name || serviceId,
        layers,
      }))
      .filter((group) => group.layers.length > 0); // Only return groups with layers
  }, [layers]);
}
