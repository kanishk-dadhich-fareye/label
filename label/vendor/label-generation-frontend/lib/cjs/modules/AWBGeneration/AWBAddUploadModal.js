"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _constants = require("../../utils/constants");
var _ContainerConstants = require("../../utils/containerconstants/ContainerConstants");
var _icons = require("@ant-design/icons");
var _excel_icon = _interopRequireDefault(require("../../images/excel_icon.svg"));
var _add_form_icon = _interopRequireDefault(require("../../images/add_form_icon.svg"));
var _AWBAddUploadModalStyle = _interopRequireDefault(require("./AWBAddUploadModalStyle.js"));
var _axios = _interopRequireDefault(require("axios"));
var _notifyResponseMessage = require("../commoncomponent/NotificationComponent/notifyResponseMessage");
const _excluded = ["showModalDialogAddUpload", "setShowModalDialogAddUpload", "setShowFormModalDialog"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const {
  Dragger
} = _antd.Upload;
const {
  Meta
} = _antd.Card;
const AWBAddUploadModal = _ref => {
  let {
      showModalDialogAddUpload,
      setShowModalDialogAddUpload
    } = _ref,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  const [fileName, setFileName] = (0, _react.useState)('');
  const [uploadResponse, setUploadResponse] = (0, _react.useState)(null);
  const [errorData, setErrorData] = (0, _react.useState)([]);
  const [visibleJsx, setVisibleJsx] = (0, _react.useState)(_constants.EXCEL_CONSTANTS.INITIAL);
  const [progressWidth, setProgressWidth] = (0, _react.useState)(0);
  const errorHeader = [{
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 font-s10 font-h16",
      style: {
        color: '#727272'
      }
    }, "ERROR MESSAGE"),
    dataIndex: 'errorMsg',
    key: 'errorMsg',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-400 font-s12 font-h18",
      style: {
        color: '#212121'
      }
    }, text)
  }];
  const downloadSample = async () => {
    (0, _axios.default)({
      url: _constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/download_sample_excel',
      method: 'GET',
      responseType: 'blob'
    }).then(response => {
      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', containerConstants.formatString(containerConstants.ADD_AWB) + '.' + getExtension(response.data.type));
        document.body.appendChild(link);
        link.click();
      } else if (response.status === 204) {
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, containerConstants.formatString(containerConstants.NO_SAMPLE_TEMPLATE_FOUND));
      } else {
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, response.data);
      }
    }).catch(error => {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, containerConstants.formatString(containerConstants.SOMETHING_WENT_WRONG));
    });
  };
  const getExtension = ext => {
    switch (ext) {
      case 'application/ms-excel':
        return 'xlsx';
      default:
        break;
    }
  };
  const closeAwbNumMasterDialog = () => {
    setShowModalDialogAddUpload(false);
    otherProps.reloadPage();
  };
  const openFormModal = () => {
    setShowModalDialogAddUpload(false);
    otherProps.setShowCustomizedFormModalDialog({
      visible: true,
      okText: containerConstants.formatString(containerConstants.ADD),
      title: containerConstants.formatString(containerConstants.ADD_AWB)
    });
  };
  const props = {
    name: 'file',
    maxCount: 1,
    multiple: false,
    action: _constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/upload_excel',
    onChange: info => {
      const status = info.file.status;
      if (fileName.localeCompare(info.file.name) !== 0) {
        setFileName(info.file.name);
      }
      if (status === 'uploading') {
        setProgressWidth(info.file.percent);
        setVisibleJsx(_constants.EXCEL_CONSTANTS.UPLOADING);
      } else if (status === 'done') {
        setVisibleJsx(_constants.EXCEL_CONSTANTS.UPLOAD_RESPONSE);
        setUploadResponse(info.file.response);
        if (info.file.response.failCount > 0 || info.file.response.errorMessageList && info.file.response.errorMessageList.length > 0) {
          let errors = [];
          for (const [key, errorMessage] of Object.entries(info.file.response.errorMessageList)) {
            errors.push({
              key: '1',
              errorMsg: errorMessage
            });
          }
          setErrorData(errors);
        }
      } else if (status === 'error') {
        let error = '';
        if (info.file.response.status === 500) {
          error = {
            status: 500,
            errorMessage: ''
          };
        } else if (info.file.response.status === 404) {
          error = {
            status: 404,
            errorMessage: info.file.response.error
          };
        } else if (info.file.response.responseMessage) {
          error = {
            status: null,
            errorMessage: info.file.response.responseMessage
          };
        }
        setVisibleJsx(_constants.EXCEL_CONSTANTS.ERROR);
      } else if (status === 'removed') {
        setVisibleJsx(_constants.EXCEL_CONSTANTS.INITIAL);
      }
    },
    accept: '.xlsx,.xls'
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_AWBAddUploadModalStyle.default, null), visibleJsx === _constants.EXCEL_CONSTANTS.UPLOAD_RESPONSE && uploadResponse && uploadResponse != null && uploadResponse.successCount > 0 ? /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    className: "master-data-add-modal",
    visible: showModalDialogAddUpload,
    style: {
      width: '480px',
      height: '410px'
    },
    footer: null,
    onOk: closeAwbNumMasterDialog,
    onCancel: closeAwbNumMasterDialog,
    bodyStyle: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      justifyContent: 'center',
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement(_icons.CheckCircleFilled, {
    style: {
      fontSize: 40,
      color: '#279B4E'
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      marginTop: '16px',
      justifyContent: 'center',
      display: 'flex',
      color: '#000000'
    },
    className: "font-family-weight-500 font-s18 font-h26"
  }, containerConstants.formatString(containerConstants.SUCCESSFULLY_UPLOADED)), /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-400 font-s12 font-h18",
    style: {
      justifyContent: 'center',
      display: 'flex'
    }
  }, fileName), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      justifyContent: 'center',
      display: 'flex',
      color: '#727272'
    },
    className: "font-family-weight-400 font-s14 font-h22"
  }, uploadResponse.successCount, " ", containerConstants.formatString(containerConstants.NEW_RECORDS_ARE_UPLOADED)), uploadResponse.failCount > 0 && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      alignItems: 'center',
      marginTop: '16px',
      marginBottom: '12px',
      display: 'flex',
      background: '#FFFFFF',
      border: '1px solid #C84031',
      borderRadius: '5px'
    },
    className: "font-family-weight-400 font-s12 font-h26"
  }, /*#__PURE__*/_react.default.createElement(_icons.InfoCircleFilled, {
    style: {
      marginRight: '10px',
      color: '#C84031',
      fontSize: 20
    }
  }), "  ", uploadResponse.failCount, " records from the file couldn't be added due to error. Please update the below records"), /*#__PURE__*/_react.default.createElement(_antd.Table, {
    bordered: true,
    columns: errorHeader,
    dataSource: errorData,
    pagination: false
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      justifyContent: 'center',
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    style: {
      marginTop: '24px'
    },
    type: "primary",
    onClick: closeAwbNumMasterDialog
  }, containerConstants.formatString(containerConstants.CLOSE))))) : /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    className: "master-data-add-modal",
    title: containerConstants.formatString(containerConstants.ADD_AWB),
    visible: showModalDialogAddUpload,
    style: {
      width: '480px',
      height: '410px'
    },
    footer: null,
    onOk: closeAwbNumMasterDialog,
    onCancel: closeAwbNumMasterDialog
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
    id: "add-modal-excel-card"
  }, /*#__PURE__*/_react.default.createElement(Dragger, _extends({}, props, {
    showUploadList: false
  }), /*#__PURE__*/_react.default.createElement(Meta, {
    avatar: /*#__PURE__*/_react.default.createElement(_antd.Avatar, {
      shape: "square",
      src: _excel_icon.default
    }),
    title: containerConstants.formatString(containerConstants.UPLOAD_EXCEL),
    description: containerConstants.formatString(containerConstants.UPLOAD_EXCEL_DESCRIPTION)
  }))), visibleJsx === _constants.EXCEL_CONSTANTS.UPLOADING && /*#__PURE__*/_react.default.createElement(_antd.Progress, {
    showInfo: false,
    percent: progressWidth
  }), visibleJsx === _constants.EXCEL_CONSTANTS.UPLOAD_RESPONSE && uploadResponse && uploadResponse != null && uploadResponse.failCount > 0 && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      color: '#C84031'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      color: '#C84031'
    },
    className: "font-family-weight-400 font-s12 font-h18"
  }, fileName), uploadResponse.errorMessageList.map(data => /*#__PURE__*/_react.default.createElement(_antd.Row, null, data))), visibleJsx === _constants.EXCEL_CONSTANTS.UPLOAD_RESPONSE && uploadResponse && uploadResponse != null && uploadResponse.failCount === 0 && errorData && errorData.length > 0 && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      color: '#C84031'
    },
    className: "font-family-weight-400 font-s12 font-h18"
  }, fileName), errorData[0].errorMsg)), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
    id: "add-modal-form-card",
    onClick: () => {
      openFormModal();
      // setShowFormModalDialog({
      //         visible: true,
      //         title: containerConstants.formatString(containerConstants.ADD_AWB),
      //         okText: 'OK'
      // });
      // setShowModalDialogAddUpload(false);
    }
  }, /*#__PURE__*/_react.default.createElement(Meta, {
    style: {
      height: 43
    },
    avatar: /*#__PURE__*/_react.default.createElement(_antd.Avatar, {
      shape: "square",
      src: _add_form_icon.default
    }),
    title: containerConstants.formatString(containerConstants.ADD_VIA_FORM),
    description: containerConstants.formatString(containerConstants.ADD_VIA_FORM_DESCRIPTION)
  })))), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "link",
    onClick: downloadSample
  }, containerConstants.formatString(containerConstants.DOWNLOAD_TEMPLATE))));
};
var _default = exports.default = AWBAddUploadModal;
//# sourceMappingURL=AWBAddUploadModal.js.map