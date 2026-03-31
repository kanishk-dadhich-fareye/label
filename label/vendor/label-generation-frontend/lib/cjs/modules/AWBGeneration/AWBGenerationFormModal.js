"use strict";

exports.__esModule = true;
exports.default = void 0;
var _antd = require("antd");
var _react = _interopRequireWildcard(require("react"));
var _icons = require("@ant-design/icons");
var _ContainerConstants = require("../../utils/containerconstants/ContainerConstants");
var _AWBGenerationFormModalStyle = _interopRequireDefault(require("./AWBGenerationFormModalStyle.js"));
var _constants = require("../../utils/constants");
var _lodash = require("lodash");
var _AWBGenerationAction = require("../APIConfig/AWBGenerationAction");
var _notifyResponseMessage = require("../commoncomponent/NotificationComponent/notifyResponseMessage");
var _store = require("../hook-store/store");
const _excluded = ["showFormModalDialog", "showCustomizedFormModalDialog", "showDeleteModalDialog"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const {
  Option
} = _antd.Select;
const {
  Item
} = _antd.Form;
const AWBGenerationFormModal = _ref => {
  let {
      showFormModalDialog,
      showCustomizedFormModalDialog,
      showDeleteModalDialog
    } = _ref,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  const store = (0, _store.useStore)(true)[0];
  const DROPDOWN_TIMEOUT_OPTIONS = [5, 10, 15, 20, 25, 30];
  const DROPDOWN_RE_ATTEMPTS_OPTIONS = [1, 2, 3];
  const DROPDOWN_LEADING_ZERO = [true, false];
  const [formType, setFormType] = (0, _react.useState)(_constants.FORM_TYPES[0]);
  const [selectedForm, setSelectedForm] = (0, _react.useState)(null);
  const [formData, setFormData] = (0, _react.useState)({});
  const [validation, setValidation] = (0, _react.useState)({});
  const FORM_AND_CARD_ELEMENTS_CONST = {
    series: [{
      label: _constants.AWB_STRING_CONSTANTS.START_WITH,
      name: _constants.DATA_INDEX.START_WITH,
      spanSize: 4,
      dataType: _constants.FIELDS_DATA_TYPES.STRING,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.ENDS_WITH,
      name: _constants.DATA_INDEX.ENDS_WITH,
      spanSize: 4,
      dataType: _constants.FIELDS_DATA_TYPES.STRING,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.START_RANGE,
      name: _constants.DATA_INDEX.START_RANGE,
      spanSize: 5,
      dataType: _constants.FIELDS_DATA_TYPES.NUMBER,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_ZERO, _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_RANGE, _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_RUNNING_NUM],
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.END_RANGE,
      name: _constants.DATA_INDEX.END_RANGE,
      spanSize: 5,
      dataType: _constants.FIELDS_DATA_TYPES.NUMBER,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_ZERO, _constants.SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_RANGE],
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.RUNNING_NUMBER,
      name: _constants.DATA_INDEX.RUNNING_NUMBER,
      spanSize: 4,
      dataType: _constants.FIELDS_DATA_TYPES.NUMBER,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_ZERO, _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_RANGE, _constants.SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_RANGE],
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.IS_LEADING_ZERO_APPENDED,
      name: _constants.DATA_INDEX.IS_LEADING_ZERO_APPENDED,
      spanSize: 4,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_SELECT,
      options: DROPDOWN_LEADING_ZERO,
      spslChecks: [],
      editable: true
    }],
    checksum: [{
      label: _constants.AWB_STRING_CONSTANTS.LENGTH_OF_AWB,
      name: _constants.DATA_INDEX.LENGTH_OF_AWB,
      spanSize: 4,
      dataType: _constants.FIELDS_DATA_TYPES.NUMBER,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_ZERO],
      editable: store.fromFCR ? true : !store.showCustom
    }, {
      label: _constants.AWB_STRING_CONSTANTS.CHECK_DIGIT,
      name: _constants.DATA_INDEX.CHECK_DIGIT,
      spanSize: 4,
      dataType: _constants.FIELDS_DATA_TYPES.NUM,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_EQUALS_TO_ZERO],
      editable: store.fromFCR ? true : !store.showCustom
    }, {
      label: _constants.AWB_STRING_CONSTANTS.SNO_START_POSITION,
      name: _constants.DATA_INDEX.SNO_START_POSITION,
      spanSize: 5,
      dataType: _constants.FIELDS_DATA_TYPES.NUMBER,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_ZERO, _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_POSITION, _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_LENGTH_OF_SHIPMENT_NUM],
      editable: store.fromFCR ? true : !store.showCustom
    }, {
      label: _constants.AWB_STRING_CONSTANTS.SNO_END_POSITION,
      name: _constants.DATA_INDEX.SNO_END_POSITION,
      spanSize: 5,
      dataType: _constants.FIELDS_DATA_TYPES.NUMBER,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_ZERO, _constants.SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_POSITION, _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_LENGTH_OF_SHIPMENT_NUM],
      editable: store.fromFCR ? true : !store.showCustom
    }, {
      label: _constants.AWB_STRING_CONSTANTS.MOD_BY,
      name: _constants.DATA_INDEX.MOD_BY,
      spanSize: 4,
      dataType: _constants.FIELDS_DATA_TYPES.NUMBER,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_ZERO],
      editable: store.fromFCR ? true : !store.showCustom
    }],
    external_system: [{
      label: _constants.AWB_STRING_CONSTANTS.END_POINT,
      name: _constants.DATA_INDEX.END_POINT,
      spanSize: null,
      dataType: _constants.FIELDS_DATA_TYPES.STRING,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.TIMEOUT_SECONDS,
      name: _constants.DATA_INDEX.TIMEOUT_SECONDS,
      spanSize: null,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_SELECT,
      options: DROPDOWN_TIMEOUT_OPTIONS,
      editable: store.fromFCR ? true : !store.showCustom
    }, {
      label: _constants.AWB_STRING_CONSTANTS.NO_OF_RE_ATTEMPTS,
      name: _constants.DATA_INDEX.NO_OF_RE_ATTEMPTS,
      spanSize: null,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_SELECT,
      options: DROPDOWN_RE_ATTEMPTS_OPTIONS,
      editable: store.fromFCR ? true : !store.showCustom
    }],
    regex: [{
      label: _constants.AWB_STRING_CONSTANTS.STANDARD,
      name: _constants.DATA_INDEX.STANDARD,
      spanSize: null,
      dataType: _constants.FIELDS_DATA_TYPES.STRING,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      editable: store.fromFCR ? true : !store.showCustom
    }],
    partyCode: [{
      label: _constants.AWB_STRING_CONSTANTS.PARTY_CODE,
      name: _constants.DATA_INDEX.PARTY_CODE,
      editable: store.fromFCR ? true : !store.showCustom
    }],
    hybrid: [{
      label: _constants.AWB_STRING_CONSTANTS.START_WITH,
      name: _constants.DATA_INDEX.START_WITH_HYBRID,
      spanSize: 4,
      dataType: _constants.FIELDS_DATA_TYPES.STRING,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.ENDS_WITH,
      name: _constants.DATA_INDEX.ENDS_WITH_HYBRID,
      spanSize: 4,
      dataType: _constants.FIELDS_DATA_TYPES.STRING,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.START_RANGE,
      name: _constants.DATA_INDEX.START_RANGE_HYBRID,
      spanSize: 5,
      dataType: _constants.FIELDS_DATA_TYPES.NUMBER,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_ZERO, _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_RANGE, _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_RUNNING_NUM],
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.END_RANGE,
      name: _constants.DATA_INDEX.END_RANGE_HYBRID,
      spanSize: 5,
      dataType: _constants.FIELDS_DATA_TYPES.NUMBER,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_ZERO, _constants.SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_RANGE],
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.RUNNING_NUMBER,
      name: _constants.DATA_INDEX.RUNNING_NUMBER_HYBRID,
      spanSize: 4,
      dataType: _constants.FIELDS_DATA_TYPES.NUMBER,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_ZERO, _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_RANGE, _constants.SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_RANGE],
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.MOD_BY,
      name: _constants.DATA_INDEX.MOD_BY_HYBRID,
      spanSize: 4,
      dataType: _constants.FIELDS_DATA_TYPES.NUMBER,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_ZERO],
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.IS_LEADING_ZERO_APPENDED,
      name: _constants.DATA_INDEX.IS_LEADING_ZERO_APPENDED_HYBRID,
      spanSize: 4,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_SELECT,
      options: DROPDOWN_LEADING_ZERO,
      spslChecks: [],
      editable: true
    }],
    check_digit: [{
      label: _constants.AWB_STRING_CONSTANTS.START_WITH,
      name: _constants.DATA_INDEX.START_WITH_CHECK_DIGIT,
      spanSize: 4,
      dataType: _constants.FIELDS_DATA_TYPES.STRING,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.ENDS_WITH,
      name: _constants.DATA_INDEX.ENDS_WITH_CHECK_DIGIT,
      spanSize: 4,
      dataType: _constants.FIELDS_DATA_TYPES.STRING,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.START_RANGE,
      name: _constants.DATA_INDEX.START_RANGE_CHECK_DIGIT,
      spanSize: 5,
      dataType: _constants.FIELDS_DATA_TYPES.NUMBER,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_ZERO, _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_RANGE, _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_RUNNING_NUM],
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.END_RANGE,
      name: _constants.DATA_INDEX.END_RANGE_CHECK_DIGIT,
      spanSize: 5,
      dataType: _constants.FIELDS_DATA_TYPES.NUMBER,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_ZERO, _constants.SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_RANGE],
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.RUNNING_NUMBER,
      name: _constants.DATA_INDEX.RUNNING_NUMBER_CHECK_DIGIT,
      spanSize: 4,
      dataType: _constants.FIELDS_DATA_TYPES.NUMBER,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_ZERO, _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_RANGE, _constants.SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_RANGE],
      editable: !store.fromFCR
    }, {
      label: _constants.AWB_STRING_CONSTANTS.IS_LEADING_ZERO_APPENDED,
      name: _constants.DATA_INDEX.IS_LEADING_ZERO_APPENDED_CHECK_DIGIT,
      spanSize: 4,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_SELECT,
      options: DROPDOWN_LEADING_ZERO,
      spslChecks: [],
      editable: true
    }, {
      label: _constants.AWB_STRING_CONSTANTS.BASE,
      name: _constants.DATA_INDEX.BASE_CHECK_DIGIT,
      spanSize: 4,
      dataType: _constants.FIELDS_DATA_TYPES.NUMBER,
      fieldType: _constants.DATA_INDEX.FIELD_TYPE_INPUT,
      spslChecks: [_constants.SPSL_CHECKS.NOT_CONTAIN_DOT, _constants.SPSL_CHECKS.GREATER_THAN_ZERO],
      editable: !store.fromFCR
    }]
  };
  let emptyCount = 0;
  var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
  (0, _react.useEffect)(() => {
    if (showFormModalDialog.visible && (0, _lodash.isEqual)(showFormModalDialog.operation, _constants.OPERATIONS.EDIT)) {
      const subFormKeys = Object.values(_constants.AWB_FORM_AND_CARD_TYPES);
      if (selectedForm === null) {
        subFormKeys.forEach(cardType => {
          const cardTypeData = showFormModalDialog.data[cardType];
          if (!(0, _lodash.isEmpty)(cardTypeData)) {
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
    if (showCustomizedFormModalDialog.visible && (0, _lodash.isEqual)(showCustomizedFormModalDialog.operation, _constants.OPERATIONS.EDIT)) {
      const dataObj = showCustomizedFormModalDialog.data;
      dataObj[_constants.DATA_INDEX.TYPE] && setFormType(_constants.FORM_TYPES_OBJ[dataObj[_constants.DATA_INDEX.TYPE]]);
      dataObj[_constants.DATA_INDEX.SELECTED_FORM] && setSelectedForm(_constants.AWB_ENTITY_TYPE[dataObj[_constants.DATA_INDEX.SELECTED_FORM]]);
      setFormData(_extends({}, dataObj, {
        [_constants.DATA_INDEX.TYPE]: (0, _lodash.toUpper)(dataObj[_constants.DATA_INDEX.TYPE]),
        [_constants.DATA_INDEX.SELECTED_FORM]: (0, _lodash.toUpper)(dataObj[_constants.DATA_INDEX.SELECTED_FORM])
      }));
    }
  }, [showFormModalDialog, showCustomizedFormModalDialog]);
  const onSaveAWBDefaultDetails = () => {
    const subCardKeys = Object.values(_constants.AWB_FORM_AND_CARD_TYPES);
    const awbDefaultDetails = {};
    try {
      subCardKeys.forEach(subCardKey => {
        awbDefaultDetails[subCardKey] = {};
        FORM_AND_CARD_ELEMENTS_CONST[subCardKey].forEach(cardDetail => {
          if (formData[cardDetail.name]) {
            if (cardDetail.name === _constants.DATA_INDEX.MOD_BY && formData[cardDetail.name].length === 1 && formData[cardDetail.name] === '0') {
              throw [cardDetail.name, "Mod by cann't be Zero"];
            }
            if (cardDetail.dataType && cardDetail.dataType !== _constants.FIELDS_DATA_TYPES.NUMBER && cardDetail.dataType !== _constants.FIELDS_DATA_TYPES.NUM) {
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
      if ((0, _lodash.isEmpty)(prev)) {
        awbDefaultDetails['id'] = formData == null ? void 0 : formData.id;
        (0, _AWBGenerationAction.saveAWBDefaultDetails)(formData).then(response => {
          if (response && response.status === 200) {
            if (response.data.status === "Success") {
              (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, response.data.message);
              otherProps.reloadPage();
              handleClickCancel();
            } else {
              (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, response.data.message);
            }
          }
        }).catch(error => {
          handleClickCancel();
        });
      }
      return prev;
    });
  };
  const onAddAWBPartyConf = () => {
    isEmptyData(formData, selectedForm);
    if (emptyCount === 0) {
      (0, _AWBGenerationAction.saveAWBPartyConf)(_extends({}, formData)).then(response => {
        if (response && response.status === 200) {
          var _response$data;
          if ((0, _lodash.toUpper)((_response$data = response.data) == null ? void 0 : _response$data.status) === _constants.STATUS.FAILED) {
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, response.data.message);
            setValidation(prev => {
              var _response$data2;
              return _extends({}, prev, {
                [_constants.DATA_INDEX.ERROR_MSG]: (0, _lodash.upperFirst)((_response$data2 = response.data) == null ? void 0 : _response$data2.message)
              });
            });
          } else {
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, response.data.message);
            otherProps.reloadPage();
            handleClickCancel();
          }
        }
      }).catch(error => {});
    }
  };
  const openDefaultAWBForm = () => {
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
  const selectForm = value => {
    setSelectedForm(value);
    if (formType === _constants.FORM_TYPES[0]) {
      !(0, _lodash.isEmpty)(otherProps.awbDefaultData[value]) && setFormData(_extends({}, otherProps.awbDefaultData[value], {
        [_constants.DATA_INDEX.SELECTED_FORM]: (0, _lodash.toUpper)(value),
        [_constants.DATA_INDEX.TYPE]: (0, _lodash.upperCase)(formType),
        id: formData.id,
        [_constants.DATA_INDEX.PARTY_CODE]: formData[_constants.DATA_INDEX.PARTY_CODE]
      }));
    } else {
      setFormData({
        [_constants.DATA_INDEX.SELECTED_FORM]: (0, _lodash.toUpper)(value),
        [_constants.DATA_INDEX.TYPE]: (0, _lodash.upperCase)(formType),
        id: formData.id,
        [_constants.DATA_INDEX.PARTY_CODE]: formData[_constants.DATA_INDEX.PARTY_CODE]
      });
    }
  };
  const onDelete = () => {
    otherProps.deleteTableRow(showDeleteModalDialog.rowId);
    handleClickCancel();
  };
  const handleClickOk = () => {
    if ((0, _lodash.isEmpty)(validation)) {
      if (showFormModalDialog.visible && !(0, _lodash.isEmpty)(formData)) {
        onSaveAWBDefaultDetails();
      } else if (showCustomizedFormModalDialog.visible && selectedForm !== null) {
        onAddAWBPartyConf();
      } else if (showDeleteModalDialog.visible) {
        onDelete();
      }
    }
  };
  const getAllPartyMaster = () => {
    (0, _AWBGenerationAction.fetchAllPartyMaster)().then(response => {
      if (response && response.status === 200) {
        var _response$data3;
        const partyMasterList = (_response$data3 = response.data) == null ? void 0 : _response$data3.data;
        const merchantCodeList = partyMasterList.map(partyMaster => partyMaster.merchantCode);
        otherProps.setAWBPartyCodeList(merchantCodeList);
      }
    }).catch(error => {});
  };
  const handleClickCancel = () => {
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
  const validateFormData = (awbDefaultDetails, subCardKeys) => {
    subCardKeys.forEach(subCardKey => {
      !(0, _lodash.isEmpty)(awbDefaultDetails[subCardKey]) && isEmptyData(awbDefaultDetails[subCardKey], subCardKey);
    });
  };
  const isEmptyData = (dataObj, subCardKey) => {
    FORM_AND_CARD_ELEMENTS_CONST[subCardKey].forEach(cardDetail => {
      dataObj[cardDetail.name] = typeof dataObj[cardDetail.name] === 'string' ? dataObj[cardDetail.name].trim() : dataObj[cardDetail.name];
      if (!dataObj[cardDetail.name] && cardDetail.editable && cardDetail.name !== 'endWith' && cardDetail.name !== 'endWithCheckDigit' && cardDetail.name !== 'isLeadingZeroAppended' && cardDetail.name !== 'endWithHybrid' && cardDetail.name !== 'isLeadingZeroAppendedHybrid') {
        setValidation(prev => _extends({}, prev, {
          [cardDetail.name]: _constants.VALIDATION_TYPE.EMPTY
        }));
        emptyCount += 1;
      }
    });
    if (showCustomizedFormModalDialog.visible) {
      !dataObj[_constants.DATA_INDEX.PARTY_CODE] && setValidation(prev => _extends({}, prev, {
        [_constants.DATA_INDEX.PARTY_CODE]: _constants.VALIDATION_TYPE.EMPTY
      })) && (emptyCount += 1);
    }
  };
  let customValidationNameList = [_constants.DATA_INDEX.SNO_START_POSITION, _constants.DATA_INDEX.SNO_END_POSITION, _constants.DATA_INDEX.START_RANGE, _constants.DATA_INDEX.END_POINT, _constants.DATA_INDEX.END_RANGE, _constants.DATA_INDEX.RUNNING_NUMBER, _constants.DATA_INDEX.START_RANGE_HYBRID, _constants.DATA_INDEX.END_RANGE_HYBRID, _constants.DATA_INDEX.RUNNING_NUMBER_HYBRID];
  const runCustomValidationsOnFields = (value, name) => {
    if (name === _constants.DATA_INDEX.SNO_START_POSITION && parseInt(value) >= parseInt(formData[_constants.DATA_INDEX.LENGTH_OF_AWB])) {
      validation[name] !== _constants.VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: _constants.VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === _constants.DATA_INDEX.SNO_END_POSITION && (parseInt(value) < parseInt(formData[_constants.DATA_INDEX.SNO_START_POSITION]) || parseInt(value) > parseInt(formData[_constants.DATA_INDEX.LENGTH_OF_AWB]))) {
      validation[name] !== _constants.VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: _constants.VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === _constants.DATA_INDEX.START_RANGE && parseInt(value) > parseInt(formData[_constants.DATA_INDEX.END_RANGE])) {
      validation[name] !== _constants.VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: _constants.VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === _constants.DATA_INDEX.END_RANGE && parseInt(value) < parseInt(formData[_constants.DATA_INDEX.START_RANGE])) {
      validation[name] !== _constants.VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: _constants.VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === _constants.DATA_INDEX.RUNNING_NUMBER && (parseInt(value) < parseInt(formData[_constants.DATA_INDEX.START_RANGE]) || parseInt(value) > parseInt(formData[_constants.DATA_INDEX.END_RANGE]))) {
      validation[name] !== _constants.VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: _constants.VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === _constants.DATA_INDEX.START_RANGE_HYBRID && parseInt(value) > parseInt(formData[_constants.DATA_INDEX.END_RANGE_HYBRID])) {
      validation[name] !== _constants.VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: _constants.VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === _constants.DATA_INDEX.END_RANGE_HYBRID && parseInt(value) < parseInt(formData[_constants.DATA_INDEX.START_RANGE_HYBRID])) {
      validation[name] !== _constants.VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: _constants.VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === _constants.DATA_INDEX.RUNNING_NUMBER_HYBRID && (parseInt(value) < parseInt(formData[_constants.DATA_INDEX.START_RANGE_HYBRID]) || parseInt(value) > parseInt(formData[_constants.DATA_INDEX.END_RANGE_HYBRID]))) {
      validation[name] !== _constants.VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: _constants.VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (name === _constants.DATA_INDEX.END_POINT && !regex.test(value)) {
      validation[name] !== _constants.VALIDATION_TYPE.CUSTOM && setValidation(prev => _extends({}, prev, {
        [name]: _constants.VALIDATION_TYPE.CUSTOM
      }));
      emptyCount += 1;
    } else if (customValidationNameList.includes(name)) {
      validation[name] && validation[name] === _constants.VALIDATION_TYPE.CUSTOM && delete validation[name] && (emptyCount -= 1);
    }
  };
  const updateFieldValue = (value, name, dataType, spslChecks) => {
    if (dataType && value) {
      const parsed = parseInt(value);
      if (isNaN(parsed) && (dataType === _constants.FIELDS_DATA_TYPES.NUMBER || dataType === _constants.FIELDS_DATA_TYPES.NUM)) {
        validation[name] !== _constants.VALIDATION_TYPE.DATA_TYPE && setValidation(prev => _extends({}, prev, {
          [name]: _constants.VALIDATION_TYPE.DATA_TYPE
        }));
      } else {
        validation[name] && validation[name] === _constants.VALIDATION_TYPE.DATA_TYPE && delete validation[name];
      }
      if (spslChecks && Object.keys(spslChecks).length > 0) {
        try {
          for (let rule of spslChecks) {
            switch (rule) {
              case _constants.SPSL_CHECKS.NOT_CONTAIN_DOT:
                if (value.indexOf('.') > -1) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case _constants.SPSL_CHECKS.GREATER_THAN_ZERO:
                if (Number(value) < 1) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case _constants.SPSL_CHECKS.GREATER_THAN_EQUALS_TO_ZERO:
                if (Number(value) < 0) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_RANGE:
                if (formData[_constants.DATA_INDEX.END_RANGE] && Number(formData[_constants.DATA_INDEX.END_RANGE]) < Number(value)) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_RUNNING_NUM:
                if (formData[_constants.DATA_INDEX.RUNNING_NUMBER] && Number(formData[_constants.DATA_INDEX.RUNNING_NUMBER]) < Number(value)) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case _constants.SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_RANGE:
                if (formData[_constants.DATA_INDEX.START_RANGE] && Number(formData[_constants.DATA_INDEX.START_RANGE]) > Number(value)) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case _constants.SPSL_CHECKS.GREATER_THAN_EQUALS_TO_START_POSITION:
                if (formData[_constants.DATA_INDEX.SNO_START_POSITION] && Number(formData[_constants.DATA_INDEX.SNO_START_POSITION]) > Number(value)) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_END_POSITION:
                if (formData[_constants.DATA_INDEX.SNO_END_POSITION] && Number(formData[_constants.DATA_INDEX.SNO_END_POSITION]) < Number(value)) {
                  throw [name, 'Invalid Data'];
                }
                delete validation[name];
                break;
              case _constants.SPSL_CHECKS.LESS_THAN_EQUALS_TO_LENGTH_OF_SHIPMENT_NUM:
                if (formData[_constants.DATA_INDEX.LENGTH_OF_AWB] && Number(formData[_constants.DATA_INDEX.LENGTH_OF_AWB]) < Number(value)) {
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
    validation[name] && validation[name] === _constants.VALIDATION_TYPE.EMPTY && delete validation[name] && (emptyCount -= 1);
    validation[_constants.DATA_INDEX.ERROR_MSG] && delete validation[_constants.DATA_INDEX.ERROR_MSG];
  };
  const getRowToChooseEntityJsx = () => {
    return /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 10
    }, containerConstants.formatString(containerConstants.ENTITY)), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 14
    }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
      onChange: selectForm,
      style: {
        width: '-moz-available',
        borderRadius: '2px'
      },
      placeholder: containerConstants.formatString(containerConstants.SELECT),
      value: selectedForm
    }, _constants.DROPDOWN_VALUE_CONST.map(option => {
      return (!(0, _lodash.isEmpty)(otherProps.awbDefaultData[option.value]) || formType === _constants.FORM_TYPES[1]) && /*#__PURE__*/_react.default.createElement(Option, {
        value: option.value
      }, option.option);
    }))));
  };
  const getRowWithSelectElementJsx = (label, name, options, disabled, editable) => {
    return /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 10
    }, label), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 14
    }, /*#__PURE__*/_react.default.createElement(Item, {
      validateStatus: validation[name] ? 'error' : null,
      help: validation[name] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, (0, _lodash.toLower)(label)) : null
    }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
      onChange: value => updateFieldValue(value, name),
      placeholder: containerConstants.formatString(containerConstants.SELECT),
      value: formData[name] !== undefined ? formData[name].toString() : formData[name],
      disabled: !disabled && !editable ? false : true,
      onFocus: () => _constants.DATA_INDEX.PARTY_CODE === name && getAllPartyMaster(),
      filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      showSearch: true
    }, options.map(option => /*#__PURE__*/_react.default.createElement(Option, {
      value: option.toString()
    }, option.toString()))))));
  };
  const getRowWithInputElementJsx = (label, name, dataType, disabled, spslChecks, editable) => {
    return /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 10,
      style: {
        fontSize: 12
      }
    }, label), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 14
    }, /*#__PURE__*/_react.default.createElement(Item, {
      validateStatus: validation[name] ? 'error' : null,
      help: validation[name] ? containerConstants.formatString(validation[name] === _constants.VALIDATION_TYPE.EMPTY ? containerConstants.REQUIRED_VALIDATION_MSG : validation[name] === _constants.VALIDATION_TYPE.CUSTOM ? _constants.CUSTOM_VALIDATION_MSG_MAP[name] : containerConstants.INCORRECT_VALIDATION_MSG, (0, _lodash.toLower)(label)) : null
    }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
      maxlength: name === _constants.DATA_INDEX.CHECK_DIGIT && 1,
      type: dataType,
      name: name,
      value: formData[name],
      placeholder: _constants.AWB_STRING_CONSTANTS.PLACEHOLDER,
      disabled: disabled || editable,
      onChange: e => updateFieldValue(e.target.value, name, dataType, spslChecks)
    }))));
  };
  const getSubFormElementsJsx = subForm => {
    let disabled = formType === _constants.FORM_TYPES[0] && selectedForm !== null ? true : false;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, FORM_AND_CARD_ELEMENTS_CONST[subForm].map(data => {
      if (!data.fieldType || data.fieldType === _constants.DATA_INDEX.FIELD_TYPE_INPUT) {
        return getRowWithInputElementJsx(data.label, data.name, data.dataType, disabled, data.spslChecks, !data.editable);
      } else {
        return getRowWithSelectElementJsx(data.label, data.name, data.options, disabled, !data.editable);
      }
    }));
  };
  const getSubForm = subForm => {
    switch (subForm) {
      case _constants.AWB_FORM_AND_CARD_TYPES.SERIES:
        return getSubFormElementsJsx(subForm);
      case _constants.AWB_FORM_AND_CARD_TYPES.CHECKSUM:
        return getSubFormElementsJsx(subForm);
      case _constants.AWB_FORM_AND_CARD_TYPES.EXTERNAL_SYSTEM:
        return getSubFormElementsJsx(subForm);
      case _constants.AWB_FORM_AND_CARD_TYPES.REGEX:
        return getSubFormElementsJsx(subForm);
      case _constants.AWB_FORM_AND_CARD_TYPES.HYBRID:
        return getSubFormElementsJsx(subForm);
      case _constants.AWB_FORM_AND_CARD_TYPES.CHECK_DIGIT:
        return getSubFormElementsJsx(subForm);
      default:
        return null;
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_AWBGenerationFormModalStyle.default, null), /*#__PURE__*/_react.default.createElement(_antd.Modal, {
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
    footer: [/*#__PURE__*/_react.default.createElement("span", {
      className: "ant-form-item-explain-error",
      style: {
        float: 'left'
      }
    }, validation[_constants.DATA_INDEX.ERROR_MSG] && validation[_constants.DATA_INDEX.ERROR_MSG]), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      key: "cancel",
      style: {
        color: '#727272',
        border: 0,
        borderRadius: 2
      },
      onClick: handleClickCancel
    }, containerConstants.formatString(containerConstants.CANCEL)), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      key: "submit",
      type: "primary",
      style: {
        color: '#FFFFFF',
        disabled: showFormModalDialog.visible || showCustomizedFormModalDialog.visible ? !(0, _lodash.isEmpty)(validation) && true : (0, _lodash.isEmpty)(otherProps.awbDefaultData) && formType === _constants.FORM_TYPES[0] && !showDeleteModalDialog.visible && true
        // opacity: (showFormModalDialog.visible || showCustomizedFormModalDialog.visible) ?
        //     !isEmpty(validation) && '0.5' :
        //     ((isEmpty(otherProps.awbDefaultData) && formType === FORM_TYPES[0] && !showDeleteModalDialog.visible) && '0.5')
      },
      onClick: handleClickOk
    }, showFormModalDialog.okText || showCustomizedFormModalDialog.okText || showDeleteModalDialog.okText)]
  }, !showDeleteModalDialog.visible ? /*#__PURE__*/_react.default.createElement("div", null, !showCustomizedFormModalDialog.visible ? /*#__PURE__*/_react.default.createElement("div", {
    className: "form-element-container"
  }, _constants.SUB_FORM_CARD_CONST.map(cardData => /*#__PURE__*/_react.default.createElement(_antd.Card, {
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
  }, getSubForm(cardData.subCard)))) : /*#__PURE__*/_react.default.createElement(_antd.Card, {
    className: "fw500 fs12 lh18 border-none",
    bodyStyle: {
      color: '#727272',
      padding: '32px 0 0'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 10
  }, containerConstants.formatString(containerConstants.TYPE)), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 14
  }, /*#__PURE__*/_react.default.createElement(_antd.Radio.Group, {
    className: "flex justify-space-btw",
    style: {
      width: '230px',
      fontWeight: 'normal'
    },
    options: _constants.FORM_TYPES,
    value: formType,
    defaultValue: _constants.FORM_TYPES[0],
    onChange: e => {
      setFormType(e.target.value);
      setSelectedForm(null);
      setFormData({
        [_constants.DATA_INDEX.TYPE]: (0, _lodash.upperCase)(e.target.value),
        id: formData.id,
        [_constants.DATA_INDEX.PARTY_CODE]: formData[_constants.DATA_INDEX.PARTY_CODE]
      });
      setValidation({});
      emptyCount = 0;
    }
  }))), !(0, _lodash.isEmpty)(otherProps.awbDefaultData) || formType === _constants.FORM_TYPES[1] ? /*#__PURE__*/_react.default.createElement("div", null, getRowToChooseEntityJsx(), getSubForm(selectedForm), selectedForm !== null && FORM_AND_CARD_ELEMENTS_CONST[_constants.DATA_INDEX.PARTY_CODE].map(data => getRowWithSelectElementJsx(data.label, data.name, otherProps.awbPartyCodeList))) : /*#__PURE__*/_react.default.createElement(_antd.Row, {
    className: "default-awb-info fw500 fs12 lh18",
    justify: "space-between"
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 1,
    style: {
      padding: '2.5px 0 0 2px'
    }
  }, /*#__PURE__*/_react.default.createElement(_icons.InfoCircleFilled, {
    style: {
      fontSize: '20px',
      color: '#FDC500'
    }
  })), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 22,
    onClick: openDefaultAWBForm,
    className: "pointer"
  }, containerConstants.formatString(containerConstants.DEFAULT_AWB_INFO), /*#__PURE__*/_react.default.createElement("span", {
    className: "text-link ml5"
  }, containerConstants.formatString(containerConstants.ADD)))))) : /*#__PURE__*/_react.default.createElement("p", {
    className: "fs14 lh16 mt16"
  }, showDeleteModalDialog.description)));
};
var _default = exports.default = AWBGenerationFormModal;
//# sourceMappingURL=AWBGenerationFormModal.js.map