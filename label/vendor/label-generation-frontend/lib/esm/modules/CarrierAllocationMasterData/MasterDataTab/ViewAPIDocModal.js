import React from 'react';
import { Modal, Avatar, message } from 'antd';
import CopyClipboardIcon from '../../../images/content_copy.svg';
import '../../../CSS/ViewAPIDocModalStyle.css';
import { LEFT_TABS, PARTY_MASTER_API, PARCEL_SHOP_MASTER_API } from '../../../utils/constants';
import { containerConstantsService } from '../../../utils/containerconstants/ContainerConstants';
var containerConstants = containerConstantsService.getInstance();
var ViewAPIDocModal = props => {
  var apiDocNumList = [];
  var apiDocList = [];
  var spaceCount = 0;
  var indexVal = 0;
  var selectText = () => {
    var text = document.getElementById('APIDocContent');
    var range;
    var selection;
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
  var copyText = () => {
    var text = selectText('APIDocContent');
    navigator.clipboard.writeText(text);
    message.success('copied!');
  };
  var apiDoc = () => {
    return props.activeTabPaneKey === LEFT_TABS.PARTY_MASTER_TABPANE ?
    //JSON.stringify(data2.partyMaster, undefined, 5).replace('{\n', '').replace('\n}', '').replaceAll('"', '')
    PARTY_MASTER_API : PARCEL_SHOP_MASTER_API;
  };
  var getData = obj => {
    Object.entries(obj).forEach((_ref, index) => {
      var [key, value] = _ref;
      apiDocNumList.push(/*#__PURE__*/React.createElement("span", null, indexVal + 1));
      indexVal++;
      if (typeof value === 'object' && value !== null) {
        var data = '';
        for (var i = 0; i < spaceCount; i++) {
          data += '    ';
        }
        apiDocList.push(/*#__PURE__*/React.createElement("p", null, data, key, " : ", '{'));
        spaceCount++;
        getData(value);
        spaceCount--;
        data = '';
        for (var _i = 0; _i < spaceCount; _i++) {
          data += '    ';
        }
        apiDocList.push(/*#__PURE__*/React.createElement("p", null, data, '},'));
      } else {
        var _data = '';
        for (var _i2 = 0; _i2 < spaceCount; _i2++) {
          _data += '    ';
        }
        apiDocList.push(/*#__PURE__*/React.createElement("p", null, _data, key, " : ", value, ","));
      }
    });
    return apiDocNumList;
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Modal, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "api-doc-modal-header-title"
    }, " ", /*#__PURE__*/React.createElement("div", null, containerConstants.formatString(containerConstants.VIEW_API_DOC)), /*#__PURE__*/React.createElement(Avatar, {
      onClick: copyText,
      shape: "square",
      src: CopyClipboardIcon
    })),
    className: "master-data-modal-api-doc",
    visible: props.showAPIDocModal,
    centered: true,
    footer: null,
    onCancel: () => props.setShowAPIDocModal(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "api-doc-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "api-doc-list-number"
  }, getData(apiDoc())), /*#__PURE__*/React.createElement("pre", {
    id: "APIDocContent"
  }, apiDocList))));
};
export default ViewAPIDocModal;
//# sourceMappingURL=ViewAPIDocModal.js.map