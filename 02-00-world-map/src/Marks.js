import { geoEqualEarth, geoPath } from 'd3';

/*
The constant variables project and path were originally defined outside the component from the tutorial direction, but now they are 
defined inside the component to use the width and height props dynamically. the .fitSize() method is the requirement for the 
variable's new location.
*/

export const Marks = ({ data, width, height }) => { //This is the parentheses mentioned below.
  const projection = geoEqualEarth().fitSize([width, height], { type: 'FeatureCollection', features: data.features });
  const path = geoPath(projection);
  return (
  <g className="marks">
    {
      data.features.map(feature => (
        <path d={path(feature)} />
      ))
      /*
       Using the parentheses as an implicit return for the arrow function.
       The parentheses are required so JavaScript knows the curly braces represent an object 
       literal rather than a function block.
      */
    }
  </g>
  );
};