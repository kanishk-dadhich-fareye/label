var _excluded = ["showModalDialog", "showHelpModal", "showConfirmModalDialog"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import { DATA_INDEX, TEMPLATE_MODAL_TYPE, TEMPLATE_STATUS_MAP, STATUS, HELP_DOC } from '../../utils/constants';
import { Card, Row, Col, Input, Modal, Button, Select, Image, Space } from 'antd';
import React, { useState } from 'react';
import { containerConstantsService } from '../../utils/containerconstants/ContainerConstants';
import StartScratchIcon from '../../images/create_template_icon.svg';
import { fetchAllPartyMaster, saveLabelTemplate } from "../APIConfig/LabelTemplateAction";
import { toUpper } from 'lodash';
import { notifyResponseMessage } from '../commoncomponent/NotificationComponent/notifyResponseMessage';
var containerConstants = containerConstantsService.getInstance();
var {
  Option
} = Select;
var CustomModal = _ref => {
  var {
      showModalDialog,
      showHelpModal,
      showConfirmModalDialog
    } = _ref,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var [formData, setFormData] = useState({});
  var [selectedDoc, setSelectedDoc] = useState('Get Reference Number of a process');
  var [previewTemplate, setPreviewTemplate] = useState(false);
  var [partyMasterCodeList, setPartyMasterCodeList] = useState([]);
  var labelFormat = formData[DATA_INDEX.LABEL_FORMAT] || 'PDF';
  var isZpl = labelFormat === 'ZPL';
  var isCustomSize = formData[DATA_INDEX.PAGE_SIZE] === 'custom';
  var handleClickOk = () => {
    if (showModalDialog) {
      onSaveLabelTemplate();
    } else if (showConfirmModalDialog.visible) {
      if (showConfirmModalDialog.rowId) {
        otherProps.deleteTemplate(showConfirmModalDialog.rowId);
      } else {
        otherProps.updateTemplateStatus(showConfirmModalDialog.record);
      }
      handleClickCancel();
    }
  };
  var handleClickCancel = () => {
    showModalDialog && otherProps.setShowModalDialog(false);
    showHelpModal && otherProps.setShowHelpModal(false);
    showConfirmModalDialog && otherProps.setShowConfirmModalDialog({
      visible: false,
      okText: '',
      title: ''
    });
    setFormData({});
  };
  var getAllPartyMaster = () => {
    fetchAllPartyMaster().then(response => {
      if (response && response.status === 200) {
        var _response$data;
        var partyMasterList = (_response$data = response.data) == null ? void 0 : _response$data.data;
        var merchantCodeList = partyMasterList.map(partyMaster => partyMaster == null ? void 0 : partyMaster.merchantCode);
        setPartyMasterCodeList(merchantCodeList);
      }
    }).catch(error => {});
  };
  var onSaveLabelTemplate = () => {
    var payload = _extends({}, formData, {
      [DATA_INDEX.TEMPLATE_STATUS]: TEMPLATE_STATUS_MAP.DRAFT
    });
    if (!payload[DATA_INDEX.LABEL_FORMAT]) {
      payload[DATA_INDEX.LABEL_FORMAT] = 'PDF';
    }
    if (payload[DATA_INDEX.PAGE_SIZE] === 'custom') {
      if (!payload[DATA_INDEX.CUSTOM_WIDTH_MM] || !payload[DATA_INDEX.CUSTOM_HEIGHT_MM]) {
        notifyResponseMessage(STATUS.ERROR, 'Custom width and height are required.');
        return;
      }
      payload[DATA_INDEX.PAGE_SIZE] = "custom@" + payload[DATA_INDEX.CUSTOM_WIDTH_MM] + "@" + payload[DATA_INDEX.CUSTOM_HEIGHT_MM];
    }
    if (payload[DATA_INDEX.CUSTOM_WIDTH_MM] !== undefined) {
      delete payload[DATA_INDEX.CUSTOM_WIDTH_MM];
    }
    if (payload[DATA_INDEX.CUSTOM_HEIGHT_MM] !== undefined) {
      delete payload[DATA_INDEX.CUSTOM_HEIGHT_MM];
    }
    saveLabelTemplate(payload).then(response => {
      if (response && response.status === 200) {
        var _response$data2;
        if (toUpper((_response$data2 = response.data) == null ? void 0 : _response$data2.status) === STATUS.SUCCESS) {
          var _response$data3, _response$data4, _response$data5, _response$data6;
          notifyResponseMessage(STATUS.SUCCESS, response == null || (_response$data3 = response.data) == null ? void 0 : _response$data3.message);
          otherProps.setShowEditor({
            visible: true,
            [DATA_INDEX.TEMPLATE_ID]: (_response$data4 = response.data) == null || (_response$data4 = _response$data4.data) == null ? void 0 : _response$data4.id,
            [DATA_INDEX.TEMPLATE_STATUS]: (_response$data5 = response.data) == null || (_response$data5 = _response$data5.data) == null ? void 0 : _response$data5.status,
            [DATA_INDEX.TEMPLATE_NAME]: (_response$data6 = response.data) == null || (_response$data6 = _response$data6.data) == null ? void 0 : _response$data6.name,
            [DATA_INDEX.TEMPLATE_SCRIPT]: '',
            [DATA_INDEX.LABEL_FORMAT]: formData[DATA_INDEX.LABEL_FORMAT] || 'PDF'
          });
          handleClickCancel();
        } else {
          var _response$data7;
          notifyResponseMessage(STATUS.ERROR, response == null || (_response$data7 = response.data) == null ? void 0 : _response$data7.message);
        }
      }
    }).catch(error => {});
  };
  var updateFieldValue = (e, name) => {
    setFormData(_extends({}, formData, {
      [name]: e.target.value
    }));
  };
  var getRowWithSelectElementJsx = (label, name, options, spanSize) => {
    return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      span: spanSize[0]
    }, label), /*#__PURE__*/React.createElement(Col, {
      span: spanSize[1]
    }, /*#__PURE__*/React.createElement(Select, {
      onChange: value => {
        !(name === DATA_INDEX.ELEMENT_OPTIONS) ? setFormData(_extends({}, formData, {
          [name]: value
        })) : setSelectedDoc(value);
      },
      placeholder: containerConstants.formatString(containerConstants.SELECT),
      value: !(name === DATA_INDEX.ELEMENT_OPTIONS) ? formData[name] : selectedDoc,
      onFocus: name === DATA_INDEX.PARTY_CODE && getAllPartyMaster
    }, options.map(option => option.key ? /*#__PURE__*/React.createElement(Option, {
      value: option.key
    }, option.value) : /*#__PURE__*/React.createElement(Option, {
      value: option
    }, option)))));
  };
  var getRowWithInputElementJsx = (label, name, disabled) => {
    return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      span: 7
    }, label), /*#__PURE__*/React.createElement(Col, {
      span: 17
    }, /*#__PURE__*/React.createElement(Input, {
      name: name,
      value: formData[name],
      placeholder: containerConstants.formatString(containerConstants.PLACEHOLDER),
      disabled: disabled,
      onChange: e => updateFieldValue(e, name)
    })));
  };
  var getPreviewTemplateJSX = () => {
    return /*#__PURE__*/React.createElement("div", {
      className: "available-template"
    }, /*#__PURE__*/React.createElement(Image, {
      src: '',
      preview: {
        visible: false,
        src: '',
        mask: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Space, {
          direction: "vertical",
          size: 12
        }, /*#__PURE__*/React.createElement(Button, {
          size: "small",
          ghost: true,
          onClick: () => setPreviewTemplate(true)
        }, containerConstants.formatString(containerConstants.PREVIEW)), /*#__PURE__*/React.createElement(Button, {
          size: "small",
          type: "primary",
          style: {
            color: '#FFFFFF',
            width: '65px'
          }
        }, containerConstants.formatString(containerConstants.IMPORT)))),
        maskClassName: 'available-template-hover'
      },
      placeholder: true
    }));
  };
  var modalWidth = () => showModalDialog ? showModalDialog.modalType === TEMPLATE_MODAL_TYPE.CHOOSE_TEMPLATE ? 'fit-content' : '32%' : showConfirmModalDialog && showConfirmModalDialog.visible ? '32%' : '51.2%';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Modal, {
    title: showModalDialog && showModalDialog.title || showHelpModal && showHelpModal.title || showConfirmModalDialog && showConfirmModalDialog.title,
    visible: showModalDialog && showModalDialog.visible || showHelpModal && showHelpModal.visible || showConfirmModalDialog && showConfirmModalDialog.visible,
    closable: (showModalDialog && showModalDialog.modalType) === TEMPLATE_MODAL_TYPE.CREATE_TEMPLATE && showConfirmModalDialog.visible ? false : true,
    className: showModalDialog && showModalDialog.visible ? 'template-form-modal ' : showConfirmModalDialog && showConfirmModalDialog.visible ? 'template-delete-modal' : 'template-help-modal',
    headStyle: {
      fontSize: '18px'
    },
    bodyStyle: {
      padding: showModalDialog && showModalDialog.modalType === TEMPLATE_MODAL_TYPE.CHOOSE_TEMPLATE ? '0 18px 0 24px' : '0 24px'
    },
    width: modalWidth(),
    onCancel: handleClickCancel,
    footer: showModalDialog && showModalDialog.visible && showModalDialog.modalType === TEMPLATE_MODAL_TYPE.CREATE_TEMPLATE || showConfirmModalDialog && showConfirmModalDialog.visible ? [/*#__PURE__*/React.createElement(Button, {
      style: {
        color: '#727272',
        border: 0
      },
      onClick: handleClickCancel
    }, containerConstants.formatString(containerConstants.CANCEL)), /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      style: {
        color: '#FFFFFF'
      },
      onClick: handleClickOk
    }, showModalDialog && showModalDialog.okText || showConfirmModalDialog && showConfirmModalDialog.okText)] : null
  }, /*#__PURE__*/React.createElement(Card, {
    className: "fw500 fs12 lh18 border-none",
    bodyStyle: {
      color: '#727272',
      padding: showModalDialog && showModalDialog.modalType === TEMPLATE_MODAL_TYPE.CHOOSE_TEMPLATE ? '24px 0 0' : showConfirmModalDialog && showConfirmModalDialog.visible ? '0 0 24px' : '24px 0'
    }
  }, showModalDialog && showModalDialog.modalType === TEMPLATE_MODAL_TYPE.CREATE_TEMPLATE ? /*#__PURE__*/React.createElement("div", null, getRowWithInputElementJsx(containerConstants.formatString(containerConstants.NAME), DATA_INDEX.TEMPLATE_NAME, false), /*#__PURE__*/React.createElement("br", null), getRowWithInputElementJsx(containerConstants.formatString(containerConstants.CODE), DATA_INDEX.TEMPLATE_CODE, false), /*#__PURE__*/React.createElement("br", null), getRowWithSelectElementJsx(containerConstants.formatString(containerConstants.PAGE_SIZE), DATA_INDEX.PAGE_SIZE, [{
    value: "A4",
    key: "A4"
  }, {
    value: '4x6"',
    key: '4x6'
  }, {
    value: '6x4"',
    key: '6x4'
  }, {
    value: '2x3"',
    key: '2x3'
  }, {
    value: '4x2"',
    key: '4x2'
  }, {
    value: 'custom',
    key: 'custom'
  }], [7, 17]), /*#__PURE__*/React.createElement("br", null), getRowWithSelectElementJsx('Label Format', DATA_INDEX.LABEL_FORMAT, [{
    value: "PDF",
    key: "PDF"
  }, {
    value: "ZPL",
    key: "ZPL"
  }], [7, 17]), isCustomSize ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), getRowWithInputElementJsx('Custom Width (mm)', DATA_INDEX.CUSTOM_WIDTH_MM, false), /*#__PURE__*/React.createElement("br", null), getRowWithInputElementJsx('Custom Height (mm)', DATA_INDEX.CUSTOM_HEIGHT_MM, false)) : null, isZpl ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), getRowWithInputElementJsx('Printer DPI', DATA_INDEX.PRINTER_DPI, false), /*#__PURE__*/React.createElement("br", null), getRowWithInputElementJsx('ZPL Width (in)', DATA_INDEX.ZPL_WIDTH, false), /*#__PURE__*/React.createElement("br", null), getRowWithInputElementJsx('ZPL Height (in)', DATA_INDEX.ZPL_HEIGHT, false)) : null) : /*#__PURE__*/React.createElement("div", null, showModalDialog && showModalDialog.modalType === TEMPLATE_MODAL_TYPE.CHOOSE_TEMPLATE ? /*#__PURE__*/React.createElement("div", {
    id: "all-template-container",
    className: "flex justify-center",
    style: {
      flexWrap: 'wrap',
      width: '250px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "scratch-template pointer",
    onClick: () => {
      otherProps.setShowModalDialog({
        visible: true,
        title: containerConstants.formatString(containerConstants.CREATE_TEMPLATE),
        okText: containerConstants.formatString(containerConstants.DONE),
        modalType: TEMPLATE_MODAL_TYPE.CREATE_TEMPLATE
      });
    }
  }, /*#__PURE__*/React.createElement("img", {
    alt: "",
    src: StartScratchIcon
  }), /*#__PURE__*/React.createElement("p", {
    className: "fw400 fs12 lh18"
  }, containerConstants.formatString(containerConstants.START_SCRATCH)))) : showConfirmModalDialog && showConfirmModalDialog.visible ? /*#__PURE__*/React.createElement("p", {
    className: "fw400 fs14 lh16 mt16",
    style: {
      color: '#212121'
    }
  }, showConfirmModalDialog.description) : /*#__PURE__*/React.createElement("div", null, getRowWithSelectElementJsx(containerConstants.formatString(containerConstants.ELEMENT_OPTIONS), DATA_INDEX.ELEMENT_OPTIONS, Object.keys(HELP_DOC), [10, 14]), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Card, {
    bordered: false,
    bodyStyle: {
      background: '#F3F3F3',
      border: '1px solid #DADADA',
      borderRadius: '3px',
      padding: '12px',
      maxHeight: '164px',
      overflow: 'auto'
    }
  }, HELP_DOC[selectedDoc] && HELP_DOC[selectedDoc].map((doc, index) => {
    return /*#__PURE__*/React.createElement("div", null, doc.note !== undefined ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "fw500 fs14 lh22"
    }, containerConstants.formatString(containerConstants.NOTE)), doc.note.map(paragraphLine => /*#__PURE__*/React.createElement("p", {
      className: "fw400 fs12 lh18"
    }, paragraphLine))) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "fw500 fs14 lh22"
    }, containerConstants.formatString(containerConstants.SYNTAX)), doc.syntax.map(paragraphLine => /*#__PURE__*/React.createElement("p", {
      className: "fw400 fs12 lh18"
    }, paragraphLine))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "fw500 fs14 lh22"
    }, containerConstants.formatString(containerConstants.EXAMPLE)), doc.example.map(paragraphLine => typeof paragraphLine === 'string' ? /*#__PURE__*/React.createElement("p", {
      className: "fw400 fs12 lh18"
    }, paragraphLine) : paragraphLine)), index < HELP_DOC[selectedDoc].length - 1 && /*#__PURE__*/React.createElement("br", null));
  })))))), /*#__PURE__*/React.createElement(Modal, {
    title: containerConstants.formatString(containerConstants.PREVIEW),
    visible: previewTemplate,
    className: 'template-form-modal',
    headStyle: {
      fontSize: '18px'
    },
    bodyStyle: {
      padding: '24px 24px 36px'
    },
    width: '768px',
    onCancel: () => setPreviewTemplate(false),
    footer: null
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center preview-template"
  }, /*#__PURE__*/React.createElement("img", {
    alt: "",
    src: ''
  })))));
};
export default CustomModal;
//# sourceMappingURL=CustomModal.js.map
