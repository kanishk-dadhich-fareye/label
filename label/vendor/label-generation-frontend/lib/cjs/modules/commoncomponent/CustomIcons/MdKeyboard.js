"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MdKeyboard = _ref => {
  let {
    size,
    className
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("svg", {
    fill: "currentColor",
    preserveAspectRatio: "xMidYMid meet",
    height: size,
    width: size,
    viewBox: "0 0 40 40",
    className: className,
    style: {
      verticalAlign: "middle"
    }
  }, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "m31.6 16.6v-3.2h-3.2v3.2h3.2z m0 5v-3.2h-3.2v3.2h3.2z m-5-5v-3.2h-3.2v3.2h3.2z m0 5v-3.2h-3.2v3.2h3.2z m0 6.8v-3.4h-13.2v3.4h13.2z m-15-11.8v-3.2h-3.2v3.2h3.2z m0 5v-3.2h-3.2v3.2h3.2z m1.8-3.2v3.2h3.2v-3.2h-3.2z m0-5v3.2h3.2v-3.2h-3.2z m5 5v3.2h3.2v-3.2h-3.2z m0-5v3.2h3.2v-3.2h-3.2z m15-5c1.8 0 3.2 1.4 3.2 3.2v16.8c0 1.8-1.4 3.2-3.2 3.2h-26.8c-1.8 0-3.2-1.4-3.2-3.2v-16.8c0-1.8 1.4-3.2 3.2-3.2h26.8z"
  })));
};
var _default = exports.default = MdKeyboard;
//# sourceMappingURL=MdKeyboard.js.map