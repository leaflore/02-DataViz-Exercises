(function (React$1, ReactDOM, d3, topojson) {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = true,
        o = false;
      try {
        if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = true, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  // jsonUrl variable
  var jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';
  var useData = function useData() {
    //State to hold the GeoJSON data. Initially set to null.
    // This is a form array destructuring assignment used to extract the state and the updater function.
    var _useState = React$1.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

    // World Atlas JSON data
    // Logs data to the console
    // console.log(data);
    // console.log(feature); Was used to look at features (was not abble to get it to work)

    React$1.useEffect(function () {
      d3.json(jsonUrl).then(function (topojsonData) {
        console.log(topojsonData);
        setData(topojson.feature(topojsonData));
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

  var projection = d3.geoNaturalEarth1();
  var path = d3.geoPath(projection);
  var graticule = d3.geoGraticule();
  var Marks = function Marks(_ref) {
    var _ref$data = _ref.data;
      _ref$data.land;
      var countries = _ref$data.countries;
    return /*#__PURE__*/React.createElement("g", {
      className: "marks"
    }, /*#__PURE__*/React.createElement("path", {
      className: "sphere",
      d: path({
        type: 'Sphere'
      }),
      fill: "#e8f4fa"
    }), /*#__PURE__*/React.createElement("path", {
      className: "graticule",
      d: path(graticule()),
      fill: "none",
      stroke: "#ccc"
    }), countries.features.map(function (feature) {
      return /*#__PURE__*/React.createElement("path", {
        key: feature.id,
        d: path(feature),
        fill: "#ddd",
        stroke: "#999",
        strokeWidth: 0.3
      }, /*#__PURE__*/React.createElement("title", null, feature.properties.name));
    }));
  };

  var width = 960;
  var height = 500;
  var App = function App() {
    var data = useData();
    if (!data) {
      return /*#__PURE__*/React$1.createElement("pre", null, "Loading...");
    }
    return /*#__PURE__*/React$1.createElement("svg", {
      width: width,
      height: height
    }, /*#__PURE__*/React$1.createElement(Marks, {
      data: data
    }));
  };
  var rootElement = document.getElementById('root');
  ReactDOM.render(/*#__PURE__*/React$1.createElement(App, null), rootElement);

})(React, ReactDOM, d3, topojson);
