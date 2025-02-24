import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { LayerCheckbox } from "./LayerCheckbox";
import { LayerI } from "./LayerTypes";

interface LayerGroupProps {
  title: string;
  layers: LayerI[];
}

export function LayerGroup({ title, layers }: LayerGroupProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
            <LayerCheckbox layer={layer} key={layer.id} />
          ))}
        </div>
      )}
    </div>
  );
}
