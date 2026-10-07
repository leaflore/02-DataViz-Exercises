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
    var _useState = React$1.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];
    React$1.useEffect(function () {
      d3.json(jsonUrl).then(function (topjsonData) {
        console.log(topjsonData);
        setData(topojson.feature(topojsonData));
      });
    }, []);
    return data;
  };

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
    }, /*#__PURE__*/React$1.createElement(Marks, {
      data: data,
      width: width,
      height: height
    }));
  };
  var rootElement = document.getElementById('root');
  ReactDOM.render(/*#__PURE__*/React$1.createElement(App, null), rootElement);

})(React, ReactDOM, d3, topojson);
