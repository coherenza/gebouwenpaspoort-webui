import { useCallback, useContext } from "react";
import { AppContext } from "../App";
import { LayerI } from "../types";

interface LayerCheckboxProps {
  layer: LayerI;
}

export function LayerCheckbox({ layer }: LayerCheckboxProps) {
  const { setLayers, layers } = useContext(AppContext);

  const toggleLayer = useCallback(
    (layer: LayerI) => {
      const newLayers = layers.map((l) => {
        if (l.id === layer.id) {
          return { ...l, visible: !l.visible };
        }
        return l;
      });
      setLayers(newLayers);
    },
    [layers, setLayers]
  );

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={layer.visible}
          onChange={() => toggleLayer(layer)}
        />
        {layer.name}
      </label>
    </div>
  );
}
