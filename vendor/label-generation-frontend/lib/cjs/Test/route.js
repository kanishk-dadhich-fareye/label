"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _store = require("../modules/hook-store/store");
var _constants = require("../utils/constants");
var _index = require("../modules/index");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const RouteContainer = props => {
  const [basePath, setBasePath] = (0, _react.useState)('/v2/label_generation');
  const [basePathForNewSetting, setBasePathForNewSetting] = (0, _react.useState)('/v2/new_settings/label_generation');
  const dispatch = (0, _store.useStore)(false)[1];
  (0, _react.useEffect)(() => {
    _constants.BASE_PATH_APIS.basePathForAPIS = props.fromFCR && props.isProduction ? '/fcr' : '';
    if (props.fromFCR) {
      if (props.isProduction) {
        setBasePath("/fcr/view/reactSettings/v2/label_generation");
      } else {
        setBasePath("/view/reactSettings/v2/label_generation");
      }
    }
  }, []);
  const updateCarrierAllocationName = data => {
    props.updateCarrierAllocationName(data);
  };
  const updateLabelGenerationTitle = data => {
    props.updateLabelGenerationTitle(data);
  };
  const settingInvokeHandler = data => {
    props.settingInvoke(data);
  };
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: basePath + "/v2/settings",
    exact: "true",
    element: settingInvokeHandler
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: basePath + "/settings",
    exact: "true",
    element: /*#__PURE__*/_react.default.createElement(_index.LabelGeneration, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: basePath + "/data_validation",
    exact: "true",
    element: /*#__PURE__*/_react.default.createElement(_index.DataValidation, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: basePath + "/shipment_no_generation",
    exact: "true",
    element: /*#__PURE__*/_react.default.createElement(_index.AWBGenerationSettings, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: basePath + "/carrier_allocation",
    exact: "true",
    element: /*#__PURE__*/_react.default.createElement(_index.MasterData, _extends({
      updateCarrierAllocationName: updateCarrierAllocationName
    }, props))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: basePath + "/carrier_allocation/master_data",
    exact: "true",
    element: /*#__PURE__*/_react.default.createElement(_index.MasterDataTabCard, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: basePath + "/label_templates",
    exact: "true",
    element: /*#__PURE__*/_react.default.createElement(_index.LabelTemplate, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: basePath + "/reverse_connector",
    exact: "true",
    element: /*#__PURE__*/_react.default.createElement(_index.ReverseConnector, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: basePath + "/bulk_upload",
    exact: "true",
    element: /*#__PURE__*/_react.default.createElement(_index.BulkUploadAddShipment, _extends({
      updateLabelGenerationTitle: updateLabelGenerationTitle
    }, props))
  }));
};
var _default = exports.default = RouteContainer;
//# sourceMappingURL=route.js.map