"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _bread_crumb = _interopRequireDefault(require("../../modules/commoncomponent/breadcrumb/bread_crumb"));
var _ContainerConstants = require("../../utils/containerconstants/ContainerConstants");
var _antd = require("antd");
var _AWBGenerationSettingsStyle = _interopRequireDefault(require("./AWBGenerationSettingsStyle.js"));
var _AWBGenerationFormModal = _interopRequireDefault(require("./AWBGenerationFormModal"));
var _MdEdit = _interopRequireDefault(require("../commoncomponent/CustomIcons/MdEdit"));
var _constants = require("../../utils/constants");
var _lodash = require("lodash");
var _AWBEmptyDataView = _interopRequireDefault(require("./AWBEmptyDataView"));
var _AWBAddUploadModal = _interopRequireDefault(require("./AWBAddUploadModal"));
var _MoreOutlined = _interopRequireDefault(require("../../modules/commoncomponent/CustomIcons/MoreOutlined"));
var _AWBGenerationAction = require("../APIConfig/AWBGenerationAction");
var _notifyResponseMessage = require("../commoncomponent/NotificationComponent/notifyResponseMessage");
var _CustomPagination = _interopRequireDefault(require("../commoncomponent/CustomPagination/CustomPagination"));
var _icons = require("@ant-design/icons");
var _store = require("../hook-store/store");
var _BasePath = require("../commoncomponent/BasePath");
const _excluded = ["children", "record"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const AWBGenerationSettings = props => {
  const [showFormModalDialog, setShowFormModalDialog] = (0, _react.useState)({
    visible: false,
    okText: '',
    title: '',
    operation: '',
    data: {}
  });
  const [showDeleteModalDialog, setShowDeleteModalDialog] = (0, _react.useState)({
    visible: false,
    okText: '',
    title: ''
  });
  const [showCustomizedFormModalDialog, setShowCustomizedFormModalDialog] = (0, _react.useState)({
    visible: false,
    okText: '',
    title: ''
  });
  const [awbDefaultData, setAWBDefaultData] = (0, _react.useState)({});
  const [showModalDialogAddUpload, setShowModalDialogAddUpload] = (0, _react.useState)(false);
  const [awbTableData, setAWBTableData] = (0, _react.useState)([]);
  const [awbPartyCodeList, setAWBPartyCodeList] = (0, _react.useState)([]);
  const [showPopover, setShowPopover] = (0, _react.useState)({
    visible: false,
    key: null
  });
  const [showLoading, setShowLoading] = (0, _react.useState)(false);
  const [pageDetail, setPageDetail] = (0, _react.useState)({
    current: 0,
    pageSize: 10
  });
  const [paginationDetails, setPaginationDetails] = (0, _react.useState)({
    totalElements: 0,
    numberOfElements: 0,
    pageSizeText: _constants.PAGE_SIZE.PAGE_10
  });
  const [callOnlyAwbListAPI, setCallOnlyAwbListAPI] = (0, _react.useState)(false);
  const [allPartyMasterCodeWithNameMaps, setAllPartyMasterCodeWithNameMaps] = (0, _react.useState)({});
  const [allPartyNameWithMasterCodeMaps, setAllPartyNameWithMasterCodeMaps] = (0, _react.useState)({});
  const [emptySearchResult, setEmptySearchResult] = (0, _react.useState)(false);
  const [searchfilters, setSearchfilters] = (0, _react.useState)('');
  const [searchInput, setSearchInput] = (0, _react.useState)();
  const [fromSearch, setFromSearch] = (0, _react.useState)(false);
  const store = (0, _store.useStore)(true)[0];
  const searchedColumn = (0, _react.useState)()[0];
  const searchText = (0, _react.useState)()[0];
  const [basePath, setBasePath] = (0, _react.useState)('');
  const openFormModal = () => {
    // isEmpty(awbTableData) ?
    setShowModalDialogAddUpload(true);
    // setShowCustomizedFormModalDialog({
    //   visible: true,
    //   okText: containerConstants.formatString(containerConstants.ADD),
    //   title: containerConstants.formatString(containerConstants.ADD_AWB)
    // });
  };
  const awbPopoverClasses = 'awb-popover-icon flex align-center justify-center pointer mr10';
  const urlList = [{
    url: basePath + '/v2/label_generation/v2/settings',
    heading: containerConstants.formatString(containerConstants.SETTINGS)
  }, {
    url: basePath + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: basePath + '/v2/label_generation/shipment_no_generation',
    heading: containerConstants.formatString(containerConstants.AWB_GENERATION)
  }];
  const urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: '/v2/new_settings/label_generation/shipment_no_generation',
    heading: containerConstants.formatString(containerConstants.AWB_GENERATION)
  }];
  const deleteTableRow = id => {
    (0, _AWBGenerationAction.deleteAWBPartyConf)(id).then(response => {
      if (response.status === 200) {
        if (response.data.status === "Success") {
          setFromSearch(false);
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, response.data.message);
          setCallOnlyAwbListAPI(true);
          getInitializeLocalState();
        } else {
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, response.data.message);
        }
      }
    }).catch(error => {});
  };
  const editTableRow = dataObject => {
    setShowCustomizedFormModalDialog({
      visible: true,
      okText: containerConstants.formatString(containerConstants.SAVE),
      title: containerConstants.formatString(containerConstants.EDIT_AWB),
      operation: _constants.OPERATIONS.EDIT,
      data: dataObject
    });
  };
  const editDefaultDetails = () => {
    setShowFormModalDialog({
      visible: true,
      okText: containerConstants.formatString(containerConstants.SAVE),
      title: containerConstants.formatString(containerConstants.EDIT_DEFAULT_AWB),
      operation: _constants.OPERATIONS.EDIT,
      data: awbDefaultData
    });
  };
  (0, _react.useEffect)(() => {
    setBasePath((0, _BasePath.getBasePath)(props, store));
    document.title = containerConstants.formatString(containerConstants.AWB_GENERATION);
    getInitializeLocalState();
  }, [pageDetail]);
  const getInitializeLocalState = async () => {
    setShowLoading(true);
    const awbDefaultDetails = {};
    let allPartyMasterCodeWithNameMap = {};
    let allPartyNameWithMasterCodeMap = {};
    try {
      if (!callOnlyAwbListAPI) {
        const awbDefaultDetailsResponse = await (0, _AWBGenerationAction.fetchAWBDefaultDetails)();
        if (awbDefaultDetailsResponse.status === 200) {
          var _awbDefaultDetailsRes;
          setShowLoading(false);
          const awbDefaultDetailsData = (_awbDefaultDetailsRes = awbDefaultDetailsResponse.data) == null ? void 0 : _awbDefaultDetailsRes.data;
          if (awbDefaultDetailsData !== null) {
            const subCardKeys = Object.values(_constants.AWB_FORM_AND_CARD_TYPES);
            subCardKeys.forEach(subCardKey => {
              awbDefaultDetails[subCardKey] = {};
              _constants.FORM_AND_CARD_ELEMENTS_CONST[subCardKey].forEach(cardDetail => {
                awbDefaultDetailsData[cardDetail.name] !== null && awbDefaultDetailsData[cardDetail.name] !== undefined && (awbDefaultDetails[subCardKey][cardDetail.name] = awbDefaultDetailsData[cardDetail.name]);
              });
            });
            awbDefaultDetails['id'] = awbDefaultDetailsData == null ? void 0 : awbDefaultDetailsData.id;
            setAWBDefaultData(awbDefaultDetails);
          }
        } else {
          setShowLoading(false);
        }
        const allPartyMasterResponse = await (0, _AWBGenerationAction.fetchAllPartyMaster)();
        if (allPartyMasterResponse.status === 200) {
          var _allPartyMasterRespon;
          const allPartyMasterList = (_allPartyMasterRespon = allPartyMasterResponse.data) == null ? void 0 : _allPartyMasterRespon.data;
          allPartyMasterCodeWithNameMap = allPartyMasterList.reduce((previousMap, partyMasterObj) => {
            previousMap[partyMasterObj.merchantCode] = partyMasterObj.name;
            return previousMap;
          }, {});
          allPartyNameWithMasterCodeMap = allPartyMasterList.reduce((previousMap, partyMasterObj) => {
            previousMap[partyMasterObj.name] = previousMap[partyMasterObj.name] ? previousMap[partyMasterObj.name] + '&&##&&' + partyMasterObj.merchantCode : partyMasterObj.merchantCode;
            return previousMap;
          }, {});
          setAllPartyNameWithMasterCodeMaps(allPartyNameWithMasterCodeMap);
          setAllPartyMasterCodeWithNameMaps(allPartyMasterCodeWithNameMap);
        }
      }
      searchList('', Object.keys(awbDefaultDetails).length > 0 ? awbDefaultDetails : awbDefaultData, Object.keys(allPartyMasterCodeWithNameMap).length > 0 ? allPartyMasterCodeWithNameMap : allPartyMasterCodeWithNameMaps);
    } catch (error) {}
  };
  const searchList = async (partycodes, awbDefaultDetailsParam, allPartyMasterCodeWithNameMapParam) => {
    await (0, _AWBGenerationAction.searchAWBPartyListByPartyCode)(partycodes, pageDetail.current, pageDetail.pageSize).then(response => {
      if (response.status === 200) {
        if (response.data && response.data.data) {
          const awbPartyMasterDtoList = response.data.data.content;
          if (!(0, _lodash.isEmpty)(awbPartyMasterDtoList)) {
            const awbTableDataList = awbPartyMasterDtoList.map(awbDataObj => {
              const subCardKey = (0, _lodash.toLower)(awbDataObj[_constants.DATA_INDEX.SELECTED_FORM]);
              let {
                awbType,
                awbGenerationType
              } = awbDataObj;
              awbType = (0, _lodash.upperFirst)((0, _lodash.toLower)(awbType));
              awbGenerationType = subCardKey;
              const defaultData = (0, _lodash.isEqual)(awbType, _constants.FORM_TYPES[0]) ? awbDefaultDetailsParam[subCardKey] : {};
              const subCard = _extends({}, awbDataObj, defaultData, {
                awbType,
                awbGenerationType
              });
              return _extends({}, subCard, {
                [_constants.DATA_INDEX.PARTY_NAME]: allPartyMasterCodeWithNameMapParam[awbDataObj.partyCode]
              });
            });
            setAWBTableData(awbTableDataList);
            setPaginationDetails({
              totalElements: response.data.data.totalElements,
              numberOfElements: response.data.data.numberOfElements,
              pageSizeText: paginationDetails.pageSizeText
            });
            setFromSearch(false);
            setEmptySearchResult(false);
          } else {
            if (response.data.data.totalElements > 0 && pageDetail.current > 0) {
              setFromSearch(false);
              setEmptySearchResult(false);
              setPageDetail({
                current: pageDetail.current - 1,
                pageSize: pageDetail.pageSize
              });
            } else {
              setAWBTableData([]);
              setPaginationDetails({
                totalElements: 0,
                numberOfElements: 0,
                pageSizeText: paginationDetails.pageSizeText
              });
            }
          }
          setShowLoading(false);
        }
      }
    });
  };
  const getColDefaultDetailsJsx = (heading, dataIndex, spanSize, subCardName) => {
    return /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: spanSize
    }, /*#__PURE__*/_react.default.createElement(_antd.Space, {
      direction: "vertical",
      size: 2
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: {
        fontSize: 12
      }
    }, heading), /*#__PURE__*/_react.default.createElement("p", null, awbDefaultData[subCardName][dataIndex] !== null && awbDefaultData[subCardName][dataIndex] !== undefined ? awbDefaultData[subCardName][dataIndex].toString() : awbDefaultData[subCardName][dataIndex])));
  };
  const getSubDefaultDetailsCardJsx = subCardName => {
    return /*#__PURE__*/_react.default.createElement(_antd.Card, {
      className: "fs12 lh18 border-none",
      bodyStyle: {
        color: '#727272',
        fontSize: 'small'
      },
      title: _constants.AWB_DEFAULT_SUB_CARD_HEADING[subCardName]
    }, /*#__PURE__*/_react.default.createElement(_antd.Row, {
      justify: "space-between"
    }, _constants.FORM_AND_CARD_ELEMENTS_CONST[subCardName].map(data => getColDefaultDetailsJsx(data.label, data.name, data.spanSize, subCardName))));
  };
  const CustomCell = _ref => {
    let {
        children,
        record
      } = _ref,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
    return /*#__PURE__*/_react.default.createElement("td", restProps, record ? /*#__PURE__*/_react.default.createElement("div", {
      className: "flex align-center"
    }, /*#__PURE__*/_react.default.createElement(_antd.Popover, {
      overlayClassName: "awb-gen-table-popover"
      // visible={record?.id === showPopover.key && showPopover.visible}
      // onVisibleChange={(visible) => setShowPopover(visible ? { visible: visible, key: record.id } : {})}
      ,
      id: "awb-table-popover",
      placement: "bottomLeft",
      trigger: "click",
      content: /*#__PURE__*/_react.default.createElement("div", {
        className: "fs14 lh22"
      }, /*#__PURE__*/_react.default.createElement("p", {
        className: "mb10 pointer",
        onClick: () => {
          editTableRow(record);
          setShowPopover({
            visible: false,
            key: null
          });
        }
      }, containerConstants.formatString(containerConstants.EDIT)), /*#__PURE__*/_react.default.createElement("p", {
        className: "pointer",
        onClick: () => {
          setShowDeleteModalDialog({
            visible: true,
            okText: containerConstants.formatString(containerConstants.DELETE),
            title: containerConstants.formatString(containerConstants.DELETE) + '?',
            description: containerConstants.formatString(containerConstants.DELETE_DESCRIPTION),
            rowId: record.id
          });
          setShowPopover({
            visible: false,
            key: null
          });
        }
      }, containerConstants.formatString(containerConstants.DELETE)))
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: (record == null ? void 0 : record.id) === showPopover.key ? awbPopoverClasses.concat(' ', 'selected bg-primary') : awbPopoverClasses
    }, /*#__PURE__*/_react.default.createElement(_MoreOutlined.default, {
      color: (record == null ? void 0 : record.id) === showPopover.key ? '#FFFFFF' : '#323232'
    }))), /*#__PURE__*/_react.default.createElement("span", {
      className: "font-family-weight-normal fs12 lh18"
    }, children[1])) : children[1]);
  };
  const handlePageChange = val => {
    setCallOnlyAwbListAPI(true);
    setPageDetail({
      current: val - 1,
      pageSize: pageDetail.pageSize
    });
  };
  const handlePgaeSizeChange = val => {
    setCallOnlyAwbListAPI(true);
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
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    let partycodes = '';
    Object.keys(allPartyNameWithMasterCodeMaps).map(key => {
      if (key.toLowerCase().includes(searchfilters.toLowerCase())) {
        partycodes = partycodes === '' ? allPartyNameWithMasterCodeMaps[key] : partycodes + '&&##&&' + allPartyNameWithMasterCodeMaps[key];
      }
    });
    setEmptySearchResult(true);
    if (searchfilters !== '' && partycodes === '') {
      partycodes = searchfilters;
    }
    setFromSearch(true);
    searchList(partycodes, awbDefaultData, allPartyMasterCodeWithNameMaps);
  };
  const handleReset = dataIndex => {
    setSearchfilters('');
    searchList('', awbDefaultData, allPartyMasterCodeWithNameMaps);
  };
  const getColumnSearchProps = (dataValue, dataIndex) => ({
    filterDropdown: _ref2 => {
      let {
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      } = _ref2;
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
      }, "Search"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
        onClick: () => handleReset(dataIndex),
        size: "small",
        style: {
          width: 90
        }
      }, "Reset")));
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
  const AWB_GENERATION_TABLE_COLUMN = [_extends({
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, _constants.AWB_STRING_CONSTANTS.PARTY_NAME),
    className: 'border-right AWB_SEARCH_FILTER',
    children: [{
      fixed: 'left',
      dataIndex: _constants.DATA_INDEX.PARTY_NAME,
      width: 120,
      className: 'border-right sub-header-bg',
      onCell: (record, rowIndex) => ({
        record,
        rowIndex
      })
    }]
  }, getColumnSearchProps(_constants.DATA_INDEX.PARTY_NAME, _constants.DATA_INDEX.PARTY_NAME)), {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, _constants.AWB_STRING_CONSTANTS.PARTY_CODE),
    className: 'border-right',
    children: [{
      dataIndex: _constants.DATA_INDEX.PARTY_CODE,
      width: 120,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text)
    }]
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, _constants.AWB_STRING_CONSTANTS.TYPE),
    className: 'border-right',
    children: [{
      dataIndex: _constants.DATA_INDEX.TYPE,
      width: 120,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text)
    }]
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, _constants.AWB_STRING_CONSTANTS.SERIES),
    className: 'border-right',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs12 lh18"
    }, text),
    children: [{
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.START_WITH),
      dataIndex: _constants.DATA_INDEX.START_WITH,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined && text !== '' ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.ENDS_WITH),
      dataIndex: _constants.DATA_INDEX.ENDS_WITH,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined && text !== '' ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.START_RANGE),
      dataIndex: _constants.DATA_INDEX.START_RANGE,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.END_RANGE),
      dataIndex: _constants.DATA_INDEX.END_RANGE,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.RUNNING_NUMBER),
      dataIndex: _constants.DATA_INDEX.RUNNING_NUMBER,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.IS_LEADING_ZERO_APPENDED),
      dataIndex: _constants.DATA_INDEX.IS_LEADING_ZERO_APPENDED,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text.toString() : '-')
    }]
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, _constants.AWB_STRING_CONSTANTS.CHECKSUM),
    className: 'border-right',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs12 lh18"
    }, text),
    children: [{
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.LENGTH_OF_AWB),
      dataIndex: _constants.DATA_INDEX.LENGTH_OF_AWB,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.CHECK_DIGIT),
      dataIndex: _constants.DATA_INDEX.CHECK_DIGIT,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.SNO_START_POSITION),
      dataIndex: _constants.DATA_INDEX.SNO_START_POSITION,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.SNO_END_POSITION),
      dataIndex: _constants.DATA_INDEX.SNO_END_POSITION,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.MOD_BY),
      dataIndex: _constants.DATA_INDEX.MOD_BY,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }]
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, _constants.AWB_STRING_CONSTANTS.EXTERNAL_SYSTEM),
    className: 'border-right',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs12 lh18"
    }, text),
    children: [{
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.END_POINT),
      dataIndex: _constants.DATA_INDEX.END_POINT,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.TIMEOUT_SECONDS),
      dataIndex: _constants.DATA_INDEX.TIMEOUT_SECONDS,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.NO_OF_RE_ATTEMPTS),
      dataIndex: _constants.DATA_INDEX.NO_OF_RE_ATTEMPTS,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text ? text : '-')
    }]
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, _constants.AWB_STRING_CONSTANTS.REGEX),
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs12 lh18"
    }, text),
    children: [{
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.STANDARD),
      dataIndex: _constants.DATA_INDEX.STANDARD,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text ? text : '-')
    }]
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, _constants.AWB_STRING_CONSTANTS.HYBRID),
    className: 'border-right',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs12 lh18"
    }, text),
    children: [{
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.START_WITH),
      dataIndex: _constants.DATA_INDEX.START_WITH_HYBRID,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined && text !== '' ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.ENDS_WITH),
      dataIndex: _constants.DATA_INDEX.ENDS_WITH_HYBRID,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined && text !== '' ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.START_RANGE),
      dataIndex: _constants.DATA_INDEX.START_RANGE_HYBRID,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.END_RANGE),
      dataIndex: _constants.DATA_INDEX.END_RANGE_HYBRID,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.RUNNING_NUMBER),
      dataIndex: _constants.DATA_INDEX.RUNNING_NUMBER_HYBRID,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.MOD_BY),
      dataIndex: _constants.DATA_INDEX.MOD_BY_HYBRID,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.IS_LEADING_ZERO_APPENDED),
      dataIndex: _constants.DATA_INDEX.IS_LEADING_ZERO_APPENDED_HYBRID,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text.toString() : '-')
    }]
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, _constants.AWB_STRING_CONSTANTS.CHECK_DIGIT),
    className: 'border-right',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs12 lh18"
    }, text),
    children: [{
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.START_WITH),
      dataIndex: _constants.DATA_INDEX.START_WITH_CHECK_DIGIT,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined && text !== '' ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.ENDS_WITH),
      dataIndex: _constants.DATA_INDEX.ENDS_WITH_CHECK_DIGIT,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined && text !== '' ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.START_RANGE),
      dataIndex: _constants.DATA_INDEX.START_RANGE_CHECK_DIGIT,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.END_RANGE),
      dataIndex: _constants.DATA_INDEX.END_RANGE_CHECK_DIGIT,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.RUNNING_NUMBER),
      dataIndex: _constants.DATA_INDEX.RUNNING_NUMBER_CHECK_DIGIT,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.BASE),
      dataIndex: _constants.DATA_INDEX.BASE_CHECK_DIGIT,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, _constants.AWB_STRING_CONSTANTS.IS_LEADING_ZERO_APPENDED),
      dataIndex: _constants.DATA_INDEX.IS_LEADING_ZERO_APPENDED_CHECK_DIGIT,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/_react.default.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text.toString() : '-')
    }]
  }];
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_AWBGenerationSettingsStyle.default, null), /*#__PURE__*/_react.default.createElement(_bread_crumb.default, {
    urlList: store.fromNewSetting ? urlListForNewSetting : urlList,
    rightItem: (!(0, _lodash.isEmpty)(awbDefaultData) || !(0, _lodash.isEmpty)(awbTableData) || fromSearch) && /*#__PURE__*/_react.default.createElement(_antd.Button, {
      style: {
        display: 'flex',
        height: '24px',
        color: '#FFFFFF',
        padding: '0 8px'
      },
      type: "primary",
      onClick: openFormModal
    }, containerConstants.formatString(containerConstants.ADD_AWB))
    // <Button
    //     className='fw500'
    //     style={{ display: 'flex', height: '24px', padding: '0 8px', borderRadius: '4px' }}
    //     type="primary"
    //     icon={<PlusOutlined style={{ display: 'flex', alignSelf: 'center', fontSize: '10px' }} />}
    //     onClick={() => setShowModalDialog({
    //         visible: true,
    //         title: containerConstants.formatString(containerConstants.CHOOSE_TEMPLATE),
    //         modalType: TEMPLATE_MODAL_TYPE.CHOOSE_TEMPLATE
    //     })}
    // >
    //     {containerConstants.formatString(containerConstants.CREATE_TEMPLATE)}
    // </Button> }
  }), /*#__PURE__*/_react.default.createElement(_antd.Spin, {
    spinning: showLoading
  }, (!(0, _lodash.isEmpty)(awbDefaultData) && (0, _lodash.isEmpty)(awbTableData) || !(0, _lodash.isEmpty)(awbDefaultData) && !(0, _lodash.isEmpty)(awbTableData) || (0, _lodash.isEmpty)(awbDefaultData) && !(0, _lodash.isEmpty)(awbTableData) || fromSearch) && /*#__PURE__*/_react.default.createElement(_antd.Card, {
    visible: false,
    id: "awb-default-details",
    className: "m16 bg-transparent",
    headStyle: {
      marginBottom: '4px'
    },
    bodyStyle: {
      padding: '12px 16px',
      border: '1px solid #DDDDDD',
      boxSizing: 'border-box',
      borderRadius: '4px',
      background: '#FFFFFF'
    },
    title: containerConstants.formatString(containerConstants.AWB_DEFAULT_DETAILS),
    extra: !(0, _lodash.isEmpty)(awbDefaultData) && /*#__PURE__*/_react.default.createElement("div", {
      onClick: editDefaultDetails
    }, /*#__PURE__*/_react.default.createElement(_MdEdit.default, {
      size: '18px'
    }))
  }, !(0, _lodash.isEmpty)(awbDefaultData) ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
    className: "mb12"
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 14
  }, getSubDefaultDetailsCardJsx(_constants.AWB_FORM_AND_CARD_TYPES.SERIES)), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    push: 1,
    span: 9
  }, getSubDefaultDetailsCardJsx(_constants.AWB_FORM_AND_CARD_TYPES.EXTERNAL_SYSTEM))), /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 14
  }, getSubDefaultDetailsCardJsx(_constants.AWB_FORM_AND_CARD_TYPES.CHECKSUM)), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    push: 1,
    span: 9
  }, getSubDefaultDetailsCardJsx(_constants.AWB_FORM_AND_CARD_TYPES.REGEX))), /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 14
  }, getSubDefaultDetailsCardJsx(_constants.AWB_FORM_AND_CARD_TYPES.HYBRID))), /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 14
  }, getSubDefaultDetailsCardJsx(_constants.AWB_FORM_AND_CARD_TYPES.CHECK_DIGIT)))) : /*#__PURE__*/_react.default.createElement(_AWBEmptyDataView.default, {
    heading: containerConstants.formatString(containerConstants.NO_DEFAULT_AWB_ADDED),
    description: containerConstants.formatString(containerConstants.NO_DEFAULT_AWB_ADDED_DESCRIPTION),
    showButtons: 'first',
    awbTableData,
    awbDefaultData,
    setShowFormModalDialog,
    setShowModalDialogAddUpload
  })), /*#__PURE__*/_react.default.createElement(_antd.Card, {
    title: (!(0, _lodash.isEmpty)(awbDefaultData) || !(0, _lodash.isEmpty)(awbTableData)) && containerConstants.formatString(containerConstants.AWB_LIST),
    id: "awb-gen-card",
    className: "m16 bg-transparent",
    style: {
      zIndex: 0
    },
    headStyle: {
      marginBottom: '4px'
    },
    bodyStyle: {
      padding: '16px',
      border: '1px solid #DDDDDD',
      boxSizing: 'border-box',
      borderRadius: '4px',
      background: '#FFFFFF'
    }
  }, !(0, _lodash.isEmpty)(awbTableData) || emptySearchResult ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Table, {
    bordered: true,
    components: {
      body: {
        cell: CustomCell
      }
    },
    pagination: false,
    columns: AWB_GENERATION_TABLE_COLUMN,
    dataSource: awbTableData,
    scroll: {
      x: 1300
    },
    size: "middle"
  }), /*#__PURE__*/_react.default.createElement(_CustomPagination.default, {
    pageDetail: pageDetail,
    paginationDetails: paginationDetails,
    handlePageChange: handlePageChange,
    handlePgaeSizeChange: handlePgaeSizeChange,
    curentPageOption: paginationDetails.pageSizeText
  })) : /*#__PURE__*/_react.default.createElement(_AWBEmptyDataView.default, {
    heading: containerConstants.formatString(containerConstants.AWB_NOT_FOUND),
    description: containerConstants.formatString(containerConstants.AWB_NOT_FOUND_DESCRIPTION),
    showButtons: !(0, _lodash.isEmpty)(awbDefaultData) || !(0, _lodash.isEmpty)(awbTableData) ? 'none' : 'both',
    awbTableData,
    awbDefaultData,
    setShowFormModalDialog,
    setShowModalDialogAddUpload
  })), showModalDialogAddUpload && /*#__PURE__*/_react.default.createElement(_AWBAddUploadModal.default, {
    reloadPage: getInitializeLocalState,
    showModalDialogAddUpload,
    setShowModalDialogAddUpload,
    setShowCustomizedFormModalDialog
  }), (showCustomizedFormModalDialog.visible || showDeleteModalDialog.visible || showFormModalDialog.visible) && /*#__PURE__*/_react.default.createElement(_AWBGenerationFormModal.default, {
    reloadPage: getInitializeLocalState,
    awbPartyCodeList,
    setAWBPartyCodeList,
    setShowPopover,
    showPopover,
    deleteTableRow,
    awbTableData,
    setAWBTableData,
    awbDefaultData,
    setAWBDefaultData,
    showFormModalDialog,
    setShowFormModalDialog,
    showDeleteModalDialog,
    setShowDeleteModalDialog,
    showCustomizedFormModalDialog,
    setShowCustomizedFormModalDialog
  })));
};
var _default = exports.default = AWBGenerationSettings;
//# sourceMappingURL=AWBGenerationSettings.js.map