import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { LayerCheckbox } from "./LayerCheckbox";
import { LayerI } from "./LayerTypes";

interface LayerGroupProps {
  title: string;
  layers: LayerI[];
  isExpanded?: boolean;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export function LayerGroup({ title, layers, isExpanded: defaultExpanded = false, setSearchTerm }: LayerGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Update isExpanded when defaultExpanded changes
  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded]);

  // Helper function to get a unique key for each layer
  const getLayerKey = (layer: LayerI): string => {
    // Use uniqueId if available (added in our enhanced ESRI layer handling)
    if ((layer as any).uniqueId) {
      return (layer as any).uniqueId;
    }
    // Fall back to the composite ID approach
    return `${layer.serviceId || 'noservice'}-${layer.url || 'nourl'}-${layer.id}`;
  };

  return (
    <div className="layer-group">
      <button
        className="layer-group__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        <h4>{title}</h4>
      </button>
      {isExpanded && (
        <div className="layer-group__content">
          {layers.map((layer) => (
            <LayerCheckbox
              layer={layer}
              key={getLayerKey(layer)}
              setSearchTerm={setSearchTerm}
            />
          ))}
        </div>
      )}
    </div>
  );
}
