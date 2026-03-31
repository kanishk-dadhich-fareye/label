"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
require("../../../CSS/AddEditFormModalStyle.css");
var _ContainerConstants = require("../../../utils/containerconstants/ContainerConstants");
var _constants = require("../../../utils/constants");
var _lodash = require("lodash");
var _MasterDataTabCardAction = require("./hooks/APIConfig/MasterDataTabCardAction");
var _notifyResponseMessage = require("../../commoncomponent/NotificationComponent/notifyResponseMessage");
const _excluded = ["showModalDialogForm"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const {
  Item
} = _antd.Form;
const {
  Option
} = _antd.Select;
const AddEditFormModal = _ref => {
  let {
      showModalDialogForm
    } = _ref,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  const [showLoading, setShowLoading] = (0, _react.useState)(false);
  const [formData, setFormData] = (0, _react.useState)({});
  const [validation, setValidation] = (0, _react.useState)({});
  const [disableFields, setDisableFields] = (0, _react.useState)({});
  (0, _react.useEffect)(() => {
    if (showModalDialogForm.visible && (0, _lodash.isEqual)(showModalDialogForm.operation, _constants.OPERATION.EDIT)) {
      const dataObj = showModalDialogForm.data;
      if (showModalDialogForm.form === _constants.LEFT_TABS.PARTY_MASTER_TABPANE) {
        setFormData(_extends({}, dataObj, {
          [_constants.MASTER_DATA_INDEX.ACCEPT_OVERAGE_PICKUP]: (0, _lodash.upperFirst)(dataObj[_constants.MASTER_DATA_INDEX.ACCEPT_OVERAGE_PICKUP]),
          [_constants.MASTER_DATA_INDEX.BRAND_EXPERIENCE]: (0, _lodash.upperFirst)(dataObj[_constants.MASTER_DATA_INDEX.BRAND_EXPERIENCE])
        }));
        setDisableFields({
          [_constants.MASTER_DATA_INDEX.MERCHANT_CODE]: true
        });
      } else {
        setFormData(_extends({}, dataObj));
        setDisableFields({
          [_constants.MASTER_DATA_INDEX.CODE]: true
        });
      }
    }
  }, [showModalDialogForm]);
  const isEmptyData = () => {
    let emptyCount = 0;
    const formElements = showModalDialogForm.form === _constants.LEFT_TABS.PARTY_MASTER_TABPANE ? _constants.PARTY_MASTER_FORM_ELEMENTS : _constants.PARCEL_SHOP_MASTER_FORM_ELEMENTS;
    formElements.forEach(_ref2 => {
      let {
        name,
        isRequired
      } = _ref2;
      if (!formData[name] && isRequired) {
        emptyCount++;
        setValidation(prev => _extends({}, prev, {
          [name]: 1
        }));
      }
    });
    return !emptyCount ? false : true;
  };
  const handleClickOk = () => {
    if (!isEmptyData(formData)) {
      setShowLoading(true);
      if (showModalDialogForm.form === _constants.LEFT_TABS.PARTY_MASTER_TABPANE) {
        onSavePartyMaster();
      } else if (showModalDialogForm.form === _constants.LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE) {
        onSaveParcelShopMaster();
      }
    }
  };
  const onSavePartyMaster = () => {
    (0, _MasterDataTabCardAction.savePartyMaster)(formData).then(response => {
      setShowLoading(false);
      if (response && response.status === 200) {
        var _response$data;
        if ((0, _lodash.toUpper)((_response$data = response.data) == null ? void 0 : _response$data.status) === _constants.STATUS.FAILED) {
          var _response$data2;
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, (0, _lodash.upperFirst)((_response$data2 = response.data) == null ? void 0 : _response$data2.message));
          setValidation(prev => {
            var _response$data3;
            return _extends({}, prev, {
              [_constants.MASTER_DATA_INDEX.ERROR_MSG]: (0, _lodash.upperFirst)((_response$data3 = response.data) == null ? void 0 : _response$data3.message)
            });
          });
        } else {
          var _response$data4;
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, (0, _lodash.upperFirst)((_response$data4 = response.data) == null ? void 0 : _response$data4.message));
          handleClickCancel();
        }
      } else if (response && response.response && response.response.data && response.response.data.message) {
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, response.response.data.message);
      }
    }).catch(error => {
      setShowLoading(false);
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error.message);
    });
  };
  const onSaveParcelShopMaster = () => {
    setShowLoading(true);
    (0, _MasterDataTabCardAction.saveParcelShopMaster)(formData).then(response => {
      setShowLoading(false);
      if (response && response.status === 200) {
        var _response$data5;
        if ((0, _lodash.toUpper)((_response$data5 = response.data) == null ? void 0 : _response$data5.status) === _constants.STATUS.FAILED) {
          var _response$data6;
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, (0, _lodash.upperFirst)((_response$data6 = response.data) == null ? void 0 : _response$data6.message));
          setValidation(prev => {
            var _response$data7;
            return _extends({}, prev, {
              [_constants.MASTER_DATA_INDEX.ERROR_MSG]: (0, _lodash.upperFirst)((_response$data7 = response.data) == null ? void 0 : _response$data7.message)
            });
          });
        } else {
          var _response$data8;
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, (0, _lodash.upperFirst)((_response$data8 = response.data) == null ? void 0 : _response$data8.message));
          handleClickCancel();
        }
      }
    }).catch(error => {
      setShowLoading(false);
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error.message);
    });
  };
  const handleClickCancel = () => {
    setShowLoading(false);
    setFormData({});
    setValidation({});
    setDisableFields({});
    otherProps.setShowModalDialogForm({
      visible: false,
      title: '',
      okText: ''
    });
  };
  const updateFieldValue = (e, name) => {
    setFormData(_extends({}, formData, {
      [name]: e.target.value
    }));
    validation[name] && delete validation[name];
    validation[_constants.MASTER_DATA_INDEX.ERROR_MSG] && delete validation[_constants.MASTER_DATA_INDEX.ERROR_MSG];
  };
  const getRowWithInputElementJsx = (label, name) => {
    return /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 9
    }, label), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: showModalDialogForm.form === _constants.LEFT_TABS.PARTY_MASTER_TABPANE ? 14 : 15
    }, /*#__PURE__*/_react.default.createElement(Item, {
      validateStatus: validation[name] ? 'error' : null,
      help: validation[name] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, (0, _lodash.toLower)(label)) : null
    }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
      name: name,
      value: formData[name],
      disabled: disableFields[name],
      placeholder: _constants.MASTER_DATA_STRING_CONSTANTS.PLACEHOLDER,
      onChange: e => updateFieldValue(e, name)
    }))));
  };
  const getRowWithSelectElementJsx = (label, name, options) => {
    return /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 9
    }, label), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: showModalDialogForm.form === _constants.LEFT_TABS.PARTY_MASTER_TABPANE ? 14 : 15
    }, /*#__PURE__*/_react.default.createElement(Item, {
      validateStatus: validation[name] ? 'error' : null,
      help: validation[name] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, (0, _lodash.toLower)(label)) : null
    }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
      onChange: value => {
        if (value) {
          setFormData(_extends({}, formData, {
            [name]: value
          }));
          validation[name] && delete validation[name];
        }
      },
      placeholder: containerConstants.formatString(containerConstants.SELECT),
      value: formData[name]
    }, options.map(option => /*#__PURE__*/_react.default.createElement(Option, {
      value: option
    }, option))))));
  };
  const getRowWithRadioElementJsx = (label, name) => {
    return /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 9
    }, label), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: showModalDialogForm.form === _constants.LEFT_TABS.PARTY_MASTER_TABPANE ? 14 : 15
    }, /*#__PURE__*/_react.default.createElement(Item, {
      validateStatus: validation[name] ? 'error' : null,
      help: validation[name] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, (0, _lodash.toLower)(label)) : null
    }, /*#__PURE__*/_react.default.createElement(_antd.Radio.Group, {
      className: "flex justify-space-btw",
      style: {
        width: '230px',
        fontWeight: 'normal'
      },
      options: _constants.PARTY_MASTER_BOOLEAN_OPTIONS_LIST,
      value: formData[name],
      onChange: e => {
        setFormData(_extends({}, formData, {
          [name]: e.target.value
        }));
        validation[name] && delete validation[name];
      }
    }))));
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    title: showModalDialogForm.title,
    className: "master-data-form-modal",
    centered: true,
    visible: showModalDialogForm.visible,
    onCancel: handleClickCancel,
    footer: [/*#__PURE__*/_react.default.createElement("span", {
      className: "ant-form-item-explain-error",
      style: {
        float: 'left'
      }
    }, validation[_constants.MASTER_DATA_INDEX.ERROR_MSG] && validation[_constants.MASTER_DATA_INDEX.ERROR_MSG]), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      key: "cancel",
      style: {
        color: '#727272',
        border: 0
      },
      onClick: handleClickCancel
    }, containerConstants.formatString(containerConstants.CANCEL)), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      loading: showLoading,
      key: "submit",
      type: "primary",
      style: {
        color: '#FFFFFF',
        opacity: !(0, _lodash.isEmpty)(validation) && '0.5'
      },
      onClick: handleClickOk
    }, showModalDialogForm.okText)]
  }, showModalDialogForm.form === _constants.LEFT_TABS.PARTY_MASTER_TABPANE && /*#__PURE__*/_react.default.createElement(_antd.Card, {
    bordered: false
  }, _constants.PARTY_MASTER_FORM_ELEMENTS.map((element, index) => {
    if (element.fieldType === _constants.MASTER_DATA_INDEX.FIELD_TYPE_SELECT) {
      return getRowWithSelectElementJsx(element.label, element.name, element.options);
    } else if (element.fieldType === _constants.MASTER_DATA_INDEX.FIELD_TYPE_RADIO) {
      return getRowWithRadioElementJsx(element.label, element.name);
    }
    return getRowWithInputElementJsx(element.label, element.name);
  })), showModalDialogForm.form === _constants.LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE && /*#__PURE__*/_react.default.createElement(_antd.Card, {
    bordered: false,
    id: "parcel-shop-master-form-card"
  }, _constants.PARCEL_SHOP_MASTER_FORM_ELEMENTS.map(element => getRowWithInputElementJsx(element.label, element.name)))));
};
var _default = exports.default = AddEditFormModal;
//# sourceMappingURL=AddEditFormModal.js.map