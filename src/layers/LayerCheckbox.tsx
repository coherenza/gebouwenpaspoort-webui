import { useContext, Dispatch, SetStateAction } from "react";
import { AppContext } from "../App";
import { LayerI } from "./LayerTypes";
import { CustomCheckbox } from "../components/CustomCheckbox";
import "../components/CustomCheckbox.css";

interface LayerCheckboxProps {
  layer: LayerI;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export function LayerCheckbox({ layer, setSearchTerm }: LayerCheckboxProps) {
  const { setLayers } = useContext(AppContext);

  const handleChange = (checked: boolean) => {
    setLayers(prev =>
      prev.map(l => {
        // Create a composite ID for comparison if uniqueId is not available
        const layerUniqueId = layer.uniqueId || `${layer.serviceId || 'noservice'}-${layer.url || 'nourl'}-${layer.id}`;
        const currentUniqueId = l.uniqueId || `${l.serviceId || 'noservice'}-${l.url || 'nourl'}-${l.id}`;

        // Compare using uniqueId or composite ID
        return layerUniqueId === currentUniqueId ? { ...l, visible: checked } : l;
      })
    );

    // Clear the search when turning on a layer
    if (checked) {
      setSearchTerm("");
    }
  };

  return (
    <CustomCheckbox
      checked={layer.visible}
      onChange={handleChange}
      label={layer.name}
      className="layer-checkbox"
    />
  );
}
