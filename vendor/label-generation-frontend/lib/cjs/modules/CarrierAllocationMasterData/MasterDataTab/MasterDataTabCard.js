"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _bread_crumb = _interopRequireDefault(require("../../commoncomponent/breadcrumb/bread_crumb"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
require("../../../CSS/MasterDataTabCardStyle.css");
var _constants = require("../../../utils/constants");
var _AddEditFormModal = _interopRequireDefault(require("./AddEditFormModal"));
var _excel_icon = _interopRequireDefault(require("../../../images/excel_icon.svg"));
var _add_form_icon = _interopRequireDefault(require("../../../images/add_form_icon.svg"));
var _ViewAPIDocModal = _interopRequireDefault(require("./ViewAPIDocModal"));
var _lodash = require("lodash");
var _ContainerConstants = require("../../../utils/containerconstants/ContainerConstants");
var _MasterDataTabCardAction = require("./hooks/APIConfig/MasterDataTabCardAction");
var _notifyResponseMessage = require("../../commoncomponent/NotificationComponent/notifyResponseMessage");
var _axios = _interopRequireDefault(require("axios"));
var _CustomPagination = _interopRequireDefault(require("./CustomPagination/CustomPagination"));
var _store = require("../../hook-store/store");
var _BasePath = require("../../commoncomponent/BasePath");
const _excluded = ["children", "record"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const {
  TabPane
} = _antd.Tabs;
const {
  Meta
} = _antd.Card;
const {
  Dragger
} = _antd.Upload;
const MasterDataTabCard = props => {
  const [showModalDialogAddUpload, setShowModalDialogAddUpload] = (0, _react.useState)(false);
  const [showModalDialogForm, setShowModalDialogForm] = (0, _react.useState)({
    visible: false,
    title: '',
    okText: '',
    form: ''
  });
  const [showPopover, setShowPopover] = (0, _react.useState)({
    visible: false,
    key: null,
    leftTab: null
  });
  const [showAPIDocModal, setShowAPIDocModal] = (0, _react.useState)(false);
  const [activeTabPaneKey, setActiveTabPaneKey] = (0, _react.useState)(_constants.LEFT_TABS.PARTY_MASTER_TABPANE);
  const [partyMasterList, setPartyMasterList] = (0, _react.useState)([]);
  const [parcelShopMasterList, setParceShopMasterList] = (0, _react.useState)([]);
  const [pageDetail, setPageDetail] = (0, _react.useState)({
    current: 0,
    pageSize: 10
  });
  const [paginationDetails, setPaginationDetails] = (0, _react.useState)({
    totalElements: 0,
    numberOfElements: 0,
    pageSizeText: _constants.PAGE_SIZE.PAGE_10
  });
  const [showLoading, setShowLoading] = (0, _react.useState)(false);
  const [progressWidth, setProgressWidth] = (0, _react.useState)(0);
  const [visibleJsx, setVisibleJsx] = (0, _react.useState)(_constants.EXCEL_CONSTANTS.INITIAL);
  const [uploadResponse, setUploadResponse] = (0, _react.useState)(null);
  const [errorData, setErrorData] = (0, _react.useState)([]);
  const [activeTabData, setActiveTabData] = (0, _react.useState)({});
  const [fileName, setFileName] = (0, _react.useState)('');
  const inActive = containerConstants.formatString(containerConstants.INACTIVE);
  const active = containerConstants.formatString(containerConstants.ACTIVE);
  const store = (0, _store.useStore)(true)[0];
  const [basePath, setBasePath] = (0, _react.useState)('');
  const urlList = [{
    url: basePath + '/v2/label_generation/v2/settings',
    heading: containerConstants.formatString(containerConstants.SETTINGS)
  }, {
    url: basePath + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: basePath + '/v2/label_generation/carrier_allocation',
    heading: containerConstants.formatString(containerConstants.CARRIER_ALLOCATION_AND_MASTER_VALIDATION)
  }, {
    url: basePath + '/v2/label_generation/carrier_allocation/master_data',
    heading: containerConstants.formatString(containerConstants.MASTER_DATA)
  }];
  const urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: '/v2/new_settings/label_generation/carrier_allocation',
    heading: containerConstants.formatString(containerConstants.CARRIER_ALLOCATION_AND_MASTER_VALIDATION)
  }, {
    url: '/v2/new_settings/label_generation/carrier_allocation/master_data',
    heading: containerConstants.formatString(containerConstants.MASTER_DATA)
  }];
  const PARTY_MASTER_TABLE_HEADER = [{
    width: 40,
    onCell: (record, rowIndex) => ({
      record,
      rowIndex
    }),
    fixed: true
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.MERCHANT_CODE)),
    width: 180,
    dataIndex: _constants.MASTER_DATA_INDEX.MERCHANT_CODE,
    key: 'merchant_code',
    fixed: true,
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.TYPE)),
    width: 180,
    dataIndex: _constants.MASTER_DATA_INDEX.TYPE,
    key: 'type',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.NAME)),
    dataIndex: _constants.MASTER_DATA_INDEX.NAME,
    width: 180,
    key: '1',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.BILLING_ADDRESS)),
    dataIndex: _constants.MASTER_DATA_INDEX.BILLING_ADDRESS,
    width: 180,
    key: '2',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.CONTACT_PERSON)),
    dataIndex: _constants.MASTER_DATA_INDEX.CONTACT_PERSON,
    width: 180,
    key: '3',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.CONTACT_NUMBER)),
    dataIndex: _constants.MASTER_DATA_INDEX.CONTACT_NUMBER,
    width: 180,
    key: '4',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.EMAIL)),
    dataIndex: _constants.MASTER_DATA_INDEX.EMAIL,
    width: 180,
    key: '5',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.RATE_CARD_CODE)),
    dataIndex: _constants.MASTER_DATA_INDEX.RATE_CARD_CODE,
    width: 180,
    key: '6',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.COMMISSION_CODE)),
    dataIndex: _constants.MASTER_DATA_INDEX.COMMISSION_CODE,
    width: 180,
    key: '7',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.BASE_ADDRESS)),
    dataIndex: _constants.MASTER_DATA_INDEX.BASE_ADDRESS,
    width: 180,
    key: 'base-address',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.BASE_POSTAL_CODE)),
    dataIndex: _constants.MASTER_DATA_INDEX.BASE_POSTAL_CODE,
    width: 180,
    key: 'base-postal-code',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.BASE_LATITUDE)),
    dataIndex: _constants.MASTER_DATA_INDEX.BASE_LATITUDE,
    width: 180,
    key: 'base-latitude',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.BASE_LONGITUDE)),
    dataIndex: _constants.MASTER_DATA_INDEX.BASE_LONGITUDE,
    width: 180,
    key: 'base-longitude',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.BRAND_EXPERIENCE)),
    dataIndex: _constants.MASTER_DATA_INDEX.BRAND_EXPERIENCE,
    width: 180,
    key: 'branded-experience',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text !== null && text !== undefined ? (0, _lodash.upperFirst)(String(text)) : '')
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.NO_OF_RE_ATTEMPTS)),
    dataIndex: _constants.MASTER_DATA_INDEX.NO_OF_RE_ATTEMPTS,
    width: 220,
    key: 'number-of-reAttempts',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.ACCEPT_OVERAGE_PICKUP)),
    dataIndex: _constants.MASTER_DATA_INDEX.ACCEPT_OVERAGE_PICKUP,
    width: 180,
    key: 'accept-overage-pickup',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text !== null && text !== undefined ? (0, _lodash.upperFirst)(String(text)) : '')
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.THRESHOLD_NO_OF_PICKUP_SCAN)),
    dataIndex: _constants.MASTER_DATA_INDEX.THRESHOLD_NO_OF_PICKUP_SCAN,
    width: 220,
    key: 'threshold-number-for-pickupScan',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.STATUS)),
    dataIndex: _constants.MASTER_DATA_INDEX.ACTIVE,
    width: 90,
    fixed: 'right',
    key: 'active',
    render: text => /*#__PURE__*/_react.default.createElement(_antd.Tag, {
      id: "fixed_column",
      className: ['font-family-weight-500 font-s10 font-h14 br4 ', text ? 'status-tag-active' : 'status-tag-inactive'].join(' ')
    }, text ? '  ' + active + '   ' : ' ' + inActive + ' ')
  }];
  const errorHeader = [{
    title: /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-500 font-s10 font-h16",
      style: {
        color: '#727272'
      }
    }, "ERROR MESSAGE"),
    dataIndex: 'errorMsg',
    key: 'errorMsg',
    render: text => /*#__PURE__*/_react.default.createElement("div", {
      className: "font-family-weight-400 font-s12 font-h18",
      style: {
        color: '#212121'
      }
    }, text)
  }];
  (0, _react.useEffect)(() => {
    setBasePath((0, _BasePath.getBasePath)(props, store));
    document.title = containerConstants.formatString(containerConstants.CARRIER_ALLOCATION_AND_MASTER_VALIDATION);
    setInitialData();
  }, [showModalDialogForm, pageDetail, activeTabPaneKey]);
  const setInitialData = () => {
    setShowLoading(true);
    if (activeTabPaneKey === _constants.LEFT_TABS.PARTY_MASTER_TABPANE) {
      setActiveTabData({
        visible: true,
        title: containerConstants.formatString(containerConstants.ADD_PARTY_MASTER),
        okText: containerConstants.formatString(containerConstants.ADD),
        form: _constants.LEFT_TABS.PARTY_MASTER_TABPANE
      });
      (0, _MasterDataTabCardAction.fetchPartyMasterPagination)(pageDetail.current, pageDetail.pageSize).then(response => {
        setShowLoading(false);
        if (response && response.status === 200) {
          if (response.data && response.data.data) {
            setPartyMasterList(response.data.data);
            setPaginationDetails({
              totalElements: response.data.data.totalElements,
              numberOfElements: response.data.data.numberOfElements,
              pageSizeText: paginationDetails.pageSizeText
            });
          }
        }
      }).catch(error => {
        setShowLoading(false);
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
      });
    } else if (activeTabPaneKey === _constants.LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE) {
      setActiveTabData({
        visible: true,
        title: containerConstants.formatString(containerConstants.ADD_PARCEL_SHOP_MASTER),
        okText: containerConstants.formatString(containerConstants.ADD),
        form: _constants.LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE
      });
      (0, _MasterDataTabCardAction.fetchParcelShopMaster)(pageDetail.current, pageDetail.pageSize).then(response => {
        setShowLoading(false);
        if (response && response.status === 200) {
          if (response.data && response.data.data) {
            setParceShopMasterList(response.data.data);
            setPaginationDetails({
              totalElements: response.data.data.totalElements,
              numberOfElements: response.data.data.numberOfElements,
              pageSizeText: paginationDetails.pageSizeText
            });
          }
        }
      }).catch(error => {
        setShowLoading(false);
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
      });
    }
  };
  const openAddDialog = () => {
    setShowModalDialogAddUpload(true);
    setProgressWidth(0);
    setVisibleJsx(_constants.EXCEL_CONSTANTS.INITIAL);
    setUploadResponse(null);
  };
  const handlePageChange = val => {
    setPageDetail({
      current: val - 1,
      pageSize: pageDetail.pageSize
    });
  };
  const setDefaultPaginationSetting = () => {
    setPageDetail({
      current: 0,
      pageSize: 10
    });
    setPaginationDetails({
      totalElements: 0,
      numberOfElements: 0,
      pageSizeText: _constants.PAGE_SIZE.PAGE_10
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
  const getMasterDataJsx = () => {
    return /*#__PURE__*/_react.default.createElement(_antd.Tabs, {
      tabBarGutter: "0",
      tabPosition: 'left',
      style: {
        zIndex: 0
      },
      id: "master_card_left_tab",
      onTabClick: key => {
        setDefaultPaginationSetting();
        setActiveTabPaneKey(key);
      }
    }, /*#__PURE__*/_react.default.createElement(TabPane, {
      tab: containerConstants.formatString(containerConstants.PARTY_MASTER),
      key: _constants.LEFT_TABS.PARTY_MASTER_TABPANE
    }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
      size: "small",
      bordered: false,
      style: {
        margin: '1px 15px 0px'
      },
      bodyStyle: {
        padding: '1rem 0px'
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Space, {
      style: {
        float: 'right'
      },
      size: 'middle'
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      ghost: true,
      type: "primary",
      onClick: () => setShowAPIDocModal(true)
    }, containerConstants.formatString(containerConstants.VIEW_API_DOC)), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.PlusOutlined, null),
      style: {
        color: '#FFFFFF'
      },
      type: "primary",
      onClick: openAddDialog
    }, containerConstants.formatString(containerConstants.ADD_PARTY_MASTER)))), /*#__PURE__*/_react.default.createElement(_antd.Spin, {
      spinning: showLoading,
      style: {
        paddingTop: '50%'
      },
      className: "text-primary",
      size: 'large'
    }, /*#__PURE__*/_react.default.createElement(_antd.Table, {
      components: {
        body: {
          cell: props1 => CustomCell(props1, _constants.LEFT_TABS.PARTY_MASTER_TABPANE)
        }
      },
      bordered: true,
      size: "middle",
      columns: PARTY_MASTER_TABLE_HEADER,
      dataSource: partyMasterList ? partyMasterList.content : null,
      scroll: {
        x: 3000
      },
      pagination: false,
      onChange: page => {
        setPageDetail(page);
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomPagination.default, {
      pageDetail: pageDetail,
      paginationDetails: paginationDetails,
      handlePageChange: handlePageChange,
      handlePgaeSizeChange: handlePgaeSizeChange,
      curentPageOption: paginationDetails.pageSizeText
    }))), /*#__PURE__*/_react.default.createElement(TabPane, {
      tab: containerConstants.formatString(containerConstants.PARCEL_SHOP_MASTER),
      key: _constants.LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE
    }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
      size: "small",
      bordered: false,
      style: {
        margin: '1px 15px 0px'
      },
      bodyStyle: {
        padding: '1rem 0px'
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Space, {
      style: {
        float: 'right'
      },
      size: 'middle'
    }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
      ghost: true,
      type: "primary",
      onClick: () => setShowAPIDocModal(true)
    }, containerConstants.formatString(containerConstants.VIEW_API_DOC)), /*#__PURE__*/_react.default.createElement(_antd.Button, {
      icon: /*#__PURE__*/_react.default.createElement(_icons.PlusOutlined, null),
      style: {
        color: '#FFFFFF'
      },
      type: "primary",
      onClick: openAddDialog
    }, containerConstants.formatString(containerConstants.ADD_PARCEL_SHOP_MASTER)))), /*#__PURE__*/_react.default.createElement(_antd.Spin, {
      spinning: showLoading,
      style: {
        paddingTop: '50%'
      },
      className: "text-primary",
      size: 'large'
    }, /*#__PURE__*/_react.default.createElement(_antd.Table, {
      components: {
        body: {
          cell: props1 => CustomCell(props1, _constants.LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE)
        }
      },
      bordered: true,
      size: "middle",
      columns: _constants.PARCEL_SHOP_MASTER_TABLE_HEADER,
      dataSource: parcelShopMasterList ? parcelShopMasterList.content : null,
      scroll: {
        x: 900
      },
      pagination: false,
      onChange: page => {
        setPageDetail(page);
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomPagination.default, {
      pageDetail: pageDetail,
      paginationDetails: paginationDetails,
      handlePageChange: handlePageChange,
      handlePgaeSizeChange: handlePgaeSizeChange,
      curentPageOption: paginationDetails.pageSizeText
    }))));
  };
  const clickPopoverActiveStatusHandler = dataObject => {
    setShowLoading(true);
    if (activeTabPaneKey === _constants.LEFT_TABS.PARTY_MASTER_TABPANE) {
      (0, _MasterDataTabCardAction.partyMasterStatusUpdate)(dataObject.id, !dataObject.active).then(response => {
        setShowLoading(false);
        if (response && response.data) {
          if (response.data.status === 'Success') {
            setInitialData();
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, response.data.message);
          } else {
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, response.data.message);
          }
        } else {
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, "ERROR");
        }
      }).catch(error => {
        setShowLoading(false);
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, error);
      });
    } else if (activeTabPaneKey === _constants.LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE) {
      (0, _MasterDataTabCardAction.parcelShopMasterStatusUpdate)(dataObject.id, !dataObject.active).then(response => {
        setShowLoading(false);
        if (response && response.data) {
          if (response.data.status === 'Success') {
            setInitialData();
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, response.data.message);
          } else {
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, response.data.message);
          }
        } else {
          (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, "ERROR");
        }
      }).catch(error => {
        setShowLoading(false);
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
      });
    } else {
      setShowLoading(false);
    }
    setShowPopover({
      visible: false,
      key: null,
      leftTab: null
    });
  };
  const clickPopoverEditHandler = dataObject => {
    if (activeTabPaneKey === _constants.LEFT_TABS.PARTY_MASTER_TABPANE) {
      setShowModalDialogForm({
        visible: true,
        title: containerConstants.formatString(containerConstants.EDIT_PARTY_MASTER),
        okText: containerConstants.formatString(containerConstants.ADD),
        form: _constants.LEFT_TABS.PARTY_MASTER_TABPANE,
        operation: _constants.OPERATION.EDIT,
        data: dataObject
      });
    } else if (activeTabPaneKey === _constants.LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE) {
      setShowModalDialogForm({
        visible: true,
        title: containerConstants.formatString(containerConstants.EDIT_PARCEL_SHOP_MASTER),
        okText: containerConstants.formatString(containerConstants.ADD),
        form: _constants.LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE,
        operation: _constants.OPERATION.EDIT,
        data: dataObject
      });
    }
    setShowPopover({
      visible: false,
      key: null,
      leftTab: null
    });
  };
  const CustomCell = (_ref, activeTabPane) => {
    let {
        children,
        record
      } = _ref,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
    return /*#__PURE__*/_react.default.createElement("td", restProps, record ? /*#__PURE__*/_react.default.createElement(_antd.Popover
    // open={showPopover.leftTab === activeTabPane && record?.id === showPopover.key && showPopover.visible}
    // afterOpenChange={(visible) => setShowPopover({ visible: visible, key: record.id, leftTab: activeTabPaneKey })}
    , {
      id: "master-data-table-popover",
      placement: "bottomLeft",
      content: /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
        id: "popover-content",
        onClick: () => clickPopoverEditHandler(record)
      }, containerConstants.formatString(containerConstants.EDIT)), /*#__PURE__*/_react.default.createElement("p", {
        id: "popover-content",
        onClick: () => clickPopoverActiveStatusHandler(record)
      }, record.active ? containerConstants.formatString(containerConstants.INACTIVE) : containerConstants.formatString(containerConstants.ACTIVE))),
      trigger: "click"
    }, /*#__PURE__*/_react.default.createElement(_icons.MoreOutlined, {
      style: {
        fontSize: '14px'
      }
    })) : children);
  };
  const prop = {
    name: 'file',
    maxCount: 1,
    multiple: false,
    action: activeTabPaneKey === _constants.LEFT_TABS.PARTY_MASTER_TABPANE ? '/app/rest/label_generation/partyMaster/upload_excel' : '/app/rest/label_generation/parcelShopMaster/upload_excel',
    onChange: info => {
      const status = info.file.status;
      if (fileName.localeCompare(info.file.name) != 0) {
        setFileName(info.file.name);
      }
      if (status == 'uploading') {
        setProgressWidth(info.file.percent);
        setVisibleJsx(_constants.EXCEL_CONSTANTS.UPLOADING);
      } else if (status === 'done') {
        setVisibleJsx(_constants.EXCEL_CONSTANTS.UPLOAD_RESPONSE);
        setUploadResponse(info.file.response);
        if (info.file.response.failCount > 0 || info.file.response.errorMessageList && info.file.response.errorMessageList.length > 0) {
          let errors = [];
          for (const [key, errorMessage] of Object.entries(info.file.response.errorMessageList)) {
            errors.push({
              key: '1',
              errorMsg: errorMessage
            });
          }
          setErrorData(errors);
        }
      } else if (status === 'error') {
        let error = '';
        if (info.file.response.status === 500) {
          error = {
            status: 500,
            errorMessage: ''
          };
        } else if (info.file.response.status === 404) {
          error = {
            status: 404,
            errorMessage: info.file.response.error
          };
        } else if (info.file.response.responseMessage) {
          error = {
            status: null,
            errorMessage: info.file.response.responseMessage
          };
        }
        setVisibleJsx(_constants.EXCEL_CONSTANTS.ERROR);
      } else if (status == 'removed') {
        setVisibleJsx(_constants.EXCEL_CONSTANTS.INITIAL);
      }
    },
    accept: '.xlsx,.xls'
  };
  const downloadSample = async () => {
    (0, _axios.default)({
      url: activeTabPaneKey === _constants.LEFT_TABS.PARTY_MASTER_TABPANE ? '/app/rest/label_generation/partymaster/download_sample_excel' : '/app/rest/label_generation/parcelShopMaster/download_sample_excel',
      method: 'GET',
      responseType: 'blob'
    }).then(response => {
      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', (activeTabPaneKey === _constants.LEFT_TABS.PARTY_MASTER_TABPANE ? 'Add_Party_Master.' : 'Add_Parcel_Shop_Master.') + getExtension(response.data.type));
        document.body.appendChild(link);
        link.click();
      } else if (response.data) {
        var errorMessage = response.data;
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, errorMessage);
      }
    }).catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
      } else {
        var errorMessage = containerConstants.formatString(containerConstants.Something_Went_Wrong);
        if (error.response && error.response.headers && error.response.headers.trace_id) {
          errorMessage = errorMessage + ' Trace id: ' + error.response.headers.trace_id;
        }
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, errorMessage);
      }
    });
  };
  const getExtension = ext => {
    switch (ext) {
      case 'application/ms-excel':
        return 'xlsx';
      default:
        break;
    }
  };
  const closeAddPartyMasterDialog = () => {
    setShowModalDialogAddUpload(false);
    setInitialData();
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_bread_crumb.default, {
    urlList: store.fromNewSetting ? urlListForNewSetting : urlList
  }), /*#__PURE__*/_react.default.createElement(_antd.Card, {
    id: "master_data_tab_card",
    headStyle: {
      borderBottom: '1px solid #DADADA',
      borderRadius: '4px',
      height: '2.68rem',
      padding: '0'
    },
    bodyStyle: {
      padding: '0',
      height: 'fit-content',
      paddingBottom: '10px'
    },
    size: "small"
  }, getMasterDataJsx()), visibleJsx === _constants.EXCEL_CONSTANTS.UPLOAD_RESPONSE && uploadResponse && uploadResponse != null && uploadResponse.successCount > 0 ? /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    className: "master-data-add-modal",
    visible: showModalDialogAddUpload,
    style: {
      width: '480px',
      height: '410px'
    },
    footer: null,
    onOk: closeAddPartyMasterDialog,
    onCancel: closeAddPartyMasterDialog,
    bodyStyle: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      justifyContent: 'center',
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement(_icons.CheckCircleFilled, {
    style: {
      fontSize: 40,
      color: '#279B4E'
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      marginTop: '16px',
      justifyContent: 'center',
      display: 'flex',
      color: '#000000'
    },
    className: "font-family-weight-500 font-s18 font-h26"
  }, containerConstants.formatString(containerConstants.SUCCESSFULLY_UPLOADED)), /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-400 font-s12 font-h18",
    style: {
      justifyContent: 'center',
      display: 'flex'
    }
  }, fileName), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      justifyContent: 'center',
      display: 'flex',
      color: '#727272'
    },
    className: "font-family-weight-400 font-s14 font-h22"
  }, uploadResponse.successCount, " ", containerConstants.formatString(containerConstants.NEW_RECORDS_ARE_UPLOADED)), uploadResponse.failCount > 0 && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      alignItems: 'center',
      marginTop: '16px',
      marginBottom: '12px',
      display: 'flex',
      background: '#FFFFFF',
      border: '1px solid #C84031',
      borderRadius: '5px'
    },
    className: "font-family-weight-400 font-s12 font-h26"
  }, /*#__PURE__*/_react.default.createElement(_icons.InfoCircleFilled, {
    style: {
      marginRight: '10px',
      color: '#C84031',
      fontSize: 20
    }
  }), "  ", uploadResponse.failCount, " records from the file couldn't be added due to error. Please update the below records"), /*#__PURE__*/_react.default.createElement(_antd.Table, {
    bordered: true,
    columns: errorHeader,
    dataSource: errorData,
    pagination: false
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      justifyContent: 'center',
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    style: {
      marginTop: '24px'
    },
    type: "primary",
    onClick: closeAddPartyMasterDialog
  }, containerConstants.formatString(containerConstants.CLOSE))))) : /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    className: "master-data-add-modal",
    title: activeTabData.title,
    visible: showModalDialogAddUpload,
    style: {
      width: '480px',
      height: '410px'
    },
    footer: null,
    onOk: closeAddPartyMasterDialog,
    onCancel: closeAddPartyMasterDialog
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
    id: "add-modal-excel-card"
  }, /*#__PURE__*/_react.default.createElement(Dragger, _extends({}, prop, {
    showUploadList: false
  }), /*#__PURE__*/_react.default.createElement(Meta, {
    avatar: /*#__PURE__*/_react.default.createElement(_antd.Avatar, {
      shape: "square",
      src: _excel_icon.default
    }),
    title: containerConstants.formatString(containerConstants.UPLOAD_EXCEL),
    description: containerConstants.formatString(containerConstants.UPLOAD_EXCEL_DESCRIPTION)
  }))), visibleJsx === _constants.EXCEL_CONSTANTS.UPLOADING && /*#__PURE__*/_react.default.createElement(_antd.Progress, {
    showInfo: false,
    percent: progressWidth
  }), visibleJsx === _constants.EXCEL_CONSTANTS.UPLOAD_RESPONSE && uploadResponse && uploadResponse != null && uploadResponse.failCount > 0 && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      color: '#C84031'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      color: '#C84031'
    },
    className: "font-family-weight-400 font-s12 font-h18"
  }, fileName), uploadResponse.errorMessageList.map(data => /*#__PURE__*/_react.default.createElement(_antd.Row, null, data))), visibleJsx === _constants.EXCEL_CONSTANTS.UPLOAD_RESPONSE && uploadResponse && uploadResponse != null && uploadResponse.failCount == 0 && errorData && errorData.length > 0 && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      color: '#C84031'
    },
    className: "font-family-weight-400 font-s12 font-h18"
  }, fileName), errorData[0].errorMsg)), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
    id: "add-modal-form-card",
    onClick: () => {
      setShowModalDialogForm({
        visible: activeTabData.visible,
        title: activeTabData.title,
        okText: activeTabData.okText,
        form: activeTabData.form
      });
      setShowModalDialogAddUpload(false);
    }
  }, /*#__PURE__*/_react.default.createElement(Meta, {
    avatar: /*#__PURE__*/_react.default.createElement(_antd.Avatar, {
      shape: "square",
      src: _add_form_icon.default
    }),
    title: containerConstants.formatString(containerConstants.ADD_VIA_FORM),
    description: containerConstants.formatString(containerConstants.ADD_VIA_FORM_DESCRIPTION)
  })))), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "link",
    onClick: downloadSample
  }, containerConstants.formatString(containerConstants.Download_Template))), showModalDialogForm.visible && /*#__PURE__*/_react.default.createElement(_AddEditFormModal.default, {
    showModalDialogForm,
    setShowModalDialogForm
  }), showAPIDocModal && /*#__PURE__*/_react.default.createElement(_ViewAPIDocModal.default, {
    activeTabPaneKey,
    setShowAPIDocModal,
    showAPIDocModal
  }));
};
var _default = exports.default = MasterDataTabCard;
//# sourceMappingURL=MasterDataTabCard.js.map