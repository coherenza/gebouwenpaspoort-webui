import { useMemo, useContext, useEffect } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { AppContext } from '../App';
import { LayerGroup } from './LayerGroup';
import { LayerI } from './types';
import { wfsServices } from '../config/wfsServices';
import { useWFSCapabilities } from '../hooks/useWFSCapabilities';

export function LayerSelector() {
  const { showLayerSelector, setShowLayerSelector, layers, setLayers } = useContext(AppContext);

  const servicesData = useMemo(() =>
    wfsServices.map(service => {
      const { featureTypes, loading, error } = useWFSCapabilities(`${service.url}?request=GetCapabilities`);
      return {
        service,
        featureTypes,
        loading,
        error
      };
    }), []
  );

  const allWfsLayers = useMemo(() =>
    servicesData.flatMap(({ service, featureTypes }) =>
      featureTypes.map(feature => ({
        name: feature.Title,
        id: feature.Name,
        visible: false,
        type: "fill",
        url: service.url,
        serviceId: service.id
      }))
    ), [servicesData]
  );

  useEffect(() => {
    const hasNewLayers = allWfsLayers.length > 0;

    if (hasNewLayers) {
      setLayers(prevLayers => {
        const newLayers = allWfsLayers.filter(
          wfsLayer => !prevLayers.some(layer => layer.id === wfsLayer.id)
        );
        return newLayers.length > 0 ? [...prevLayers, ...newLayers] : prevLayers;
      });
    }
  }, [allWfsLayers, setLayers]);

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
