var _excluded = ["showModalDialogAddUpload", "setShowModalDialogAddUpload", "setShowFormModalDialog"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useState } from 'react';
import { Table, Progress, Avatar, Button, Card, Col, Modal, Row, Upload } from 'antd';
import { EXCEL_CONSTANTS, STATUS } from '../../utils/constants';
import { containerConstantsService } from '../../utils/containerconstants/ContainerConstants';
import { CheckCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import UploadExcelIcon from '../../images/excel_icon.svg';
import AddFormIcon from '../../images/add_form_icon.svg';
import AWBAddUploadModalStyle from './AWBAddUploadModalStyle.js';
import axios from 'axios';
import { BASE_PATH_APIS } from '../../utils/constants';
import { notifyResponseMessage } from '../commoncomponent/NotificationComponent/notifyResponseMessage';
var containerConstants = containerConstantsService.getInstance();
var {
  Dragger
} = Upload;
var {
  Meta
} = Card;
var AWBAddUploadModal = _ref => {
  var {
      showModalDialogAddUpload,
      setShowModalDialogAddUpload
    } = _ref,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var [fileName, setFileName] = useState('');
  var [uploadResponse, setUploadResponse] = useState(null);
  var [errorData, setErrorData] = useState([]);
  var [visibleJsx, setVisibleJsx] = useState(EXCEL_CONSTANTS.INITIAL);
  var [progressWidth, setProgressWidth] = useState(0);
  var errorHeader = [{
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 font-s10 font-h16",
      style: {
        color: '#727272'
      }
    }, "ERROR MESSAGE"),
    dataIndex: 'errorMsg',
    key: 'errorMsg',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-400 font-s12 font-h18",
      style: {
        color: '#212121'
      }
    }, text)
  }];
  var downloadSample = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* () {
      axios({
        url: BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/download_sample_excel',
        method: 'GET',
        responseType: 'blob'
      }).then(response => {
        if (response.status === 200) {
          var url = window.URL.createObjectURL(new Blob([response.data]));
          var link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', containerConstants.formatString(containerConstants.ADD_AWB) + '.' + getExtension(response.data.type));
          document.body.appendChild(link);
          link.click();
        } else if (response.status === 204) {
          notifyResponseMessage(STATUS.ERROR, containerConstants.formatString(containerConstants.NO_SAMPLE_TEMPLATE_FOUND));
        } else {
          notifyResponseMessage(STATUS.ERROR, response.data);
        }
      }).catch(error => {
        notifyResponseMessage(STATUS.ERROR, containerConstants.formatString(containerConstants.SOMETHING_WENT_WRONG));
      });
    });
    return function downloadSample() {
      return _ref2.apply(this, arguments);
    };
  }();
  var getExtension = ext => {
    switch (ext) {
      case 'application/ms-excel':
        return 'xlsx';
      default:
        break;
    }
  };
  var closeAwbNumMasterDialog = () => {
    setShowModalDialogAddUpload(false);
    otherProps.reloadPage();
  };
  var openFormModal = () => {
    setShowModalDialogAddUpload(false);
    otherProps.setShowCustomizedFormModalDialog({
      visible: true,
      okText: containerConstants.formatString(containerConstants.ADD),
      title: containerConstants.formatString(containerConstants.ADD_AWB)
    });
  };
  var props = {
    name: 'file',
    maxCount: 1,
    multiple: false,
    action: BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/upload_excel',
    onChange: info => {
      var status = info.file.status;
      if (fileName.localeCompare(info.file.name) !== 0) {
        setFileName(info.file.name);
      }
      if (status === 'uploading') {
        setProgressWidth(info.file.percent);
        setVisibleJsx(EXCEL_CONSTANTS.UPLOADING);
      } else if (status === 'done') {
        setVisibleJsx(EXCEL_CONSTANTS.UPLOAD_RESPONSE);
        setUploadResponse(info.file.response);
        if (info.file.response.failCount > 0 || info.file.response.errorMessageList && info.file.response.errorMessageList.length > 0) {
          var errors = [];
          for (var [key, errorMessage] of Object.entries(info.file.response.errorMessageList)) {
            errors.push({
              key: '1',
              errorMsg: errorMessage
            });
          }
          setErrorData(errors);
        }
      } else if (status === 'error') {
        var error = '';
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
        setVisibleJsx(EXCEL_CONSTANTS.ERROR);
      } else if (status === 'removed') {
        setVisibleJsx(EXCEL_CONSTANTS.INITIAL);
      }
    },
    accept: '.xlsx,.xls'
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AWBAddUploadModalStyle, null), visibleJsx === EXCEL_CONSTANTS.UPLOAD_RESPONSE && uploadResponse && uploadResponse != null && uploadResponse.successCount > 0 ? /*#__PURE__*/React.createElement(Modal, {
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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      justifyContent: 'center',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(CheckCircleFilled, {
    style: {
      fontSize: 40,
      color: '#279B4E'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      marginTop: '16px',
      justifyContent: 'center',
      display: 'flex',
      color: '#000000'
    },
    className: "font-family-weight-500 font-s18 font-h26"
  }, containerConstants.formatString(containerConstants.SUCCESSFULLY_UPLOADED)), /*#__PURE__*/React.createElement("div", {
    className: "font-family-weight-400 font-s12 font-h18",
    style: {
      justifyContent: 'center',
      display: 'flex'
    }
  }, fileName), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      justifyContent: 'center',
      display: 'flex',
      color: '#727272'
    },
    className: "font-family-weight-400 font-s14 font-h22"
  }, uploadResponse.successCount, " ", containerConstants.formatString(containerConstants.NEW_RECORDS_ARE_UPLOADED)), uploadResponse.failCount > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(InfoCircleFilled, {
    style: {
      marginRight: '10px',
      color: '#C84031',
      fontSize: 20
    }
  }), "  ", uploadResponse.failCount, " records from the file couldn't be added due to error. Please update the below records"), /*#__PURE__*/React.createElement(Table, {
    bordered: true,
    columns: errorHeader,
    dataSource: errorData,
    pagination: false
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      justifyContent: 'center',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    style: {
      marginTop: '24px'
    },
    type: "primary",
    onClick: closeAwbNumMasterDialog
  }, containerConstants.formatString(containerConstants.CLOSE))))) : /*#__PURE__*/React.createElement(Modal, {
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
  }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(Card, {
    id: "add-modal-excel-card"
  }, /*#__PURE__*/React.createElement(Dragger, _extends({}, props, {
    showUploadList: false
  }), /*#__PURE__*/React.createElement(Meta, {
    avatar: /*#__PURE__*/React.createElement(Avatar, {
      shape: "square",
      src: UploadExcelIcon
    }),
    title: containerConstants.formatString(containerConstants.UPLOAD_EXCEL),
    description: containerConstants.formatString(containerConstants.UPLOAD_EXCEL_DESCRIPTION)
  }))), visibleJsx === EXCEL_CONSTANTS.UPLOADING && /*#__PURE__*/React.createElement(Progress, {
    showInfo: false,
    percent: progressWidth
  }), visibleJsx === EXCEL_CONSTANTS.UPLOAD_RESPONSE && uploadResponse && uploadResponse != null && uploadResponse.failCount > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#C84031'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#C84031'
    },
    className: "font-family-weight-400 font-s12 font-h18"
  }, fileName), uploadResponse.errorMessageList.map(data => /*#__PURE__*/React.createElement(Row, null, data))), visibleJsx === EXCEL_CONSTANTS.UPLOAD_RESPONSE && uploadResponse && uploadResponse != null && uploadResponse.failCount === 0 && errorData && errorData.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#C84031'
    },
    className: "font-family-weight-400 font-s12 font-h18"
  }, fileName), errorData[0].errorMsg)), /*#__PURE__*/React.createElement(Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(Card, {
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
  }, /*#__PURE__*/React.createElement(Meta, {
    style: {
      height: 43
    },
    avatar: /*#__PURE__*/React.createElement(Avatar, {
      shape: "square",
      src: AddFormIcon
    }),
    title: containerConstants.formatString(containerConstants.ADD_VIA_FORM),
    description: containerConstants.formatString(containerConstants.ADD_VIA_FORM_DESCRIPTION)
  })))), /*#__PURE__*/React.createElement(Button, {
    type: "link",
    onClick: downloadSample
  }, containerConstants.formatString(containerConstants.DOWNLOAD_TEMPLATE))));
};
export default AWBAddUploadModal;
//# sourceMappingURL=AWBAddUploadModal.js.map