"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _bread_crumb = _interopRequireDefault(require("../commoncomponent/breadcrumb/bread_crumb"));
var _ContainerConstants = require("../../utils/containerconstants/ContainerConstants");
var _antd = require("antd");
var _config_icon = _interopRequireDefault(require("../../images/config_icon.svg"));
require("../../CSS/MasterData.css");
var _MasterDataAction = require("../APIConfig/MasterDataAction");
var _constants = require("../../utils/constants");
var _lodash = require("lodash");
var _notifyResponseMessage = require("../commoncomponent/NotificationComponent/notifyResponseMessage");
var _store = require("../hook-store/store");
var _BasePath = require("../commoncomponent/BasePath");
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const {
  Option
} = _antd.Select;
const {
  Item
} = _antd.Form;
const MasterData = props => {
  const store = (0, _store.useStore)(true)[0];
  const [basePath, setBasePath] = (0, _react.useState)('');
  const [showModalDialogForm, setShowModalDialogForm] = (0, _react.useState)(false);
  const [processing, setProcessing] = (0, _react.useState)(false);
  const [validation, setValidation] = (0, _react.useState)({});
  const [formData, setFormData] = (0, _react.useState)({});
  const [allUserTypeList, setAllUserTypeList] = (0, _react.useState)([]);
  const urlList = [{
    url: basePath + '/v2/label_generation/v2/settings',
    heading: containerConstants.formatString(containerConstants.SETTINGS)
  }, {
    url: basePath + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: basePath + '/v2/label_generation/carrier_allocation',
    heading: containerConstants.formatString(containerConstants.CARRIER_ALLOCATION_AND_MASTER_VALIDATION)
  }];
  const urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: '/v2/new_settings/label_generation/carrier_allocation',
    heading: containerConstants.formatString(containerConstants.CARRIER_ALLOCATION_AND_MASTER_VALIDATION)
  }];
  const masterDataTabClick = fromNewSetting => {
    return fromNewSetting ? '/v2/new_settings/label_generation/carrier_allocation/master_data' : basePath + '/v2/label_generation/carrier_allocation/master_data';
  };
  (0, _react.useEffect)(() => {
    setBasePath((0, _BasePath.getBasePath)(props, store));
    setValidation({});
    document.title = containerConstants.formatString(containerConstants.CARRIER_ALLOCATION_AND_MASTER_VALIDATION);
    (0, _MasterDataAction.fetchMasterDataConf)().then(response => {
      if (response && response.status === 200) {
        setFormData(response.data);
      }
    }).catch(error => {});
    (0, _MasterDataAction.getUserType)().then(response => {
      if (response.status === 200) {
        setAllUserTypeList(response.data);
      }
    }).catch(error => {});
  }, [showModalDialogForm]);
  const isEmptyData = () => {
    let emptyCount = 0;
    Object.values(_constants.MASTER_DATA_SETTING).forEach(key => {
      if ((!formData[key] || (typeof formData[key] === 'string' ? (0, _lodash.isEmpty)(formData[key].trim()) : typeof formData[key] === 'number' ? formData[key] < 1 : (0, _lodash.isEmpty)(formData[key]))) && key !== _constants.MASTER_DATA_SETTING.IS_ENABLED) {
        emptyCount++;
        setValidation(prev => _extends({}, prev, {
          [key]: 1
        }));
      }
    });
    return !emptyCount ? false : true;
  };
  const switchClickHandler = show => {
    setFormData(_extends({}, formData, {
      [_constants.MASTER_DATA_SETTING.IS_ENABLED]: show
    }));
    if (!(0, _lodash.isEmpty)(formData) && formData.clientId) {
      saveMasterData(show);
    } else {
      setShowModalDialogForm(show);
    }
  };
  const saveMasterData = show => {
    const config = {};
    Object.values(_constants.MASTER_DATA_SETTING).forEach(key => {
      config[key] = typeof formData[key] === 'string' ? formData[key].trim() : formData[key];
    });
    if (show !== undefined) {
      config[_constants.MASTER_DATA_SETTING.IS_ENABLED] = show;
      setProcessing(prev => !prev);
    }
    (0, _MasterDataAction.saveMasterDataConf)(config).then(response => {
      if (response && response.status === 200) {
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, "Updated Successfully");
        setFormData(response.data);
        show !== undefined && setProcessing(prev => !prev);
        props.updateCarrierAllocationName(response.data);
      } else {
        if (formData.clientId === undefined) {
          setFormData(_extends({}, formData, {
            [_constants.MASTER_DATA_SETTING.IS_ENABLED]: show
          }));
        }
        setProcessing(prev => !prev);
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, response.response.data);
      }
    }).catch(error => {
      if (formData.clientId === undefined) {
        setFormData(_extends({}, formData, {
          [_constants.MASTER_DATA_SETTING.IS_ENABLED]: show
        }));
      }
      setProcessing(prev => !prev);
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error.message);
    });
  };
  const handleClickOk = () => {
    if (!isEmptyData()) {
      saveMasterData();
      setShowModalDialogForm(false);
    }
  };
  const handleClickCancel = () => {
    setValidation({});
    if (formData.clientId === undefined) {
      setFormData(_extends({}, formData, {
        [_constants.MASTER_DATA_SETTING.IS_ENABLED]: false
      }));
    }
    setShowModalDialogForm(false);
  };
  const updateFieldValue = (e, name) => {
    setFormData(_extends({}, formData, {
      [name]: e.target.value
    }));
    validation[name] && delete validation[name];
  };
  const getRowWithInputElementJsx = (label, name) => {
    return /*#__PURE__*/_react.default.createElement(_antd.Row, {
      justify: "space-between"
    }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 6
    }, label), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 14
    }, /*#__PURE__*/_react.default.createElement(Item, {
      validateStatus: validation[name] ? 'error' : null,
      help: validation[name] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, label) : null
    }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
      name: name,
      value: formData[name],
      onChange: e => updateFieldValue(e, name)
    }))));
  };
  const getRowWithSelectElementJsx = (label, name) => {
    return /*#__PURE__*/_react.default.createElement(_antd.Row, {
      justify: "space-between"
    }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 6
    }, label), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 14
    }, /*#__PURE__*/_react.default.createElement(Item, {
      validateStatus: validation[name] ? 'error' : null,
      help: validation[name] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, label) : null
    }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
      mode: "multiple",
      allowClear: true,
      style: {
        width: '100%'
      },
      showSearch: true,
      value: formData[name],
      onChange: value => {
        setFormData(_extends({}, formData, {
          [name]: value
        }));
        validation[name] && delete validation[name];
      },
      filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }, allUserTypeList.map(userType => /*#__PURE__*/_react.default.createElement(Option, {
      key: userType.id,
      value: userType.id + ""
    }, userType.name))))));
  };
  const handleAllocationOutputTypeChange = value => {
    //
    if (value === "Single Carrier") {
      setFormData(_extends({}, formData, {
        noOfOutput: 1,
        [_constants.MASTER_DATA_SETTING.ALLOCATION_OUTPUT]: value
      }));
    } else {
      setFormData(_extends({}, formData, {
        [_constants.MASTER_DATA_SETTING.ALLOCATION_OUTPUT]: value
      }));
    }
    validation[_constants.MASTER_DATA_SETTING.ALLOCATION_OUTPUT] && delete validation[_constants.MASTER_DATA_SETTING.ALLOCATION_OUTPUT];
  };
  const handleNoOfOutputChange = value => {
    setFormData(_extends({}, formData, {
      noOfOutput: value
    }));
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_bread_crumb.default, {
    urlList: store.fromNewSetting ? urlListForNewSetting : urlList
  }), /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    title: containerConstants.formatString(containerConstants.SET_PREFERENCE),
    visible: showModalDialogForm,
    centered: true,
    maskClosable: "true",
    className: "master-data-modal",
    bodyStyle: {
      padding: '16px 24px 0'
    },
    width: '50%',
    okText: containerConstants.formatString(containerConstants.ADD),
    onOk: handleClickOk,
    onCancel: handleClickCancel
  }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
    className: "fw500 fs12 lh18",
    bodyStyle: {
      color: '#727272',
      padding: '1rem 0 1.5rem'
    },
    title: containerConstants.formatString(containerConstants.BASIC_DETAILS)
  }, getRowWithInputElementJsx(containerConstants.formatString(containerConstants.TITLE), _constants.MASTER_DATA_SETTING.TITLE), /*#__PURE__*/_react.default.createElement("br", null), getRowWithSelectElementJsx(containerConstants.formatString(containerConstants.USER_TYPE), _constants.MASTER_DATA_SETTING.ALLOWED_USER_TYPES), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_antd.Row, {
    justify: "space-between"
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 6
  }, containerConstants.formatString(containerConstants.ALLOCATION_OUTPUT), " :"), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 14
  }, /*#__PURE__*/_react.default.createElement(Item, {
    validateStatus: validation[_constants.MASTER_DATA_SETTING.ALLOCATION_OUTPUT] ? 'error' : null,
    help: validation[_constants.MASTER_DATA_SETTING.ALLOCATION_OUTPUT] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, containerConstants.formatString(containerConstants.ALLOCATION_OUTPUT)) : null
  }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    style: {
      width: '100%'
    },
    showSearch: true,
    value: formData[_constants.MASTER_DATA_SETTING.ALLOCATION_OUTPUT],
    onChange: value => handleAllocationOutputTypeChange(value),
    filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }, /*#__PURE__*/_react.default.createElement(Option, {
    key: "Single_Carrier",
    value: "Single Carrier"
  }, containerConstants.formatString(containerConstants.SINGLE_CARRIER)), /*#__PURE__*/_react.default.createElement(Option, {
    key: "Multi_Carrier",
    value: "Multi Carrier"
  }, containerConstants.formatString(containerConstants.MULTI_CARRIER)))))), formData.isEnabled && formData[_constants.MASTER_DATA_SETTING.ALLOCATION_OUTPUT] === "Multi Carrier" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_antd.Row, {
    justify: "space-between"
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 6
  }, containerConstants.formatString(containerConstants.NO_OF_OUTPUT), " :"), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 14
  }, /*#__PURE__*/_react.default.createElement(Item, {
    validateStatus: validation[_constants.MASTER_DATA_SETTING.NO_OF_OUTPUT] ? 'error' : null,
    help: validation[_constants.MASTER_DATA_SETTING.NO_OF_OUTPUT] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, containerConstants.formatString(containerConstants.NO_OF_OUTPUT)) : null
  }, /*#__PURE__*/_react.default.createElement(_antd.InputNumber, {
    style: {
      height: '32px'
    },
    placeholder: "",
    name: _constants.MASTER_DATA_SETTING.NO_OF_OUTPUT,
    value: formData[_constants.MASTER_DATA_SETTING.NO_OF_OUTPUT],
    onChange: e => handleNoOfOutputChange(e)
  })))))), /*#__PURE__*/_react.default.createElement(_antd.Card, {
    className: "fw500 fs12 lh18",
    bodyStyle: {
      color: '#727272',
      padding: '1rem 0 1.5rem'
    },
    title: containerConstants.formatString(containerConstants.CARRIER_INTEGRATION)
  }, getRowWithInputElementJsx(containerConstants.formatString(containerConstants.URL), _constants.MASTER_DATA_SETTING.URL), /*#__PURE__*/_react.default.createElement("br", null), getRowWithInputElementJsx(containerConstants.formatString(containerConstants.API_ACCESS_TOKEN), _constants.MASTER_DATA_SETTING.API_ACCESS_TOKEN))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: masterDataTabClick(store.fromNewSetting),
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
    size: "small",
    bodyStyle: {},
    className: "pointer",
    id: "carrier-alloc-card"
  }, /*#__PURE__*/_react.default.createElement("span", null, containerConstants.formatString(containerConstants.MASTER_DATA)))), (store.fromFCR || !store.showCustom) && /*#__PURE__*/_react.default.createElement(_antd.Card, {
    size: "small",
    bodyStyle: {},
    id: "carrier-alloc-card"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "justify-space-btw"
  }, /*#__PURE__*/_react.default.createElement("span", null, containerConstants.formatString(containerConstants.SERVICE)), /*#__PURE__*/_react.default.createElement("span", {
    id: "switch-config-container"
  }, formData[_constants.MASTER_DATA_SETTING.IS_ENABLED] && formData.clientId && /*#__PURE__*/_react.default.createElement("span", {
    style: {
      paddingRight: '26px'
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "pointer",
    src: _config_icon.default,
    onClick: () => setShowModalDialogForm(true)
  })), /*#__PURE__*/_react.default.createElement(_antd.Switch, {
    loading: processing,
    disabled: processing,
    checked: formData[_constants.MASTER_DATA_SETTING.IS_ENABLED],
    onClick: switchClickHandler
  })))));
};
var _default = exports.default = MasterData;
//# sourceMappingURL=MasterData.js.map