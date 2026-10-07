import { geoNaturalEarth, geoPath } from 'd3';

export const Marks = ({ data, width, height }) => (
  <g className="marks">
    {
      data.features.map(d => (
        <path d={} />
      ))
      /*
       Using the parentheses as an implicit return for the arrow function.
       The parentheses are required so JavaScript knows the curly braces represent an object literal rather than a function block.
      */
    }
  </g>
);