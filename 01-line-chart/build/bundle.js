(function (React$1, ReactDOM, d3) {
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

  var csvUrl = 'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';
  var useData = function useData() {
    var _useState = React$1.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];
    React$1.useEffect(function () {
      var row = function row(d) {
        d.temperature = +d.temperature;
        d.timestamp = new Date(d.timestamp);
        return d;
      };
      d3.csv(csvUrl, row).then(setData);
    }, []);
    return data;
  };

  var AxisBottom = function AxisBottom(_ref) {
    var xScale = _ref.xScale,
      innerHeight = _ref.innerHeight,
      tickFormat = _ref.tickFormat,
      _ref$tickOffset = _ref.tickOffset,
      tickOffset = _ref$tickOffset === void 0 ? 3 : _ref$tickOffset;
    return xScale.ticks().map(function (tickValue) {
      return /*#__PURE__*/React.createElement("g", {
        className: "tick",
        key: tickValue,
        transform: "translate(".concat(xScale(tickValue), ",0)")
      }, /*#__PURE__*/React.createElement("line", {
        y2: innerHeight
      }), /*#__PURE__*/React.createElement("text", {
        style: {
          textAnchor: 'middle'
        },
        dy: ".71em",
        y: innerHeight + tickOffset
      }, tickFormat(tickValue)));
    });
  };

  var AxisLeft = function AxisLeft(_ref) {
    var yScale = _ref.yScale,
      innerWidth = _ref.innerWidth,
      _ref$tickOffset = _ref.tickOffset,
      tickOffset = _ref$tickOffset === void 0 ? 3 : _ref$tickOffset;
    return yScale.ticks().map(function (tickValue) {
      return /*#__PURE__*/React.createElement("g", {
        className: "tick",
        transform: "translate(0,".concat(yScale(tickValue), ")")
      }, /*#__PURE__*/React.createElement("line", {
        x2: innerWidth
      }), /*#__PURE__*/React.createElement("text", {
        key: tickValue,
        style: {
          textAnchor: 'end'
        },
        x: -tickOffset,
        dy: ".32em"
      }, tickValue));
    });
  };

  var Marks = function Marks(_ref) {
    var data = _ref.data,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      xValue = _ref.xValue,
      yValue = _ref.yValue;
      _ref.tooltipFormat;
      _ref.circleRadius;
    return /*#__PURE__*/React.createElement("g", {
      className: "marks"
    }, /*#__PURE__*/React.createElement("path", {
      fill: "none",
      stroke: "black",
      d: d3.line().x(function (d) {
        return xScale(xValue(d));
      }).y(function (d) {
        return yScale(yValue(d));
      }).curve(d3.curveNatural)(data)
    }));
  };

  var width = 960;
  var height = 500;
  var margin = {
    top: 20,
    right: 30,
    bottom: 65,
    left: 90
  };
  var xAxisLabelOffset = 50;
  var App = function App() {
    var data = useData();
    if (!data) {
      return /*#__PURE__*/React$1.createElement("pre", null, "Loading...");
    }
    var innerHeight = height - margin.top - margin.bottom;
    var innerWidth = width - margin.left - margin.right;
    var xValue = function xValue(d) {
      return d.timestamp;
    };
    var xAxisLabel = 'Time';
    var yValue = function yValue(d) {
      return d.temperature;
    };
    var yAxisLabel = 'Temperature';
    var xAxisTickFormat = d3.timeFormat('%a');
    var xScale = d3.scaleTime().domain(d3.extent(data, xValue)).range([0, innerWidth]).nice();
    var yScale = d3.scaleLinear().domain(d3.extent(data, yValue)).range([innerHeight, 0]).nice();
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
      transform: "translate(".concat(-45, ",").concat(innerHeight / 2, ") rotate(-90)")
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

})(React, ReactDOM, d3);
