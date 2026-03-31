"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _route = _interopRequireDefault(require("./route.js"));
var _common = _interopRequireDefault(require("../styles/common.js"));
var _formStore = _interopRequireDefault(require("../modules/hook-store/form-store.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// import './AppStyle.js';

// import styleAsString from '!!raw-loader!antd/dist/antd.css';

(0, _formStore.default)();
const App = props => {
  let style = document.createElement("style");
  let style1 = null;
  (0, _react.useEffect)(() => {
    style.type = "text/css";
    // style.innerHTML = styleAsString;
    style1 = document.head.appendChild(style);
    return () => {
      if (style1) {
        document.head.removeChild(style1);
      }
    };
  });
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_common.default, null), /*#__PURE__*/_react.default.createElement(_route.default, {
    updateLabelGenerationTitle: props.updateLabelGenerationTitle,
    updateCarrierAllocationName: props.updateCarrierAllocationName,
    settingInvoke: props.settingInvoke,
    showCustom: props.showCustom,
    fromFCR: props.fromFCR,
    isProduction: props.isProduction,
    fromNewSetting: props.fromNewSetting
  }));
};
var _default = exports.default = App;
//# sourceMappingURL=App.js.map