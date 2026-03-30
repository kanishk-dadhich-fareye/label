"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
require("../../../CSS/modal_dialog.css");
var _deleteButton = _interopRequireDefault(require("../../../images/deleteButton.svg"));
var _edit = _interopRequireDefault(require("../../../images/edit.svg"));
var _ContainerConstants = require("../../../utils/containerconstants/ContainerConstants");
var _constants = require("../../../utils/constants");
var _icons = require("@ant-design/icons");
var _notifyResponseMessage = require("../../commoncomponent/NotificationComponent/notifyResponseMessage");
var _DataValidationAction = require("../../APIConfig/DataValidationAction");
var _store = require("../../hook-store/store");
const _excluded = ["activeTab", "rules", "operationType", "editData"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const ModalDialog = _ref => {
  let {
      activeTab,
      operationType,
      editData
    } = _ref,
    otherprops = _objectWithoutPropertiesLoose(_ref, _excluded);
  const store = (0, _store.useStore)(true)[0];
  const [dataChanged, setDataChanged] = (0, _react.useState)(false);
  const [operationTypeState, setOperationTypeState] = (0, _react.useState)(operationType);
  const [rulesData, setRulesData] = (0, _react.useState)([[{}]]);
  const [rulesOptions, setRulesOptions] = (0, _react.useState)([]);
  const [rulesOptionsMap, setRulesOptionsMap] = (0, _react.useState)({});
  const [rulesIdOptionsMap, setRulesIdOptionsMap] = (0, _react.useState)({});
  const [anyUpdation, setAnyUpdation] = (0, _react.useState)(false);
  const [validationruleFormData, setValidationRulesFormData] = (0, _react.useState)({
    'ruleName': '',
    'condition': '',
    'rightValue': '',
    'id': ''
  });
  (0, _react.useEffect)(() => {
    // Fetch data once when component mounts & then after tab switch.
    if (activeTab === _constants.DATA_VALIDATION.FIELDS) {
      fetchInitDataForFields();
    }
  }, [activeTab]);
  (0, _react.useEffect)(() => {
    if (editData !== undefined && editData !== null && Object.keys(editData).length > 0) {
      if (activeTab === _constants.DATA_VALIDATION.FIELDS) {
        //setRulesData(editData);
        // Object.keys(rulesIdOptionsMap).length === 0 && fetchInitDataForFields();
        Object.keys(rulesIdOptionsMap).length > 0 && convertToRules(editData.validations);
      } else if (activeTab === _constants.DATA_VALIDATION.VALIDATION_RULES) {
        setValidationRulesFormData({
          'ruleName': editData.ruleName,
          'condition': editData.condition,
          'rightValue': editData.rightValue,
          'id': editData.id
        });
      }
    }
  }, [editData, rulesIdOptionsMap, activeTab]);
  const fetchInitDataForFields = () => {
    (0, _DataValidationAction.fetchValidationRule)().then(response => {
      if (response.status === 200 && response.data && response.data.status === 'Success') {
        var _response$data;
        let operatorIdMap = {};
        Object.keys(_constants.OPERATOR).forEach((k, i) => {
          operatorIdMap[_constants.OPERATOR[k]] = containerConstants.formatString(containerConstants[k]);
        });
        let validationRules = (_response$data = response.data) == null ? void 0 : _response$data.data['validationsRulesDto'];
        let validationRulesOptions = [{
          label: containerConstants.formatString(containerConstants.SELECT),
          value: ''
        }];
        let validationRulesOptionsMap = {};
        let validationRulesIdOptionsMap = {};
        validationRules !== undefined && validationRules !== null && validationRules.length > 0 && validationRules.forEach(item => {
          item.condition = operatorIdMap[item.condition];
          validationRulesOptions.push({
            label: item.ruleName,
            value: item.ruleName
          });
          validationRulesOptionsMap[item.ruleName] = item;
          validationRulesIdOptionsMap[item.ruleKey] = item;
        });
        setRulesOptions(validationRulesOptions);
        setRulesOptionsMap(validationRulesOptionsMap);
        setRulesIdOptionsMap(validationRulesIdOptionsMap);
      }
    }).catch(error => {});
  };
  const convertToRules = validations => {
    if (validations === undefined || validations === null) {
      return;
    }
    let rules = [...rulesData];
    var temp = '';
    var index = -1;
    var innerIndex = 0;
    var rule;
    for (var i = 0; i < validations.length; i++) {
      switch (validations.charAt(i)) {
        case '&':
          if (i + 1 < validations.length && validations.charAt(i + 1) === '&') {
            if (temp.length > 0) {
              index++;
              rules[index] = [];
              rule = rulesIdOptionsMap[temp];
              rules[index][innerIndex++] = rule.ruleName;
            }
            i++;
          } else {
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, 'Invalid Rule');
            throw '';
          }
          temp = '';
          break;
        case '|':
          if (i + 1 < validations.length && validations.charAt(i + 1) === '|') {
            if (temp.length > 0) {
              index++;
              innerIndex = 0;
              rules[index] = [];
              rule = rulesIdOptionsMap[temp];
              rules[index][innerIndex] = rule.ruleName;
            }
            i++;
          } else {
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, 'Invalid Rule');
            throw '';
          }
          temp = '';
          break;
        case '(':
          if (temp.length > 0) {
            rule = rulesIdOptionsMap[temp];
            rules[index][innerIndex++] = rule.ruleName;
          }
          temp = '';
          break;
        case ')':
          if (temp.length > 0) {
            rule = rulesIdOptionsMap[temp];
            rules[index][innerIndex++] = rule.ruleName;
          }
          temp = '';
          break;
        default:
          temp += validations.charAt(i);
          break;
      }
    }
    if (temp.length > 0) {
      rule = rulesIdOptionsMap[temp];
      index++;
      innerIndex = 0;
      rules[index] = [];
      rules[index][innerIndex] = rule.ruleName;
    }
    setRulesData(rules);
  };
  const addANDValidationRowHandler = index => {
    let rule = [...rulesData];
    rule[index].push({});
    setRulesData(rule);
    setAnyUpdation(true);
    setDataChanged(!dataChanged);
  };
  const removeANDValidationRowHandler = (index, innerIndex) => {
    let rule = [...rulesData];
    setAnyUpdation(true);
    if (index === 0 && rule.length === 1 && rule[index] !== undefined && rule[index].length === 1) {
      rule[index] = [{}];
      setRulesData(rule);
      setDataChanged(!dataChanged);
      // setSavebuttonEnabled(true);
      //notifyResponseMessage(STATUS.ERROR,'can not remove only row');
      return;
    }
    if (innerIndex === 0 && rule[index].length === 1) {
      rule.splice(index, 1);
    } else {
      rule[index].splice(innerIndex, 1);
    }
    setRulesData(rule);
    setDataChanged(!dataChanged);
  };
  const updateFormFieldValueHandler = (value, key, index, innerIndex) => {
    setAnyUpdation(true);
    // setSavebuttonEnabled(true);
    let rule = [...rulesData];
    rule[index][innerIndex] = value;
    setRulesData(rule);
    setDataChanged(!dataChanged);
  };
  const updateValidationFormValueHandler = (value, key, event) => {
    // setSavebuttonEnabled(true);
    setAnyUpdation(true);
    if (key === 'rightValue' && !isNumberKeyOnly(event)) {
      return;
    }
    let rule = _extends({}, validationruleFormData);
    rule[key] = value;
    if (key === 'condition') {
      rule['rightValue'] = '';
    }
    setValidationRulesFormData(rule);
    setDataChanged(!dataChanged);
  };
  const isNumberKeyOnly = event => {
    if (validationruleFormData['condition'] === _constants.OPERATOR.LESS_THAN || validationruleFormData['condition'] === _constants.OPERATOR.GREATER_THAN || validationruleFormData['condition'] === _constants.OPERATOR.GREATER_THAN_EQUALS || validationruleFormData['condition'] === _constants.OPERATOR.LESS_THAN_EQUALS) {
      if (isNaN(event.target.value)) {
        const lst = String(event.target.value).slice(-1);
        if (lst === "-" || lst === ":" || !isNaN(lst)) {
          return true;
        }
        event.preventDefault();
        return false;
      }
    }
    return true;
  };
  const addORValidationHandler = () => {
    let rule = [...rulesData];
    rule.push([{}]);
    setRulesData(rule);
    setAnyUpdation(true);
    setDataChanged(!dataChanged);
  };
  const getRuleFormula = () => {
    let finalFormula = '';
    rulesData.map(function (item, index) {
      let c = '';
      item.map(function (innerItem, innerIndex) {
        if (innerItem !== undefined && innerItem !== '' && Object.keys(innerItem).length > 0) {
          c = c + ' ' + innerItem + ' &&';
        }
      });
      if (c.length > 3) {
        c = c.substring(1, c.length - 3);
        if (c.indexOf('&&') > -1) {
          finalFormula = finalFormula + ' (' + c + ') ||';
        } else {
          finalFormula = finalFormula + ' ' + c + ' ||';
        }
      }
    });
    if (finalFormula.length > 3) {
      finalFormula = finalFormula.substring(0, finalFormula.length - 3);
    }
    return finalFormula;
  };
  const getRuleFormulaToSave = () => {
    let finalFormula = '';
    rulesData.map(function (item, index) {
      let c = '';
      item.map(function (innerItem, innerIndex) {
        if (innerItem !== undefined && innerItem !== '' && Object.keys(innerItem).length > 0 && rulesOptionsMap[innerItem]) {
          c = c + rulesOptionsMap[innerItem].ruleKey + '&&';
        }
      });
      if (c.length > 2) {
        c = c.substring(0, c.length - 2);
        if (c.indexOf('&&') > -1) {
          finalFormula = finalFormula + '(' + c + ')||';
        } else {
          finalFormula = finalFormula + c + '||';
        }
      }
    });
    if (finalFormula.length > 2) {
      finalFormula = finalFormula.substring(0, finalFormula.length - 2);
    }
    return finalFormula;
  };
  const calculateRulesCount = () => {
    let count = 0;
    rulesData.map(function (item, index) {
      item.map(function (innerItem, innerIndex) {
        if (innerItem !== undefined && innerItem !== '' && Object.keys(innerItem).length > 0) {
          count++;
        }
      });
    });
    return count;
  };
  const getDivider = type => {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        flexDirection: 'row',
        display: 'flex',
        margin: '16px 0px'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: '50%',
        borderTop: '1px solid #DADADA',
        transform: 'translateY(50%)'
      }
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs9 ls12",
      style: {
        background: '#E5F6FF',
        width: '30px',
        border: '1px solid #BAE6FF',
        boxSizing: 'border-box',
        borderRadius: '30px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }
    }, type), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: '50%',
        borderTop: '1px solid #DADADA',
        transform: 'translateY(50%)'
      }
    }));
  };
  const getRulesOptions = (innerIndex, index) => {
    const rulesDataSet = new Set();
    let finalRulesOptions = [];
    rulesData[index].map(function (item, index1) {
      rulesDataSet.add(item);
    });
    for (let rule of rulesOptions) {
      if (!rulesDataSet.has(rule.value)) {
        finalRulesOptions.push(rule);
      }
    }
    ;
    return finalRulesOptions;
  };
  const displayFieldDataform = (type, data, index, innerIndex) => {
    return /*#__PURE__*/_react.default.createElement("div", {
      id: index
    }, innerIndex > 0 && getDivider(_constants.LOGICAL_OPERATOR.AND), /*#__PURE__*/_react.default.createElement(_antd.Row, {
      style: {
        flexDirection: 'row',
        display: 'flex'
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      style: {
        width: operationTypeState !== _constants.OPERATIONS.SHOW ? '30%' : '32%',
        marginRight: '2%',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs12 ls18 ",
      style: {
        color: '#727272',
        marginBottom: '2px'
      }
    }, containerConstants.formatString(containerConstants.RULE_NAME)), /*#__PURE__*/_react.default.createElement(_antd.Select, {
      value: Object.keys(rulesData[index][innerIndex]).length > 0 ? rulesData[index][innerIndex] : null,
      showSearch: false,
      size: "default",
      style: {
        width: '100%'
      },
      onChange: event => updateFormFieldValueHandler(event, 'ruleName', index, innerIndex),
      placeholder: containerConstants.formatString(containerConstants.SELECT),
      options: getRulesOptions(innerIndex, index),
      disabled: operationTypeState === _constants.OPERATIONS.SHOW
    })), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      style: {
        width: operationTypeState !== _constants.OPERATIONS.SHOW ? '30%' : '32%',
        marginRight: operationTypeState !== _constants.OPERATIONS.SHOW ? '3%' : '2%',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs12 ls18 ",
      style: {
        color: '#727272',
        marginBottom: '2px'
      }
    }, containerConstants.formatString(containerConstants.OPERATOR)), /*#__PURE__*/_react.default.createElement(_antd.Input, {
      disabled: true,
      className: "font-family-weight-normal fs14 ls22 input-box-style",
      style: {
        background: '#F3F3F3'
      },
      value: rulesOptionsMap[rulesData[index][innerIndex]] !== undefined ? rulesOptionsMap[rulesData[index][innerIndex]].condition : ''
    })), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      style: {
        width: operationTypeState !== _constants.OPERATIONS.SHOW ? '30%' : '32%',
        marginRight: operationTypeState !== _constants.OPERATIONS.SHOW ? '2%' : '0px',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs12 ls18 ",
      style: {
        color: '#727272',
        marginBottom: '2px'
      }
    }, containerConstants.formatString(containerConstants.RIGHT_VALUE)), /*#__PURE__*/_react.default.createElement(_antd.Input, {
      disabled: true,
      className: "font-family-weight-normal fs14 ls22 input-box-style",
      style: {
        background: '#F3F3F3'
      },
      value: rulesOptionsMap[rulesData[index][innerIndex]] !== undefined ? rulesOptionsMap[rulesData[index][innerIndex]].rightValue : ''
    })), operationTypeState !== _constants.OPERATIONS.SHOW && /*#__PURE__*/_react.default.createElement(_antd.Col, {
      style: {
        width: '3%'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs12 ls18 ",
      style: {
        color: '#727272',
        marginBottom: '2px',
        visibility: 'hidden'
      }
    }, "."), /*#__PURE__*/_react.default.createElement("img", {
      src: _deleteButton.default,
      alt: "Imgage not found",
      onClick: () => removeANDValidationRowHandler(index, innerIndex),
      style: {
        cursor: 'pointer'
      }
    }))));
  };
  const isRightInputDisabled = () => {
    if (validationruleFormData['condition'] === _constants.OPERATOR.REQUIRED || validationruleFormData['condition'] === _constants.OPERATOR.NOT_NULL) {
      validationruleFormData['rightValue'] = '';
      return true;
    }
    return false;
  };
  const calculateEmptyRulesCountExceptExceptionalCase = () => {
    let emptycount = 0;
    let ruleCount = 0;
    let indexVal = -1;
    rulesData.map(function (item, index) {
      item.map(function (innerItem, innerIndex) {
        if (innerItem === undefined || innerItem === '' || Object.keys(innerItem).length === 0) {
          emptycount++;
          indexVal = index + "_" + innerIndex;
        } else {
          ruleCount++;
        }
      });
    });
    if (emptycount === 1 && ruleCount === 0) {
      let v = indexVal.split('_');
      return v[0] === '0' && v[1] === '0' ? 0 : 1;
    }
    if (ruleCount > 0 && emptycount > 0) {
      return 1;
    }
    return emptycount;
  };
  const isAddButtonDisabled = () => {
    if (anyUpdation && activeTab === _constants.DATA_VALIDATION.FIELDS) {
      return calculateEmptyRulesCountExceptExceptionalCase() > 0;
    } else if (anyUpdation && activeTab === _constants.DATA_VALIDATION.VALIDATION_RULES) {
      return validationruleFormData['ruleName'] === '' || validationruleFormData['condition'] === '' || validationruleFormData['ruleName'].trim() === '' || validationruleFormData['condition'] !== _constants.OPERATOR.REQUIRED && validationruleFormData['condition'] !== _constants.OPERATOR.NOT_NULL && (validationruleFormData['rightValue'] === '' || validationruleFormData['rightValue'].trim() === '');
    }
    return true;
  };
  const displayValidationDataForm = () => {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
      style: {
        flexDirection: 'row',
        display: 'flex'
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      style: {
        width: '32%',
        marginRight: '2%',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs12 ls18 ",
      style: {
        color: '#727272',
        marginBottom: '2px'
      }
    }, containerConstants.formatString(containerConstants.RULE_NAME)), /*#__PURE__*/_react.default.createElement(_antd.Input, {
      placeholder: containerConstants.formatString(containerConstants.PLACEHOLDER),
      className: "input-box-style",
      value: validationruleFormData['ruleName'],
      onChange: event => updateValidationFormValueHandler(event.target.value, 'ruleName'),
      onBlur: event => updateValidationFormValueHandler(event.target.value, 'ruleName')
    })), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      style: {
        width: '32%',
        marginRight: '2%',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs12 ls18 ",
      style: {
        color: '#727272',
        marginBottom: '2px'
      }
    }, containerConstants.formatString(containerConstants.OPERATOR)), /*#__PURE__*/_react.default.createElement(_antd.Select, {
      value: validationruleFormData['condition'],
      onChange: event => updateValidationFormValueHandler(event, 'condition'),
      size: "default",
      style: {
        height: '30px',
        width: '100%',
        background: '#FFFFFF',
        border: '1px solid #C9C9C9',
        boxSizing: 'border-box',
        borderRadius: '2px'
      },
      options: _constants.OPERATOR_CONSTANT
    })), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      style: {
        width: '31%',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs12 ls18 ",
      style: {
        color: '#727272',
        marginBottom: '2px'
      }
    }, containerConstants.formatString(containerConstants.RIGHT_VALUE)), /*#__PURE__*/_react.default.createElement(_antd.Input, {
      placeholder: containerConstants.formatString(containerConstants.PLACEHOLDER),
      className: "input-box-style",
      value: validationruleFormData['rightValue'],
      onChange: event => updateValidationFormValueHandler(event.target.value, 'rightValue', event),
      onBlur: event => updateValidationFormValueHandler(event.target.value, 'rightValue', event),
      disabled: isRightInputDisabled()
    }))));
  };
  const displayAddAnotherConditionButton = () => {
    return /*#__PURE__*/_react.default.createElement(_antd.Button, {
      style: {
        border: '1px solid',
        boxSizing: 'border-box',
        borderRadius: '2px',
        alignItems: 'center',
        display: 'flex',
        marginTop: '13px'
      },
      type: "primary",
      onClick: () => addORValidationHandler(),
      ghost: true
    }, /*#__PURE__*/_react.default.createElement(_icons.PlusOutlined, {
      size: "9px",
      style: {
        marginRight: '7px'
      }
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 ls22"
    }, containerConstants.formatString(containerConstants.ADD_ANOTHER_CONDITION)));
  };
  const displayFormula = () => {
    return /*#__PURE__*/_react.default.createElement(_antd.Input, {
      className: "rule-output-box font-family-weight-500 fs14 ls22 ",
      value: containerConstants.formatString(containerConstants.FORMULA) + getRuleFormula()
    });
  };
  const editRule = () => {
    setOperationTypeState(_constants.OPERATIONS.EDIT);
  };
  return /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    className: "ModalStyles",
    title: /*#__PURE__*/_react.default.createElement("div", {
      style: {
        flexDirection: 'row',
        display: 'contents'
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'contents'
      }
    }, operationTypeState === _constants.OPERATIONS.SHOW ? (editData ? editData.fields : '') + " " + containerConstants.formatString(containerConstants.VALIDATION) : operationTypeState === _constants.OPERATIONS.ADD ? containerConstants.formatString(containerConstants.ADD) + " " + containerConstants.formatString(containerConstants.VALIDATION) : operationTypeState === _constants.OPERATIONS.EDIT_VALIDATION ? containerConstants.formatString(containerConstants.EDIT) + " " + containerConstants.formatString(containerConstants.VALIDATION) : containerConstants.formatString(containerConstants.EDIT) + " " + editData.fields + " " + containerConstants.formatString(containerConstants.VALIDATION)), operationTypeState === _constants.OPERATIONS.SHOW && /*#__PURE__*/_react.default.createElement("div", {
      style: {
        float: 'right'
      }
    }, /*#__PURE__*/_react.default.createElement("img", {
      className: store.fromFCR ? '' : store.showCustom ? 'non_selectable' : '',
      src: _edit.default,
      alt: "Imgage not found",
      onClick: () => (store.fromFCR || !store.showCustom) && editRule(),
      style: {
        cursor: 'pointer'
      }
    }))),
    centered: true,
    bodyStyle: {
      padding: '16px',
      fontSize: '14px',
      lineHeight: '1.5',
      wordWrap: 'break-word'
    },
    closable: false,
    visible: true,
    width: '60%',
    okText: "Add",
    footer: [/*#__PURE__*/_react.default.createElement("div", {
      style: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'end',
        marginTop: '14px'
      }
    }, operationTypeState !== _constants.OPERATIONS.SHOW && /*#__PURE__*/_react.default.createElement(_antd.Button, {
      id: "cancel_botton_style",
      className: "font-family-weight-500 fs14 ls22",
      onClick: () => otherprops.closeAddFieldValidationForm(false)
    }, containerConstants.formatString(containerConstants.CANCEL)), operationTypeState === _constants.OPERATIONS.SHOW && /*#__PURE__*/_react.default.createElement(_antd.Button, {
      type: "primary",
      onClick: () => otherprops.closeAddFieldValidationForm(false),
      className: "ont-family-weight-500 fs14 ls22",
      style: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: '14px'
      }
    }, containerConstants.formatString(containerConstants.CLOSE)), operationTypeState !== _constants.OPERATIONS.SHOW && /*#__PURE__*/_react.default.createElement(_antd.Button, {
      type: "primary",
      loading: otherprops.showLoading,
      onClick: () => otherprops.saveValidationForm(activeTab === _constants.DATA_VALIDATION.FIELDS ? {
        'rulesData': getRuleFormulaToSave(),
        'rulesCount': calculateRulesCount(),
        'attributeId': editData.attributeId,
        'attributeValidationId': editData.attributeValidationId,
        'operationType': operationTypeState
      } : {
        'rulesData': validationruleFormData
      }),
      className: "ont-family-weight-500 fs14 ls22",
      style: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: '14px'
      },
      disabled: isAddButtonDisabled()
    }, operationTypeState === _constants.OPERATIONS.EDIT || operationTypeState === _constants.OPERATIONS.EDIT_VALIDATION ? containerConstants.formatString(containerConstants.SAVE) : containerConstants.formatString(containerConstants.ADD)))],
    onCancel: () => otherprops.closeAddFieldValidationForm(false)
  }, activeTab === _constants.DATA_VALIDATION.FIELDS && rulesData.map(function (item, index) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, index > 0 && getDivider(_constants.LOGICAL_OPERATOR.OR), /*#__PURE__*/_react.default.createElement(_antd.Card, {
      bodyStyle: {
        padding: '16px 16px'
      },
      className: "Modal-content-layout"
    }, item.map(function (innerItem, innerIndex) {
      return displayFieldDataform(_constants.LOGICAL_OPERATOR.AND, innerItem, index, innerIndex);
    }), operationTypeState !== _constants.OPERATIONS.SHOW && /*#__PURE__*/_react.default.createElement(_antd.Button, {
      style: {
        border: '1px solid',
        boxSizing: 'border-box',
        borderRadius: '2px',
        alignItems: 'center',
        display: 'flex',
        marginTop: '13px'
      },
      type: "primary",
      onClick: () => addANDValidationRowHandler(index),
      ghost: true
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 ls22"
    }, _constants.LOGICAL_OPERATOR.AND))));
  }), operationTypeState !== _constants.OPERATIONS.SHOW && activeTab === _constants.DATA_VALIDATION.FIELDS && displayAddAnotherConditionButton(), activeTab === _constants.DATA_VALIDATION.FIELDS && displayFormula(), activeTab === _constants.DATA_VALIDATION.VALIDATION_RULES && displayValidationDataForm());
};
var _default = exports.default = ModalDialog;
//# sourceMappingURL=modal_dialog.js.map