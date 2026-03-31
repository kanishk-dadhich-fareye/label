var _excluded = ["children", "record"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../modules/commoncomponent/breadcrumb/bread_crumb';
import { containerConstantsService } from '../../utils/containerconstants/ContainerConstants';
import { Card, Row, Col, Space, Table, Button, Spin, Input } from 'antd';
import AwbGenerationSettingStyle from './AWBGenerationSettingsStyle.js';
import AWBGenerationFormModal from './AWBGenerationFormModal';
import MdEdit from '../commoncomponent/CustomIcons/MdEdit';
import { PAGE_SIZE, STATUS, AWB_DEFAULT_SUB_CARD_HEADING, AWB_FORM_AND_CARD_TYPES, DATA_INDEX, FORM_AND_CARD_ELEMENTS_CONST, FORM_TYPES, OPERATIONS, AWB_STRING_CONSTANTS } from '../../utils/constants';
import { isEmpty, isEqual, toLower, upperFirst } from 'lodash';
import AWBEmptyDataView from './AWBEmptyDataView';
import AWBAddUploadModal from './AWBAddUploadModal';
import { Popover } from 'antd';
import MoreOutlined from '../../modules/commoncomponent/CustomIcons/MoreOutlined';
import { deleteAWBPartyConf, fetchAWBDefaultDetails, fetchAllPartyMaster, searchAWBPartyListByPartyCode } from '../APIConfig/AWBGenerationAction';
import { notifyResponseMessage } from '../commoncomponent/NotificationComponent/notifyResponseMessage';
import CustomPagination from '../commoncomponent/CustomPagination/CustomPagination';
import { SearchOutlined } from '@ant-design/icons';
import { useStore } from '../hook-store/store';
import { getBasePath } from '../commoncomponent/BasePath';
var containerConstants = containerConstantsService.getInstance();
var AWBGenerationSettings = props => {
  var [showFormModalDialog, setShowFormModalDialog] = useState({
    visible: false,
    okText: '',
    title: '',
    operation: '',
    data: {}
  });
  var [showDeleteModalDialog, setShowDeleteModalDialog] = useState({
    visible: false,
    okText: '',
    title: ''
  });
  var [showCustomizedFormModalDialog, setShowCustomizedFormModalDialog] = useState({
    visible: false,
    okText: '',
    title: ''
  });
  var [awbDefaultData, setAWBDefaultData] = useState({});
  var [showModalDialogAddUpload, setShowModalDialogAddUpload] = useState(false);
  var [awbTableData, setAWBTableData] = useState([]);
  var [awbPartyCodeList, setAWBPartyCodeList] = useState([]);
  var [showPopover, setShowPopover] = useState({
    visible: false,
    key: null
  });
  var [showLoading, setShowLoading] = useState(false);
  var [pageDetail, setPageDetail] = useState({
    current: 0,
    pageSize: 10
  });
  var [paginationDetails, setPaginationDetails] = useState({
    totalElements: 0,
    numberOfElements: 0,
    pageSizeText: PAGE_SIZE.PAGE_10
  });
  var [callOnlyAwbListAPI, setCallOnlyAwbListAPI] = useState(false);
  var [allPartyMasterCodeWithNameMaps, setAllPartyMasterCodeWithNameMaps] = useState({});
  var [allPartyNameWithMasterCodeMaps, setAllPartyNameWithMasterCodeMaps] = useState({});
  var [emptySearchResult, setEmptySearchResult] = useState(false);
  var [searchfilters, setSearchfilters] = useState('');
  var [searchInput, setSearchInput] = useState();
  var [fromSearch, setFromSearch] = useState(false);
  var store = useStore(true)[0];
  var searchedColumn = useState()[0];
  var searchText = useState()[0];
  var [basePath, setBasePath] = useState('');
  var openFormModal = () => {
    // isEmpty(awbTableData) ?
    setShowModalDialogAddUpload(true);
    // setShowCustomizedFormModalDialog({
    //   visible: true,
    //   okText: containerConstants.formatString(containerConstants.ADD),
    //   title: containerConstants.formatString(containerConstants.ADD_AWB)
    // });
  };
  var awbPopoverClasses = 'awb-popover-icon flex align-center justify-center pointer mr10';
  var urlList = [{
    url: basePath + '/v2/label_generation/v2/settings',
    heading: containerConstants.formatString(containerConstants.SETTINGS)
  }, {
    url: basePath + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: basePath + '/v2/label_generation/shipment_no_generation',
    heading: containerConstants.formatString(containerConstants.AWB_GENERATION)
  }];
  var urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: '/v2/new_settings/label_generation/shipment_no_generation',
    heading: containerConstants.formatString(containerConstants.AWB_GENERATION)
  }];
  var deleteTableRow = id => {
    deleteAWBPartyConf(id).then(response => {
      if (response.status === 200) {
        if (response.data.status === "Success") {
          setFromSearch(false);
          notifyResponseMessage(STATUS.SUCCESS, response.data.message);
          setCallOnlyAwbListAPI(true);
          getInitializeLocalState();
        } else {
          notifyResponseMessage(STATUS.ERROR, response.data.message);
        }
      }
    }).catch(error => {});
  };
  var editTableRow = dataObject => {
    setShowCustomizedFormModalDialog({
      visible: true,
      okText: containerConstants.formatString(containerConstants.SAVE),
      title: containerConstants.formatString(containerConstants.EDIT_AWB),
      operation: OPERATIONS.EDIT,
      data: dataObject
    });
  };
  var editDefaultDetails = () => {
    setShowFormModalDialog({
      visible: true,
      okText: containerConstants.formatString(containerConstants.SAVE),
      title: containerConstants.formatString(containerConstants.EDIT_DEFAULT_AWB),
      operation: OPERATIONS.EDIT,
      data: awbDefaultData
    });
  };
  useEffect(() => {
    setBasePath(getBasePath(props, store));
    document.title = containerConstants.formatString(containerConstants.AWB_GENERATION);
    getInitializeLocalState();
  }, [pageDetail]);
  var getInitializeLocalState = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* () {
      setShowLoading(true);
      var awbDefaultDetails = {};
      var allPartyMasterCodeWithNameMap = {};
      var allPartyNameWithMasterCodeMap = {};
      try {
        if (!callOnlyAwbListAPI) {
          var awbDefaultDetailsResponse = yield fetchAWBDefaultDetails();
          if (awbDefaultDetailsResponse.status === 200) {
            var _awbDefaultDetailsRes;
            setShowLoading(false);
            var awbDefaultDetailsData = (_awbDefaultDetailsRes = awbDefaultDetailsResponse.data) == null ? void 0 : _awbDefaultDetailsRes.data;
            if (awbDefaultDetailsData !== null) {
              var subCardKeys = Object.values(AWB_FORM_AND_CARD_TYPES);
              subCardKeys.forEach(subCardKey => {
                awbDefaultDetails[subCardKey] = {};
                FORM_AND_CARD_ELEMENTS_CONST[subCardKey].forEach(cardDetail => {
                  awbDefaultDetailsData[cardDetail.name] !== null && awbDefaultDetailsData[cardDetail.name] !== undefined && (awbDefaultDetails[subCardKey][cardDetail.name] = awbDefaultDetailsData[cardDetail.name]);
                });
              });
              awbDefaultDetails['id'] = awbDefaultDetailsData == null ? void 0 : awbDefaultDetailsData.id;
              setAWBDefaultData(awbDefaultDetails);
            }
          } else {
            setShowLoading(false);
          }
          var allPartyMasterResponse = yield fetchAllPartyMaster();
          if (allPartyMasterResponse.status === 200) {
            var _allPartyMasterRespon;
            var allPartyMasterList = (_allPartyMasterRespon = allPartyMasterResponse.data) == null ? void 0 : _allPartyMasterRespon.data;
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
    });
    return function getInitializeLocalState() {
      return _ref.apply(this, arguments);
    };
  }();
  var searchList = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (partycodes, awbDefaultDetailsParam, allPartyMasterCodeWithNameMapParam) {
      yield searchAWBPartyListByPartyCode(partycodes, pageDetail.current, pageDetail.pageSize).then(response => {
        if (response.status === 200) {
          if (response.data && response.data.data) {
            var awbPartyMasterDtoList = response.data.data.content;
            if (!isEmpty(awbPartyMasterDtoList)) {
              var awbTableDataList = awbPartyMasterDtoList.map(awbDataObj => {
                var subCardKey = toLower(awbDataObj[DATA_INDEX.SELECTED_FORM]);
                var {
                  awbType,
                  awbGenerationType
                } = awbDataObj;
                awbType = upperFirst(toLower(awbType));
                awbGenerationType = subCardKey;
                var defaultData = isEqual(awbType, FORM_TYPES[0]) ? awbDefaultDetailsParam[subCardKey] : {};
                var subCard = _extends({}, awbDataObj, defaultData, {
                  awbType,
                  awbGenerationType
                });
                return _extends({}, subCard, {
                  [DATA_INDEX.PARTY_NAME]: allPartyMasterCodeWithNameMapParam[awbDataObj.partyCode]
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
    });
    return function searchList(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  var getColDefaultDetailsJsx = (heading, dataIndex, spanSize, subCardName) => {
    return /*#__PURE__*/React.createElement(Col, {
      span: spanSize
    }, /*#__PURE__*/React.createElement(Space, {
      direction: "vertical",
      size: 2
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12
      }
    }, heading), /*#__PURE__*/React.createElement("p", null, awbDefaultData[subCardName][dataIndex] !== null && awbDefaultData[subCardName][dataIndex] !== undefined ? awbDefaultData[subCardName][dataIndex].toString() : awbDefaultData[subCardName][dataIndex])));
  };
  var getSubDefaultDetailsCardJsx = subCardName => {
    return /*#__PURE__*/React.createElement(Card, {
      className: "fs12 lh18 border-none",
      bodyStyle: {
        color: '#727272',
        fontSize: 'small'
      },
      title: AWB_DEFAULT_SUB_CARD_HEADING[subCardName]
    }, /*#__PURE__*/React.createElement(Row, {
      justify: "space-between"
    }, FORM_AND_CARD_ELEMENTS_CONST[subCardName].map(data => getColDefaultDetailsJsx(data.label, data.name, data.spanSize, subCardName))));
  };
  var CustomCell = _ref3 => {
    var {
        children,
        record
      } = _ref3,
      restProps = _objectWithoutPropertiesLoose(_ref3, _excluded);
    return /*#__PURE__*/React.createElement("td", restProps, record ? /*#__PURE__*/React.createElement("div", {
      className: "flex align-center"
    }, /*#__PURE__*/React.createElement(Popover, {
      overlayClassName: "awb-gen-table-popover"
      // visible={record?.id === showPopover.key && showPopover.visible}
      // onVisibleChange={(visible) => setShowPopover(visible ? { visible: visible, key: record.id } : {})}
      ,
      id: "awb-table-popover",
      placement: "bottomLeft",
      trigger: "click",
      content: /*#__PURE__*/React.createElement("div", {
        className: "fs14 lh22"
      }, /*#__PURE__*/React.createElement("p", {
        className: "mb10 pointer",
        onClick: () => {
          editTableRow(record);
          setShowPopover({
            visible: false,
            key: null
          });
        }
      }, containerConstants.formatString(containerConstants.EDIT)), /*#__PURE__*/React.createElement("p", {
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
    }, /*#__PURE__*/React.createElement("div", {
      className: (record == null ? void 0 : record.id) === showPopover.key ? awbPopoverClasses.concat(' ', 'selected bg-primary') : awbPopoverClasses
    }, /*#__PURE__*/React.createElement(MoreOutlined, {
      color: (record == null ? void 0 : record.id) === showPopover.key ? '#FFFFFF' : '#323232'
    }))), /*#__PURE__*/React.createElement("span", {
      className: "font-family-weight-normal fs12 lh18"
    }, children[1])) : children[1]);
  };
  var handlePageChange = val => {
    setCallOnlyAwbListAPI(true);
    setPageDetail({
      current: val - 1,
      pageSize: pageDetail.pageSize
    });
  };
  var handlePgaeSizeChange = val => {
    setCallOnlyAwbListAPI(true);
    var pageSize = 10;
    var pageSizeTxt = PAGE_SIZE.PAGE_10;
    switch (val) {
      case PAGE_SIZE.PAGE_10:
        pageSize = 10;
        pageSizeTxt = PAGE_SIZE.PAGE_10;
        break;
      case PAGE_SIZE.PAGE_20:
        pageSize = 20;
        pageSizeTxt = PAGE_SIZE.PAGE_20;
        break;
      case PAGE_SIZE.PAGE_50:
        pageSize = 50;
        pageSizeTxt = PAGE_SIZE.PAGE_50;
        break;
      case PAGE_SIZE.PAGE_100:
        pageSize = 100;
        pageSizeTxt = PAGE_SIZE.PAGE_100;
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
  var handleSearch = (selectedKeys, confirm, dataIndex) => {
    var partycodes = '';
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
  var handleReset = dataIndex => {
    setSearchfilters('');
    searchList('', awbDefaultData, allPartyMasterCodeWithNameMaps);
  };
  var getColumnSearchProps = (dataValue, dataIndex) => ({
    filterDropdown: _ref4 => {
      var {
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      } = _ref4;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          padding: 8
        }
      }, /*#__PURE__*/React.createElement(Input, {
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
      }), /*#__PURE__*/React.createElement(Space, null, /*#__PURE__*/React.createElement(Button, {
        type: "primary",
        onClick: () => handleSearch(selectedKeys, confirm, dataIndex),
        icon: /*#__PURE__*/React.createElement(SearchOutlined, null),
        size: "small",
        style: {
          width: 90
        }
      }, "Search"), /*#__PURE__*/React.createElement(Button, {
        onClick: () => handleReset(dataIndex),
        size: "small",
        style: {
          width: 90
        }
      }, "Reset")));
    },
    filterIcon: filtered => /*#__PURE__*/React.createElement(SearchOutlined, {
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
  var AWB_GENERATION_TABLE_COLUMN = [_extends({
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, AWB_STRING_CONSTANTS.PARTY_NAME),
    className: 'border-right AWB_SEARCH_FILTER',
    children: [{
      fixed: 'left',
      dataIndex: DATA_INDEX.PARTY_NAME,
      width: 120,
      className: 'border-right sub-header-bg',
      onCell: (record, rowIndex) => ({
        record,
        rowIndex
      })
    }]
  }, getColumnSearchProps(DATA_INDEX.PARTY_NAME, DATA_INDEX.PARTY_NAME)), {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, AWB_STRING_CONSTANTS.PARTY_CODE),
    className: 'border-right',
    children: [{
      dataIndex: DATA_INDEX.PARTY_CODE,
      width: 120,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text)
    }]
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, AWB_STRING_CONSTANTS.TYPE),
    className: 'border-right',
    children: [{
      dataIndex: DATA_INDEX.TYPE,
      width: 120,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text)
    }]
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, AWB_STRING_CONSTANTS.SERIES),
    className: 'border-right',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs12 lh18"
    }, text),
    children: [{
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.START_WITH),
      dataIndex: DATA_INDEX.START_WITH,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined && text !== '' ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.ENDS_WITH),
      dataIndex: DATA_INDEX.ENDS_WITH,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined && text !== '' ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.START_RANGE),
      dataIndex: DATA_INDEX.START_RANGE,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.END_RANGE),
      dataIndex: DATA_INDEX.END_RANGE,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.RUNNING_NUMBER),
      dataIndex: DATA_INDEX.RUNNING_NUMBER,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.IS_LEADING_ZERO_APPENDED),
      dataIndex: DATA_INDEX.IS_LEADING_ZERO_APPENDED,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text.toString() : '-')
    }]
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, AWB_STRING_CONSTANTS.CHECKSUM),
    className: 'border-right',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs12 lh18"
    }, text),
    children: [{
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.LENGTH_OF_AWB),
      dataIndex: DATA_INDEX.LENGTH_OF_AWB,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.CHECK_DIGIT),
      dataIndex: DATA_INDEX.CHECK_DIGIT,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.SNO_START_POSITION),
      dataIndex: DATA_INDEX.SNO_START_POSITION,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.SNO_END_POSITION),
      dataIndex: DATA_INDEX.SNO_END_POSITION,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.MOD_BY),
      dataIndex: DATA_INDEX.MOD_BY,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }]
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, AWB_STRING_CONSTANTS.EXTERNAL_SYSTEM),
    className: 'border-right',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs12 lh18"
    }, text),
    children: [{
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.END_POINT),
      dataIndex: DATA_INDEX.END_POINT,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.TIMEOUT_SECONDS),
      dataIndex: DATA_INDEX.TIMEOUT_SECONDS,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.NO_OF_RE_ATTEMPTS),
      dataIndex: DATA_INDEX.NO_OF_RE_ATTEMPTS,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text ? text : '-')
    }]
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, AWB_STRING_CONSTANTS.REGEX),
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs12 lh18"
    }, text),
    children: [{
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.STANDARD),
      dataIndex: DATA_INDEX.STANDARD,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text ? text : '-')
    }]
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, AWB_STRING_CONSTANTS.HYBRID),
    className: 'border-right',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs12 lh18"
    }, text),
    children: [{
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.START_WITH),
      dataIndex: DATA_INDEX.START_WITH_HYBRID,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined && text !== '' ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.ENDS_WITH),
      dataIndex: DATA_INDEX.ENDS_WITH_HYBRID,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined && text !== '' ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.START_RANGE),
      dataIndex: DATA_INDEX.START_RANGE_HYBRID,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.END_RANGE),
      dataIndex: DATA_INDEX.END_RANGE_HYBRID,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.RUNNING_NUMBER),
      dataIndex: DATA_INDEX.RUNNING_NUMBER_HYBRID,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.MOD_BY),
      dataIndex: DATA_INDEX.MOD_BY_HYBRID,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.IS_LEADING_ZERO_APPENDED),
      dataIndex: DATA_INDEX.IS_LEADING_ZERO_APPENDED_HYBRID,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text.toString() : '-')
    }]
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 lh18 text-center fs10 text-upper"
    }, AWB_STRING_CONSTANTS.CHECK_DIGIT),
    className: 'border-right',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs12 lh18"
    }, text),
    children: [{
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.START_WITH),
      dataIndex: DATA_INDEX.START_WITH_CHECK_DIGIT,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined && text !== '' ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.ENDS_WITH),
      dataIndex: DATA_INDEX.ENDS_WITH_CHECK_DIGIT,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined && text !== '' ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.START_RANGE),
      dataIndex: DATA_INDEX.START_RANGE_CHECK_DIGIT,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.END_RANGE),
      dataIndex: DATA_INDEX.END_RANGE_CHECK_DIGIT,
      width: 140,
      className: 'sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.RUNNING_NUMBER),
      dataIndex: DATA_INDEX.RUNNING_NUMBER_CHECK_DIGIT,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.BASE),
      dataIndex: DATA_INDEX.BASE_CHECK_DIGIT,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text : '-')
    }, {
      title: /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs11 lh18 text-center"
      }, AWB_STRING_CONSTANTS.IS_LEADING_ZERO_APPENDED),
      dataIndex: DATA_INDEX.IS_LEADING_ZERO_APPENDED_CHECK_DIGIT,
      width: 140,
      className: 'border-right sub-header-bg',
      render: text => /*#__PURE__*/React.createElement("div", {
        className: "font-family-weight-normal fs12 lh18"
      }, text !== null && text !== undefined ? text.toString() : '-')
    }]
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AwbGenerationSettingStyle, null), /*#__PURE__*/React.createElement(BreadCrumb, {
    urlList: store.fromNewSetting ? urlListForNewSetting : urlList,
    rightItem: (!isEmpty(awbDefaultData) || !isEmpty(awbTableData) || fromSearch) && /*#__PURE__*/React.createElement(Button, {
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
  }), /*#__PURE__*/React.createElement(Spin, {
    spinning: showLoading
  }, (!isEmpty(awbDefaultData) && isEmpty(awbTableData) || !isEmpty(awbDefaultData) && !isEmpty(awbTableData) || isEmpty(awbDefaultData) && !isEmpty(awbTableData) || fromSearch) && /*#__PURE__*/React.createElement(Card, {
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
    extra: !isEmpty(awbDefaultData) && /*#__PURE__*/React.createElement("div", {
      onClick: editDefaultDetails
    }, /*#__PURE__*/React.createElement(MdEdit, {
      size: '18px'
    }))
  }, !isEmpty(awbDefaultData) ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Row, {
    className: "mb12"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 14
  }, getSubDefaultDetailsCardJsx(AWB_FORM_AND_CARD_TYPES.SERIES)), /*#__PURE__*/React.createElement(Col, {
    push: 1,
    span: 9
  }, getSubDefaultDetailsCardJsx(AWB_FORM_AND_CARD_TYPES.EXTERNAL_SYSTEM))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    span: 14
  }, getSubDefaultDetailsCardJsx(AWB_FORM_AND_CARD_TYPES.CHECKSUM)), /*#__PURE__*/React.createElement(Col, {
    push: 1,
    span: 9
  }, getSubDefaultDetailsCardJsx(AWB_FORM_AND_CARD_TYPES.REGEX))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    span: 14
  }, getSubDefaultDetailsCardJsx(AWB_FORM_AND_CARD_TYPES.HYBRID))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    span: 14
  }, getSubDefaultDetailsCardJsx(AWB_FORM_AND_CARD_TYPES.CHECK_DIGIT)))) : /*#__PURE__*/React.createElement(AWBEmptyDataView, {
    heading: containerConstants.formatString(containerConstants.NO_DEFAULT_AWB_ADDED),
    description: containerConstants.formatString(containerConstants.NO_DEFAULT_AWB_ADDED_DESCRIPTION),
    showButtons: 'first',
    awbTableData,
    awbDefaultData,
    setShowFormModalDialog,
    setShowModalDialogAddUpload
  })), /*#__PURE__*/React.createElement(Card, {
    title: (!isEmpty(awbDefaultData) || !isEmpty(awbTableData)) && containerConstants.formatString(containerConstants.AWB_LIST),
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
  }, !isEmpty(awbTableData) || emptySearchResult ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Table, {
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
  }), /*#__PURE__*/React.createElement(CustomPagination, {
    pageDetail: pageDetail,
    paginationDetails: paginationDetails,
    handlePageChange: handlePageChange,
    handlePgaeSizeChange: handlePgaeSizeChange,
    curentPageOption: paginationDetails.pageSizeText
  })) : /*#__PURE__*/React.createElement(AWBEmptyDataView, {
    heading: containerConstants.formatString(containerConstants.AWB_NOT_FOUND),
    description: containerConstants.formatString(containerConstants.AWB_NOT_FOUND_DESCRIPTION),
    showButtons: !isEmpty(awbDefaultData) || !isEmpty(awbTableData) ? 'none' : 'both',
    awbTableData,
    awbDefaultData,
    setShowFormModalDialog,
    setShowModalDialogAddUpload
  })), showModalDialogAddUpload && /*#__PURE__*/React.createElement(AWBAddUploadModal, {
    reloadPage: getInitializeLocalState,
    showModalDialogAddUpload,
    setShowModalDialogAddUpload,
    setShowCustomizedFormModalDialog
  }), (showCustomizedFormModalDialog.visible || showDeleteModalDialog.visible || showFormModalDialog.visible) && /*#__PURE__*/React.createElement(AWBGenerationFormModal, {
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
export default AWBGenerationSettings;
//# sourceMappingURL=AWBGenerationSettings.js.map