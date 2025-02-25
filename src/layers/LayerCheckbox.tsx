import { useContext, Dispatch, SetStateAction } from "react";
import { AppContext } from "../App";
import { LayerI } from "./LayerTypes";

interface LayerCheckboxProps {
  layer: LayerI;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export function LayerCheckbox({ layer, setSearchTerm }: LayerCheckboxProps) {
  const { setLayers } = useContext(AppContext);

  const handleChange = (checked: boolean) => {
    setLayers(prev =>
      prev.map(l =>
        l.id === layer.id ? { ...l, visible: checked } : l
      )
    );

    // Clear the search when turning on a layer
    if (checked) {
      setSearchTerm("");
    }
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
