var _excluded = ["activeTab", "rules", "operationType", "editData"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useEffect, useState } from 'react';
import { Modal, Card, Row, Col, Input, Select, Button } from 'antd';
import '../../../CSS/modal_dialog.css';
import deleteButton from '../../../images/deleteButton.svg';
import editButton from '../../../images/edit.svg';
import { containerConstantsService } from '../../../utils/containerconstants/ContainerConstants';
import { OPERATIONS, LOGICAL_OPERATOR, STATUS, DATA_VALIDATION, OPERATOR, OPERATOR_CONSTANT } from '../../../utils/constants';
import { PlusOutlined } from '@ant-design/icons';
import { notifyResponseMessage } from '../../commoncomponent/NotificationComponent/notifyResponseMessage';
import { fetchValidationRule } from '../../APIConfig/DataValidationAction';
import { useStore } from '../../hook-store/store';
var containerConstants = containerConstantsService.getInstance();
var ModalDialog = _ref => {
  var {
      activeTab,
      operationType,
      editData
    } = _ref,
    otherprops = _objectWithoutPropertiesLoose(_ref, _excluded);
  var store = useStore(true)[0];
  var [dataChanged, setDataChanged] = useState(false);
  var [operationTypeState, setOperationTypeState] = useState(operationType);
  var [rulesData, setRulesData] = useState([[{}]]);
  var [rulesOptions, setRulesOptions] = useState([]);
  var [rulesOptionsMap, setRulesOptionsMap] = useState({});
  var [rulesIdOptionsMap, setRulesIdOptionsMap] = useState({});
  var [anyUpdation, setAnyUpdation] = useState(false);
  var [validationruleFormData, setValidationRulesFormData] = useState({
    'ruleName': '',
    'condition': '',
    'rightValue': '',
    'id': ''
  });
  useEffect(() => {
    // Fetch data once when component mounts & then after tab switch.
    if (activeTab === DATA_VALIDATION.FIELDS) {
      fetchInitDataForFields();
    }
  }, [activeTab]);
  useEffect(() => {
    if (editData !== undefined && editData !== null && Object.keys(editData).length > 0) {
      if (activeTab === DATA_VALIDATION.FIELDS) {
        //setRulesData(editData);
        // Object.keys(rulesIdOptionsMap).length === 0 && fetchInitDataForFields();
        Object.keys(rulesIdOptionsMap).length > 0 && convertToRules(editData.validations);
      } else if (activeTab === DATA_VALIDATION.VALIDATION_RULES) {
        setValidationRulesFormData({
          'ruleName': editData.ruleName,
          'condition': editData.condition,
          'rightValue': editData.rightValue,
          'id': editData.id
        });
      }
    }
  }, [editData, rulesIdOptionsMap, activeTab]);
  var fetchInitDataForFields = () => {
    fetchValidationRule().then(response => {
      if (response.status === 200 && response.data && response.data.status === 'Success') {
        var _response$data;
        var operatorIdMap = {};
        Object.keys(OPERATOR).forEach((k, i) => {
          operatorIdMap[OPERATOR[k]] = containerConstants.formatString(containerConstants[k]);
        });
        var validationRules = (_response$data = response.data) == null ? void 0 : _response$data.data['validationsRulesDto'];
        var validationRulesOptions = [{
          label: containerConstants.formatString(containerConstants.SELECT),
          value: ''
        }];
        var validationRulesOptionsMap = {};
        var validationRulesIdOptionsMap = {};
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
  var convertToRules = validations => {
    if (validations === undefined || validations === null) {
      return;
    }
    var rules = [...rulesData];
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
            notifyResponseMessage(STATUS.ERROR, 'Invalid Rule');
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
            notifyResponseMessage(STATUS.ERROR, 'Invalid Rule');
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
  var addANDValidationRowHandler = index => {
    var rule = [...rulesData];
    rule[index].push({});
    setRulesData(rule);
    setAnyUpdation(true);
    setDataChanged(!dataChanged);
  };
  var removeANDValidationRowHandler = (index, innerIndex) => {
    var rule = [...rulesData];
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
  var updateFormFieldValueHandler = (value, key, index, innerIndex) => {
    setAnyUpdation(true);
    // setSavebuttonEnabled(true);
    var rule = [...rulesData];
    rule[index][innerIndex] = value;
    setRulesData(rule);
    setDataChanged(!dataChanged);
  };
  var updateValidationFormValueHandler = (value, key, event) => {
    // setSavebuttonEnabled(true);
    setAnyUpdation(true);
    if (key === 'rightValue' && !isNumberKeyOnly(event)) {
      return;
    }
    var rule = _extends({}, validationruleFormData);
    rule[key] = value;
    if (key === 'condition') {
      rule['rightValue'] = '';
    }
    setValidationRulesFormData(rule);
    setDataChanged(!dataChanged);
  };
  var isNumberKeyOnly = event => {
    if (validationruleFormData['condition'] === OPERATOR.LESS_THAN || validationruleFormData['condition'] === OPERATOR.GREATER_THAN || validationruleFormData['condition'] === OPERATOR.GREATER_THAN_EQUALS || validationruleFormData['condition'] === OPERATOR.LESS_THAN_EQUALS) {
      if (isNaN(event.target.value)) {
        var lst = String(event.target.value).slice(-1);
        if (lst === "-" || lst === ":" || !isNaN(lst)) {
          return true;
        }
        event.preventDefault();
        return false;
      }
    }
    return true;
  };
  var addORValidationHandler = () => {
    var rule = [...rulesData];
    rule.push([{}]);
    setRulesData(rule);
    setAnyUpdation(true);
    setDataChanged(!dataChanged);
  };
  var getRuleFormula = () => {
    var finalFormula = '';
    rulesData.map(function (item, index) {
      var c = '';
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
  var getRuleFormulaToSave = () => {
    var finalFormula = '';
    rulesData.map(function (item, index) {
      var c = '';
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
  var calculateRulesCount = () => {
    var count = 0;
    rulesData.map(function (item, index) {
      item.map(function (innerItem, innerIndex) {
        if (innerItem !== undefined && innerItem !== '' && Object.keys(innerItem).length > 0) {
          count++;
        }
      });
    });
    return count;
  };
  var getDivider = type => {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flexDirection: 'row',
        display: 'flex',
        margin: '16px 0px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '50%',
        borderTop: '1px solid #DADADA',
        transform: 'translateY(50%)'
      }
    }), /*#__PURE__*/React.createElement("div", {
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
    }, type), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '50%',
        borderTop: '1px solid #DADADA',
        transform: 'translateY(50%)'
      }
    }));
  };
  var getRulesOptions = (innerIndex, index) => {
    var rulesDataSet = new Set();
    var finalRulesOptions = [];
    rulesData[index].map(function (item, index1) {
      rulesDataSet.add(item);
    });
    for (var rule of rulesOptions) {
      if (!rulesDataSet.has(rule.value)) {
        finalRulesOptions.push(rule);
      }
    }
    ;
    return finalRulesOptions;
  };
  var displayFieldDataform = (type, data, index, innerIndex) => {
    return /*#__PURE__*/React.createElement("div", {
      id: index
    }, innerIndex > 0 && getDivider(LOGICAL_OPERATOR.AND), /*#__PURE__*/React.createElement(Row, {
      style: {
        flexDirection: 'row',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(Col, {
      style: {
        width: operationTypeState !== OPERATIONS.SHOW ? '30%' : '32%',
        marginRight: '2%',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs12 ls18 ",
      style: {
        color: '#727272',
        marginBottom: '2px'
      }
    }, containerConstants.formatString(containerConstants.RULE_NAME)), /*#__PURE__*/React.createElement(Select, {
      value: Object.keys(rulesData[index][innerIndex]).length > 0 ? rulesData[index][innerIndex] : null,
      showSearch: false,
      size: "default",
      style: {
        width: '100%'
      },
      onChange: event => updateFormFieldValueHandler(event, 'ruleName', index, innerIndex),
      placeholder: containerConstants.formatString(containerConstants.SELECT),
      options: getRulesOptions(innerIndex, index),
      disabled: operationTypeState === OPERATIONS.SHOW
    })), /*#__PURE__*/React.createElement(Col, {
      style: {
        width: operationTypeState !== OPERATIONS.SHOW ? '30%' : '32%',
        marginRight: operationTypeState !== OPERATIONS.SHOW ? '3%' : '2%',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs12 ls18 ",
      style: {
        color: '#727272',
        marginBottom: '2px'
      }
    }, containerConstants.formatString(containerConstants.OPERATOR)), /*#__PURE__*/React.createElement(Input, {
      disabled: true,
      className: "font-family-weight-normal fs14 ls22 input-box-style",
      style: {
        background: '#F3F3F3'
      },
      value: rulesOptionsMap[rulesData[index][innerIndex]] !== undefined ? rulesOptionsMap[rulesData[index][innerIndex]].condition : ''
    })), /*#__PURE__*/React.createElement(Col, {
      style: {
        width: operationTypeState !== OPERATIONS.SHOW ? '30%' : '32%',
        marginRight: operationTypeState !== OPERATIONS.SHOW ? '2%' : '0px',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs12 ls18 ",
      style: {
        color: '#727272',
        marginBottom: '2px'
      }
    }, containerConstants.formatString(containerConstants.RIGHT_VALUE)), /*#__PURE__*/React.createElement(Input, {
      disabled: true,
      className: "font-family-weight-normal fs14 ls22 input-box-style",
      style: {
        background: '#F3F3F3'
      },
      value: rulesOptionsMap[rulesData[index][innerIndex]] !== undefined ? rulesOptionsMap[rulesData[index][innerIndex]].rightValue : ''
    })), operationTypeState !== OPERATIONS.SHOW && /*#__PURE__*/React.createElement(Col, {
      style: {
        width: '3%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs12 ls18 ",
      style: {
        color: '#727272',
        marginBottom: '2px',
        visibility: 'hidden'
      }
    }, "."), /*#__PURE__*/React.createElement("img", {
      src: deleteButton,
      alt: "Imgage not found",
      onClick: () => removeANDValidationRowHandler(index, innerIndex),
      style: {
        cursor: 'pointer'
      }
    }))));
  };
  var isRightInputDisabled = () => {
    if (validationruleFormData['condition'] === OPERATOR.REQUIRED || validationruleFormData['condition'] === OPERATOR.NOT_NULL) {
      validationruleFormData['rightValue'] = '';
      return true;
    }
    return false;
  };
  var calculateEmptyRulesCountExceptExceptionalCase = () => {
    var emptycount = 0;
    var ruleCount = 0;
    var indexVal = -1;
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
      var v = indexVal.split('_');
      return v[0] === '0' && v[1] === '0' ? 0 : 1;
    }
    if (ruleCount > 0 && emptycount > 0) {
      return 1;
    }
    return emptycount;
  };
  var isAddButtonDisabled = () => {
    if (anyUpdation && activeTab === DATA_VALIDATION.FIELDS) {
      return calculateEmptyRulesCountExceptExceptionalCase() > 0;
    } else if (anyUpdation && activeTab === DATA_VALIDATION.VALIDATION_RULES) {
      return validationruleFormData['ruleName'] === '' || validationruleFormData['condition'] === '' || validationruleFormData['ruleName'].trim() === '' || validationruleFormData['condition'] !== OPERATOR.REQUIRED && validationruleFormData['condition'] !== OPERATOR.NOT_NULL && (validationruleFormData['rightValue'] === '' || validationruleFormData['rightValue'].trim() === '');
    }
    return true;
  };
  var displayValidationDataForm = () => {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Row, {
      style: {
        flexDirection: 'row',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(Col, {
      style: {
        width: '32%',
        marginRight: '2%',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs12 ls18 ",
      style: {
        color: '#727272',
        marginBottom: '2px'
      }
    }, containerConstants.formatString(containerConstants.RULE_NAME)), /*#__PURE__*/React.createElement(Input, {
      placeholder: containerConstants.formatString(containerConstants.PLACEHOLDER),
      className: "input-box-style",
      value: validationruleFormData['ruleName'],
      onChange: event => updateValidationFormValueHandler(event.target.value, 'ruleName'),
      onBlur: event => updateValidationFormValueHandler(event.target.value, 'ruleName')
    })), /*#__PURE__*/React.createElement(Col, {
      style: {
        width: '32%',
        marginRight: '2%',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs12 ls18 ",
      style: {
        color: '#727272',
        marginBottom: '2px'
      }
    }, containerConstants.formatString(containerConstants.OPERATOR)), /*#__PURE__*/React.createElement(Select, {
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
      options: OPERATOR_CONSTANT
    })), /*#__PURE__*/React.createElement(Col, {
      style: {
        width: '31%',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs12 ls18 ",
      style: {
        color: '#727272',
        marginBottom: '2px'
      }
    }, containerConstants.formatString(containerConstants.RIGHT_VALUE)), /*#__PURE__*/React.createElement(Input, {
      placeholder: containerConstants.formatString(containerConstants.PLACEHOLDER),
      className: "input-box-style",
      value: validationruleFormData['rightValue'],
      onChange: event => updateValidationFormValueHandler(event.target.value, 'rightValue', event),
      onBlur: event => updateValidationFormValueHandler(event.target.value, 'rightValue', event),
      disabled: isRightInputDisabled()
    }))));
  };
  var displayAddAnotherConditionButton = () => {
    return /*#__PURE__*/React.createElement(Button, {
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
    }, /*#__PURE__*/React.createElement(PlusOutlined, {
      size: "9px",
      style: {
        marginRight: '7px'
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 ls22"
    }, containerConstants.formatString(containerConstants.ADD_ANOTHER_CONDITION)));
  };
  var displayFormula = () => {
    return /*#__PURE__*/React.createElement(Input, {
      className: "rule-output-box font-family-weight-500 fs14 ls22 ",
      value: containerConstants.formatString(containerConstants.FORMULA) + getRuleFormula()
    });
  };
  var editRule = () => {
    setOperationTypeState(OPERATIONS.EDIT);
  };
  return /*#__PURE__*/React.createElement(Modal, {
    className: "ModalStyles",
    title: /*#__PURE__*/React.createElement("div", {
      style: {
        flexDirection: 'row',
        display: 'contents'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'contents'
      }
    }, operationTypeState === OPERATIONS.SHOW ? (editData ? editData.fields : '') + " " + containerConstants.formatString(containerConstants.VALIDATION) : operationTypeState === OPERATIONS.ADD ? containerConstants.formatString(containerConstants.ADD) + " " + containerConstants.formatString(containerConstants.VALIDATION) : operationTypeState === OPERATIONS.EDIT_VALIDATION ? containerConstants.formatString(containerConstants.EDIT) + " " + containerConstants.formatString(containerConstants.VALIDATION) : containerConstants.formatString(containerConstants.EDIT) + " " + editData.fields + " " + containerConstants.formatString(containerConstants.VALIDATION)), operationTypeState === OPERATIONS.SHOW && /*#__PURE__*/React.createElement("div", {
      style: {
        float: 'right'
      }
    }, /*#__PURE__*/React.createElement("img", {
      className: store.fromFCR ? '' : store.showCustom ? 'non_selectable' : '',
      src: editButton,
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
    footer: [/*#__PURE__*/React.createElement("div", {
      style: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'end',
        marginTop: '14px'
      }
    }, operationTypeState !== OPERATIONS.SHOW && /*#__PURE__*/React.createElement(Button, {
      id: "cancel_botton_style",
      className: "font-family-weight-500 fs14 ls22",
      onClick: () => otherprops.closeAddFieldValidationForm(false)
    }, containerConstants.formatString(containerConstants.CANCEL)), operationTypeState === OPERATIONS.SHOW && /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      onClick: () => otherprops.closeAddFieldValidationForm(false),
      className: "ont-family-weight-500 fs14 ls22",
      style: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: '14px'
      }
    }, containerConstants.formatString(containerConstants.CLOSE)), operationTypeState !== OPERATIONS.SHOW && /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      loading: otherprops.showLoading,
      onClick: () => otherprops.saveValidationForm(activeTab === DATA_VALIDATION.FIELDS ? {
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
    }, operationTypeState === OPERATIONS.EDIT || operationTypeState === OPERATIONS.EDIT_VALIDATION ? containerConstants.formatString(containerConstants.SAVE) : containerConstants.formatString(containerConstants.ADD)))],
    onCancel: () => otherprops.closeAddFieldValidationForm(false)
  }, activeTab === DATA_VALIDATION.FIELDS && rulesData.map(function (item, index) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, index > 0 && getDivider(LOGICAL_OPERATOR.OR), /*#__PURE__*/React.createElement(Card, {
      bodyStyle: {
        padding: '16px 16px'
      },
      className: "Modal-content-layout"
    }, item.map(function (innerItem, innerIndex) {
      return displayFieldDataform(LOGICAL_OPERATOR.AND, innerItem, index, innerIndex);
    }), operationTypeState !== OPERATIONS.SHOW && /*#__PURE__*/React.createElement(Button, {
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
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 ls22"
    }, LOGICAL_OPERATOR.AND))));
  }), operationTypeState !== OPERATIONS.SHOW && activeTab === DATA_VALIDATION.FIELDS && displayAddAnotherConditionButton(), activeTab === DATA_VALIDATION.FIELDS && displayFormula(), activeTab === DATA_VALIDATION.VALIDATION_RULES && displayValidationDataForm());
};
export default ModalDialog;
//# sourceMappingURL=modal_dialog.js.map