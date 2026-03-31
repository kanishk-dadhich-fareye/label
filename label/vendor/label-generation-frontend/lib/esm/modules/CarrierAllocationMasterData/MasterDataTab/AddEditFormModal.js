var _excluded = ["showModalDialogForm"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Input, Select, Card, Form, Button, Radio } from 'antd';
import '../../../CSS/AddEditFormModalStyle.css';
import { containerConstantsService } from '../../../utils/containerconstants/ContainerConstants';
import { OPERATION, PARCEL_SHOP_MASTER_FORM_ELEMENTS, PARTY_MASTER_FORM_ELEMENTS, MASTER_DATA_INDEX, MASTER_DATA_STRING_CONSTANTS, PARTY_MASTER_TYPE, STATUS, LEFT_TABS, PARTY_MASTER_BOOLEAN_OPTIONS_LIST } from '../../../utils/constants';
import { isEqual, toUpper, upperFirst, toLower, isEmpty } from 'lodash';
import { savePartyMaster, saveParcelShopMaster } from './hooks/APIConfig/MasterDataTabCardAction';
import { notifyResponseMessage } from '../../commoncomponent/NotificationComponent/notifyResponseMessage';
var containerConstants = containerConstantsService.getInstance();
var {
  Item
} = Form;
var {
  Option
} = Select;
var AddEditFormModal = _ref => {
  var {
      showModalDialogForm
    } = _ref,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var [showLoading, setShowLoading] = useState(false);
  var [formData, setFormData] = useState({});
  var [validation, setValidation] = useState({});
  var [disableFields, setDisableFields] = useState({});
  useEffect(() => {
    if (showModalDialogForm.visible && isEqual(showModalDialogForm.operation, OPERATION.EDIT)) {
      var dataObj = showModalDialogForm.data;
      if (showModalDialogForm.form === LEFT_TABS.PARTY_MASTER_TABPANE) {
        setFormData(_extends({}, dataObj, {
          [MASTER_DATA_INDEX.ACCEPT_OVERAGE_PICKUP]: upperFirst(dataObj[MASTER_DATA_INDEX.ACCEPT_OVERAGE_PICKUP]),
          [MASTER_DATA_INDEX.BRAND_EXPERIENCE]: upperFirst(dataObj[MASTER_DATA_INDEX.BRAND_EXPERIENCE])
        }));
        setDisableFields({
          [MASTER_DATA_INDEX.MERCHANT_CODE]: true
        });
      } else {
        setFormData(_extends({}, dataObj));
        setDisableFields({
          [MASTER_DATA_INDEX.CODE]: true
        });
      }
    }
  }, [showModalDialogForm]);
  var isEmptyData = () => {
    var emptyCount = 0;
    var formElements = showModalDialogForm.form === LEFT_TABS.PARTY_MASTER_TABPANE ? PARTY_MASTER_FORM_ELEMENTS : PARCEL_SHOP_MASTER_FORM_ELEMENTS;
    formElements.forEach(_ref2 => {
      var {
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
  var handleClickOk = () => {
    if (!isEmptyData(formData)) {
      setShowLoading(true);
      if (showModalDialogForm.form === LEFT_TABS.PARTY_MASTER_TABPANE) {
        onSavePartyMaster();
      } else if (showModalDialogForm.form === LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE) {
        onSaveParcelShopMaster();
      }
    }
  };
  var onSavePartyMaster = () => {
    savePartyMaster(formData).then(response => {
      setShowLoading(false);
      if (response && response.status === 200) {
        var _response$data;
        if (toUpper((_response$data = response.data) == null ? void 0 : _response$data.status) === STATUS.FAILED) {
          var _response$data2;
          notifyResponseMessage(STATUS.ERROR, upperFirst((_response$data2 = response.data) == null ? void 0 : _response$data2.message));
          setValidation(prev => {
            var _response$data3;
            return _extends({}, prev, {
              [MASTER_DATA_INDEX.ERROR_MSG]: upperFirst((_response$data3 = response.data) == null ? void 0 : _response$data3.message)
            });
          });
        } else {
          var _response$data4;
          notifyResponseMessage(STATUS.SUCCESS, upperFirst((_response$data4 = response.data) == null ? void 0 : _response$data4.message));
          handleClickCancel();
        }
      } else if (response && response.response && response.response.data && response.response.data.message) {
        notifyResponseMessage(STATUS.ERROR, response.response.data.message);
      }
    }).catch(error => {
      setShowLoading(false);
      notifyResponseMessage(STATUS.ERROR, error.message);
    });
  };
  var onSaveParcelShopMaster = () => {
    setShowLoading(true);
    saveParcelShopMaster(formData).then(response => {
      setShowLoading(false);
      if (response && response.status === 200) {
        var _response$data5;
        if (toUpper((_response$data5 = response.data) == null ? void 0 : _response$data5.status) === STATUS.FAILED) {
          var _response$data6;
          notifyResponseMessage(STATUS.ERROR, upperFirst((_response$data6 = response.data) == null ? void 0 : _response$data6.message));
          setValidation(prev => {
            var _response$data7;
            return _extends({}, prev, {
              [MASTER_DATA_INDEX.ERROR_MSG]: upperFirst((_response$data7 = response.data) == null ? void 0 : _response$data7.message)
            });
          });
        } else {
          var _response$data8;
          notifyResponseMessage(STATUS.SUCCESS, upperFirst((_response$data8 = response.data) == null ? void 0 : _response$data8.message));
          handleClickCancel();
        }
      }
    }).catch(error => {
      setShowLoading(false);
      notifyResponseMessage(STATUS.ERROR, error.message);
    });
  };
  var handleClickCancel = () => {
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
  var updateFieldValue = (e, name) => {
    setFormData(_extends({}, formData, {
      [name]: e.target.value
    }));
    validation[name] && delete validation[name];
    validation[MASTER_DATA_INDEX.ERROR_MSG] && delete validation[MASTER_DATA_INDEX.ERROR_MSG];
  };
  var getRowWithInputElementJsx = (label, name) => {
    return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      span: 9
    }, label), /*#__PURE__*/React.createElement(Col, {
      span: showModalDialogForm.form === LEFT_TABS.PARTY_MASTER_TABPANE ? 14 : 15
    }, /*#__PURE__*/React.createElement(Item, {
      validateStatus: validation[name] ? 'error' : null,
      help: validation[name] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, toLower(label)) : null
    }, /*#__PURE__*/React.createElement(Input, {
      name: name,
      value: formData[name],
      disabled: disableFields[name],
      placeholder: MASTER_DATA_STRING_CONSTANTS.PLACEHOLDER,
      onChange: e => updateFieldValue(e, name)
    }))));
  };
  var getRowWithSelectElementJsx = (label, name, options) => {
    return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      span: 9
    }, label), /*#__PURE__*/React.createElement(Col, {
      span: showModalDialogForm.form === LEFT_TABS.PARTY_MASTER_TABPANE ? 14 : 15
    }, /*#__PURE__*/React.createElement(Item, {
      validateStatus: validation[name] ? 'error' : null,
      help: validation[name] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, toLower(label)) : null
    }, /*#__PURE__*/React.createElement(Select, {
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
    }, options.map(option => /*#__PURE__*/React.createElement(Option, {
      value: option
    }, option))))));
  };
  var getRowWithRadioElementJsx = (label, name) => {
    return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      span: 9
    }, label), /*#__PURE__*/React.createElement(Col, {
      span: showModalDialogForm.form === LEFT_TABS.PARTY_MASTER_TABPANE ? 14 : 15
    }, /*#__PURE__*/React.createElement(Item, {
      validateStatus: validation[name] ? 'error' : null,
      help: validation[name] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, toLower(label)) : null
    }, /*#__PURE__*/React.createElement(Radio.Group, {
      className: "flex justify-space-btw",
      style: {
        width: '230px',
        fontWeight: 'normal'
      },
      options: PARTY_MASTER_BOOLEAN_OPTIONS_LIST,
      value: formData[name],
      onChange: e => {
        setFormData(_extends({}, formData, {
          [name]: e.target.value
        }));
        validation[name] && delete validation[name];
      }
    }))));
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Modal, {
    title: showModalDialogForm.title,
    className: "master-data-form-modal",
    centered: true,
    visible: showModalDialogForm.visible,
    onCancel: handleClickCancel,
    footer: [/*#__PURE__*/React.createElement("span", {
      className: "ant-form-item-explain-error",
      style: {
        float: 'left'
      }
    }, validation[MASTER_DATA_INDEX.ERROR_MSG] && validation[MASTER_DATA_INDEX.ERROR_MSG]), /*#__PURE__*/React.createElement(Button, {
      key: "cancel",
      style: {
        color: '#727272',
        border: 0
      },
      onClick: handleClickCancel
    }, containerConstants.formatString(containerConstants.CANCEL)), /*#__PURE__*/React.createElement(Button, {
      loading: showLoading,
      key: "submit",
      type: "primary",
      style: {
        color: '#FFFFFF',
        opacity: !isEmpty(validation) && '0.5'
      },
      onClick: handleClickOk
    }, showModalDialogForm.okText)]
  }, showModalDialogForm.form === LEFT_TABS.PARTY_MASTER_TABPANE && /*#__PURE__*/React.createElement(Card, {
    bordered: false
  }, PARTY_MASTER_FORM_ELEMENTS.map((element, index) => {
    if (element.fieldType === MASTER_DATA_INDEX.FIELD_TYPE_SELECT) {
      return getRowWithSelectElementJsx(element.label, element.name, element.options);
    } else if (element.fieldType === MASTER_DATA_INDEX.FIELD_TYPE_RADIO) {
      return getRowWithRadioElementJsx(element.label, element.name);
    }
    return getRowWithInputElementJsx(element.label, element.name);
  })), showModalDialogForm.form === LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE && /*#__PURE__*/React.createElement(Card, {
    bordered: false,
    id: "parcel-shop-master-form-card"
  }, PARCEL_SHOP_MASTER_FORM_ELEMENTS.map(element => getRowWithInputElementJsx(element.label, element.name)))));
};
export default AddEditFormModal;
//# sourceMappingURL=AddEditFormModal.js.map