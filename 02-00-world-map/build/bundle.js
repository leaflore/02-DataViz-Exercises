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
    console.log(data);

    // World Atlas JSON data
    // Logs data to the console
    // console.log(data);
    // console.log(feature); Was used to look at features (was not abble to get it to work)

    React$1.useEffect(function () {
      d3.json(jsonUrl).then(function (topojsonData) {
        // console.log(topojsonData); // way to inspect the data before converting it to GeoJSON
        var countries = topojsonData.objects.countries;
        setData(topojson.feature(topojsonData, countries));
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

  var Marks = function Marks(_ref) {
    var data = _ref.data,
      width = _ref.width,
      height = _ref.height;
    var projection = d3.geoNaturalEarth1().fitSize([width, height], data);
    var path = d3.geoPath(projection);
    return /*#__PURE__*/React.createElement("g", {
      className: "marks"
    }, data.features.map(function (country) {
      return /*#__PURE__*/React.createElement("path", {
        key: country.id,
        d: path(country),
        fill: "lightsteelblue",
        stroke: "white"
      });
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
    }, /*#__PURE__*/React$1.createElement("g", {
      transform: "translate(".concat(margin.left, ",").concat(margin.top, ")")
    }, /*#__PURE__*/React$1.createElement(AxisBottom, {
      xScale: xScale,
      innerHeight: innerHeight,
      tickFormat: xAxisTickFormat,
      tickOffset: 7
    }), /*#__PURE__*/React$1.createElement("text", {
      className: "axis-label",
      textAnchor: "middle",
      transform: "translate(".concat(-yAxisLabelOffset, ",").concat(innerHeight / 2, ") rotate(-90)")
    }, yAxisLabel), /*#__PURE__*/React$1.createElement(AxisLeft, {
      yScale: yScale,
      innerWidth: innerWidth,
      tickOffset: 7
    }), /*#__PURE__*/React$1.createElement("text", {
      className: "axis-label",
      x: innerWidth / 2,
      y: innerHeight + xAxisLabelOffset,
      textAnchor: "middle"
    }, xAxisLabel), /*#__PURE__*/React$1.createElement(Marks, {
      data: data,
      xScale: xScale,
      yScale: yScale,
      xValue: xValue,
      yValue: yValue,
      tooltipFormat: xAxisTickFormat,
      circleRadius: 3
    })));
  };
  var rootElement = document.getElementById('root');
  ReactDOM.render(/*#__PURE__*/React$1.createElement(App, null), rootElement);

})(React, ReactDOM, d3, topojson);
