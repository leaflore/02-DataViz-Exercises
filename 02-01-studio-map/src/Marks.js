import { geoMercator, geoPath } from 'd3';

export const Marks = ({ data, width, height }) => {
  const projection = geoMercator().fitSize([width, height], data);
  const path = geoPath(projection);

  return (
    <g className="marks">
      {data.features.map(d => (
        <path key={d.properties.OBJECTID} d={path(d)} />
      ))}
    </g>
  );
};