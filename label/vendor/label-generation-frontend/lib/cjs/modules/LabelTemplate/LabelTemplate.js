"use strict";

exports.__esModule = true;
exports.default = void 0;
var _EmptyDataView = _interopRequireDefault(require("./EmptyDataView"));
var _react = _interopRequireWildcard(require("react"));
var _ContainerConstants = require("../../utils/containerconstants/ContainerConstants");
var _bread_crumb = _interopRequireDefault(require("../commoncomponent/breadcrumb/bread_crumb"));
var _LabelTemplateStyle = _interopRequireDefault(require("./LabelTemplateStyle.js"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
var _MoreOutlined = _interopRequireDefault(require("../commoncomponent/CustomIcons/MoreOutlined"));
var _HtmlEditor = _interopRequireDefault(require("./HtmlEditor"));
var _constants = require("../../utils/constants");
var _CustomModal = _interopRequireDefault(require("./CustomModal"));
var _LabelTemplateAction = require("../APIConfig/LabelTemplateAction");
var _notifyResponseMessage = require("../commoncomponent/NotificationComponent/notifyResponseMessage");
var _CustomPagination = _interopRequireDefault(require("../commoncomponent/CustomPagination/CustomPagination"));
var _lodash = require("lodash");
var _store = require("../hook-store/store");
var _BasePath = require("../commoncomponent/BasePath");
const _excluded = ["children", "record"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const LabelTemplate = props => {
  const store = (0, _store.useStore)(true)[0];
  const [showModalDialog, setShowModalDialog] = (0, _react.useState)(false);
  const [showPopover, setShowPopover] = (0, _react.useState)({
    visible: false,
    key: null,
    leftTab: null
  });
  const [pageDetail, setPageDetail] = (0, _react.useState)({
    current: 0,
    pageSize: 10
  });
  const [paginationDetails, setPaginationDetails] = (0, _react.useState)({
    totalElements: 0,
    numberOfElements: 0,
    pageSizeText: _constants.PAGE_SIZE.PAGE_10
  });
  const [showEditor, setShowEditor] = (0, _react.useState)({
    visible: false
  });
  const [showTable, setShowTable] = (0, _react.useState)(true);
  const [statusUpdate, setStatusUpdate] = (0, _react.useState)(false);
  const [labelTemplateList, setLabelTemplateList] = (0, _react.useState)([]);
  const [showConfirmModalDialog, setShowConfirmModalDialog] = (0, _react.useState)({
    visible: false,
    okText: '',
    title: ''
  });
  const [showLoading, setShowLoading] = (0, _react.useState)(false);
  const [partyMasterCodeSet, setPartyMasterCodeSet] = (0, _react.useState)(new Set());
  const [partyMasterCodeOptios, setPartyMasterCodeOptios] = (0, _react.useState)([]);
  const [avaliablePartyMasterCodeOptios, setAvaliablePartyMasterCodeOptios] = (0, _react.useState)([]);
  const [searchfilters, setSearchfilters] = (0, _react.useState)('');
  const searchedColumn = (0, _react.useState)()[0];
  const searchText = (0, _react.useState)()[0];
  const searchInput = (0, _react.useState)()[0];
  const [linkedPartyCodes, setLinkedPartyCodes] = (0, _react.useState)([]);
  const [templateCodeForAddParty, setTemplateCodeForAddParty] = (0, _react.useState)(false);
  const [showModalDialogLinkParty, setShowModalDialogLinkParty] = (0, _react.useState)(false);
  const [basePath, setBasePath] = (0, _react.useState)('');
  const getColumnSearchProps = (dataValue, dataIndex) => ({
    filterDropdown: _ref => {
      let {
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      } = _ref;
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          padding: 8
        }
      }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
        placeholder: "Search " + dataValue,
        value: searchfilters,
        onChange: e => {
          setSearchfilters(e.target.value);
          return e.target.value;
        },
        onPressEnter: () => handleSearch(selectedKeys, confirm, dataIndex),
        style: {
          width: 188,
          marginBottom: 8,
          display: 'block'
        }
      }), /*#__PURE__*/_react.default.createElement(_antd.Space, null, /*#__PURE__*/_react.default.createElement(_antd.Button, {
        type: "primary",
        onClick: () => handleSearch(selectedKeys, confirm, dataIndex),
        icon: /*#__PURE__*/_react.default.createElement(_icons.SearchOutlined, null),
        size: "small",
        style: {
          width: 90
        }
      }, containerConstants.formatString(containerConstants.SEARCH)), /*#__PURE__*/_react.default.createElement(_antd.Button, {
        onClick: () => handleReset(dataIndex),
        size: "small",
        style: {
          width: 90
        }
      }, containerConstants.formatString(containerConstants.RESET))));
    },
    filterIcon: filtered => /*#__PURE__*/_react.default.createElement(_icons.SearchOutlined, {
      style: {
        fontSize: '14px',
        marginRight: '10px',
        color: '#727272'
      }
    }),
    onFilter: (value, record) => record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput && searchInput.select(), 100);
      }
    },
    render: text => searchedColumn === dataIndex ? searchText : text
  });
  const urlList = [{
    url: basePath + '/v2/label_generation/v2/settings',
    heading: containerConstants.formatString(containerConstants.SETTINGS)
  }, {
    url: basePath + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: basePath + '/v2/label_generation/label_templates',
    heading: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, containerConstants.formatString(containerConstants.LABEL_TEMPLATES)))
  }];
  const urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: '/v2/new_settings/label_generation/label_templates',
    heading: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, containerConstants.formatString(containerConstants.LABEL_TEMPLATES)))
  }];
  const getAllPartyMaster = async () => {
    await (0, _LabelTemplateAction.fetchAllPartyMaster)().then(response => {
      if (response && response.status === 200) {
        var _response$data;
        let partyMasterCodeSet1 = new Set();
        let partyMasterCodeOption = [];
        const partyMasterList = (_response$data = response.data) == null ? void 0 : _response$data.data;
        partyMasterList && partyMasterList.map(partyMaster => {
          partyMaster && partyMasterCodeSet1.add(partyMaster.merchantCode);
          partyMaster && partyMasterCodeOption.push({
            label: partyMaster.merchantCode,
            value: partyMaster.merchantCode
          });
        });
        setPartyMasterCodeSet(partyMasterCodeSet1);
        setPartyMasterCodeOptios(partyMasterCodeOption);
      }
    }).catch(error => {});
  };
  const getAllTemplate = async () => {
    setShowLoading(true);
    await (0, _LabelTemplateAction.fetchLabelTemplateList)(pageDetail.current, pageDetail.pageSize, searchfilters).then(response => {
      setShowLoading(false);
      if (response && response.status === 'Success') {
        if (response.data) {
          const labelTemplateListRes = response.data.content;
          if (!(0, _lodash.isEmpty)(labelTemplateListRes)) {
            setLabelTemplateList(labelTemplateListRes);
            setShowTable(true);
            setPaginationDetails({
              totalElements: response.data.totalElements,
              numberOfElements: response.data.numberOfElements,
              pageSizeText: paginationDetails.pageSizeText
            });
          } else {
            if (response.data.totalElements > 0 && pageDetail.current > 0) {
              setPageDetail({
                current: pageDetail.current - 1,
                pageSize: pageDetail.pageSize
              });
              setShowTable(true);
            } else {
              setShowTable(false);
              setLabelTemplateList(labelTemplateListRes);
            }
          }
        } else {
          setShowTable(false);
        }
      }
    }).catch(error => {
      setShowLoading(false);
    });
  };
  (0, _react.useEffect)(() => {
    setBasePath((0, _BasePath.getBasePath)(props, store));
    document.title = containerConstants.formatString(containerConstants.LABEL_TEMPLATES);
    const fetchParty = async () => {
      if (partyMasterCodeSet.size === 0) {
        await getAllPartyMaster();
      }
    };
    fetchParty();
    const fetchTemplate = async () => {
      await getAllTemplate();
    };
    fetchTemplate();
  }, [showTable, statusUpdate, pageDetail, showEditor, partyMasterCodeSet.size]);
  const updateTemplateStatus = async (record, publishTemplateReqObj) => {
    const status = (record == null ? void 0 : record.status) === _constants.STATUS.ACTIVE ? false : true;
    const templateUpdateStatusReqObj = {
      [_constants.DATA_INDEX.TEMPLATE_ID]: record == null ? void 0 : record.id,
      [_constants.DATA_INDEX.IS_ACTIVE]: status
    };
    let responseStatus = '';
    let responseMessage = publishTemplateReqObj === undefined ? containerConstants.formatString(containerConstants.STATUS_UPDATE_SUCCESSFULLY) : containerConstants.formatString(containerConstants.TEMPLATE_SAVED_SUCCESSFULLY);
    try {
      setShowLoading(true);
      const templateResponse = await (0, _LabelTemplateAction.activateDeactivateLabelTemplate)(record ? templateUpdateStatusReqObj : publishTemplateReqObj);
      setShowLoading(false);
      if (templateResponse && templateResponse.status === 200) {
        var _templateResponse$dat, _templateResponse$dat2;
        responseStatus = (_templateResponse$dat = templateResponse.data) == null ? void 0 : _templateResponse$dat.status;
        responseMessage = (0, _lodash.toUpper)(responseStatus) === _constants.STATUS.SUCCESS ? responseMessage : (_templateResponse$dat2 = templateResponse.data) == null ? void 0 : _templateResponse$dat2.message;
      }
    } catch (error) {
      setShowLoading(false);
    }
    if ((0, _lodash.toUpper)(responseStatus) === _constants.STATUS.SUCCESS) {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, responseMessage);
      setShowPopover({
        visible: false,
        key: null,
        leftTab: null
      });
      setStatusUpdate(prev => !prev);
      return responseStatus;
    } else {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, responseMessage);
    }
  };
  const deleteTemplate = id => {
    setShowLoading(true);
    (0, _LabelTemplateAction.deleteLabelTemplate)(id).then(response => {
      setShowLoading(false);
      if (response.status === 200) {
        var _response$data2;
        if ((0, _lodash.toUpper)((_response$data2 = response.data) == null ? void 0 : _response$data2.status) === _constants.STATUS.SUCCESS) {
          var _response$data3;
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, response == null || (_response$data3 = response.data) == null ? void 0 : _response$data3.message);
          setStatusUpdate(prev => !prev);
          setShowTable(true);
          getAllTemplate();
        } else {
          var _response$data4;
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, response == null || (_response$data4 = response.data) == null ? void 0 : _response$data4.message);
        }
      }
    }).catch(error => {
      setShowLoading(false);
    });
  };
  const clickPopoverEditHandler = dataObject => {
    setShowEditor({
      visible: true,
      operationType: _constants.OPERATIONS.EDIT,
      [_constants.DATA_INDEX.TEMPLATE_ID]: dataObject.id,
      [_constants.DATA_INDEX.TEMPLATE_STATUS]: dataObject.status,
      [_constants.DATA_INDEX.TEMPLATE_SCRIPT]: dataObject.script,
      [_constants.DATA_INDEX.TEMPLATE_NAME]: dataObject.name
    });
    setShowPopover({
      visible: false,
      key: null,
      leftTab: null
    });
  };
  const templatePopoverIconClasses = 'template-popover-icon flex align-center justify-center pointer mr10';
  const CustomCell = _ref2 => {
    let {
        children,
        record
      } = _ref2,
      restProps = _objectWithoutPropertiesLoose(_ref2, _excluded);
    return /*#__PURE__*/_react.default.createElement("td", restProps, record ? /*#__PURE__*/_react.default.createElement("div", {
      className: "flex align-center"
    }, /*#__PURE__*/_react.default.createElement(_antd.Popover
    // visible={record?.id === showPopover.key && showPopover.visible}
    // onVisibleChange={(visible) => setShowPopover(visible ? { visible: visible, key: record.id } : {})}
    , {
      id: "label_template_table_popover",
      placement: "bottomLeft",
      content: /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
        id: "label_template_table_popover_content",
        className: store.fromFCR ? '' : store.showCustom ? 'non_selectable' : '',
        onClick: () => (store.fromFCR || !store.showCustom) && clickPopoverEditHandler(record)
      }, containerConstants.formatString(containerConstants.EDIT)), /*#__PURE__*/_react.default.createElement("p", {
        id: "label_template_table_popover_content",
        className: store.fromFCR ? '' : store.showCustom ? 'non_selectable' : '',
        onClick: () => {
          (store.fromFCR || !store.showCustom) && setShowConfirmModalDialog({
            visible: true,
            okText: containerConstants.formatString(record.status === _constants.STATUS.ACTIVE ? containerConstants.INACTIVE : record.status === _constants.STATUS.DRAFT ? containerConstants.PUBLISH : containerConstants.ACTIVE),
            title: containerConstants.formatString(containerConstants.STATUS_UPDATE) + '?',
            description: containerConstants.formatString(containerConstants.CONFIRM_DESCRIPTION),
            record: record
          });
          (store.fromFCR || !store.showCustom) && setShowPopover({
            visible: false,
            key: null
          });
        }
      }, containerConstants.formatString(record.status === _constants.STATUS.ACTIVE ? containerConstants.INACTIVE : record.status === _constants.STATUS.DRAFT ? containerConstants.PUBLISH : containerConstants.ACTIVE)), /*#__PURE__*/_react.default.createElement("p", {
        className: store.fromFCR ? '' : store.showCustom ? 'non_selectable' : '',
        onClick: () => {
          (store.fromFCR || !store.showCustom) && setShowConfirmModalDialog({
            visible: true,
            okText: containerConstants.formatString(containerConstants.DELETE),
            title: containerConstants.formatString(containerConstants.DELETE) + '?',
            description: containerConstants.formatString(containerConstants.DELETE_DESCRIPTION),
            rowId: record.id
          });
          (store.fromFCR || !store.showCustom) && setShowPopover({
            visible: false,
            key: null
          });
        }
      }, containerConstants.formatString(containerConstants.DELETE))),
      trigger: "click"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: (record == null ? void 0 : record.id) === showPopover.key ? templatePopoverIconClasses.concat(' ', 'selected bg-primary') : templatePopoverIconClasses
    }, /*#__PURE__*/_react.default.createElement(_MoreOutlined.default, {
      color: (record == null ? void 0 : record.id) === showPopover.key ? '#FFFFFF' : '#323232'
    }))), /*#__PURE__*/_react.default.createElement("span", {
      style: {
        marginLeft: '12px'
      },
      className: "fw400 fs12 lh18"
    }, children)) : children);
  };
  const handlePageChange = val => {
    setPageDetail({
      current: val - 1,
      pageSize: pageDetail.pageSize
    });
  };
  const handlePgaeSizeChange = val => {
    let pageSize = 10;
    let pageSizeTxt = _constants.PAGE_SIZE.PAGE_10;
    switch (val) {
      case _constants.PAGE_SIZE.PAGE_10:
        pageSize = 10;
        pageSizeTxt = _constants.PAGE_SIZE.PAGE_10;
        break;
      case _constants.PAGE_SIZE.PAGE_20:
        pageSize = 20;
        pageSizeTxt = _constants.PAGE_SIZE.PAGE_20;
        break;
      case _constants.PAGE_SIZE.PAGE_50:
        pageSize = 50;
        pageSizeTxt = _constants.PAGE_SIZE.PAGE_50;
        break;
      case _constants.PAGE_SIZE.PAGE_100:
        pageSize = 100;
        pageSizeTxt = _constants.PAGE_SIZE.PAGE_100;
        break;
      default:
        break;
    }
    setPaginationDetails({
      totalElements: paginationDetails.totalElements,
      numberOfElements: paginationDetails.numberOfElements,
      pageSizeText: pageSizeTxt
    });
    setPageDetail({
      current: 0,
      pageSize: pageSize
    });
  };
  const getMenuForDropDown = partyCode => {
    const menus = partyCode && partyCode.split(",").map(data => {
      return /*#__PURE__*/_react.default.createElement(_antd.Menu.Item, {
        key: data
      }, data);
    });
    const menu = () => {
      return /*#__PURE__*/_react.default.createElement(_antd.Menu, null, menus);
    };
    return /*#__PURE__*/_react.default.createElement(_antd.Dropdown, {
      overlay: menu,
      placement: "bottomLeft"
    }, /*#__PURE__*/_react.default.createElement(_icons.DownOutlined, {
      style: {
        paddingRight: '8px',
        paddingLeft: '5px'
      },
      color: "#727272"
    }));
  };
  const closeLinkPartyDialog = () => {
    setTemplateCodeForAddParty(null);
    setLinkedPartyCodes([]);
    setShowModalDialogLinkParty(false);
  };
  const openLinkTemplateBox = data => {
    data && data.partyCode && data.partyCode.split(",").length > 0 && setLinkedPartyCodes(data.partyCode.split(","));
    setShowLoading(true);
    (0, _LabelTemplateAction.fetchLabelPartyMapping)().then(response => {
      setShowLoading(false);
      if (response && response.status === 200 && response.data && response.data.status === 'Success') {
        const mappedMerchantCode = new Set();
        response.data.data && Object.entries(response.data.data).map(item => {
          if (item[0] !== data.templateCode) {
            if (item[1].includes(",")) {
              item[1].split(",").forEach(merchantCode => mappedMerchantCode.add(merchantCode));
            } else {
              mappedMerchantCode.add(item[1]);
            }
          }
        });
        let availableMerchantCode = [];
        partyMasterCodeOptios.forEach(merchantCode => {
          if (!mappedMerchantCode.has(merchantCode.value)) {
            availableMerchantCode.push({
              label: merchantCode.value,
              value: merchantCode.value
            });
          }
        });
        setAvaliablePartyMasterCodeOptios(availableMerchantCode);
        setTemplateCodeForAddParty(data.templateCode);
        setShowModalDialogLinkParty(true);
      }
    }).catch(error => {
      setShowLoading(false);
    });
  };
  const saveLinkedParty = () => {
    setShowLoading(true);
    (0, _LabelTemplateAction.saveLabelTemplatePartyMapping)(linkedPartyCodes, templateCodeForAddParty).then(response => {
      setShowLoading(false);
      if (response && response.status === 200 && response.data && response.data.status === 'Success') {
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, containerConstants.formatString(containerConstants.SUCCESSFULLY_UPDATED));
        closeLinkPartyDialog();
        getAllTemplate();
      } else {
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, response && response.data && response.data.message ? response.data.message : containerConstants.formatString(containerConstants.SOMETHING_WENT_WRONG));
      }
    }).catch(error => {
      setShowLoading(false);
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
    });
  };
  const LABEL_TEMPLATE_TABLE_HEADER = [_extends({
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh16 ml26"
    }, containerConstants.formatString(containerConstants.NAME)),
    dataIndex: _constants.DATA_INDEX.NAME,
    width: '16%'
  }, getColumnSearchProps(_constants.DATA_INDEX.NAME, _constants.DATA_INDEX.NAME, _constants.DATA_INDEX.NAME), {
    onCell: (record, rowIndex) => ({
      record,
      rowIndex
    })
  }), {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh16"
    }, containerConstants.formatString(containerConstants.TEMPLATE_CODE)),
    dataIndex: _constants.DATA_INDEX.TEMPLATE_CODE,
    width: '16%',
    key: '1',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "fw400 fs12 lh18"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh16"
    }, containerConstants.formatString(containerConstants.CREATED_ON)),
    dataIndex: _constants.DATA_INDEX.CREATED_AT,
    width: '20%',
    key: '3',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "fw400 fs12 lh18"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh16"
    }, containerConstants.formatString(containerConstants.LAST_MODIFIED_ON)),
    dataIndex: _constants.DATA_INDEX.LAST_MODIFIED_AT,
    width: '20%',
    key: '4',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "fw400 fs12 lh18"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh16"
    }, containerConstants.formatString(containerConstants.PAGE_SIZE)),
    dataIndex: _constants.DATA_INDEX.PAGE_SIZE,
    width: '20%',
    key: '4',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "fw400 fs12 lh18"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh16"
    }, containerConstants.formatString(containerConstants.STATUS)),
    dataIndex: _constants.DATA_INDEX.STATUS,
    width: '10%',
    key: '6',
    render: text => /*#__PURE__*/_react.default.createElement(_antd.Tag, {
      className: 'font-family-weight-500 fs10 lh14 br4' + ((0, _lodash.toUpper)(text) === _constants.STATUS.ACTIVE ? ' status-tag-active' : ' status-tag-draft'),
      color: (0, _lodash.toUpper)(text) === _constants.STATUS.ACTIVE ? '#E2FFEA' : '#F3F3F3'
    }, (0, _lodash.toUpper)(text) === _constants.STATUS.INPROGRESS ? (0, _lodash.upperFirst)((0, _lodash.toLower)('Draft')) : (0, _lodash.upperFirst)((0, _lodash.toLower)(text)))
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.LINKED_PARTIES)),
    dataIndex: _constants.DATA_INDEX.PARTY_CODE,
    width: '20%',
    fixed: 'right',
    key: '5',
    render: (text, record, index) => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22",
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'right'
      }
    }, record && record.partyCode && record.partyCode.split(",").length > 0 && record.partyCode.split(",").length, record && record.partyCode && getMenuForDropDown(record.partyCode), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      ghost: true,
      style: {
        border: '1px solid',
        borderRadius: '4px'
      },
      type: "primary",
      onClick: text => openLinkTemplateBox(record)
    }, containerConstants.formatString(containerConstants.LINK_PARTIES)))
  }];
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    // Object.keys(allPartyNameWithMasterCodeMaps).map((key)=>{
    //   if(key.toLowerCase().includes(searchfilters[dataIndex].toLowerCase())){
    //     partycodes = partycodes === '' ? allPartyNameWithMasterCodeMaps[key] : partycodes + '&&##&&' + allPartyNameWithMasterCodeMaps[key];
    //   }
    // });
    // setEmptySearchResult(true);
    setShowTable(true);
    getAllTemplate();
  };
  const handleReset = dataIndex => {
    setSearchfilters('');
    setShowTable(true);
    getAllTemplate();
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: '100%'
    }
  }, console.log(labelTemplateList), /*#__PURE__*/_react.default.createElement(_LabelTemplateStyle.default, null), partyMasterCodeSet && partyMasterCodeSet.size > 0 && /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    title: containerConstants.formatString(containerConstants.LINK_PARTIES),
    visible: showModalDialogLinkParty,
    style: {
      width: '406px !important',
      height: '175px',
      borderRadius: '4px'
    },
    footer: [/*#__PURE__*/_react.default.createElement(_antd.Button, {
      key: "cancel",
      style: {
        color: '#727272',
        border: 0
      },
      onClick: closeLinkPartyDialog
    }, containerConstants.formatString(containerConstants.CANCEL)), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      loading: showLoading,
      key: "submit",
      type: "primary",
      onClick: saveLinkedParty
    }, containerConstants.formatString(containerConstants.DONE))],
    onCancel: closeLinkPartyDialog
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, {
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 6
  }, containerConstants.formatString(containerConstants.NAME)), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 18
  }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    mode: "multiple",
    allowClear: true,
    showArrow: true,
    style: {
      display: 'block'
    },
    onChange: value => {
      if (value) {
        setLinkedPartyCodes(value);
      }
    },
    placeholder: containerConstants.formatString(containerConstants.SELECT),
    value: linkedPartyCodes,
    options: avaliablePartyMasterCodeOptios
  })))), !showEditor.visible && /*#__PURE__*/_react.default.createElement(_bread_crumb.default, {
    urlList: store.fromNewSetting ? urlListForNewSetting : urlList,
    rightItem: showTable ? /*#__PURE__*/_react.default.createElement(_antd.Button, {
      disabled: store.fromFCR ? false : store.showCustom,
      className: "fw500",
      style: {
        display: 'flex',
        height: '24px',
        padding: '0 8px',
        borderRadius: '4px'
      },
      type: "primary",
      icon: /*#__PURE__*/_react.default.createElement(_icons.PlusOutlined, {
        style: {
          display: 'flex',
          alignSelf: 'center',
          fontSize: '10px'
        }
      }),
      onClick: () => setShowModalDialog({
        visible: true,
        title: containerConstants.formatString(containerConstants.CHOOSE_TEMPLATE),
        modalType: _constants.TEMPLATE_MODAL_TYPE.CHOOSE_TEMPLATE
      })
    }, containerConstants.formatString(containerConstants.CREATE_TEMPLATE)) : null
  }), /*#__PURE__*/_react.default.createElement(_antd.Spin, {
    id: "label-template-spin",
    wrapperClassName: "label-template-spin-height",
    spinning: showLoading
  }, !showEditor.visible && /*#__PURE__*/_react.default.createElement(_antd.Card, {
    id: "label-template",
    className: "m16",
    style: showTable ? {
      height: '100%',
      position: 'relative',
      zIndex: 0
    } : {
      position: 'relative',
      zIndex: 0
    },
    bodyStyle: {
      padding: '12px 16px',
      border: '1px solid #DDDDDD',
      boxSizing: 'border-box',
      borderRadius: '4px',
      background: '#FFFFFF',
      width: '100%',
      position: 'relative',
      height: showTable ? '100%' : 'auto'
    }
  }, !showTable && searchfilters === '' ? /*#__PURE__*/_react.default.createElement(_EmptyDataView.default, {
    setShowModalDialog
  }) : /*#__PURE__*/_react.default.createElement("div", {
    id: "label_template_table"
  }, /*#__PURE__*/_react.default.createElement(_antd.Table, {
    components: {
      body: {
        cell: CustomCell
      }
    },
    bordered: true,
    size: "middle",
    columns: LABEL_TEMPLATE_TABLE_HEADER,
    dataSource: labelTemplateList,
    scroll: {
      x: 900
    },
    pagination: false
  }), /*#__PURE__*/_react.default.createElement(_CustomPagination.default, {
    pageDetail: pageDetail,
    paginationDetails: paginationDetails,
    handlePageChange: handlePageChange,
    handlePgaeSizeChange: handlePgaeSizeChange,
    curentPageOption: paginationDetails.pageSizeText
  }))), showEditor.visible && /*#__PURE__*/_react.default.createElement(_HtmlEditor.default, {
    showEditor,
    setShowEditor,
    setShowTable,
    updateTemplateStatus
  }), !showEditor.visible && /*#__PURE__*/_react.default.createElement(_CustomModal.default, {
    showModalDialog,
    setShowEditor,
    setShowModalDialog,
    showConfirmModalDialog,
    setShowConfirmModalDialog,
    deleteTemplate,
    updateTemplateStatus
  })));
};
var _default = exports.default = LabelTemplate;
//# sourceMappingURL=LabelTemplate.js.map