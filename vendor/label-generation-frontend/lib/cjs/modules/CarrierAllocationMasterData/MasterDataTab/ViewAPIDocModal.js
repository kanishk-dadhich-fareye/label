"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _content_copy = _interopRequireDefault(require("../../../images/content_copy.svg"));
require("../../../CSS/ViewAPIDocModalStyle.css");
var _constants = require("../../../utils/constants");
var _ContainerConstants = require("../../../utils/containerconstants/ContainerConstants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const ViewAPIDocModal = props => {
  const apiDocNumList = [];
  const apiDocList = [];
  let spaceCount = 0;
  let indexVal = 0;
  const selectText = () => {
    const text = document.getElementById('APIDocContent');
    let range;
    let selection;
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    return range;
  };
  const copyText = () => {
    const text = selectText('APIDocContent');
    navigator.clipboard.writeText(text);
    _antd.message.success('copied!');
  };
  const apiDoc = () => {
    return props.activeTabPaneKey === _constants.LEFT_TABS.PARTY_MASTER_TABPANE ?
    //JSON.stringify(data2.partyMaster, undefined, 5).replace('{\n', '').replace('\n}', '').replaceAll('"', '')
    _constants.PARTY_MASTER_API : _constants.PARCEL_SHOP_MASTER_API;
  };
  const getData = obj => {
    Object.entries(obj).forEach((_ref, index) => {
      let [key, value] = _ref;
      apiDocNumList.push(/*#__PURE__*/_react.default.createElement("span", null, indexVal + 1));
      indexVal++;
      if (typeof value === 'object' && value !== null) {
        let data = '';
        for (let i = 0; i < spaceCount; i++) {
          data += '    ';
        }
        apiDocList.push(/*#__PURE__*/_react.default.createElement("p", null, data, key, " : ", '{'));
        spaceCount++;
        getData(value);
        spaceCount--;
        data = '';
        for (let i = 0; i < spaceCount; i++) {
          data += '    ';
        }
        apiDocList.push(/*#__PURE__*/_react.default.createElement("p", null, data, '},'));
      } else {
        let data = '';
        for (let i = 0; i < spaceCount; i++) {
          data += '    ';
        }
        apiDocList.push(/*#__PURE__*/_react.default.createElement("p", null, data, key, " : ", value, ","));
      }
    });
    return apiDocNumList;
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "api-doc-modal-header-title"
    }, " ", /*#__PURE__*/_react.default.createElement("div", null, containerConstants.formatString(containerConstants.VIEW_API_DOC)), /*#__PURE__*/_react.default.createElement(_antd.Avatar, {
      onClick: copyText,
      shape: "square",
      src: _content_copy.default
    })),
    className: "master-data-modal-api-doc",
    visible: props.showAPIDocModal,
    centered: true,
    footer: null,
    onCancel: () => props.setShowAPIDocModal(false)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "api-doc-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "api-doc-list-number"
  }, getData(apiDoc())), /*#__PURE__*/_react.default.createElement("pre", {
    id: "APIDocContent"
  }, apiDocList))));
};
var _default = exports.default = ViewAPIDocModal;
//# sourceMappingURL=ViewAPIDocModal.js.map