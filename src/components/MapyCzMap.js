import React, { useEffect } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

const MapyCzMap = () => {
  useEffect(() => {
    const apiKey = process.env.REACT_APP_MAPYCZ_API_KEY;

    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `https://mapserver.mapy.cz/base-m/{z}-{x}-{y}?apikey=${apiKey}`, // Карта Mapy.cz
          }),
        }),
      ],
      view: new View({
        center: [1600000, 6400000], // Координаты центра (замени на нужные)
        zoom: 10,
      }),
    });

    return () => map.setTarget(null); // Очищаем карту при размонтировании
  }, []);

  return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
};

export default MapyCzMap;
