"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MdEdit = _ref => {
  let {
    size,
    className,
    onClick
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("svg", {
    onClick: onClick,
    fill: "currentColor",
    preserveAspectRatio: "xMidYMid meet",
    height: size,
    width: size,
    viewBox: "0 0 40 40",
    class: className,
    style: {
      verticalAlign: "middle;"
    }
  }, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"
  })));
};
var _default = exports.default = MdEdit;
//# sourceMappingURL=MdEdit.js.map