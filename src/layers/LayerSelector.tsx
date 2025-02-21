import { useMemo, useContext, useEffect } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { AppContext } from '../App';
import { LayerGroup } from './LayerGroup';
import { LayerI } from './LayerTypes';
import { wfsServices } from '../config/wfsServices';

export function LayerSelector() {
  const { showLayerSelector, setShowLayerSelector, layers, setLayers } = useContext(AppContext);

  const layerGroups = useMemo(() => ({
    base: {
      title: "Basiskaarten",
      filter: (layer: LayerI) => !wfsServices.some(service => layer.id.includes(service.id))
    },
    ...Object.fromEntries(
      wfsServices.map(service => [
        service.id,
        {
          title: service.name,
          filter: (layer: LayerI) => layer.serviceId === service.id
        }
      ])
    )
  }), []);

  return (
    <div className={`Sidebar filter-panel ${showLayerSelector ? "filter-panel--open" : ""}`}>
      <div className="Titlebar">
        <h3>Lagen</h3>
        <button title="Lagen sluiten" onClick={() => setShowLayerSelector(false)}>
          <Cross1Icon />
        </button>
      </div>
      <div className="layers-checkboxes">
        {Object.entries(layerGroups).map(([key, group]) => (
          <LayerGroup
            key={key}
            title={group.title}
            layers={layers.filter(group.filter)}
          />
        ))}
      </div>
    </div>
  );
}
