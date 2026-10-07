import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature } from 'topojson';

// jsonUrl variable
const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

export const useData = () => {

  //State to hold the GeoJSON data. Initially set to null.
  // This is a form array destructuring assignment used to extract the state and the updater function.
  const [data, setData] = useState(null);


  // World Atlas JSON data
  // Logs data to the console
  // console.log(data);
  // console.log(feature); Was used to look at features (was not abble to get it to work)
  
  useEffect(() => {
    json(jsonUrl).then(topojsonData => {
      // console.log(topojsonData); // way to inspect the data before converting it to GeoJSON
      const { countries } = topojsonData.objects;
      setData(feature(topojsonData, countries));
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