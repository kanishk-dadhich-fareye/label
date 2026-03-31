"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _reactRouterDom = require("react-router-dom");
var _breadCrumbStyle = _interopRequireDefault(require("./breadCrumbStyle.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const BreadCrumb = props => {
  let len = props.urlList.length;
  const handleOnClick = (obj, index) => {
    if (props.handleOnClick) {
      props.handleOnClick(obj, index);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_breadCrumbStyle.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "bread-crumb-bar"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "bread-crumb-left"
  }, /*#__PURE__*/_react.default.createElement(_antd.Breadcrumb, {
    separator: /*#__PURE__*/_react.default.createElement("div", {
      style: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '22px',
        color: '#727272',
        display: 'contents'
      }
    }, "/")
  }, props.urlList.map((obj, index) => /*#__PURE__*/_react.default.createElement(_antd.Breadcrumb.Item, {
    key: obj.id,
    onClick: () => handleOnClick(obj, index)
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: obj.url,
    className: len === index + 1 ? 'font-family-weight-500 fs14 ls22 color_212121 display_content capital_first_letter' : 'font-family-weight-normal fs14 ls22 color_727272 display_content capital_first_letter'
  }, obj.heading))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "bread-crumb-right"
  }, props.rightItem)));
};
var _default = exports.default = BreadCrumb;
//# sourceMappingURL=bread_crumb.js.map