"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _ContainerConstants = require("../../utils/containerconstants/ContainerConstants");
var _bread_crumb = _interopRequireDefault(require("../commoncomponent/breadcrumb/bread_crumb"));
var _MasterDataAction = require("../APIConfig/MasterDataAction");
var _BulkUploadAddShipmentAction = require("../APIConfig/BulkUploadAddShipmentAction");
var _store = require("../hook-store/store");
var _BasePath = require("../commoncomponent/BasePath");
var _notifyResponseMessage = require("../commoncomponent/NotificationComponent/notifyResponseMessage");
var _constants = require("../../utils/constants");
require("../../CSS/BulkUploadAddShipment.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const BulkUploadAddShipment = props => {
  const store = (0, _store.useStore)(true)[0];
  const [showLoading, setShowLoading] = (0, _react.useState)(false);
  const [title, setTitle] = (0, _react.useState)("Bulk Upload");
  const [selectedUserTypes, setSelectedUserTypes] = (0, _react.useState)([]);
  const [allUserTypeListOption, setAllUserTypeListOption] = (0, _react.useState)([]);
  const [bulkUploadEnabled, setBulkUploadEnabled] = (0, _react.useState)(false);
  const [bulkUploadConfigId, setBulkUploadConfigId] = (0, _react.useState)(0);
  const [isButtonDisabled, setIsButtonDisabled] = (0, _react.useState)(true);
  const [dataFetched, setDataFetched] = (0, _react.useState)(false);
  const [basePath, setBasePath] = (0, _react.useState)('');
  const urlList = [{
    url: basePath + '/v2/label_generation/v2/settings',
    heading: containerConstants.formatString(containerConstants.SETTINGS)
  }, {
    url: basePath + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: basePath + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.BULK_UPLOAD)
  }];
  const urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: '/v2/new_settings/label_generation/bulk_upload',
    heading: containerConstants.formatString(containerConstants.CARRIER_ALLOCATION_AND_MASTER_VALIDATION)
  }];
  const switchClickHandler = checked => {
    if (!checked) {
      setSelectedUserTypes([]);
      setTitle("Bulk Upload");
      setIsButtonDisabled(false);
    }
    setBulkUploadEnabled(checked);
  };
  const handleTitleInputChange = value => {
    setTitle(value);
    isSaveButtonDisable('title', value);
  };
  const saveConfig = () => {
    setShowLoading(true);
    let lgBulkUploadSettingDto = {
      "isEnabled": bulkUploadEnabled,
      "title": title,
      "allowedUserTypes": selectedUserTypes,
      "id": bulkUploadConfigId
    };
    (0, _BulkUploadAddShipmentAction.saveBulkUploadAddShipmentConfig)(lgBulkUploadSettingDto).then(response => {
      setShowLoading(false);
      if (response && response.status === 200) {
        var _response$data;
        let status = response == null || (_response$data = response.data) == null ? void 0 : _response$data.status;
        if (status && status.toUpperCase() === _constants.STATUS.SUCCESS) {
          var _response$data2;
          setBulkUploadConfigId(response.data.data.id);
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, response == null || (_response$data2 = response.data) == null ? void 0 : _response$data2.message);
          props.updateLabelGenerationTitle(response.data.data);
        } else {
          var _response$data3;
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.FAILED, response == null || (_response$data3 = response.data) == null ? void 0 : _response$data3.message);
        }
      }
    }).catch(error => {
      setShowLoading(false);
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
    });
  };
  const isSaveButtonDisable = (key, value) => {
    if (key) {
      switch (key) {
        case 'title':
          if (value && selectedUserTypes.length > 0) {
            setIsButtonDisabled(false);
          } else {
            setIsButtonDisabled(true);
          }
          break;
        case 'selectedUserTypes':
          if (title && value.length > 0) {
            setIsButtonDisabled(false);
          } else {
            setIsButtonDisabled(true);
          }
          break;
        default:
          break;
      }
    } else {
      if (title && selectedUserTypes.length > 0) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }
  };
  (0, _react.useEffect)(() => {
    setBasePath((0, _BasePath.getBasePath)(props, store));
    document.title = containerConstants.formatString(containerConstants.BULK_UPLOAD);
    let options = [];
    allUserTypeListOption.length === 0 && (0, _MasterDataAction.getUserType)().then(response => {
      if (response.status === 200) {
        response.data.map(userType => {
          options.push({
            label: userType.name,
            value: userType.id
          });
        });
      }
      setAllUserTypeListOption(options);
    }).catch(error => {});
    !dataFetched && (0, _BulkUploadAddShipmentAction.fetchBulkUploadAddShipmentConfig)(bulkUploadConfigId).then(response => {
      if (response && response.status === 200) {
        var _response$data4;
        let status = response == null || (_response$data4 = response.data) == null ? void 0 : _response$data4.status;
        if (status && status.toUpperCase() === _constants.STATUS.SUCCESS) {
          setDataFetched(true);
          if (response.data && response.data.data) {
            let reps = response.data.data;
            let userTypes = [];
            reps.allowedUserTypes && reps.allowedUserTypes.forEach(val => {
              val && userTypes.push(parseInt(val));
            });
            setSelectedUserTypes(userTypes);
            setTitle(reps.title);
            setBulkUploadEnabled(reps.isEnabled);
            setBulkUploadConfigId(reps.id);
            isSaveButtonDisable();
          }
        }
      }
    });
  }, [allUserTypeListOption, dataFetched]);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_bread_crumb.default, {
    urlList: store.fromNewSetting ? urlListForNewSetting : urlList
  }), /*#__PURE__*/_react.default.createElement(_antd.Spin, {
    spinning: showLoading
  }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
    className: "fw400 fs12 lh18",
    size: "small",
    bodyStyle: {
      color: '#727272'
    },
    id: "bulk-upload-add-shipment-card"
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 7
  }, /*#__PURE__*/_react.default.createElement("h3", {
    style: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontsize: '14px',
      lineHeight: '22px',
      color: '#212121'
    }
  }, containerConstants.formatString(containerConstants.ENABLED), " :")), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 10
  }, /*#__PURE__*/_react.default.createElement(_antd.Switch, {
    checked: bulkUploadEnabled,
    onChange: switchClickHandler
  }))), bulkUploadEnabled && /*#__PURE__*/_react.default.createElement(_antd.Row, {
    style: {
      marginTop: '12px'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 7
  }, /*#__PURE__*/_react.default.createElement("h3", {
    style: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontsize: '14px',
      lineHeight: '22px',
      color: '#212121'
    }
  }, containerConstants.formatString(containerConstants.TITLE), " :")), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    style: {
      height: '32px'
    },
    placeholder: "Add title",
    name: "title",
    value: title,
    onChange: e => handleTitleInputChange(e.target.value)
  })))), bulkUploadEnabled && /*#__PURE__*/_react.default.createElement(_antd.Row, {
    style: {
      marginTop: '12px'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 7
  }, /*#__PURE__*/_react.default.createElement("h3", {
    style: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontsize: '14px',
      lineHeight: '22px',
      color: '#212121'
    }
  }, containerConstants.formatString(containerConstants.USER_TYPE), " :")), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    placeholder: "Select User Types",
    mode: "multiple",
    showSearch: true,
    style: {
      display: 'block'
    },
    value: selectedUserTypes,
    onChange: value => {
      setSelectedUserTypes(value);
      isSaveButtonDisable('selectedUserTypes', value);
    },
    filterOption: (input, option) => {
      var _option$props;
      if ((_option$props = option.props) != null && _option$props.children) return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
    options: allUserTypeListOption
  })))), /*#__PURE__*/_react.default.createElement(_antd.Row, {
    style: {
      marginTop: '24px'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    push: 15
  }, /*#__PURE__*/_react.default.createElement("div", {
    disabled: store.fromFCR ? false : store.showCustom
  }, /*#__PURE__*/_react.default.createElement(_antd.Space, {
    size: 9
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    ghost: true,
    className: "fw500 fs14 lh22",
    style: {
      color: '#727272',
      border: 0
    },
    type: "primary",
    loading: showLoading
  }, containerConstants.formatString(containerConstants.CANCEL)), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: "fw500 fs14 lh22",
    style: {
      color: '#FFFFFF'
    },
    type: "primary",
    loading: showLoading,
    onClick: saveConfig,
    disabled: isButtonDisabled
  }, containerConstants.formatString(containerConstants.SAVE)))))))));
};
var _default = exports.default = BulkUploadAddShipment;
//# sourceMappingURL=BulkUploadAddShipment.js.map