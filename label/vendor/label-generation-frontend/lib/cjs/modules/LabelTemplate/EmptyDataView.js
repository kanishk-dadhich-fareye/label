"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _label_template_icon = _interopRequireDefault(require("../../images/label_template_icon.svg"));
var _ContainerConstants = require("../../utils/containerconstants/ContainerConstants");
var _constants = require("../../utils/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const EmptyDataView = _ref => {
  let {
    setShowModalDialog
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "template-empty-data-view",
    style: {
      margin: '44px 0 0'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Avatar, {
    src: _label_template_icon.default,
    shape: "square"
  }), /*#__PURE__*/_react.default.createElement("h1", null, containerConstants.formatString(containerConstants.TEMPLATE_NOT_FOUND)), /*#__PURE__*/_react.default.createElement("p", null, containerConstants.formatString(containerConstants.TEMPLATE_NOT_FOUND_DESCRIPTION)), /*#__PURE__*/_react.default.createElement(_antd.Space, {
    align: "center",
    style: {
      marginBottom: '36px'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    style: {
      color: '#FFFFFF'
    },
    type: "primary",
    onClick: () => setShowModalDialog({
      visible: true,
      title: containerConstants.formatString(containerConstants.CHOOSE_TEMPLATE),
      modalType: _constants.TEMPLATE_MODAL_TYPE.CHOOSE_TEMPLATE
    })
  }, containerConstants.formatString(containerConstants.CREATE_TEMPLATE))));
};
var _default = exports.default = EmptyDataView;
//# sourceMappingURL=EmptyDataView.js.map