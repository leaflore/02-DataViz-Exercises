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

  // LA GeoHub Neighborhood Councils layer, filtered server-side to two NCs, returned as GeoJSON in WGS84
  var where = "NAME IN ('HOLLYWOOD HILLS WEST NC', 'BEL AIR-BEVERLY CREST NC')";
  var jsonUrl = "https://maps.lacity.org/lahub/rest/services/Boundaries/MapServer/18/query" + "?outFields=*&where=".concat(encodeURIComponent(where), "&outSR=4326&f=geojson");
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
      d3.json(jsonUrl).then(function (fc) {
        // ArcGIS returns counter-clockwise exterior rings (RFC 7946); d3 expects clockwise,
        // otherwise it treats each polygon as "the whole globe minus the polygon".
        fc.features.forEach(function (f) {
          f.geometry.coordinates = f.geometry.type === 'Polygon' ? f.geometry.coordinates.map(function (ring) {
            return ring.slice().reverse();
          }) : f.geometry.coordinates.map(function (poly) {
            return poly.map(function (ring) {
              return ring.slice().reverse();
            });
          });
        });
        setData(fc);
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
    var projection = d3.geoMercator().fitSize([width, height], data);
    var path = d3.geoPath(projection);
    return /*#__PURE__*/React.createElement("g", {
      className: "marks"
    }, data.features.map(function (d) {
      return /*#__PURE__*/React.createElement("path", {
        key: d.properties.OBJECTID,
        d: path(d)
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

})(React, ReactDOM, d3);
