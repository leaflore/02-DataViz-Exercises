import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature } from 'topojson';

// jsonUrl variable
const jsonUrl =
  'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

export const useData = () => {
  const [data, setData] = useState(null);


  // World Atlas JSON data
  // Logs data to the console
  //console.log(data);
  console.log(feature);
  
  useEffect(() => {
    json(jsonUrl).then(setData);
  }, []);
  
  return data;
};