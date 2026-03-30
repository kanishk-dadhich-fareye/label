var _excluded = ["children", "record"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useEffect, useState } from 'react';
import { containerConstantsService } from '../../utils/containerconstants/ContainerConstants';
import { CONSTANT_ENUM, STATUS, OPERATIONS, DATA_VALIDATION, FIELDS_COLUMN, FIELDS_CONSTANT, ORIGIN_SELECTED_FIELDS, ORIGIN_NON_SELECTED_FIELDS, DESTINATION_SELECTED_FIELDS, DESTINATION_NON_SELECTED_FIELDS, RETURN_SELECTED_FIELDS, RETURN_NON_SELECTED_FIELDS, ORDER_SELECTED_FIELDS, ORDER_NON_SELECTED_FIELDS, SHIPPER_SELECTED_FIELDS, SHIPPER_NON_SELECTED_FIELDS, CARRIER_SELECTED_FIELDS, CARRIER_NON_SELECTED_FIELDS, VALIDATION_RULES_TABLE_HEADER, PINCODE_SELECTED_REGEX, PINCODE_NON_SELECTED_REGEX, PHONE_NUMBER_SELECTED_REGEX, PHONE_NUMBER_NON_SELECTED_REGEX, REFERENCE_NUMBER_SELECTED_REGEX, REFERENCE_NUMBER_NON_SELECTED_REGEX, REGEX_GUIDE_TABLE_HEADER, REGEX_CONSTANT } from '../../utils/constants';
import { fetchValidationFields, saveValidationFields, fetchRegexGuide, fetchValidationRule, saveValidationRule, deleteValidationRule } from '../APIConfig/DataValidationAction';
import { notifyResponseMessage } from '../commoncomponent/NotificationComponent/notifyResponseMessage';
import ModalDialog from './modaldialog/modal_dialog';
import BreadCrumb from '../commoncomponent/breadcrumb/bread_crumb';
import CustomCard from '../commoncomponent/customcard/custom_card';
import { Menu, Space, Popover, Modal, Button } from 'antd';
import MoreOutlined from '../../modules/commoncomponent/CustomIcons/MoreOutlined';
import DataValidationStyle from './dataValidationStyle.js';
import { useStore } from '../hook-store/store';
import { getBasePath } from '../commoncomponent/BasePath';
var containerConstants = containerConstantsService.getInstance();
var DataValidation = props => {
  var store = useStore(true)[0];
  var editRuleData = useState({})[0];
  var [basePath, setBasePath] = useState('');
  var urlList = [{
    url: basePath + '/v2/label_generation/v2/settings',
    heading: containerConstants.formatString(containerConstants.SETTINGS)
  }, {
    url: basePath + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: basePath + '/v2/label_generation/data_validation/',
    heading: containerConstants.formatString(containerConstants.DATA_VALIDATION)
  }];
  var urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: '/v2/new_settings/label_generation/data_validation',
    heading: containerConstants.formatString(containerConstants.DATA_VALIDATION)
  }];
  var [showLoading, setShowLoading] = useState(false);
  var [activeTabKey, setActiveTabKey] = useState(DATA_VALIDATION.FIELDS);
  var [activeSubTabKey, setActiveSubTabKey] = useState(FIELDS_CONSTANT.ORIGIN);
  var [operationType, setOperationType] = useState(OPERATIONS.ADD);
  var [editData, setEditData] = useState(null);
  var [showModalDialogForm, setShowModalDialogForm] = useState(false);
  var [innerTableData, setInnerTableData] = useState({});
  var [tableWidth, setTableWidth] = useState('84%');
  var [topButton, setTopButton] = useState(false);
  var [leftTable, setLeftTable] = useState({
    header: FIELDS_COLUMN,
    body: [ORIGIN_SELECTED_FIELDS, DESTINATION_NON_SELECTED_FIELDS, RETURN_NON_SELECTED_FIELDS, ORDER_NON_SELECTED_FIELDS, SHIPPER_NON_SELECTED_FIELDS, CARRIER_NON_SELECTED_FIELDS]
  });
  var [innerTableHeader, setInnerTableHeader] = useState({});
  var [showPopover, setShowPopover] = useState({
    visible: false,
    key: null
  });
  var [showDeleteConfirmMessage, setShowDeleteConfirmMessage] = useState(false);
  var tabList = [{
    key: DATA_VALIDATION.FIELDS,
    tab: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs14 ls22"
    }, containerConstants.formatString(containerConstants.FIELDS))
  }, {
    key: DATA_VALIDATION.VALIDATION_RULES,
    tab: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs14 ls22"
    }, containerConstants.formatString(containerConstants.VALIDATION_RULES))
  }, {
    key: DATA_VALIDATION.REGEX_GUIDE,
    tab: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs14 ls22"
    }, containerConstants.formatString(containerConstants.REGEX_GUIDE))
  }];
  var openAddFieldValidationModel = (text, operation) => {
    setShowModalDialogForm(true);
    setOperationType(operation);
    setEditData(text);
    //text.validations !== null && text.validations !== undefined && fetchRules(text.serialNumber);
  };
  var editValidationTabFormRow = (text, operation) => {
    setShowModalDialogForm(true);
    setOperationType(operation);
    setEditData(text);
  };
  var deleteValidationTabFormRow = (text, operation) => {
    setShowDeleteConfirmMessage(false);
    deleteValidationRule(text.id).then(response => {
      if (response.status === 200) {
        if (response.data.status === 'Success') {
          fetchTableData(DATA_VALIDATION.VALIDATION_RULES);
          notifyResponseMessage(STATUS.SUCCESS, containerConstants.formatString(containerConstants.DELETED_SUCCESSFULLY));
        } else {
          notifyResponseMessage(STATUS.ERROR, response.data.message);
        }
      }
    }).catch(error => {
      notifyResponseMessage(STATUS.ERROR, error);
    });
  };

  // const fetchRules = (sno) => {
  //     setEditRuleData(
  //         [
  //             [
  //                 {
  //                     'rules_name' : '2',
  //                     'operator' : OPERATOR.GREATER_THAN,
  //                     'right_value': '22'
  //                 },
  //                 {
  //                     'rules_name' : '1',
  //                     'operator' : OPERATOR.CONTAINS,
  //                     'right_value': '32'
  //                 }
  //             ],
  //             [
  //                 {
  //                     'rules_name' : '3',
  //                     'operator' : OPERATOR.EQUALS_TO,
  //                     'right_value': '1'
  //                 }
  //             ]
  //         ]
  //     );
  // }

  useEffect(() => {
    setBasePath(getBasePath(props, store));
    document.title = containerConstants.formatString(containerConstants.DATA_VALIDATION);
    onMainTabChange(DATA_VALIDATION.FIELDS);
  }, [store.showCustom]);
  var fetchTableData = key => {
    setInnerTableData({});
    setShowLoading(true);
    switch (key) {
      case FIELDS_CONSTANT.ORIGIN:
        fetchValidationFields(CONSTANT_ENUM.ORIGIN).then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data;
            var data = (_response$data = response.data) == null ? void 0 : _response$data.data[CONSTANT_ENUM.ORIGIN.toLowerCase()];
            data !== undefined && data !== null ? setInnerTableData(appendOpenAddFieldValidationModelMethodCall(data)) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          notifyResponseMessage(STATUS.ERROR, error);
        });
        break;
      case FIELDS_CONSTANT.DESTINATION:
        fetchValidationFields(CONSTANT_ENUM.DESTINATION).then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data2;
            var data = (_response$data2 = response.data) == null ? void 0 : _response$data2.data[CONSTANT_ENUM.DESTINATION.toLowerCase()];
            data !== undefined && data !== null ? setInnerTableData(appendOpenAddFieldValidationModelMethodCall(data)) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          notifyResponseMessage(STATUS.ERROR, error);
        });
        break;
      case FIELDS_CONSTANT.RETURN:
        fetchValidationFields(CONSTANT_ENUM.RETURN).then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data3;
            var data = (_response$data3 = response.data) == null ? void 0 : _response$data3.data['returnn'];
            data !== undefined && data !== null ? setInnerTableData(appendOpenAddFieldValidationModelMethodCall(data)) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          notifyResponseMessage(STATUS.ERROR, error);
        });
        break;
      case FIELDS_CONSTANT.ORDER:
        fetchValidationFields(CONSTANT_ENUM.ORDER).then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data4;
            var data = (_response$data4 = response.data) == null ? void 0 : _response$data4.data[CONSTANT_ENUM.ORDER.toLowerCase()];
            data !== undefined && data !== null ? setInnerTableData(appendOpenAddFieldValidationModelMethodCall(data)) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          notifyResponseMessage(STATUS.ERROR, error);
        });
        break;
      case FIELDS_CONSTANT.SHIPPER:
        fetchValidationFields(CONSTANT_ENUM.SHIPPER).then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data5;
            var data = (_response$data5 = response.data) == null ? void 0 : _response$data5.data[CONSTANT_ENUM.SHIPPER.toLowerCase()];
            data !== undefined && data !== null ? setInnerTableData(appendOpenAddFieldValidationModelMethodCall(data)) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          notifyResponseMessage(STATUS.ERROR, error);
        });
        break;
      case FIELDS_CONSTANT.CARRIER:
        fetchValidationFields(CONSTANT_ENUM.CARRIER).then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data6;
            var data = (_response$data6 = response.data) == null ? void 0 : _response$data6.data[CONSTANT_ENUM.CARRIER.toLowerCase()];
            data !== undefined && data !== null ? setInnerTableData(appendOpenAddFieldValidationModelMethodCall(data)) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          notifyResponseMessage(STATUS.ERROR, error);
        });
        break;
      case REGEX_CONSTANT.PINCODE:
        fetchRegexGuide().then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data7;
            var data = (_response$data7 = response.data) == null ? void 0 : _response$data7.data[CONSTANT_ENUM.PINCODE];
            data !== undefined && data !== null ? setInnerTableData(data) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          notifyResponseMessage(STATUS.ERROR, error);
        });
        break;
      case REGEX_CONSTANT.PHONE_NUMBER:
        fetchRegexGuide().then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data8;
            var data = (_response$data8 = response.data) == null ? void 0 : _response$data8.data[CONSTANT_ENUM.PHONE_NUMBER];
            data !== undefined && data !== null ? setInnerTableData(data) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          notifyResponseMessage(STATUS.ERROR, error);
        });
        break;
      case REGEX_CONSTANT.REFERENCE_NUMBER:
        fetchRegexGuide().then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data9;
            var data = (_response$data9 = response.data) == null ? void 0 : _response$data9.data[CONSTANT_ENUM.REFERENCE_NUMBER];
            data !== undefined && data !== null ? setInnerTableData(data) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          notifyResponseMessage(STATUS.ERROR, error);
        });
        break;
      case DATA_VALIDATION.VALIDATION_RULES:
        fetchValidationRule().then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data0;
            var data = (_response$data0 = response.data) == null ? void 0 : _response$data0.data['validationsRulesDto'];
            data !== undefined && data !== null && data.length > 0 ? setInnerTableData(data) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          notifyResponseMessage(STATUS.ERROR, error);
        });
        break;
      default:
        fetchValidationFields(CONSTANT_ENUM.ORIGIN).then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data1;
            var data = (_response$data1 = response.data) == null ? void 0 : _response$data1.data[CONSTANT_ENUM.ORIGIN.toLowerCase()];
            data !== undefined && data !== null ? setInnerTableData(appendOpenAddFieldValidationModelMethodCall(data)) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          notifyResponseMessage(STATUS.ERROR, error);
        });
    }

    // fetchValidationFields(0)
    // .then(validationFields=>{
    //     if(validationFields.status=='Success'){
    //         setDataInTable(validationFields.data);
    //     }
    // }).catch(error=>
    //     notifyResponseMessage(STATUS.ERROR, error)
    // );
  };
  var appendOpenAddFieldValidationModelMethodCall = data => {
    data.forEach(function (item, index) {
      item.openAddFieldValidationModel = openAddFieldValidationModel;
    });
    return data;
  };
  var awbPopoverClasses = 'data-val-popover-icon flex align-center justify-center pointer mr10';
  var CustomCell = _ref => {
    var {
        children,
        record
      } = _ref,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
    return /*#__PURE__*/React.createElement("td", restProps, record ? /*#__PURE__*/React.createElement(Space, {
      size: "small",
      style: {
        flexDirection: 'row',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(Popover, {
      overlayClassName: "data-val-table-popover"
      //   visible={record?.id === showPopover.key && showPopover.visible}
      //   onVisibleChange={(visible) => setShowPopover(visible ? { visible: visible, key: record.id } : {})}
      ,
      id: "data-val-table-popover-id",
      placement: "bottomLeft",
      trigger: "click",
      content: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 ls18"
      }, /*#__PURE__*/React.createElement("p", {
        id: "pop_over_l_b",
        style: {
          marginBottom: '6px',
          cursor: 'pointer'
        },
        className: store.fromFCR ? '' : store.showCustom ? 'non_selectable' : '',
        onClick: () => {
          (store.fromFCR || !store.showCustom) && editValidationTabFormRow(record, OPERATIONS.EDIT_VALIDATION);
          setShowPopover({
            visible: false,
            key: null
          });
        }
      }, containerConstants.formatString(containerConstants.EDIT)), /*#__PURE__*/React.createElement("p", {
        className: store.fromFCR ? '' : store.showCustom ? 'non_selectable' : '',
        style: {
          cursor: 'pointer'
        },
        onClick: () => (store.fromFCR || !store.showCustom) && setShowDeleteConfirmMessage(record)
      }, containerConstants.formatString(containerConstants.DELETE)))
    }, /*#__PURE__*/React.createElement("div", {
      className: (record == null ? void 0 : record.id) === showPopover.key ? awbPopoverClasses.concat(' ', 'selected bg-primary') : awbPopoverClasses
    }, /*#__PURE__*/React.createElement(MoreOutlined, {
      color: (record == null ? void 0 : record.id) === showPopover.key ? '#FFFFFF' : '#323232'
    }))), /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal  fs12 ls18",
      style: {
        color: '#212121',
        'alignItems': 'center',
        'display': 'flex'
      }
    }, children[1])) : children[1]);
  };
  var FIELDS_TABLE_HEADER = [{
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500  fs10 ls18",
      style: {
        color: '#727272',
        textTransform: 'uppercase'
      }
    }, containerConstants.formatString(containerConstants.S_NO)),
    dataIndex: 'serialNumber',
    width: '4%',
    key: 'serialNumber',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal  fs12 ls18",
      style: {
        color: '#212121',
        'alignItems': 'center',
        'display': 'flex'
      }
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500  fs10 ls18",
      style: {
        color: '#727272',
        textTransform: 'uppercase'
      }
    }, containerConstants.formatString(containerConstants.FIELDS)),
    dataIndex: 'fields',
    width: '28%',
    key: 'fields',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal  fs12 ls18",
      style: {
        color: '#212121',
        'alignItems': 'center',
        'display': 'flex'
      }
    }, text ? text : '-')
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500  fs10 ls18",
      style: {
        color: '#727272',
        textTransform: 'uppercase'
      }
    }, containerConstants.formatString(containerConstants.TYPE)),
    dataIndex: 'type',
    width: '23%',
    key: 'type',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal  fs12 ls18",
      style: {
        color: '#212121',
        'alignItems': 'center',
        'display': 'flex'
      }
    }, text ? text : '-')
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500  fs10 ls18",
      style: {
        color: '#727272',
        textTransform: 'uppercase'
      }
    }, containerConstants.formatString(containerConstants.KEY)),
    key: 'key',
    width: '23%',
    dataIndex: 'key',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal  fs12 ls18",
      style: {
        color: '#212121',
        'alignItems': 'center',
        'display': 'flex'
      }
    }, text ? text : '-')
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500  fs10 ls18",
      style: {
        color: '#727272',
        textTransform: 'uppercase'
      }
    }, containerConstants.formatString(containerConstants.VALIDATIONS)),
    key: 'validations',
    width: '23%',
    render: (text, record) => text.validations === null || text.validations === undefined || text.validations === '' ? /*#__PURE__*/React.createElement(Space, {
      style: {
        display: 'contents'
      },
      size: "middle"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal  fs14 ls22",
      style: {
        float: 'left',
        color: '#212121',
        'alignItems': 'center',
        'justifyContent': 'center',
        'display': 'flex'
      }
    }, "-"), /*#__PURE__*/React.createElement(Button, {
      disabled: store.fromFCR ? false : store.showCustom,
      style: {
        float: 'right',
        border: '1px solid',
        boxSizing: 'border-box',
        borderRadius: '4px',
        alignItems: 'center',
        display: 'flex',
        height: '55%',
        width: '38px',
        justifyContent: 'center',
        padding: '0 8px'
      },
      type: "primary",
      onClick: () => text.openAddFieldValidationModel(record, OPERATIONS.ADD),
      ghost: true
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs12 ls18"
    }, containerConstants.formatString(containerConstants.ADD)))) : /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500  fs12 ls16",
      style: {
        cursor: 'pointer',
        color: '#212121',
        'alignItems': 'center',
        'display': 'inherit',
        background: '#F3F3F3',
        border: '1px solid #ADADAD',
        boxSizing: 'border-box',
        borderRadius: '30px',
        justifyContent: 'center',
        padding: '0px 12px'
      },
      onClick: () => text.openAddFieldValidationModel(record, OPERATIONS.SHOW)
    }, countRules(text.validations), " ", containerConstants.formatString(containerConstants.VALIDATION))
  }];
  var countRules = rules => {
    var count = 0;
    var re = /&&|[||]{2}|\|/g;
    var match;
    while ((match = re.exec(rules)) != null) {
      count++;
    }
    return count + 1;
  };
  var onMainTabChange = key => {
    setActiveTabKey(key);
    switch (key) {
      case DATA_VALIDATION.REGEX_GUIDE:
        setLeftTable({
          header: FIELDS_COLUMN,
          body: [PINCODE_SELECTED_REGEX, PHONE_NUMBER_NON_SELECTED_REGEX, REFERENCE_NUMBER_NON_SELECTED_REGEX]
        });
        setActiveSubTabKey(REGEX_CONSTANT.PINCODE);
        setTableWidth('84%');
        setTopButton(false);
        fetchTableData(REGEX_CONSTANT.PINCODE);
        setInnerTableHeader(REGEX_GUIDE_TABLE_HEADER);
        break;
      case DATA_VALIDATION.FIELDS:
        setLeftTable({
          header: FIELDS_COLUMN,
          body: [ORIGIN_SELECTED_FIELDS, DESTINATION_NON_SELECTED_FIELDS, RETURN_NON_SELECTED_FIELDS, ORDER_NON_SELECTED_FIELDS, SHIPPER_NON_SELECTED_FIELDS, CARRIER_NON_SELECTED_FIELDS]
        });
        setTableWidth('84%');
        setTopButton(false);
        setActiveSubTabKey(FIELDS_CONSTANT.ORIGIN);
        fetchTableData(FIELDS_CONSTANT.ORIGIN);
        setInnerTableHeader(FIELDS_TABLE_HEADER);
        break;
      case DATA_VALIDATION.VALIDATION_RULES:
        setLeftTable({});
        setTopButton(true);
        setTableWidth('100%');
        fetchTableData(DATA_VALIDATION.VALIDATION_RULES);
        setActiveSubTabKey(null);
        setInnerTableHeader(VALIDATION_RULES_TABLE_HEADER);
        break;
      default:
        setLeftTable({
          header: FIELDS_COLUMN,
          body: [ORIGIN_SELECTED_FIELDS, DESTINATION_NON_SELECTED_FIELDS, RETURN_NON_SELECTED_FIELDS, ORDER_NON_SELECTED_FIELDS, SHIPPER_NON_SELECTED_FIELDS, CARRIER_NON_SELECTED_FIELDS]
        });
        setTableWidth('84%');
        setTopButton(false);
        setActiveSubTabKey(FIELDS_CONSTANT.ORIGIN);
        fetchTableData(FIELDS_CONSTANT.ORIGIN);
        setInnerTableHeader(FIELDS_TABLE_HEADER);
        break;
    }
  };
  var changeTableHandler = record => {
    setActiveSubTabKey(record.name);
    switch (record.name) {
      case FIELDS_CONSTANT.ORIGIN:
        fetchTableData(FIELDS_CONSTANT.ORIGIN);
        setLeftTable({
          header: FIELDS_COLUMN,
          body: [ORIGIN_SELECTED_FIELDS, DESTINATION_NON_SELECTED_FIELDS, RETURN_NON_SELECTED_FIELDS, ORDER_NON_SELECTED_FIELDS, SHIPPER_NON_SELECTED_FIELDS, CARRIER_NON_SELECTED_FIELDS]
        });
        break;
      case FIELDS_CONSTANT.DESTINATION:
        fetchTableData(FIELDS_CONSTANT.DESTINATION);
        setLeftTable({
          header: FIELDS_COLUMN,
          body: [ORIGIN_NON_SELECTED_FIELDS, DESTINATION_SELECTED_FIELDS, RETURN_NON_SELECTED_FIELDS, ORDER_NON_SELECTED_FIELDS, SHIPPER_NON_SELECTED_FIELDS, CARRIER_NON_SELECTED_FIELDS]
        });
        break;
      case FIELDS_CONSTANT.RETURN:
        fetchTableData(FIELDS_CONSTANT.RETURN);
        setLeftTable({
          header: FIELDS_COLUMN,
          body: [ORIGIN_NON_SELECTED_FIELDS, DESTINATION_NON_SELECTED_FIELDS, RETURN_SELECTED_FIELDS, ORDER_NON_SELECTED_FIELDS, SHIPPER_NON_SELECTED_FIELDS, CARRIER_NON_SELECTED_FIELDS]
        });
        break;
      case FIELDS_CONSTANT.ORDER:
        fetchTableData(FIELDS_CONSTANT.ORDER);
        setLeftTable({
          header: FIELDS_COLUMN,
          body: [ORIGIN_NON_SELECTED_FIELDS, DESTINATION_NON_SELECTED_FIELDS, RETURN_NON_SELECTED_FIELDS, ORDER_SELECTED_FIELDS, SHIPPER_NON_SELECTED_FIELDS, CARRIER_NON_SELECTED_FIELDS]
        });
        break;
      case FIELDS_CONSTANT.SHIPPER:
        fetchTableData(FIELDS_CONSTANT.SHIPPER);
        setLeftTable({
          header: FIELDS_COLUMN,
          body: [ORIGIN_NON_SELECTED_FIELDS, DESTINATION_NON_SELECTED_FIELDS, RETURN_NON_SELECTED_FIELDS, ORDER_NON_SELECTED_FIELDS, SHIPPER_SELECTED_FIELDS, CARRIER_NON_SELECTED_FIELDS]
        });
        break;
      case FIELDS_CONSTANT.CARRIER:
        fetchTableData(FIELDS_CONSTANT.CARRIER);
        setLeftTable({
          header: FIELDS_COLUMN,
          body: [ORIGIN_NON_SELECTED_FIELDS, DESTINATION_NON_SELECTED_FIELDS, RETURN_NON_SELECTED_FIELDS, ORDER_NON_SELECTED_FIELDS, SHIPPER_NON_SELECTED_FIELDS, CARRIER_SELECTED_FIELDS]
        });
        break;
      case REGEX_CONSTANT.PINCODE:
        fetchTableData(REGEX_CONSTANT.PINCODE);
        setLeftTable({
          header: FIELDS_COLUMN,
          body: [PINCODE_SELECTED_REGEX, PHONE_NUMBER_NON_SELECTED_REGEX, REFERENCE_NUMBER_NON_SELECTED_REGEX]
        });
        break;
      case REGEX_CONSTANT.PHONE_NUMBER:
        fetchTableData(REGEX_CONSTANT.PHONE_NUMBER);
        setLeftTable({
          header: FIELDS_COLUMN,
          body: [PINCODE_NON_SELECTED_REGEX, PHONE_NUMBER_SELECTED_REGEX, REFERENCE_NUMBER_NON_SELECTED_REGEX]
        });
        break;
      case REGEX_CONSTANT.REFERENCE_NUMBER:
        fetchTableData(REGEX_CONSTANT.REFERENCE_NUMBER);
        setLeftTable({
          header: FIELDS_COLUMN,
          body: [PINCODE_NON_SELECTED_REGEX, PHONE_NUMBER_NON_SELECTED_REGEX, REFERENCE_NUMBER_SELECTED_REGEX]
        });
        break;
      default:
        fetchTableData(null);
        setInnerTableHeader(FIELDS_TABLE_HEADER);
        setLeftTable({
          header: FIELDS_COLUMN,
          body: [ORIGIN_SELECTED_FIELDS, DESTINATION_NON_SELECTED_FIELDS, RETURN_NON_SELECTED_FIELDS, ORDER_NON_SELECTED_FIELDS, SHIPPER_NON_SELECTED_FIELDS, CARRIER_NON_SELECTED_FIELDS]
        });
        break;
    }
  };
  var closeAddFieldValidationFormHandler = () => {
    setShowLoading(false);
    setShowModalDialogForm(false);
    setEditData(undefined);
  };
  var addValidationRuleHandler = () => {
    setOperationType(OPERATIONS.ADD);
    setShowModalDialogForm(true);
  };
  var saveValidationFormHandler = data => {
    setShowLoading(true);
    if (activeTabKey === DATA_VALIDATION.VALIDATION_RULES) {
      data.rulesData['rightValue'] = data.rulesData['rightValue'].trim();
      saveValidationRule(data.rulesData).then(response => {
        setShowLoading(false);
        if (response.status === 200) {
          if (response.data.status === 'Success') {
            notifyResponseMessage(STATUS.SUCCESS, response.data.message);
            closeAddFieldValidationFormHandler();
            fetchTableData(DATA_VALIDATION.VALIDATION_RULES);
          } else {
            notifyResponseMessage(STATUS.ERROR, response.data.message);
          }
        }
      }).catch(error => {
        setShowLoading(false);
        notifyResponseMessage(STATUS.ERROR, error);
      });
    } else if (activeTabKey === DATA_VALIDATION.FIELDS) {
      if (data.rulesCount !== undefined && data.rulesCount === 0 && data.operationType !== OPERATIONS.EDIT) {
        notifyResponseMessage(STATUS.ERROR, 'Please Add at lease 1 Rule');
        return;
      }
      saveValidationFields(data.rulesData, data.attributeId, data.attributeValidationId).then(response => {
        setShowLoading(false);
        if (response.status === 200) {
          if (response.data.status === 'Success') {
            notifyResponseMessage(STATUS.SUCCESS, response.data.message);
            closeAddFieldValidationFormHandler();
            fetchTableData(activeSubTabKey);
          } else {
            notifyResponseMessage(STATUS.ERROR, response.data.message);
          }
        }
      }).catch(error => {
        setShowLoading(false);
        notifyResponseMessage(STATUS.ERROR, error);
      });
    }
  };
  var actionMenuHandler = item => {
    switch (item.key) {
      case OPERATIONS.EDIT:
        break;
      case OPERATIONS.DELETE:
        break;
      default:
        break;
    }
  };
  var actionMenu = () => {
    /*#__PURE__*/React.createElement(Menu, {
      className: "font-family-weight-500 fs14 ls22",
      style: {
        width: 200,
        color: '#212121',
        display: 'table'
      },
      onClick: actionMenuHandler
    }, /*#__PURE__*/React.createElement(Menu.Item, {
      key: OPERATIONS.EDIT
    }, /*#__PURE__*/React.createElement("div", {
      className: "ant-dropdown-link"
    }, containerConstants.formatString(containerConstants.EDIT))), /*#__PURE__*/React.createElement(Menu.Item, {
      key: OPERATIONS.DELETE
    }, /*#__PURE__*/React.createElement("div", {
      className: "ant-dropdown-link"
    }, containerConstants.formatString(containerConstants.DELETE))));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DataValidationStyle, null), /*#__PURE__*/React.createElement(BreadCrumb, {
    urlList: store.fromNewSetting ? urlListForNewSetting : urlList
  }), showDeleteConfirmMessage && /*#__PURE__*/React.createElement(Modal, {
    className: "awb-gen-form-modal",
    title: containerConstants.formatString(containerConstants.DELETE) + ' ?',
    maskClosable: "true",
    style: {
      paddingBottom: '0px'
    },
    bodyStyle: {
      padding: '10 24px'
    },
    visible: true,
    onOk: () => deleteValidationTabFormRow(showDeleteConfirmMessage, OPERATIONS.DELETE),
    okText: containerConstants.formatString(containerConstants.DELETE),
    onCancel: () => setShowDeleteConfirmMessage(false)
  }, containerConstants.formatString(containerConstants.DELETE_DESCRIPTION)), showModalDialogForm && /*#__PURE__*/React.createElement(ModalDialog, {
    showLoading: showLoading,
    rules: editRuleData,
    closeAddFieldValidationForm: closeAddFieldValidationFormHandler,
    saveValidationForm: saveValidationFormHandler,
    activeTab: activeTabKey,
    operationType: operationType,
    editData: editData
  }), innerTableData !== undefined && /*#__PURE__*/React.createElement(CustomCard, {
    tabList: tabList,
    showLoading: showLoading,
    activeTabKey: activeTabKey,
    leftTable: leftTable,
    innerTableData: typeof innerTableData === 'object' && Object.keys(innerTableData).length === 0 ? [] : innerTableData,
    innerTableHeader: innerTableHeader,
    tableWidth: tableWidth,
    topButton: topButton,
    changeTable: changeTableHandler,
    onMainTabChange: onMainTabChange,
    addValidationRule: addValidationRuleHandler,
    CustomCell: CustomCell
  }));
};
export default DataValidation;
//# sourceMappingURL=data_validation.js.map