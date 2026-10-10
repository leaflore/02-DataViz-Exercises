import React, { useState, useEffect } from 'react';
import { json } from 'd3';

// LA GeoHub Neighborhood Councils layer, filtered server-side to two NCs, returned as GeoJSON in WGS84
const where = "NAME IN ('HOLLYWOOD HILLS WEST NC', 'BEL AIR-BEVERLY CREST NC')";
const jsonUrl =
  "https://maps.lacity.org/lahub/rest/services/Boundaries/MapServer/18/query" +
  `?outFields=*&where=${encodeURIComponent(where)}&outSR=4326&f=geojson`;

export const useData = () => {

  //State to hold the GeoJSON data. Initially set to null.
  // This is a form array destructuring assignment used to extract the state and the updater function.
  const [data, setData] = useState(null);


  // World Atlas JSON data
  // Logs data to the console
  // console.log(data);
  // console.log(feature); Was used to look at features (was not abble to get it to work)
  
  useEffect(() => {
    json(jsonUrl).then(fc => {
      // ArcGIS returns counter-clockwise exterior rings (RFC 7946); d3 expects clockwise,
      // otherwise it treats each polygon as "the whole globe minus the polygon".
      fc.features.forEach(f => {
        f.geometry.coordinates = f.geometry.type === 'Polygon'
          ? f.geometry.coordinates.map(ring => ring.slice().reverse())
          : f.geometry.coordinates.map(poly => poly.map(ring => ring.slice().reverse()));
      });
      setData(fc);
    });
  }, []);
  
  return data;
};

/*export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then(topology => {
      const { countries, land } = topology.objects;
      setData({
        land: feature(topology, land),
        countries: feature(topology, countries)
      });
    });
  }, []);

  return data;
}; */