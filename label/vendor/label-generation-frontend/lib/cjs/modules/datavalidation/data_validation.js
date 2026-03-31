"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ContainerConstants = require("../../utils/containerconstants/ContainerConstants");
var _constants = require("../../utils/constants");
var _DataValidationAction = require("../APIConfig/DataValidationAction");
var _notifyResponseMessage = require("../commoncomponent/NotificationComponent/notifyResponseMessage");
var _modal_dialog = _interopRequireDefault(require("./modaldialog/modal_dialog"));
var _bread_crumb = _interopRequireDefault(require("../commoncomponent/breadcrumb/bread_crumb"));
var _custom_card = _interopRequireDefault(require("../commoncomponent/customcard/custom_card"));
var _antd = require("antd");
var _MoreOutlined = _interopRequireDefault(require("../../modules/commoncomponent/CustomIcons/MoreOutlined"));
var _dataValidationStyle = _interopRequireDefault(require("./dataValidationStyle.js"));
var _store = require("../hook-store/store");
var _BasePath = require("../commoncomponent/BasePath");
const _excluded = ["children", "record"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const DataValidation = props => {
  const store = (0, _store.useStore)(true)[0];
  const editRuleData = (0, _react.useState)({})[0];
  const [basePath, setBasePath] = (0, _react.useState)('');
  const urlList = [{
    url: basePath + '/v2/label_generation/v2/settings',
    heading: containerConstants.formatString(containerConstants.SETTINGS)
  }, {
    url: basePath + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: basePath + '/v2/label_generation/data_validation/',
    heading: containerConstants.formatString(containerConstants.DATA_VALIDATION)
  }];
  const urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: '/v2/new_settings/label_generation/data_validation',
    heading: containerConstants.formatString(containerConstants.DATA_VALIDATION)
  }];
  const [showLoading, setShowLoading] = (0, _react.useState)(false);
  const [activeTabKey, setActiveTabKey] = (0, _react.useState)(_constants.DATA_VALIDATION.FIELDS);
  const [activeSubTabKey, setActiveSubTabKey] = (0, _react.useState)(_constants.FIELDS_CONSTANT.ORIGIN);
  const [operationType, setOperationType] = (0, _react.useState)(_constants.OPERATIONS.ADD);
  const [editData, setEditData] = (0, _react.useState)(null);
  const [showModalDialogForm, setShowModalDialogForm] = (0, _react.useState)(false);
  const [innerTableData, setInnerTableData] = (0, _react.useState)({});
  const [tableWidth, setTableWidth] = (0, _react.useState)('84%');
  const [topButton, setTopButton] = (0, _react.useState)(false);
  const [leftTable, setLeftTable] = (0, _react.useState)({
    header: _constants.FIELDS_COLUMN,
    body: [_constants.ORIGIN_SELECTED_FIELDS, _constants.DESTINATION_NON_SELECTED_FIELDS, _constants.RETURN_NON_SELECTED_FIELDS, _constants.ORDER_NON_SELECTED_FIELDS, _constants.SHIPPER_NON_SELECTED_FIELDS, _constants.CARRIER_NON_SELECTED_FIELDS]
  });
  const [innerTableHeader, setInnerTableHeader] = (0, _react.useState)({});
  const [showPopover, setShowPopover] = (0, _react.useState)({
    visible: false,
    key: null
  });
  const [showDeleteConfirmMessage, setShowDeleteConfirmMessage] = (0, _react.useState)(false);
  const tabList = [{
    key: _constants.DATA_VALIDATION.FIELDS,
    tab: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs14 ls22"
    }, containerConstants.formatString(containerConstants.FIELDS))
  }, {
    key: _constants.DATA_VALIDATION.VALIDATION_RULES,
    tab: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs14 ls22"
    }, containerConstants.formatString(containerConstants.VALIDATION_RULES))
  }, {
    key: _constants.DATA_VALIDATION.REGEX_GUIDE,
    tab: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs14 ls22"
    }, containerConstants.formatString(containerConstants.REGEX_GUIDE))
  }];
  const openAddFieldValidationModel = (text, operation) => {
    setShowModalDialogForm(true);
    setOperationType(operation);
    setEditData(text);
    //text.validations !== null && text.validations !== undefined && fetchRules(text.serialNumber);
  };
  const editValidationTabFormRow = (text, operation) => {
    setShowModalDialogForm(true);
    setOperationType(operation);
    setEditData(text);
  };
  const deleteValidationTabFormRow = (text, operation) => {
    setShowDeleteConfirmMessage(false);
    (0, _DataValidationAction.deleteValidationRule)(text.id).then(response => {
      if (response.status === 200) {
        if (response.data.status === 'Success') {
          fetchTableData(_constants.DATA_VALIDATION.VALIDATION_RULES);
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, containerConstants.formatString(containerConstants.DELETED_SUCCESSFULLY));
        } else {
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, response.data.message);
        }
      }
    }).catch(error => {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
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

  (0, _react.useEffect)(() => {
    setBasePath((0, _BasePath.getBasePath)(props, store));
    document.title = containerConstants.formatString(containerConstants.DATA_VALIDATION);
    onMainTabChange(_constants.DATA_VALIDATION.FIELDS);
  }, [store.showCustom]);
  const fetchTableData = key => {
    setInnerTableData({});
    setShowLoading(true);
    switch (key) {
      case _constants.FIELDS_CONSTANT.ORIGIN:
        (0, _DataValidationAction.fetchValidationFields)(_constants.CONSTANT_ENUM.ORIGIN).then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data;
            let data = (_response$data = response.data) == null ? void 0 : _response$data.data[_constants.CONSTANT_ENUM.ORIGIN.toLowerCase()];
            data !== undefined && data !== null ? setInnerTableData(appendOpenAddFieldValidationModelMethodCall(data)) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
        });
        break;
      case _constants.FIELDS_CONSTANT.DESTINATION:
        (0, _DataValidationAction.fetchValidationFields)(_constants.CONSTANT_ENUM.DESTINATION).then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data2;
            let data = (_response$data2 = response.data) == null ? void 0 : _response$data2.data[_constants.CONSTANT_ENUM.DESTINATION.toLowerCase()];
            data !== undefined && data !== null ? setInnerTableData(appendOpenAddFieldValidationModelMethodCall(data)) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
        });
        break;
      case _constants.FIELDS_CONSTANT.RETURN:
        (0, _DataValidationAction.fetchValidationFields)(_constants.CONSTANT_ENUM.RETURN).then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data3;
            let data = (_response$data3 = response.data) == null ? void 0 : _response$data3.data['returnn'];
            data !== undefined && data !== null ? setInnerTableData(appendOpenAddFieldValidationModelMethodCall(data)) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
        });
        break;
      case _constants.FIELDS_CONSTANT.ORDER:
        (0, _DataValidationAction.fetchValidationFields)(_constants.CONSTANT_ENUM.ORDER).then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data4;
            let data = (_response$data4 = response.data) == null ? void 0 : _response$data4.data[_constants.CONSTANT_ENUM.ORDER.toLowerCase()];
            data !== undefined && data !== null ? setInnerTableData(appendOpenAddFieldValidationModelMethodCall(data)) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
        });
        break;
      case _constants.FIELDS_CONSTANT.SHIPPER:
        (0, _DataValidationAction.fetchValidationFields)(_constants.CONSTANT_ENUM.SHIPPER).then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data5;
            let data = (_response$data5 = response.data) == null ? void 0 : _response$data5.data[_constants.CONSTANT_ENUM.SHIPPER.toLowerCase()];
            data !== undefined && data !== null ? setInnerTableData(appendOpenAddFieldValidationModelMethodCall(data)) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
        });
        break;
      case _constants.FIELDS_CONSTANT.CARRIER:
        (0, _DataValidationAction.fetchValidationFields)(_constants.CONSTANT_ENUM.CARRIER).then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data6;
            let data = (_response$data6 = response.data) == null ? void 0 : _response$data6.data[_constants.CONSTANT_ENUM.CARRIER.toLowerCase()];
            data !== undefined && data !== null ? setInnerTableData(appendOpenAddFieldValidationModelMethodCall(data)) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
        });
        break;
      case _constants.REGEX_CONSTANT.PINCODE:
        (0, _DataValidationAction.fetchRegexGuide)().then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data7;
            let data = (_response$data7 = response.data) == null ? void 0 : _response$data7.data[_constants.CONSTANT_ENUM.PINCODE];
            data !== undefined && data !== null ? setInnerTableData(data) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
        });
        break;
      case _constants.REGEX_CONSTANT.PHONE_NUMBER:
        (0, _DataValidationAction.fetchRegexGuide)().then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data8;
            let data = (_response$data8 = response.data) == null ? void 0 : _response$data8.data[_constants.CONSTANT_ENUM.PHONE_NUMBER];
            data !== undefined && data !== null ? setInnerTableData(data) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
        });
        break;
      case _constants.REGEX_CONSTANT.REFERENCE_NUMBER:
        (0, _DataValidationAction.fetchRegexGuide)().then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data9;
            let data = (_response$data9 = response.data) == null ? void 0 : _response$data9.data[_constants.CONSTANT_ENUM.REFERENCE_NUMBER];
            data !== undefined && data !== null ? setInnerTableData(data) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
        });
        break;
      case _constants.DATA_VALIDATION.VALIDATION_RULES:
        (0, _DataValidationAction.fetchValidationRule)().then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data0;
            let data = (_response$data0 = response.data) == null ? void 0 : _response$data0.data['validationsRulesDto'];
            data !== undefined && data !== null && data.length > 0 ? setInnerTableData(data) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
        });
        break;
      default:
        (0, _DataValidationAction.fetchValidationFields)(_constants.CONSTANT_ENUM.ORIGIN).then(response => {
          setShowLoading(false);
          if (response.status === 200) {
            var _response$data1;
            let data = (_response$data1 = response.data) == null ? void 0 : _response$data1.data[_constants.CONSTANT_ENUM.ORIGIN.toLowerCase()];
            data !== undefined && data !== null ? setInnerTableData(appendOpenAddFieldValidationModelMethodCall(data)) : setInnerTableData([]);
          }
        }).catch(error => {
          setShowLoading(false);
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
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
  const appendOpenAddFieldValidationModelMethodCall = data => {
    data.forEach(function (item, index) {
      item.openAddFieldValidationModel = openAddFieldValidationModel;
    });
    return data;
  };
  const awbPopoverClasses = 'data-val-popover-icon flex align-center justify-center pointer mr10';
  const CustomCell = _ref => {
    let {
        children,
        record
      } = _ref,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
    return /*#__PURE__*/_react.default.createElement("td", restProps, record ? /*#__PURE__*/_react.default.createElement(_antd.Space, {
      size: "small",
      style: {
        flexDirection: 'row',
        display: 'flex'
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Popover, {
      overlayClassName: "data-val-table-popover"
      //   visible={record?.id === showPopover.key && showPopover.visible}
      //   onVisibleChange={(visible) => setShowPopover(visible ? { visible: visible, key: record.id } : {})}
      ,
      id: "data-val-table-popover-id",
      placement: "bottomLeft",
      trigger: "click",
      content: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 ls18"
      }, /*#__PURE__*/_react.default.createElement("p", {
        id: "pop_over_l_b",
        style: {
          marginBottom: '6px',
          cursor: 'pointer'
        },
        className: store.fromFCR ? '' : store.showCustom ? 'non_selectable' : '',
        onClick: () => {
          (store.fromFCR || !store.showCustom) && editValidationTabFormRow(record, _constants.OPERATIONS.EDIT_VALIDATION);
          setShowPopover({
            visible: false,
            key: null
          });
        }
      }, containerConstants.formatString(containerConstants.EDIT)), /*#__PURE__*/_react.default.createElement("p", {
        className: store.fromFCR ? '' : store.showCustom ? 'non_selectable' : '',
        style: {
          cursor: 'pointer'
        },
        onClick: () => (store.fromFCR || !store.showCustom) && setShowDeleteConfirmMessage(record)
      }, containerConstants.formatString(containerConstants.DELETE)))
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: (record == null ? void 0 : record.id) === showPopover.key ? awbPopoverClasses.concat(' ', 'selected bg-primary') : awbPopoverClasses
    }, /*#__PURE__*/_react.default.createElement(_MoreOutlined.default, {
      color: (record == null ? void 0 : record.id) === showPopover.key ? '#FFFFFF' : '#323232'
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal  fs12 ls18",
      style: {
        color: '#212121',
        'alignItems': 'center',
        'display': 'flex'
      }
    }, children[1])) : children[1]);
  };
  const FIELDS_TABLE_HEADER = [{
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500  fs10 ls18",
      style: {
        color: '#727272',
        textTransform: 'uppercase'
      }
    }, containerConstants.formatString(containerConstants.S_NO)),
    dataIndex: 'serialNumber',
    width: '4%',
    key: 'serialNumber',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal  fs12 ls18",
      style: {
        color: '#212121',
        'alignItems': 'center',
        'display': 'flex'
      }
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500  fs10 ls18",
      style: {
        color: '#727272',
        textTransform: 'uppercase'
      }
    }, containerConstants.formatString(containerConstants.FIELDS)),
    dataIndex: 'fields',
    width: '28%',
    key: 'fields',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal  fs12 ls18",
      style: {
        color: '#212121',
        'alignItems': 'center',
        'display': 'flex'
      }
    }, text ? text : '-')
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500  fs10 ls18",
      style: {
        color: '#727272',
        textTransform: 'uppercase'
      }
    }, containerConstants.formatString(containerConstants.TYPE)),
    dataIndex: 'type',
    width: '23%',
    key: 'type',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal  fs12 ls18",
      style: {
        color: '#212121',
        'alignItems': 'center',
        'display': 'flex'
      }
    }, text ? text : '-')
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500  fs10 ls18",
      style: {
        color: '#727272',
        textTransform: 'uppercase'
      }
    }, containerConstants.formatString(containerConstants.KEY)),
    key: 'key',
    width: '23%',
    dataIndex: 'key',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal  fs12 ls18",
      style: {
        color: '#212121',
        'alignItems': 'center',
        'display': 'flex'
      }
    }, text ? text : '-')
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500  fs10 ls18",
      style: {
        color: '#727272',
        textTransform: 'uppercase'
      }
    }, containerConstants.formatString(containerConstants.VALIDATIONS)),
    key: 'validations',
    width: '23%',
    render: (text, record) => text.validations === null || text.validations === undefined || text.validations === '' ? /*#__PURE__*/_react.default.createElement(_antd.Space, {
      style: {
        display: 'contents'
      },
      size: "middle"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal  fs14 ls22",
      style: {
        float: 'left',
        color: '#212121',
        'alignItems': 'center',
        'justifyContent': 'center',
        'display': 'flex'
      }
    }, "-"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
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
      onClick: () => text.openAddFieldValidationModel(record, _constants.OPERATIONS.ADD),
      ghost: true
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs12 ls18"
    }, containerConstants.formatString(containerConstants.ADD)))) : /*#__PURE__*/_react.default.createElement("div", {
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
      onClick: () => text.openAddFieldValidationModel(record, _constants.OPERATIONS.SHOW)
    }, countRules(text.validations), " ", containerConstants.formatString(containerConstants.VALIDATION))
  }];
  const countRules = rules => {
    var count = 0;
    var re = /&&|[||]{2}|\|/g;
    var match;
    while ((match = re.exec(rules)) != null) {
      count++;
    }
    return count + 1;
  };
  const onMainTabChange = key => {
    setActiveTabKey(key);
    switch (key) {
      case _constants.DATA_VALIDATION.REGEX_GUIDE:
        setLeftTable({
          header: _constants.FIELDS_COLUMN,
          body: [_constants.PINCODE_SELECTED_REGEX, _constants.PHONE_NUMBER_NON_SELECTED_REGEX, _constants.REFERENCE_NUMBER_NON_SELECTED_REGEX]
        });
        setActiveSubTabKey(_constants.REGEX_CONSTANT.PINCODE);
        setTableWidth('84%');
        setTopButton(false);
        fetchTableData(_constants.REGEX_CONSTANT.PINCODE);
        setInnerTableHeader(_constants.REGEX_GUIDE_TABLE_HEADER);
        break;
      case _constants.DATA_VALIDATION.FIELDS:
        setLeftTable({
          header: _constants.FIELDS_COLUMN,
          body: [_constants.ORIGIN_SELECTED_FIELDS, _constants.DESTINATION_NON_SELECTED_FIELDS, _constants.RETURN_NON_SELECTED_FIELDS, _constants.ORDER_NON_SELECTED_FIELDS, _constants.SHIPPER_NON_SELECTED_FIELDS, _constants.CARRIER_NON_SELECTED_FIELDS]
        });
        setTableWidth('84%');
        setTopButton(false);
        setActiveSubTabKey(_constants.FIELDS_CONSTANT.ORIGIN);
        fetchTableData(_constants.FIELDS_CONSTANT.ORIGIN);
        setInnerTableHeader(FIELDS_TABLE_HEADER);
        break;
      case _constants.DATA_VALIDATION.VALIDATION_RULES:
        setLeftTable({});
        setTopButton(true);
        setTableWidth('100%');
        fetchTableData(_constants.DATA_VALIDATION.VALIDATION_RULES);
        setActiveSubTabKey(null);
        setInnerTableHeader(_constants.VALIDATION_RULES_TABLE_HEADER);
        break;
      default:
        setLeftTable({
          header: _constants.FIELDS_COLUMN,
          body: [_constants.ORIGIN_SELECTED_FIELDS, _constants.DESTINATION_NON_SELECTED_FIELDS, _constants.RETURN_NON_SELECTED_FIELDS, _constants.ORDER_NON_SELECTED_FIELDS, _constants.SHIPPER_NON_SELECTED_FIELDS, _constants.CARRIER_NON_SELECTED_FIELDS]
        });
        setTableWidth('84%');
        setTopButton(false);
        setActiveSubTabKey(_constants.FIELDS_CONSTANT.ORIGIN);
        fetchTableData(_constants.FIELDS_CONSTANT.ORIGIN);
        setInnerTableHeader(FIELDS_TABLE_HEADER);
        break;
    }
  };
  const changeTableHandler = record => {
    setActiveSubTabKey(record.name);
    switch (record.name) {
      case _constants.FIELDS_CONSTANT.ORIGIN:
        fetchTableData(_constants.FIELDS_CONSTANT.ORIGIN);
        setLeftTable({
          header: _constants.FIELDS_COLUMN,
          body: [_constants.ORIGIN_SELECTED_FIELDS, _constants.DESTINATION_NON_SELECTED_FIELDS, _constants.RETURN_NON_SELECTED_FIELDS, _constants.ORDER_NON_SELECTED_FIELDS, _constants.SHIPPER_NON_SELECTED_FIELDS, _constants.CARRIER_NON_SELECTED_FIELDS]
        });
        break;
      case _constants.FIELDS_CONSTANT.DESTINATION:
        fetchTableData(_constants.FIELDS_CONSTANT.DESTINATION);
        setLeftTable({
          header: _constants.FIELDS_COLUMN,
          body: [_constants.ORIGIN_NON_SELECTED_FIELDS, _constants.DESTINATION_SELECTED_FIELDS, _constants.RETURN_NON_SELECTED_FIELDS, _constants.ORDER_NON_SELECTED_FIELDS, _constants.SHIPPER_NON_SELECTED_FIELDS, _constants.CARRIER_NON_SELECTED_FIELDS]
        });
        break;
      case _constants.FIELDS_CONSTANT.RETURN:
        fetchTableData(_constants.FIELDS_CONSTANT.RETURN);
        setLeftTable({
          header: _constants.FIELDS_COLUMN,
          body: [_constants.ORIGIN_NON_SELECTED_FIELDS, _constants.DESTINATION_NON_SELECTED_FIELDS, _constants.RETURN_SELECTED_FIELDS, _constants.ORDER_NON_SELECTED_FIELDS, _constants.SHIPPER_NON_SELECTED_FIELDS, _constants.CARRIER_NON_SELECTED_FIELDS]
        });
        break;
      case _constants.FIELDS_CONSTANT.ORDER:
        fetchTableData(_constants.FIELDS_CONSTANT.ORDER);
        setLeftTable({
          header: _constants.FIELDS_COLUMN,
          body: [_constants.ORIGIN_NON_SELECTED_FIELDS, _constants.DESTINATION_NON_SELECTED_FIELDS, _constants.RETURN_NON_SELECTED_FIELDS, _constants.ORDER_SELECTED_FIELDS, _constants.SHIPPER_NON_SELECTED_FIELDS, _constants.CARRIER_NON_SELECTED_FIELDS]
        });
        break;
      case _constants.FIELDS_CONSTANT.SHIPPER:
        fetchTableData(_constants.FIELDS_CONSTANT.SHIPPER);
        setLeftTable({
          header: _constants.FIELDS_COLUMN,
          body: [_constants.ORIGIN_NON_SELECTED_FIELDS, _constants.DESTINATION_NON_SELECTED_FIELDS, _constants.RETURN_NON_SELECTED_FIELDS, _constants.ORDER_NON_SELECTED_FIELDS, _constants.SHIPPER_SELECTED_FIELDS, _constants.CARRIER_NON_SELECTED_FIELDS]
        });
        break;
      case _constants.FIELDS_CONSTANT.CARRIER:
        fetchTableData(_constants.FIELDS_CONSTANT.CARRIER);
        setLeftTable({
          header: _constants.FIELDS_COLUMN,
          body: [_constants.ORIGIN_NON_SELECTED_FIELDS, _constants.DESTINATION_NON_SELECTED_FIELDS, _constants.RETURN_NON_SELECTED_FIELDS, _constants.ORDER_NON_SELECTED_FIELDS, _constants.SHIPPER_NON_SELECTED_FIELDS, _constants.CARRIER_SELECTED_FIELDS]
        });
        break;
      case _constants.REGEX_CONSTANT.PINCODE:
        fetchTableData(_constants.REGEX_CONSTANT.PINCODE);
        setLeftTable({
          header: _constants.FIELDS_COLUMN,
          body: [_constants.PINCODE_SELECTED_REGEX, _constants.PHONE_NUMBER_NON_SELECTED_REGEX, _constants.REFERENCE_NUMBER_NON_SELECTED_REGEX]
        });
        break;
      case _constants.REGEX_CONSTANT.PHONE_NUMBER:
        fetchTableData(_constants.REGEX_CONSTANT.PHONE_NUMBER);
        setLeftTable({
          header: _constants.FIELDS_COLUMN,
          body: [_constants.PINCODE_NON_SELECTED_REGEX, _constants.PHONE_NUMBER_SELECTED_REGEX, _constants.REFERENCE_NUMBER_NON_SELECTED_REGEX]
        });
        break;
      case _constants.REGEX_CONSTANT.REFERENCE_NUMBER:
        fetchTableData(_constants.REGEX_CONSTANT.REFERENCE_NUMBER);
        setLeftTable({
          header: _constants.FIELDS_COLUMN,
          body: [_constants.PINCODE_NON_SELECTED_REGEX, _constants.PHONE_NUMBER_NON_SELECTED_REGEX, _constants.REFERENCE_NUMBER_SELECTED_REGEX]
        });
        break;
      default:
        fetchTableData(null);
        setInnerTableHeader(FIELDS_TABLE_HEADER);
        setLeftTable({
          header: _constants.FIELDS_COLUMN,
          body: [_constants.ORIGIN_SELECTED_FIELDS, _constants.DESTINATION_NON_SELECTED_FIELDS, _constants.RETURN_NON_SELECTED_FIELDS, _constants.ORDER_NON_SELECTED_FIELDS, _constants.SHIPPER_NON_SELECTED_FIELDS, _constants.CARRIER_NON_SELECTED_FIELDS]
        });
        break;
    }
  };
  const closeAddFieldValidationFormHandler = () => {
    setShowLoading(false);
    setShowModalDialogForm(false);
    setEditData(undefined);
  };
  const addValidationRuleHandler = () => {
    setOperationType(_constants.OPERATIONS.ADD);
    setShowModalDialogForm(true);
  };
  const saveValidationFormHandler = data => {
    setShowLoading(true);
    if (activeTabKey === _constants.DATA_VALIDATION.VALIDATION_RULES) {
      data.rulesData['rightValue'] = data.rulesData['rightValue'].trim();
      (0, _DataValidationAction.saveValidationRule)(data.rulesData).then(response => {
        setShowLoading(false);
        if (response.status === 200) {
          if (response.data.status === 'Success') {
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, response.data.message);
            closeAddFieldValidationFormHandler();
            fetchTableData(_constants.DATA_VALIDATION.VALIDATION_RULES);
          } else {
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, response.data.message);
          }
        }
      }).catch(error => {
        setShowLoading(false);
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
      });
    } else if (activeTabKey === _constants.DATA_VALIDATION.FIELDS) {
      if (data.rulesCount !== undefined && data.rulesCount === 0 && data.operationType !== _constants.OPERATIONS.EDIT) {
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, 'Please Add at lease 1 Rule');
        return;
      }
      (0, _DataValidationAction.saveValidationFields)(data.rulesData, data.attributeId, data.attributeValidationId).then(response => {
        setShowLoading(false);
        if (response.status === 200) {
          if (response.data.status === 'Success') {
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, response.data.message);
            closeAddFieldValidationFormHandler();
            fetchTableData(activeSubTabKey);
          } else {
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, response.data.message);
          }
        }
      }).catch(error => {
        setShowLoading(false);
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
      });
    }
  };
  const actionMenuHandler = item => {
    switch (item.key) {
      case _constants.OPERATIONS.EDIT:
        break;
      case _constants.OPERATIONS.DELETE:
        break;
      default:
        break;
    }
  };
  const actionMenu = () => {
    /*#__PURE__*/_react.default.createElement(_antd.Menu, {
      className: "font-family-weight-500 fs14 ls22",
      style: {
        width: 200,
        color: '#212121',
        display: 'table'
      },
      onClick: actionMenuHandler
    }, /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
      key: _constants.OPERATIONS.EDIT
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "ant-dropdown-link"
    }, containerConstants.formatString(containerConstants.EDIT))), /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
      key: _constants.OPERATIONS.DELETE
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "ant-dropdown-link"
    }, containerConstants.formatString(containerConstants.DELETE))));
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_dataValidationStyle.default, null), /*#__PURE__*/_react.default.createElement(_bread_crumb.default, {
    urlList: store.fromNewSetting ? urlListForNewSetting : urlList
  }), showDeleteConfirmMessage && /*#__PURE__*/_react.default.createElement(_antd.Modal, {
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
    onOk: () => deleteValidationTabFormRow(showDeleteConfirmMessage, _constants.OPERATIONS.DELETE),
    okText: containerConstants.formatString(containerConstants.DELETE),
    onCancel: () => setShowDeleteConfirmMessage(false)
  }, containerConstants.formatString(containerConstants.DELETE_DESCRIPTION)), showModalDialogForm && /*#__PURE__*/_react.default.createElement(_modal_dialog.default, {
    showLoading: showLoading,
    rules: editRuleData,
    closeAddFieldValidationForm: closeAddFieldValidationFormHandler,
    saveValidationForm: saveValidationFormHandler,
    activeTab: activeTabKey,
    operationType: operationType,
    editData: editData
  }), innerTableData !== undefined && /*#__PURE__*/_react.default.createElement(_custom_card.default, {
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
var _default = exports.default = DataValidation;
//# sourceMappingURL=data_validation.js.map