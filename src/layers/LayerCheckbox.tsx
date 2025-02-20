import { useContext } from "react";
import { AppContext } from "../App";
import { LayerI } from "./LayerTypes";

interface LayerCheckboxProps {
  layer: LayerI;
}

export function LayerCheckbox({ layer }: LayerCheckboxProps) {
  const { setLayers } = useContext(AppContext);

  const handleChange = (checked: boolean) => {
    setLayers(prev =>
      prev.map(l =>
        l.id === layer.id ? { ...l, visible: checked } : l
      )
    );
  };

  return (
    <div className="layer-checkbox">
      <input
        type="checkbox"
        id={layer.id}
        checked={layer.visible}
        onChange={(e) => handleChange(e.target.checked)}
      />
      <label htmlFor={layer.id}>{layer.name}</label>
    </div>
  );
}
