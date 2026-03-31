var _excluded = ["showFormModalDialog", "showCustomizedFormModalDialog", "showDeleteModalDialog"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import { Row, Col, Input, Modal, Card, Radio, Select, Form, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { InfoCircleFilled } from '@ant-design/icons';
import { containerConstantsService } from '../../utils/containerconstants/ContainerConstants';
import AwbGenerationFormModalStyle from './AWBGenerationFormModalStyle.js';
import { AWB_ENTITY_TYPE, SPSL_CHECKS, AWB_FORM_AND_CARD_TYPES, AWB_STRING_CONSTANTS, DROPDOWN_VALUE_CONST, FORM_TYPES, FORM_TYPES_OBJ, SUB_FORM_CARD_CONST, OPERATIONS, DATA_INDEX, STATUS, FIELDS_DATA_TYPES, VALIDATION_TYPE, CUSTOM_VALIDATION_MSG_MAP } from '../../utils/constants';
import { isEmpty, isEqual, toLower, toUpper, upperCase, upperFirst } from 'lodash';
import { saveAWBDefaultDetails, saveAWBPartyConf, fetchAllPartyMaster } from '../APIConfig/AWBGenerationAction';
import { notifyResponseMessage } from '../commoncomponent/NotificationComponent/notifyResponseMessage';
import { useStore } from '../hook-store/store';
var containerConstants = containerConstantsService.getInstance();
var {
  Option
} = Select;
var {
  Item
} = Form;
var AWBGenerationFormModal = _ref => {
  var {
      showFormModalDialog,
      showCustomizedFormModalDialog,
      showDeleteModalDialog
    } = _ref,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var store = useStore(true)[0];
  var DROPDOWN_TIMEOUT_OPTIONS = [5, 10, 15, 20, 25, 30];
  var DROPDOWN_RE_ATTEMPTS_OPTIONS = [1, 2, 3];
  var DROPDOWN_LEADING_ZERO = [true, false];
  var [formType, setFormType] = useState(FORM_TYPES[0]);
  var [selectedForm, setSelectedForm] = useState(null);
  var [formData, setFormData] = useState({});
  var [validation, setValidation] = useState({});
  var FORM_AND_CARD_ELEMENTS_CONST = {
    series: [{
      label: AWB_STRING_CONSTANTS.START_WITH,
      name: DATA_INDEX.START_WITH,
      spanSize: 4,
      dataType: FIELDS_DATA_TYPES.STRING,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.ENDS_WITH,
      name: DATA_INDEX.ENDS_WITH,
      spanSize: 4,
      dataType: FIELDS_DATA_TYPES.STRING,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.START_RANGE,
      name: DATA_INDEX.START_RANGE,
      spanSize: 5,
      dataType: FIELDS_DATA_TYPES.NUMBER,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_ZERO, SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_RANGE, SPSL_CHECKS.LESS_THAN_EQUALS_TO_RUNNING_NUM],
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.END_RANGE,
      name: DATA_INDEX.END_RANGE,
      spanSize: 5,
      dataType: FIELDS_DATA_TYPES.NUMBER,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_ZERO, SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_RANGE],
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.RUNNING_NUMBER,
      name: DATA_INDEX.RUNNING_NUMBER,
      spanSize: 4,
      dataType: FIELDS_DATA_TYPES.NUMBER,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_ZERO, SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_RANGE, SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_RANGE],
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.IS_LEADING_ZERO_APPENDED,
      name: DATA_INDEX.IS_LEADING_ZERO_APPENDED,
      spanSize: 4,
      fieldType: DATA_INDEX.FIELD_TYPE_SELECT,
      options: DROPDOWN_LEADING_ZERO,
      spslChecks: [],
      editable: true
    }],
    checksum: [{
      label: AWB_STRING_CONSTANTS.LENGTH_OF_AWB,
      name: DATA_INDEX.LENGTH_OF_AWB,
      spanSize: 4,
      dataType: FIELDS_DATA_TYPES.NUMBER,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_ZERO],
      editable: store.fromFCR ? true : !store.showCustom
    }, {
      label: AWB_STRING_CONSTANTS.CHECK_DIGIT,
      name: DATA_INDEX.CHECK_DIGIT,
      spanSize: 4,
      dataType: FIELDS_DATA_TYPES.NUM,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_EQUALS_TO_ZERO],
      editable: store.fromFCR ? true : !store.showCustom
    }, {
      label: AWB_STRING_CONSTANTS.SNO_START_POSITION,
      name: DATA_INDEX.SNO_START_POSITION,
      spanSize: 5,
      dataType: FIELDS_DATA_TYPES.NUMBER,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_ZERO, SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_POSITION, SPSL_CHECKS.LESS_THAN_EQUALS_TO_LENGTH_OF_SHIPMENT_NUM],
      editable: store.fromFCR ? true : !store.showCustom
    }, {
      label: AWB_STRING_CONSTANTS.SNO_END_POSITION,
      name: DATA_INDEX.SNO_END_POSITION,
      spanSize: 5,
      dataType: FIELDS_DATA_TYPES.NUMBER,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_ZERO, SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_POSITION, SPSL_CHECKS.LESS_THAN_EQUALS_TO_LENGTH_OF_SHIPMENT_NUM],
      editable: store.fromFCR ? true : !store.showCustom
    }, {
      label: AWB_STRING_CONSTANTS.MOD_BY,
      name: DATA_INDEX.MOD_BY,
      spanSize: 4,
      dataType: FIELDS_DATA_TYPES.NUMBER,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_ZERO],
      editable: store.fromFCR ? true : !store.showCustom
    }],
    external_system: [{
      label: AWB_STRING_CONSTANTS.END_POINT,
      name: DATA_INDEX.END_POINT,
      spanSize: null,
      dataType: FIELDS_DATA_TYPES.STRING,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.TIMEOUT_SECONDS,
      name: DATA_INDEX.TIMEOUT_SECONDS,
      spanSize: null,
      fieldType: DATA_INDEX.FIELD_TYPE_SELECT,
      options: DROPDOWN_TIMEOUT_OPTIONS,
      editable: store.fromFCR ? true : !store.showCustom
    }, {
      label: AWB_STRING_CONSTANTS.NO_OF_RE_ATTEMPTS,
      name: DATA_INDEX.NO_OF_RE_ATTEMPTS,
      spanSize: null,
      fieldType: DATA_INDEX.FIELD_TYPE_SELECT,
      options: DROPDOWN_RE_ATTEMPTS_OPTIONS,
      editable: store.fromFCR ? true : !store.showCustom
    }],
    regex: [{
      label: AWB_STRING_CONSTANTS.STANDARD,
      name: DATA_INDEX.STANDARD,
      spanSize: null,
      dataType: FIELDS_DATA_TYPES.STRING,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      editable: store.fromFCR ? true : !store.showCustom
    }],
    partyCode: [{
      label: AWB_STRING_CONSTANTS.PARTY_CODE,
      name: DATA_INDEX.PARTY_CODE,
      editable: store.fromFCR ? true : !store.showCustom
    }],
    hybrid: [{
      label: AWB_STRING_CONSTANTS.START_WITH,
      name: DATA_INDEX.START_WITH_HYBRID,
      spanSize: 4,
      dataType: FIELDS_DATA_TYPES.STRING,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.ENDS_WITH,
      name: DATA_INDEX.ENDS_WITH_HYBRID,
      spanSize: 4,
      dataType: FIELDS_DATA_TYPES.STRING,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.START_RANGE,
      name: DATA_INDEX.START_RANGE_HYBRID,
      spanSize: 5,
      dataType: FIELDS_DATA_TYPES.NUMBER,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_ZERO, SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_RANGE, SPSL_CHECKS.LESS_THAN_EQUALS_TO_RUNNING_NUM],
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.END_RANGE,
      name: DATA_INDEX.END_RANGE_HYBRID,
      spanSize: 5,
      dataType: FIELDS_DATA_TYPES.NUMBER,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_ZERO, SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_RANGE],
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.RUNNING_NUMBER,
      name: DATA_INDEX.RUNNING_NUMBER_HYBRID,
      spanSize: 4,
      dataType: FIELDS_DATA_TYPES.NUMBER,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_ZERO, SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_RANGE, SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_RANGE],
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.MOD_BY,
      name: DATA_INDEX.MOD_BY_HYBRID,
      spanSize: 4,
      dataType: FIELDS_DATA_TYPES.NUMBER,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_ZERO],
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.IS_LEADING_ZERO_APPENDED,
      name: DATA_INDEX.IS_LEADING_ZERO_APPENDED_HYBRID,
      spanSize: 4,
      fieldType: DATA_INDEX.FIELD_TYPE_SELECT,
      options: DROPDOWN_LEADING_ZERO,
      spslChecks: [],
      editable: true
    }],
    check_digit: [{
      label: AWB_STRING_CONSTANTS.START_WITH,
      name: DATA_INDEX.START_WITH_CHECK_DIGIT,
      spanSize: 4,
      dataType: FIELDS_DATA_TYPES.STRING,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.ENDS_WITH,
      name: DATA_INDEX.ENDS_WITH_CHECK_DIGIT,
      spanSize: 4,
      dataType: FIELDS_DATA_TYPES.STRING,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.START_RANGE,
      name: DATA_INDEX.START_RANGE_CHECK_DIGIT,
      spanSize: 5,
      dataType: FIELDS_DATA_TYPES.NUMBER,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_ZERO, SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_RANGE, SPSL_CHECKS.LESS_THAN_EQUALS_TO_RUNNING_NUM],
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.END_RANGE,
      name: DATA_INDEX.END_RANGE_CHECK_DIGIT,
      spanSize: 5,
      dataType: FIELDS_DATA_TYPES.NUMBER,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_ZERO, SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_RANGE],
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.RUNNING_NUMBER,
      name: DATA_INDEX.RUNNING_NUMBER_CHECK_DIGIT,
      spanSize: 4,
      dataType: FIELDS_DATA_TYPES.NUMBER,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_ZERO, SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_RANGE, SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_RANGE],
      editable: !store.fromFCR
    }, {
      label: AWB_STRING_CONSTANTS.IS_LEADING_ZERO_APPENDED,
      name: DATA_INDEX.IS_LEADING_ZERO_APPENDED_CHECK_DIGIT,
      spanSize: 4,
      fieldType: DATA_INDEX.FIELD_TYPE_SELECT,
      options: DROPDOWN_LEADING_ZERO,
      spslChecks: [],
      editable: true
    }, {
      label: AWB_STRING_CONSTANTS.BASE,
      name: DATA_INDEX.BASE_CHECK_DIGIT,
      spanSize: 4,
      dataType: FIELDS_DATA_TYPES.NUMBER,
      fieldType: DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [SPSL_CHECKS.NOT_CONTAIN_DOT, SPSL_CHECKS.GREATER_THAN_ZERO],
      editable: !store.fromFCR
    }]
  };
  var emptyCount = 0;
  var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
  useEffect(() => {
    if (showFormModalDialog.visible && isEqual(showFormModalDialog.operation, OPERATIONS.EDIT)) {
      var subFormKeys = Object.values(AWB_FORM_AND_CARD_TYPES);
      if (selectedForm === null) {
        subFormKeys.forEach(cardType => {
          var cardTypeData = showFormModalDialog.data[cardType];
          if (!isEmpty(cardTypeData)) {
            setFormData(prevFormData => _extends({}, prevFormData, cardTypeData));
          }
        });
        setFormData(prevFormData => {
          var _showFormModalDialog$;
          return _extends({}, prevFormData, {
            id: (_showFormModalDialog$ = showFormModalDialog.data) == null ? void 0 : _showFormModalDialog$.id
          });
        });
      } else {
        setFormData(_extends({}, formData, showFormModalDialog.data));
      }
    }
    if (showCustomizedFormModalDialog.visible && isEqual(showCustomizedFormModalDialog.operation, OPERATIONS.EDIT)) {
      var dataObj = showCustomizedFormModalDialog.data;
      dataObj[DATA_INDEX.TYPE] && setFormType(FORM_TYPES_OBJ[dataObj[DATA_INDEX.TYPE]]);
      dataObj[DATA_INDEX.SELECTED_FORM] && setSelectedForm(AWB_ENTITY_TYPE[dataObj[DATA_INDEX.SELECTED_FORM]]);
      setFormData(_extends({}, dataObj, {
        [DATA_INDEX.TYPE]: toUpper(dataObj[DATA_INDEX.TYPE]),
        [DATA_INDEX.SELECTED_FORM]: toUpper(dataObj[DATA_INDEX.SELECTED_FORM])
      }));
    }
  }, [showFormModalDialog, showCustomizedFormModalDialog]);
  var onSaveAWBDefaultDetails = () => {
    var subCardKeys = Object.values(AWB_FORM_AND_CARD_TYPES);
    var awbDefaultDetails = {};
    try {
      subCardKeys.forEach(subCardKey => {
        awbDefaultDetails[subCardKey] = {};
        FORM_AND_CARD_ELEMENTS_CONST[subCardKey].forEach(cardDetail => {
          if (formData[cardDetail.name]) {
            if (cardDetail.name === DATA_INDEX.MOD_BY && formData[cardDetail.name].length === 1 && formData[cardDetail.name] === '0') {
              throw [cardDetail.name, "Mod by cann't be Zero"];
            }
            if (cardDetail.dataType && cardDetail.dataType !== FIELDS_DATA_TYPES.NUMBER && cardDetail.dataType !== FIELDS_DATA_TYPES.NUM) {
              formData[cardDetail.name] = formData[cardDetail.name].trim();
            }
            awbDefaultDetails[subCardKey][cardDetail.name] = formData[cardDetail.name];
          }
        });
      });
    } catch (error) {
      setValidation(prev => _extends({}, prev, {
        [error[0]]: error[1]
      }));
      emptyCount += 1;
      return;
    }
    validateFormData(awbDefaultDetails, subCardKeys);
    setValidation(prev => {
      if (isEmpty(prev)) {
        awbDefaultDetails['id'] = formData == null ? void 0 : formData.id;
        saveAWBDefaultDetails(formData).then(response => {
          if (response && response.status === 200) {
            if (response.data.status === "Success") {
              notifyResponseMessage(STATUS.SUCCESS, response.data.message);
              otherProps.reloadPage();
              handleClickCancel();
            } else {
              notifyResponseMessage(STATUS.ERROR, response.data.message);
            }
          }
        }).catch(error => {
          handleClickCancel();
        });
      }
      return prev;
    });
  };
  var onAddAWBPartyConf = () => {
    isEmptyData(formData, selectedForm);
    if (emptyCount === 0) {
      saveAWBPartyConf(_extends({}, formData)).then(response => {
        if (response && response.status === 200) {
          var _response$data;
          if (toUpper((_response$data = response.data) == null ? void 0 : _response$data.status) === STATUS.FAILED) {
            notifyResponseMessage(STATUS.ERROR, response.data.message);
            setValidation(prev => {
              var _response$data2;
              return _extends({}, prev, {
                [DATA_INDEX.ERROR_MSG]: upperFirst((_response$data2 = response.data) == null ? void 0 : _response$data2.message)
              });
            });
          } else {
            notifyResponseMessage(STATUS.SUCCESS, response.data.message);
            otherProps.reloadPage();
            handleClickCancel();
          }
        }
      }).catch(error => {});
    }
  };
  var openDefaultAWBForm = () => {
    otherProps.setShowCustomizedFormModalDialog({
      visible: false,
      okText: '',
      title: ''
    });
    otherProps.setShowFormModalDialog({
      visible: true,
      okText: containerConstants.formatString(containerConstants.ADD),
      title: containerConstants.formatString(containerConstants.ADD_DEFAULT_AWB)
    });
  };
  var selectForm = value => {
    setSelectedForm(value);
    if (formType === FORM_TYPES[0]) {
      !isEmpty(otherProps.awbDefaultData[value]) && setFormData(_extends({}, otherProps.awbDefaultData[value], {
        [DATA_INDEX.SELECTED_FORM]: toUpper(value),
        [DATA_INDEX.TYPE]: upperCase(formType),
        id: formData.id,
        [DATA_INDEX.PARTY_CODE]: formData[DATA_INDEX.PARTY_CODE]
      }));
    } else {
      setFormData({
        [DATA_INDEX.SELECTED_FORM]: toUpper(value),
        [DATA_INDEX.TYPE]: upperCase(formType),
        id: formData.id,
        [DATA_INDEX.PARTY_CODE]: formData[DATA_INDEX.PARTY_CODE]
      });
    }
  };
  var onDelete = () => {
    otherProps.deleteTableRow(showDeleteModalDialog.rowId);
    handleClickCancel();
  };
  var handleClickOk = () => {
    if (isEmpty(validation)) {
      if (showFormModalDialog.visible && !isEmpty(formData)) {
        onSaveAWBDefaultDetails();
      } else if (showCustomizedFormModalDialog.visible && selectedForm !== null) {
        onAddAWBPartyConf();
      } else if (showDeleteModalDialog.visible) {
        onDelete();
      }
    }
  };
  var getAllPartyMaster = () => {
    fetchAllPartyMaster().then(response => {
      if (response && response.status === 200) {
        var _response$data3;
        var partyMasterList = (_response$data3 = response.data) == null ? void 0 : _response$data3.data;
        var merchantCodeList = partyMasterList.map(partyMaster => partyMaster.merchantCode);
        otherProps.setAWBPartyCodeList(merchantCodeList);
      }
    }).catch(error => {});
  };
  var handleClickCancel = () => {
    emptyCount = 0;
    setValidation({});
    setSelectedForm(null);
    setFormData({});
    otherProps.setShowFormModalDialog({
      visible: false,
      okText: '',
      title: ''
    });
    otherProps.setShowCustomizedFormModalDialog({
      visible: false,
      okText: '',
      title: ''
    });
    otherProps.setShowDeleteModalDialog({
      visible: false,
      okText: '',
      title: ''
    });
  };
  var validateFormData = (awbDefaultDetails, subCardKeys) => {
    subCardKeys.forEach(subCardKey => {
      !isEmpty(awbDefaultDetails[subCardKey]) && isEmptyData(awbDefaultDetails[subCardKey], subCardKey);
    });
  };
  var isEmptyData = (dataObj, subCardKey) => {
    FORM_AND_CARD_ELEMENTS_CONST[subCardKey].forEach(cardDetail => {
      dataObj[cardDetail.name] = typeof dataObj[cardDetail.name] === 'string' ? dataObj[cardDetail.name].trim() : dataObj[cardDetail.name];
      if (!dataObj[cardDetail.name] && cardDetail.editable && cardDetail.name !== 'endWith' && cardDetail.name !== 'endWithCheckDigit' && cardDetail.name !== 'isLeadingZeroAppended' && cardDetail.name !== 'endWithHybrid' && cardDetail.name !== 'isLeadingZeroAppendedHybrid') {
        setValidation(prev => _extends({}, prev, {
          [cardDetail.name]: VALIDATION_TYPE.EMPTY
        }));
        emptyCount += 1;
      }
    });
    if (showCustomizedFormModalDialog.visible) {
      !dataObj[DATA_INDEX.PARTY_CODE] && setValidation(prev => _extends({}, prev, {
        [DATA_INDEX.PARTY_CODE]: VALIDATION_TYPE.EMPTY
      })) && (emptyCount += 1);
    }
  };
  var customValidationNameList = [DATA_INDEX.SNO_START_POSITION, DATA_INDEX.SNO_END_POSITION, DATA_INDEX.START_RANGE, DATA_INDEX.END_POINT, DATA_INDEX.END_RANGE, DATA_INDEX.RUNNING_NUMBER, DATA_INDEX.START_RANGE_HYBRID, DATA_INDEX.END_RANGE_HYBRID, DATA_INDEX.RUNNING_NUMBER_HYBRID];
  var runCustomValidationsOnFields = (value, name) => {
    if (name === DATA_INDEX.SNO_START_POSITION && parseInt(value) >= parseInt(formData[DATA_INDEX.LENGTH_OF_AWB])) {
      validation[name] !== VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === DATA_INDEX.SNO_END_POSITION && (parseInt(value) < parseInt(formData[DATA_INDEX.SNO_START_POSITION]) || parseInt(value) > parseInt(formData[DATA_INDEX.LENGTH_OF_AWB]))) {
      validation[name] !== VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === DATA_INDEX.START_RANGE && parseInt(value) > parseInt(formData[DATA_INDEX.END_RANGE])) {
      validation[name] !== VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === DATA_INDEX.END_RANGE && parseInt(value) < parseInt(formData[DATA_INDEX.START_RANGE])) {
      validation[name] !== VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === DATA_INDEX.RUNNING_NUMBER && (parseInt(value) < parseInt(formData[DATA_INDEX.START_RANGE]) || parseInt(value) > parseInt(formData[DATA_INDEX.END_RANGE]))) {
      validation[name] !== VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === DATA_INDEX.START_RANGE_HYBRID && parseInt(value) > parseInt(formData[DATA_INDEX.END_RANGE_HYBRID])) {
      validation[name] !== VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === DATA_INDEX.END_RANGE_HYBRID && parseInt(value) < parseInt(formData[DATA_INDEX.START_RANGE_HYBRID])) {
      validation[name] !== VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === DATA_INDEX.RUNNING_NUMBER_HYBRID && (parseInt(value) < parseInt(formData[DATA_INDEX.START_RANGE_HYBRID]) || parseInt(value) > parseInt(formData[DATA_INDEX.END_RANGE_HYBRID]))) {
      validation[name] !== VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === DATA_INDEX.END_POINT && !regex.test(value)) {
      validation[name] !== VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (customValidationNameList.includes(name)) {
      validation[name] && validation[name] === VALIDATION_TYPE.CUSTOM && delete validation[name] && (emptyCount -= 1);
    }
  };
  var updateFieldValue = (value, name, dataType, spslChecks) => {
    if (dataType && value) {
      var parsed = parseInt(value);
      if (isNaN(parsed) && (dataType === FIELDS_DATA_TYPES.NUMBER || dataType === FIELDS_DATA_TYPES.NUM)) {
        validation[name] !== VALIDATION_TYPE.DATA_TYPE && setValidation(prev => _extends({}, prev, {
          [name]: VALIDATION_TYPE.DATA_TYPE
        }));
      } else {
        validation[name] && validation[name] === VALIDATION_TYPE.DATA_TYPE && delete validation[name];
      }
      if (spslChecks && Object.keys(spslChecks).length > 0) {
        try {
          for (var rule of spslChecks) {
            switch (rule) {
              case SPSL_CHECKS.NOT_CONTAIN_DOT:
                if (value.indexOf('.') > -1) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case SPSL_CHECKS.GREATER_THAN_ZERO:
                if (Number(value) < 1) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case SPSL_CHECKS.GREATER_THAN_EQUALS_TO_ZERO:
                if (Number(value) < 0) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_RANGE:
                if (formData[DATA_INDEX.END_RANGE] && Number(formData[DATA_INDEX.END_RANGE]) < Number(value)) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case SPSL_CHECKS.LESS_THAN_EQUALS_TO_RUNNING_NUM:
                if (formData[DATA_INDEX.RUNNING_NUMBER] && Number(formData[DATA_INDEX.RUNNING_NUMBER]) < Number(value)) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_RANGE:
                if (formData[DATA_INDEX.START_RANGE] && Number(formData[DATA_INDEX.START_RANGE]) > Number(value)) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_POSITION:
                if (formData[DATA_INDEX.SNO_START_POSITION] && Number(formData[DATA_INDEX.SNO_START_POSITION]) > Number(value)) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_POSITION:
                if (formData[DATA_INDEX.SNO_END_POSITION] && Number(formData[DATA_INDEX.SNO_END_POSITION]) < Number(value)) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case SPSL_CHECKS.LESS_THAN_EQUALS_TO_LENGTH_OF_SHIPMENT_NUM:
                if (formData[DATA_INDEX.LENGTH_OF_AWB] && Number(formData[DATA_INDEX.LENGTH_OF_AWB]) < Number(value)) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              default:
                throw [name, ''];
            }
          }
        } catch (error) {
          setValidation(prev => _extends({}, prev, {
            [error[0]]: error[1]
          }));
          emptyCount += 1;
        }
      }
    }
    runCustomValidationsOnFields(value, name);
    setFormData(_extends({}, formData, {
      [name]: value
    }));
    validation[name] && validation[name] === VALIDATION_TYPE.EMPTY && delete validation[name] && (emptyCount -= 1);
    validation[DATA_INDEX.ERROR_MSG] && delete validation[DATA_INDEX.ERROR_MSG];
  };
  var getRowToChooseEntityJsx = () => {
    return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      span: 10
    }, containerConstants.formatString(containerConstants.ENTITY)), /*#__PURE__*/React.createElement(Col, {
      span: 14
    }, /*#__PURE__*/React.createElement(Select, {
      onChange: selectForm,
      style: {
        width: '-moz-available',
        borderRadius: '2px'
      },
      placeholder: containerConstants.formatString(containerConstants.SELECT),
      value: selectedForm
    }, DROPDOWN_VALUE_CONST.map(option => {
      return (!isEmpty(otherProps.awbDefaultData[option.value]) || formType === FORM_TYPES[1]) && /*#__PURE__*/React.createElement(Option, {
        value: option.value
      }, option.option);
    }))));
  };
  var getRowWithSelectElementJsx = (label, name, options, disabled, editable) => {
    return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      span: 10
    }, label), /*#__PURE__*/React.createElement(Col, {
      span: 14
    }, /*#__PURE__*/React.createElement(Item, {
      validateStatus: validation[name] ? 'error' : null,
      help: validation[name] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, toLower(label)) : null
    }, /*#__PURE__*/React.createElement(Select, {
      onChange: value => updateFieldValue(value, name),
      placeholder: containerConstants.formatString(containerConstants.SELECT),
      value: formData[name] !== undefined ? formData[name].toString() : formData[name],
      disabled: !disabled && !editable ? false : true,
      onFocus: () => DATA_INDEX.PARTY_CODE === name && getAllPartyMaster(),
      filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      showSearch: true
    }, options.map(option => /*#__PURE__*/React.createElement(Option, {
      value: option.toString()
    }, option.toString()))))));
  };
  var getRowWithInputElementJsx = (label, name, dataType, disabled, spslChecks, editable) => {
    return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      span: 10,
      style: {
        fontSize: 12
      }
    }, label), /*#__PURE__*/React.createElement(Col, {
      span: 14
    }, /*#__PURE__*/React.createElement(Item, {
      validateStatus: validation[name] ? 'error' : null,
      help: validation[name] ? containerConstants.formatString(validation[name] === VALIDATION_TYPE.EMPTY ? containerConstants.REQUIRED_VALIDATION_MSG : validation[name] === VALIDATION_TYPE.CUSTOM ? CUSTOM_VALIDATION_MSG_MAP[name] : containerConstants.INCORRECT_VALIDATION_MSG, toLower(label)) : null
    }, /*#__PURE__*/React.createElement(Input, {
      maxlength: name === DATA_INDEX.CHECK_DIGIT && 1,
      type: dataType,
      name: name,
      value: formData[name],
      placeholder: AWB_STRING_CONSTANTS.PLACEHOLDER,
      disabled: disabled || editable,
      onChange: e => updateFieldValue(e.target.value, name, dataType, spslChecks)
    }))));
  };
  var getSubFormElementsJsx = subForm => {
    var disabled = formType === FORM_TYPES[0] && selectedForm !== null ? true : false;
    return /*#__PURE__*/React.createElement(React.Fragment, null, FORM_AND_CARD_ELEMENTS_CONST[subForm].map(data => {
      if (!data.fieldType || data.fieldType === DATA_INDEX.FIELD_TYPE_INPUT) {
        return getRowWithInputElementJsx(data.label, data.name, data.dataType, disabled, data.spslChecks, !data.editable);
      } else {
        return getRowWithSelectElementJsx(data.label, data.name, data.options, disabled, !data.editable);
      }
    }));
  };
  var getSubForm = subForm => {
    switch (subForm) {
      case AWB_FORM_AND_CARD_TYPES.SERIES:
        return getSubFormElementsJsx(subForm);
      case AWB_FORM_AND_CARD_TYPES.CHECKSUM:
        return getSubFormElementsJsx(subForm);
      case AWB_FORM_AND_CARD_TYPES.EXTERNAL_SYSTEM:
        return getSubFormElementsJsx(subForm);
      case AWB_FORM_AND_CARD_TYPES.REGEX:
        return getSubFormElementsJsx(subForm);
      case AWB_FORM_AND_CARD_TYPES.HYBRID:
        return getSubFormElementsJsx(subForm);
      case AWB_FORM_AND_CARD_TYPES.CHECK_DIGIT:
        return getSubFormElementsJsx(subForm);
      default:
        return null;
    }
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AwbGenerationFormModalStyle, null), /*#__PURE__*/React.createElement(Modal, {
    title: showFormModalDialog.title || showCustomizedFormModalDialog.title || showDeleteModalDialog.title,
    open: showFormModalDialog.visible || showCustomizedFormModalDialog.visible || showDeleteModalDialog.visible,
    centered: true,
    maskClosable: "true",
    closable: !showDeleteModalDialog.visible,
    className: "awb-gen-form-modal",
    bodyStyle: {
      padding: '0'
    },
    width: (showFormModalDialog.visible || showCustomizedFormModalDialog.visible) && '50%' || showDeleteModalDialog.visible && '32%',
    onCancel: handleClickCancel,
    footer: [/*#__PURE__*/React.createElement("span", {
      className: "ant-form-item-explain-error",
      style: {
        float: 'left'
      }
    }, validation[DATA_INDEX.ERROR_MSG] && validation[DATA_INDEX.ERROR_MSG]), /*#__PURE__*/React.createElement(Button, {
      key: "cancel",
      style: {
        color: '#727272',
        border: 0,
        borderRadius: 2
      },
      onClick: handleClickCancel
    }, containerConstants.formatString(containerConstants.CANCEL)), /*#__PURE__*/React.createElement(Button, {
      key: "submit",
      type: "primary",
      style: {
        color: '#FFFFFF',
        disabled: showFormModalDialog.visible || showCustomizedFormModalDialog.visible ? !isEmpty(validation) && true : isEmpty(otherProps.awbDefaultData) && formType === FORM_TYPES[0] && !showDeleteModalDialog.visible && true
        // opacity: (showFormModalDialog.visible || showCustomizedFormModalDialog.visible) ?
        //     !isEmpty(validation) && '0.5' :
        //     ((isEmpty(otherProps.awbDefaultData) && formType === FORM_TYPES[0] && !showDeleteModalDialog.visible) && '0.5')
      },
      onClick: handleClickOk
    }, showFormModalDialog.okText || showCustomizedFormModalDialog.okText || showDeleteModalDialog.okText)]
  }, !showDeleteModalDialog.visible ? /*#__PURE__*/React.createElement("div", null, !showCustomizedFormModalDialog.visible ? /*#__PURE__*/React.createElement("div", {
    className: "form-element-container"
  }, SUB_FORM_CARD_CONST.map(cardData => /*#__PURE__*/React.createElement(Card, {
    className: "fw500 fs12 lh18 border-none",
    headStyle: {
      padding: '0',
      minHeight: 'auto',
      borderBottom: '1px solid #DADADA'
    },
    bodyStyle: {
      color: '#727272'
    },
    title: cardData.title
  }, getSubForm(cardData.subCard)))) : /*#__PURE__*/React.createElement(Card, {
    className: "fw500 fs12 lh18 border-none",
    bodyStyle: {
      color: '#727272',
      padding: '32px 0 0'
    }
  }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    span: 10
  }, containerConstants.formatString(containerConstants.TYPE)), /*#__PURE__*/React.createElement(Col, {
    span: 14
  }, /*#__PURE__*/React.createElement(Radio.Group, {
    className: "flex justify-space-btw",
    style: {
      width: '230px',
      fontWeight: 'normal'
    },
    options: FORM_TYPES,
    value: formType,
    defaultValue: FORM_TYPES[0],
    onChange: e => {
      setFormType(e.target.value);
      setSelectedForm(null);
      setFormData({
        [DATA_INDEX.TYPE]: upperCase(e.target.value),
        id: formData.id,
        [DATA_INDEX.PARTY_CODE]: formData[DATA_INDEX.PARTY_CODE]
      });
      setValidation({});
      emptyCount = 0;
    }
  }))), !isEmpty(otherProps.awbDefaultData) || formType === FORM_TYPES[1] ? /*#__PURE__*/React.createElement("div", null, getRowToChooseEntityJsx(), getSubForm(selectedForm), selectedForm !== null && FORM_AND_CARD_ELEMENTS_CONST[DATA_INDEX.PARTY_CODE].map(data => getRowWithSelectElementJsx(data.label, data.name, otherProps.awbPartyCodeList))) : /*#__PURE__*/React.createElement(Row, {
    className: "default-awb-info fw500 fs12 lh18",
    justify: "space-between"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 1,
    style: {
      padding: '2.5px 0 0 2px'
    }
  }, /*#__PURE__*/React.createElement(InfoCircleFilled, {
    style: {
      fontSize: '20px',
      color: '#FDC500'
    }
  })), /*#__PURE__*/React.createElement(Col, {
    span: 22,
    onClick: openDefaultAWBForm,
    className: "pointer"
  }, containerConstants.formatString(containerConstants.DEFAULT_AWB_INFO), /*#__PURE__*/React.createElement("span", {
    className: "text-link ml5"
  }, containerConstants.formatString(containerConstants.ADD)))))) : /*#__PURE__*/React.createElement("p", {
    className: "fs14 lh16 mt16"
  }, showDeleteModalDialog.description)));
};
export default AWBGenerationFormModal;
//# sourceMappingURL=AWBGenerationFormModal.js.map