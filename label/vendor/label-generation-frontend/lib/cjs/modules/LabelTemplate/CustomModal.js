"use strict";

exports.__esModule = true;
exports.default = void 0;
var _constants = require("../../utils/constants");
var _antd = require("antd");
var _react = _interopRequireWildcard(require("react"));
var _ContainerConstants = require("../../utils/containerconstants/ContainerConstants");
var _create_template_icon = _interopRequireDefault(require("../../images/create_template_icon.svg"));
var _LabelTemplateAction = require("../APIConfig/LabelTemplateAction");
var _lodash = require("lodash");
var _notifyResponseMessage = require("../commoncomponent/NotificationComponent/notifyResponseMessage");
const _excluded = ["showModalDialog", "showHelpModal", "showConfirmModalDialog"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const {
  Option
} = _antd.Select;
const CustomModal = _ref => {
  let {
      showModalDialog,
      showHelpModal,
      showConfirmModalDialog
    } = _ref,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  const [formData, setFormData] = (0, _react.useState)({});
  const [selectedDoc, setSelectedDoc] = (0, _react.useState)('Get Reference Number of a process');
  const [previewTemplate, setPreviewTemplate] = (0, _react.useState)(false);
  const [partyMasterCodeList, setPartyMasterCodeList] = (0, _react.useState)([]);
  const handleClickOk = () => {
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
  const handleClickCancel = () => {
    showModalDialog && otherProps.setShowModalDialog(false);
    showHelpModal && otherProps.setShowHelpModal(false);
    showConfirmModalDialog && otherProps.setShowConfirmModalDialog({
      visible: false,
      okText: '',
      title: ''
    });
    setFormData({});
  };
  const getAllPartyMaster = () => {
    (0, _LabelTemplateAction.fetchAllPartyMaster)().then(response => {
      if (response && response.status === 200) {
        var _response$data;
        const partyMasterList = (_response$data = response.data) == null ? void 0 : _response$data.data;
        const merchantCodeList = partyMasterList.map(partyMaster => partyMaster == null ? void 0 : partyMaster.merchantCode);
        setPartyMasterCodeList(merchantCodeList);
      }
    }).catch(error => {});
  };
  const onSaveLabelTemplate = () => {
    (0, _LabelTemplateAction.saveLabelTemplate)(_extends({}, formData, {
      [_constants.DATA_INDEX.TEMPLATE_STATUS]: _constants.TEMPLATE_STATUS_MAP.DRAFT
    })).then(response => {
      if (response && response.status === 200) {
        var _response$data2;
        if ((0, _lodash.toUpper)((_response$data2 = response.data) == null ? void 0 : _response$data2.status) === _constants.STATUS.SUCCESS) {
          var _response$data3, _response$data4, _response$data5, _response$data6;
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, response == null || (_response$data3 = response.data) == null ? void 0 : _response$data3.message);
          otherProps.setShowEditor({
            visible: true,
            [_constants.DATA_INDEX.TEMPLATE_ID]: (_response$data4 = response.data) == null || (_response$data4 = _response$data4.data) == null ? void 0 : _response$data4.id,
            [_constants.DATA_INDEX.TEMPLATE_STATUS]: (_response$data5 = response.data) == null || (_response$data5 = _response$data5.data) == null ? void 0 : _response$data5.status,
            [_constants.DATA_INDEX.TEMPLATE_NAME]: (_response$data6 = response.data) == null || (_response$data6 = _response$data6.data) == null ? void 0 : _response$data6.name,
            [_constants.DATA_INDEX.TEMPLATE_SCRIPT]: ''
          });
          handleClickCancel();
        } else {
          var _response$data7;
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, response == null || (_response$data7 = response.data) == null ? void 0 : _response$data7.message);
        }
      }
    }).catch(error => {});
  };
  const updateFieldValue = (e, name) => {
    setFormData(_extends({}, formData, {
      [name]: e.target.value
    }));
  };
  const getRowWithSelectElementJsx = (label, name, options, spanSize) => {
    return /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: spanSize[0]
    }, label), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: spanSize[1]
    }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
      onChange: value => {
        !(name === _constants.DATA_INDEX.ELEMENT_OPTIONS) ? setFormData(_extends({}, formData, {
          [name]: value
        })) : setSelectedDoc(value);
      },
      placeholder: containerConstants.formatString(containerConstants.SELECT),
      value: !(name === _constants.DATA_INDEX.ELEMENT_OPTIONS) ? formData[name] : selectedDoc,
      onFocus: name === _constants.DATA_INDEX.PARTY_CODE && getAllPartyMaster
    }, options.map(option => option.key ? /*#__PURE__*/_react.default.createElement(Option, {
      value: option.key
    }, option.value) : /*#__PURE__*/_react.default.createElement(Option, {
      value: option
    }, option)))));
  };
  const getRowWithInputElementJsx = (label, name, disabled) => {
    return /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 7
    }, label), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 17
    }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
      name: name,
      value: formData[name],
      placeholder: containerConstants.formatString(containerConstants.PLACEHOLDER),
      disabled: disabled,
      onChange: e => updateFieldValue(e, name)
    })));
  };
  const getPreviewTemplateJSX = () => {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "available-template"
    }, /*#__PURE__*/_react.default.createElement(_antd.Image, {
      src: '',
      preview: {
        visible: false,
        src: '',
        mask: /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Space, {
          direction: "vertical",
          size: 12
        }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
          size: "small",
          ghost: true,
          onClick: () => setPreviewTemplate(true)
        }, containerConstants.formatString(containerConstants.PREVIEW)), /*#__PURE__*/_react.default.createElement(_antd.Button, {
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
  const modalWidth = () => showModalDialog ? showModalDialog.modalType === _constants.TEMPLATE_MODAL_TYPE.CHOOSE_TEMPLATE ? 'fit-content' : '32%' : showConfirmModalDialog && showConfirmModalDialog.visible ? '32%' : '51.2%';
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    title: showModalDialog && showModalDialog.title || showHelpModal && showHelpModal.title || showConfirmModalDialog && showConfirmModalDialog.title,
    visible: showModalDialog && showModalDialog.visible || showHelpModal && showHelpModal.visible || showConfirmModalDialog && showConfirmModalDialog.visible,
    closable: (showModalDialog && showModalDialog.modalType) === _constants.TEMPLATE_MODAL_TYPE.CREATE_TEMPLATE && showConfirmModalDialog.visible ? false : true,
    className: showModalDialog && showModalDialog.visible ? 'template-form-modal ' : showConfirmModalDialog && showConfirmModalDialog.visible ? 'template-delete-modal' : 'template-help-modal',
    headStyle: {
      fontSize: '18px'
    },
    bodyStyle: {
      padding: showModalDialog && showModalDialog.modalType === _constants.TEMPLATE_MODAL_TYPE.CHOOSE_TEMPLATE ? '0 18px 0 24px' : '0 24px'
    },
    width: modalWidth(),
    onCancel: handleClickCancel,
    footer: showModalDialog && showModalDialog.visible && showModalDialog.modalType === _constants.TEMPLATE_MODAL_TYPE.CREATE_TEMPLATE || showConfirmModalDialog && showConfirmModalDialog.visible ? [/*#__PURE__*/_react.default.createElement(_antd.Button, {
      style: {
        color: '#727272',
        border: 0
      },
      onClick: handleClickCancel
    }, containerConstants.formatString(containerConstants.CANCEL)), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      type: "primary",
      style: {
        color: '#FFFFFF'
      },
      onClick: handleClickOk
    }, showModalDialog && showModalDialog.okText || showConfirmModalDialog && showConfirmModalDialog.okText)] : null
  }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
    className: "fw500 fs12 lh18 border-none",
    bodyStyle: {
      color: '#727272',
      padding: showModalDialog && showModalDialog.modalType === _constants.TEMPLATE_MODAL_TYPE.CHOOSE_TEMPLATE ? '24px 0 0' : showConfirmModalDialog && showConfirmModalDialog.visible ? '0 0 24px' : '24px 0'
    }
  }, showModalDialog && showModalDialog.modalType === _constants.TEMPLATE_MODAL_TYPE.CREATE_TEMPLATE ? /*#__PURE__*/_react.default.createElement("div", null, getRowWithInputElementJsx(containerConstants.formatString(containerConstants.NAME), _constants.DATA_INDEX.TEMPLATE_NAME, false), /*#__PURE__*/_react.default.createElement("br", null), getRowWithInputElementJsx(containerConstants.formatString(containerConstants.CODE), _constants.DATA_INDEX.TEMPLATE_CODE, false), /*#__PURE__*/_react.default.createElement("br", null), getRowWithSelectElementJsx(containerConstants.formatString(containerConstants.PAGE_SIZE), _constants.DATA_INDEX.PAGE_SIZE, [{
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
  }], [7, 17])) : /*#__PURE__*/_react.default.createElement("div", null, showModalDialog && showModalDialog.modalType === _constants.TEMPLATE_MODAL_TYPE.CHOOSE_TEMPLATE ? /*#__PURE__*/_react.default.createElement("div", {
    id: "all-template-container",
    className: "flex justify-center",
    style: {
      flexWrap: 'wrap',
      width: '250px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "scratch-template pointer",
    onClick: () => {
      otherProps.setShowModalDialog({
        visible: true,
        title: containerConstants.formatString(containerConstants.CREATE_TEMPLATE),
        okText: containerConstants.formatString(containerConstants.DONE),
        modalType: _constants.TEMPLATE_MODAL_TYPE.CREATE_TEMPLATE
      });
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "",
    src: _create_template_icon.default
  }), /*#__PURE__*/_react.default.createElement("p", {
    className: "fw400 fs12 lh18"
  }, containerConstants.formatString(containerConstants.START_SCRATCH)))) : showConfirmModalDialog && showConfirmModalDialog.visible ? /*#__PURE__*/_react.default.createElement("p", {
    className: "fw400 fs14 lh16 mt16",
    style: {
      color: '#212121'
    }
  }, showConfirmModalDialog.description) : /*#__PURE__*/_react.default.createElement("div", null, getRowWithSelectElementJsx(containerConstants.formatString(containerConstants.ELEMENT_OPTIONS), _constants.DATA_INDEX.ELEMENT_OPTIONS, Object.keys(_constants.HELP_DOC), [10, 14]), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_antd.Card, {
    bordered: false,
    bodyStyle: {
      background: '#F3F3F3',
      border: '1px solid #DADADA',
      borderRadius: '3px',
      padding: '12px',
      maxHeight: '164px',
      overflow: 'auto'
    }
  }, _constants.HELP_DOC[selectedDoc] && _constants.HELP_DOC[selectedDoc].map((doc, index) => {
    return /*#__PURE__*/_react.default.createElement("div", null, doc.note !== undefined ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      className: "fw500 fs14 lh22"
    }, containerConstants.formatString(containerConstants.NOTE)), doc.note.map(paragraphLine => /*#__PURE__*/_react.default.createElement("p", {
      className: "fw400 fs12 lh18"
    }, paragraphLine))) : /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      className: "fw500 fs14 lh22"
    }, containerConstants.formatString(containerConstants.SYNTAX)), doc.syntax.map(paragraphLine => /*#__PURE__*/_react.default.createElement("p", {
      className: "fw400 fs12 lh18"
    }, paragraphLine))), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      className: "fw500 fs14 lh22"
    }, containerConstants.formatString(containerConstants.EXAMPLE)), doc.example.map(paragraphLine => typeof paragraphLine === 'string' ? /*#__PURE__*/_react.default.createElement("p", {
      className: "fw400 fs12 lh18"
    }, paragraphLine) : paragraphLine)), index < _constants.HELP_DOC[selectedDoc].length - 1 && /*#__PURE__*/_react.default.createElement("br", null));
  })))))), /*#__PURE__*/_react.default.createElement(_antd.Modal, {
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
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-center preview-template"
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "",
    src: ''
  })))));
};
var _default = exports.default = CustomModal;
//# sourceMappingURL=CustomModal.js.map