"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
var _indexStyle = _interopRequireDefault(require("./indexStyle.js"));
var _AppStyle = _interopRequireDefault(require("./AppStyle.js"));
var _App = _interopRequireDefault(require("./Test/App.js"));
var _reportWebVitals = _interopRequireDefault(require("./reportWebVitals.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const root = _client.default.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_indexStyle.default, null), /*#__PURE__*/_react.default.createElement(_AppStyle.default, null), /*#__PURE__*/_react.default.createElement(_App.default, null)));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, _reportWebVitals.default)();
//# sourceMappingURL=index1.js.map