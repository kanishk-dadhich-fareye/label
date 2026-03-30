var _excluded = ["children", "record"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import EmptyDataView from './EmptyDataView';
import React, { useEffect, useState } from 'react';
import { containerConstantsService } from '../../utils/containerconstants/ContainerConstants';
import BreadCrumb from '../commoncomponent/breadcrumb/bread_crumb';
import LabelTemplateStyle from './LabelTemplateStyle.js';
import { Card, Table, Popover, Button, Spin, Space, Input, Tag, Dropdown, Menu, Modal, Row, Col, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MoreOutlined from '../commoncomponent/CustomIcons/MoreOutlined';
import HtmlEditor from './HtmlEditor';
import { PAGE_SIZE, STATUS, DATA_INDEX, TEMPLATE_MODAL_TYPE, OPERATIONS } from '../../utils/constants';
import CustomModal from './CustomModal';
import { saveLabelTemplatePartyMapping, fetchAllPartyMaster, fetchLabelTemplateList, activateDeactivateLabelTemplate, deleteLabelTemplate, fetchLabelPartyMapping } from "../APIConfig/LabelTemplateAction";
import { notifyResponseMessage } from '../commoncomponent/NotificationComponent/notifyResponseMessage';
import CustomPagination from '../commoncomponent/CustomPagination/CustomPagination';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import { toLower, toUpper, upperFirst, isEmpty } from 'lodash';
import { useStore } from '../hook-store/store';
import { getBasePath } from '../commoncomponent/BasePath';
var containerConstants = containerConstantsService.getInstance();
var LabelTemplate = props => {
  var store = useStore(true)[0];
  var [showModalDialog, setShowModalDialog] = useState(false);
  var [showPopover, setShowPopover] = useState({
    visible: false,
    key: null,
    leftTab: null
  });
  var [pageDetail, setPageDetail] = useState({
    current: 0,
    pageSize: 10
  });
  var [paginationDetails, setPaginationDetails] = useState({
    totalElements: 0,
    numberOfElements: 0,
    pageSizeText: PAGE_SIZE.PAGE_10
  });
  var [showEditor, setShowEditor] = useState({
    visible: false
  });
  var [showTable, setShowTable] = useState(true);
  var [statusUpdate, setStatusUpdate] = useState(false);
  var [labelTemplateList, setLabelTemplateList] = useState([]);
  var [showConfirmModalDialog, setShowConfirmModalDialog] = useState({
    visible: false,
    okText: '',
    title: ''
  });
  var [showLoading, setShowLoading] = useState(false);
  var [partyMasterCodeSet, setPartyMasterCodeSet] = useState(new Set());
  var [partyMasterCodeOptios, setPartyMasterCodeOptios] = useState([]);
  var [avaliablePartyMasterCodeOptios, setAvaliablePartyMasterCodeOptios] = useState([]);
  var [searchfilters, setSearchfilters] = useState('');
  var searchedColumn = useState()[0];
  var searchText = useState()[0];
  var searchInput = useState()[0];
  var [linkedPartyCodes, setLinkedPartyCodes] = useState([]);
  var [templateCodeForAddParty, setTemplateCodeForAddParty] = useState(false);
  var [showModalDialogLinkParty, setShowModalDialogLinkParty] = useState(false);
  var [basePath, setBasePath] = useState('');
  var getColumnSearchProps = (dataValue, dataIndex) => ({
    filterDropdown: _ref => {
      var {
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      } = _ref;
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
      }, containerConstants.formatString(containerConstants.SEARCH)), /*#__PURE__*/React.createElement(Button, {
        onClick: () => handleReset(dataIndex),
        size: "small",
        style: {
          width: 90
        }
      }, containerConstants.formatString(containerConstants.RESET))));
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
  var urlList = [{
    url: basePath + '/v2/label_generation/v2/settings',
    heading: containerConstants.formatString(containerConstants.SETTINGS)
  }, {
    url: basePath + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: basePath + '/v2/label_generation/label_templates',
    heading: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, containerConstants.formatString(containerConstants.LABEL_TEMPLATES)))
  }];
  var urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: '/v2/new_settings/label_generation/label_templates',
    heading: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, containerConstants.formatString(containerConstants.LABEL_TEMPLATES)))
  }];
  var getAllPartyMaster = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* () {
      yield fetchAllPartyMaster().then(response => {
        if (response && response.status === 200) {
          var _response$data;
          var partyMasterCodeSet1 = new Set();
          var partyMasterCodeOption = [];
          var partyMasterList = (_response$data = response.data) == null ? void 0 : _response$data.data;
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
    });
    return function getAllPartyMaster() {
      return _ref2.apply(this, arguments);
    };
  }();
  var getAllTemplate = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(function* () {
      setShowLoading(true);
      yield fetchLabelTemplateList(pageDetail.current, pageDetail.pageSize, searchfilters).then(response => {
        setShowLoading(false);
        if (response && response.status === 'Success') {
          if (response.data) {
            var labelTemplateListRes = response.data.content;
            if (!isEmpty(labelTemplateListRes)) {
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
    });
    return function getAllTemplate() {
      return _ref3.apply(this, arguments);
    };
  }();
  useEffect(() => {
    setBasePath(getBasePath(props, store));
    document.title = containerConstants.formatString(containerConstants.LABEL_TEMPLATES);
    var fetchParty = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(function* () {
        if (partyMasterCodeSet.size === 0) {
          yield getAllPartyMaster();
        }
      });
      return function fetchParty() {
        return _ref4.apply(this, arguments);
      };
    }();
    fetchParty();
    var fetchTemplate = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(function* () {
        yield getAllTemplate();
      });
      return function fetchTemplate() {
        return _ref5.apply(this, arguments);
      };
    }();
    fetchTemplate();
  }, [showTable, statusUpdate, pageDetail, showEditor, partyMasterCodeSet.size]);
  var updateTemplateStatus = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(function* (record, publishTemplateReqObj) {
      var status = (record == null ? void 0 : record.status) === STATUS.ACTIVE ? false : true;
      var templateUpdateStatusReqObj = {
        [DATA_INDEX.TEMPLATE_ID]: record == null ? void 0 : record.id,
        [DATA_INDEX.IS_ACTIVE]: status
      };
      var responseStatus = '';
      var responseMessage = publishTemplateReqObj === undefined ? containerConstants.formatString(containerConstants.STATUS_UPDATE_SUCCESSFULLY) : containerConstants.formatString(containerConstants.TEMPLATE_SAVED_SUCCESSFULLY);
      try {
        setShowLoading(true);
        var templateResponse = yield activateDeactivateLabelTemplate(record ? templateUpdateStatusReqObj : publishTemplateReqObj);
        setShowLoading(false);
        if (templateResponse && templateResponse.status === 200) {
          var _templateResponse$dat, _templateResponse$dat2;
          responseStatus = (_templateResponse$dat = templateResponse.data) == null ? void 0 : _templateResponse$dat.status;
          responseMessage = toUpper(responseStatus) === STATUS.SUCCESS ? responseMessage : (_templateResponse$dat2 = templateResponse.data) == null ? void 0 : _templateResponse$dat2.message;
        }
      } catch (error) {
        setShowLoading(false);
      }
      if (toUpper(responseStatus) === STATUS.SUCCESS) {
        notifyResponseMessage(STATUS.SUCCESS, responseMessage);
        setShowPopover({
          visible: false,
          key: null,
          leftTab: null
        });
        setStatusUpdate(prev => !prev);
        return responseStatus;
      } else {
        notifyResponseMessage(STATUS.ERROR, responseMessage);
      }
    });
    return function updateTemplateStatus(_x, _x2) {
      return _ref6.apply(this, arguments);
    };
  }();
  var deleteTemplate = id => {
    setShowLoading(true);
    deleteLabelTemplate(id).then(response => {
      setShowLoading(false);
      if (response.status === 200) {
        var _response$data2;
        if (toUpper((_response$data2 = response.data) == null ? void 0 : _response$data2.status) === STATUS.SUCCESS) {
          var _response$data3;
          notifyResponseMessage(STATUS.SUCCESS, response == null || (_response$data3 = response.data) == null ? void 0 : _response$data3.message);
          setStatusUpdate(prev => !prev);
          setShowTable(true);
          getAllTemplate();
        } else {
          var _response$data4;
          notifyResponseMessage(STATUS.ERROR, response == null || (_response$data4 = response.data) == null ? void 0 : _response$data4.message);
        }
      }
    }).catch(error => {
      setShowLoading(false);
    });
  };
  var clickPopoverEditHandler = dataObject => {
    setShowEditor({
      visible: true,
      operationType: OPERATIONS.EDIT,
      [DATA_INDEX.TEMPLATE_ID]: dataObject.id,
      [DATA_INDEX.TEMPLATE_STATUS]: dataObject.status,
      [DATA_INDEX.TEMPLATE_SCRIPT]: dataObject.script,
      [DATA_INDEX.TEMPLATE_NAME]: dataObject.name,
      [DATA_INDEX.LABEL_FORMAT]: dataObject.labelFormat
    });
    setShowPopover({
      visible: false,
      key: null,
      leftTab: null
    });
  };
  var templatePopoverIconClasses = 'template-popover-icon flex align-center justify-center pointer mr10';
  var CustomCell = _ref7 => {
    var {
        children,
        record
      } = _ref7,
      restProps = _objectWithoutPropertiesLoose(_ref7, _excluded);
    return /*#__PURE__*/React.createElement("td", restProps, record ? /*#__PURE__*/React.createElement("div", {
      className: "flex align-center"
    }, /*#__PURE__*/React.createElement(Popover
    // visible={record?.id === showPopover.key && showPopover.visible}
    // onVisibleChange={(visible) => setShowPopover(visible ? { visible: visible, key: record.id } : {})}
    , {
      id: "label_template_table_popover",
      placement: "bottomLeft",
      content: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
        id: "label_template_table_popover_content",
        className: store.fromFCR ? '' : store.showCustom ? 'non_selectable' : '',
        onClick: () => (store.fromFCR || !store.showCustom) && clickPopoverEditHandler(record)
      }, containerConstants.formatString(containerConstants.EDIT)), /*#__PURE__*/React.createElement("p", {
        id: "label_template_table_popover_content",
        className: store.fromFCR ? '' : store.showCustom ? 'non_selectable' : '',
        onClick: () => {
          (store.fromFCR || !store.showCustom) && setShowConfirmModalDialog({
            visible: true,
            okText: containerConstants.formatString(record.status === STATUS.ACTIVE ? containerConstants.INACTIVE : record.status === STATUS.DRAFT ? containerConstants.PUBLISH : containerConstants.ACTIVE),
            title: containerConstants.formatString(containerConstants.STATUS_UPDATE) + '?',
            description: containerConstants.formatString(containerConstants.CONFIRM_DESCRIPTION),
            record: record
          });
          (store.fromFCR || !store.showCustom) && setShowPopover({
            visible: false,
            key: null
          });
        }
      }, containerConstants.formatString(record.status === STATUS.ACTIVE ? containerConstants.INACTIVE : record.status === STATUS.DRAFT ? containerConstants.PUBLISH : containerConstants.ACTIVE)), /*#__PURE__*/React.createElement("p", {
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
    }, /*#__PURE__*/React.createElement("div", {
      className: (record == null ? void 0 : record.id) === showPopover.key ? templatePopoverIconClasses.concat(' ', 'selected bg-primary') : templatePopoverIconClasses
    }, /*#__PURE__*/React.createElement(MoreOutlined, {
      color: (record == null ? void 0 : record.id) === showPopover.key ? '#FFFFFF' : '#323232'
    }))), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: '12px'
      },
      className: "fw400 fs12 lh18"
    }, children)) : children);
  };
  var handlePageChange = val => {
    setPageDetail({
      current: val - 1,
      pageSize: pageDetail.pageSize
    });
  };
  var handlePgaeSizeChange = val => {
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
  var getMenuForDropDown = partyCode => {
    var menus = partyCode && partyCode.split(",").map(data => {
      return /*#__PURE__*/React.createElement(Menu.Item, {
        key: data
      }, data);
    });
    var menu = () => {
      return /*#__PURE__*/React.createElement(Menu, null, menus);
    };
    return /*#__PURE__*/React.createElement(Dropdown, {
      overlay: menu,
      placement: "bottomLeft"
    }, /*#__PURE__*/React.createElement(DownOutlined, {
      style: {
        paddingRight: '8px',
        paddingLeft: '5px'
      },
      color: "#727272"
    }));
  };
  var closeLinkPartyDialog = () => {
    setTemplateCodeForAddParty(null);
    setLinkedPartyCodes([]);
    setShowModalDialogLinkParty(false);
  };
  var openLinkTemplateBox = data => {
    data && data.partyCode && data.partyCode.split(",").length > 0 && setLinkedPartyCodes(data.partyCode.split(","));
    setShowLoading(true);
    fetchLabelPartyMapping().then(response => {
      setShowLoading(false);
      if (response && response.status === 200 && response.data && response.data.status === 'Success') {
        var mappedMerchantCode = new Set();
        response.data.data && Object.entries(response.data.data).map(item => {
          if (item[0] !== data.templateCode) {
            if (item[1].includes(",")) {
              item[1].split(",").forEach(merchantCode => mappedMerchantCode.add(merchantCode));
            } else {
              mappedMerchantCode.add(item[1]);
            }
          }
        });
        var availableMerchantCode = [];
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
  var saveLinkedParty = () => {
    setShowLoading(true);
    saveLabelTemplatePartyMapping(linkedPartyCodes, templateCodeForAddParty).then(response => {
      setShowLoading(false);
      if (response && response.status === 200 && response.data && response.data.status === 'Success') {
        notifyResponseMessage(STATUS.SUCCESS, containerConstants.formatString(containerConstants.SUCCESSFULLY_UPDATED));
        closeLinkPartyDialog();
        getAllTemplate();
      } else {
        notifyResponseMessage(STATUS.ERROR, response && response.data && response.data.message ? response.data.message : containerConstants.formatString(containerConstants.SOMETHING_WENT_WRONG));
      }
    }).catch(error => {
      setShowLoading(false);
      notifyResponseMessage(STATUS.ERROR, error);
    });
  };
  var LABEL_TEMPLATE_TABLE_HEADER = [_extends({
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh16 ml26"
    }, containerConstants.formatString(containerConstants.NAME)),
    dataIndex: DATA_INDEX.NAME,
    width: '16%'
  }, getColumnSearchProps(DATA_INDEX.NAME, DATA_INDEX.NAME, DATA_INDEX.NAME), {
    onCell: (record, rowIndex) => ({
      record,
      rowIndex
    })
  }), {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh16"
    }, containerConstants.formatString(containerConstants.TEMPLATE_CODE)),
    dataIndex: DATA_INDEX.TEMPLATE_CODE,
    width: '16%',
    key: '1',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "fw400 fs12 lh18"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh16"
    }, containerConstants.formatString(containerConstants.CREATED_ON)),
    dataIndex: DATA_INDEX.CREATED_AT,
    width: '20%',
    key: '3',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "fw400 fs12 lh18"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh16"
    }, containerConstants.formatString(containerConstants.LAST_MODIFIED_ON)),
    dataIndex: DATA_INDEX.LAST_MODIFIED_AT,
    width: '20%',
    key: '4',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "fw400 fs12 lh18"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh16"
    }, containerConstants.formatString(containerConstants.PAGE_SIZE)),
    dataIndex: DATA_INDEX.PAGE_SIZE,
    width: '20%',
    key: '4',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "fw400 fs12 lh18"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh16"
    }, containerConstants.formatString(containerConstants.STATUS)),
    dataIndex: DATA_INDEX.STATUS,
    width: '10%',
    key: '6',
    render: text => /*#__PURE__*/React.createElement(Tag, {
      className: 'font-family-weight-500 fs10 lh14 br4' + (toUpper(text) === STATUS.ACTIVE ? ' status-tag-active' : ' status-tag-draft'),
      color: toUpper(text) === STATUS.ACTIVE ? '#E2FFEA' : '#F3F3F3'
    }, toUpper(text) === STATUS.INPROGRESS ? upperFirst(toLower('Draft')) : upperFirst(toLower(text)))
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.LINKED_PARTIES)),
    dataIndex: DATA_INDEX.PARTY_CODE,
    width: '20%',
    fixed: 'right',
    key: '5',
    render: (text, record, index) => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22",
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'right'
      }
    }, record && record.partyCode && record.partyCode.split(",").length > 0 && record.partyCode.split(",").length, record && record.partyCode && getMenuForDropDown(record.partyCode), /*#__PURE__*/React.createElement(Button, {
      ghost: true,
      style: {
        border: '1px solid',
        borderRadius: '4px'
      },
      type: "primary",
      onClick: text => openLinkTemplateBox(record)
    }, containerConstants.formatString(containerConstants.LINK_PARTIES)))
  }];
  var handleSearch = (selectedKeys, confirm, dataIndex) => {
    // Object.keys(allPartyNameWithMasterCodeMaps).map((key)=>{
    //   if(key.toLowerCase().includes(searchfilters[dataIndex].toLowerCase())){
    //     partycodes = partycodes === '' ? allPartyNameWithMasterCodeMaps[key] : partycodes + '&&##&&' + allPartyNameWithMasterCodeMaps[key];
    //   }
    // });
    // setEmptySearchResult(true);
    setShowTable(true);
    getAllTemplate();
  };
  var handleReset = dataIndex => {
    setSearchfilters('');
    setShowTable(true);
    getAllTemplate();
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%'
    }
  }, console.log(labelTemplateList), /*#__PURE__*/React.createElement(LabelTemplateStyle, null), partyMasterCodeSet && partyMasterCodeSet.size > 0 && /*#__PURE__*/React.createElement(Modal, {
    title: containerConstants.formatString(containerConstants.LINK_PARTIES),
    visible: showModalDialogLinkParty,
    style: {
      width: '406px !important',
      height: '175px',
      borderRadius: '4px'
    },
    footer: [/*#__PURE__*/React.createElement(Button, {
      key: "cancel",
      style: {
        color: '#727272',
        border: 0
      },
      onClick: closeLinkPartyDialog
    }, containerConstants.formatString(containerConstants.CANCEL)), /*#__PURE__*/React.createElement(Button, {
      loading: showLoading,
      key: "submit",
      type: "primary",
      onClick: saveLinkedParty
    }, containerConstants.formatString(containerConstants.DONE))],
    onCancel: closeLinkPartyDialog
  }, /*#__PURE__*/React.createElement(Row, {
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Col, {
    span: 6
  }, containerConstants.formatString(containerConstants.NAME)), /*#__PURE__*/React.createElement(Col, {
    span: 18
  }, /*#__PURE__*/React.createElement(Select, {
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
  })))), !showEditor.visible && /*#__PURE__*/React.createElement(BreadCrumb, {
    urlList: store.fromNewSetting ? urlListForNewSetting : urlList,
    rightItem: showTable ? /*#__PURE__*/React.createElement(Button, {
      disabled: store.fromFCR ? false : store.showCustom,
      className: "fw500",
      style: {
        display: 'flex',
        height: '24px',
        padding: '0 8px',
        borderRadius: '4px'
      },
      type: "primary",
      icon: /*#__PURE__*/React.createElement(PlusOutlined, {
        style: {
          display: 'flex',
          alignSelf: 'center',
          fontSize: '10px'
        }
      }),
      onClick: () => setShowModalDialog({
        visible: true,
        title: containerConstants.formatString(containerConstants.CHOOSE_TEMPLATE),
        modalType: TEMPLATE_MODAL_TYPE.CHOOSE_TEMPLATE
      })
    }, containerConstants.formatString(containerConstants.CREATE_TEMPLATE)) : null
  }), /*#__PURE__*/React.createElement(Spin, {
    id: "label-template-spin",
    wrapperClassName: "label-template-spin-height",
    spinning: showLoading
  }, !showEditor.visible && /*#__PURE__*/React.createElement(Card, {
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
  }, !showTable && searchfilters === '' ? /*#__PURE__*/React.createElement(EmptyDataView, {
    setShowModalDialog
  }) : /*#__PURE__*/React.createElement("div", {
    id: "label_template_table"
  }, /*#__PURE__*/React.createElement(Table, {
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
  }), /*#__PURE__*/React.createElement(CustomPagination, {
    pageDetail: pageDetail,
    paginationDetails: paginationDetails,
    handlePageChange: handlePageChange,
    handlePgaeSizeChange: handlePgaeSizeChange,
    curentPageOption: paginationDetails.pageSizeText
  }))), showEditor.visible && /*#__PURE__*/React.createElement(HtmlEditor, {
    showEditor,
    setShowEditor,
    setShowTable,
    updateTemplateStatus
  }), !showEditor.visible && /*#__PURE__*/React.createElement(CustomModal, {
    showModalDialog,
    setShowEditor,
    setShowModalDialog,
    showConfirmModalDialog,
    setShowConfirmModalDialog,
    deleteTemplate,
    updateTemplateStatus
  })));
};
export default LabelTemplate;
//# sourceMappingURL=LabelTemplate.js.map
