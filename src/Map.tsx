import React, { useState, useEffect, useRef } from "react";
import "./Map.css";
import { useGeoSearch } from "./useGeoSearch";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxToken =
  "pk.eyJ1Ijoiam9lcGlvIiwiYSI6ImNqbTIzanZ1bjBkanQza211anFxbWNiM3IifQ.2iBrlCLHaXU79_tY9SVpXA";
mapboxgl.accessToken = mapboxToken;

export function Map() {
  const { items } = useGeoSearch();

  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [lng, setLng] = useState(5.1213);
  const [lat, setLat] = useState(52.0907);
  const [zoom, setZoom] = useState(9);

  console.log("items", items);

  useEffect(() => {
    if (mapRef.current) return; // initialize map only once
    let map = mapRef.current;
    map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.on("load", () => {
      map.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: items.map((i) => {
            console.log('adding', i)
            return {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [i._geoloc.lat, i._geoloc.lng],
              },
              properties: {
                title: "Mapbox DC",
              },
            };
          }),
        },
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "points",
        filter: ["has", "point_count"],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            100,
            "#f1f075",
            750,
            "#f28cb1",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });
    });
  });

  useEffect(() => {
    if (!mapRef.current) return; // wait for map to initialize
    const map = mapRef.current;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
