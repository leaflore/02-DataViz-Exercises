import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({ data: { land, countries } }) => (
  <g className="marks">
    <path className="sphere" d={path({ type: 'Sphere' })} fill="#e8f4fa" />
    <path className="graticule" d={path(graticule())} fill="none" stroke="#ccc" />
    {countries.features.map(feature => (
      <path
        key={feature.id}
        d={path(feature)}
        fill="#ddd"
        stroke="#999"
        strokeWidth={0.3}
      >
        <title>{feature.properties.name}</title>
      </path>
    ))}
  </g>
);
