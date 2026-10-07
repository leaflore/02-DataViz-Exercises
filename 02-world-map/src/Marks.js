import { geoNaturalEarth1, geoPath } from 'd3';

export const Marks = ({ data, width, height }) => {
  const projection = geoNaturalEarth1().fitSize([width, height], data);
  const path = geoPath(projection);

  return (
    <g className="marks">
      {data.features.map(country => (
        <path
          key={country.id}
          d={path(country)}
          fill="lightsteelblue"
          stroke="white"
        />
      ))}
    </g>
  );
};