import { GeoLoc } from "instantsearch.js";
import { LngLatBounds } from "mapbox-gl";

/**
 * Bounds in the format [lng, lat, lng, lat]
 */
export type BoundsMatrix = [number, number, number, number];

/**
 * Instant Search bounds
 */
export type BoundsIS = {
  northEast: GeoLoc;
  southWest: GeoLoc;
};

export function boundsMatrixToLngLatBounds(bounds: BoundsMatrix): LngLatBounds {
  return new LngLatBounds(
    { lng: bounds[0], lat: bounds[1] },
    { lng: bounds[2], lat: bounds[3] }
  );
}

export function boundsLngLatToMatrix(bounds: LngLatBounds): BoundsMatrix {
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();
  if (!ne || !sw) {
    return null;
  }
  return [sw.lng, sw.lat, ne.lng, ne.lat];
}

export function boundsLngLatToIS(bounds: LngLatBounds): BoundsIS {
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();
  if (!ne || !sw) {
    return null;
  }
  return {
    northEast: { lng: ne.lng, lat: ne.lat },
    southWest: { lng: sw.lng, lat: sw.lat },
  };
}
