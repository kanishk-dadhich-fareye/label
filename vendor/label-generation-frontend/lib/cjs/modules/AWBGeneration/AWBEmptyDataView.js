"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _awb_generation_icon = _interopRequireDefault(require("../../images/awb_generation_icon.svg"));
var _ContainerConstants = require("../../utils/containerconstants/ContainerConstants");
const _excluded = ["showButtons", "heading", "description"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const AWBEmptyDataView = _ref => {
  let {
      showButtons,
      heading,
      description
    } = _ref,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  const openDefaultAWBForm = () => {
    otherProps.setShowFormModalDialog({
      visible: true,
      okText: containerConstants.formatString(containerConstants.ADD),
      title: containerConstants.formatString(containerConstants.ADD_DEFAULT_AWB)
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "awb-empty-data-view",
    style: {
      margin: showButtons === 'first' ? '23px 0 0' : '67px 0 0'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Avatar, {
    src: _awb_generation_icon.default,
    shape: "square"
  }), /*#__PURE__*/_react.default.createElement("h1", null, heading), /*#__PURE__*/_react.default.createElement("p", null, description), (showButtons === 'both' || showButtons === 'first') && /*#__PURE__*/_react.default.createElement(_antd.Space, {
    align: "center",
    style: {
      marginBottom: showButtons === 'first' ? '4px' : '48px'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    ghost: true,
    type: "primary",
    onClick: openDefaultAWBForm
  }, containerConstants.formatString(containerConstants.ADD_DEFAULT_AWB)), showButtons !== 'first' && /*#__PURE__*/_react.default.createElement(_antd.Button, {
    style: {
      color: '#FFFFFF'
    },
    type: "primary",
    onClick: () => otherProps.setShowModalDialogAddUpload(true)
  }, containerConstants.formatString(containerConstants.ADD_AWB))));
};
var _default = exports.default = AWBEmptyDataView;
//# sourceMappingURL=AWBEmptyDataView.js.map