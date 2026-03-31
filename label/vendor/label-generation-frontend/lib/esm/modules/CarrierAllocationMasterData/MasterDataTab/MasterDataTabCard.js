var _excluded = ["children", "record"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../commoncomponent/breadcrumb/bread_crumb';
import { Avatar, Button, Table, Progress, Card, Col, Modal, Row, Space, Tabs, Upload, Popover, Spin, Tag } from 'antd';
import { PlusOutlined, MoreOutlined, CheckCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import '../../../CSS/MasterDataTabCardStyle.css';
import { PAGE_SIZE, EXCEL_CONSTANTS, PARCEL_SHOP_MASTER_TABLE_HEADER, LEFT_TABS, OPERATION, STATUS, MASTER_DATA_INDEX } from '../../../utils/constants';
import AddEditFormModal from './AddEditFormModal';
import UploadExcelIcon from '../../../images/excel_icon.svg';
import AddFormIcon from '../../../images/add_form_icon.svg';
import ViewAPIDocModal from './ViewAPIDocModal';
import { upperFirst } from 'lodash';
import { containerConstantsService } from '../../../utils/containerconstants/ContainerConstants';
import { fetchPartyMasterPagination, fetchParcelShopMaster, partyMasterStatusUpdate, parcelShopMasterStatusUpdate } from './hooks/APIConfig/MasterDataTabCardAction';
import { notifyResponseMessage } from '../../commoncomponent/NotificationComponent/notifyResponseMessage';
import axios from 'axios';
import CustomPagination from './CustomPagination/CustomPagination';
import { useStore } from '../../hook-store/store';
import { getBasePath } from '../../commoncomponent/BasePath';
var containerConstants = containerConstantsService.getInstance();
var {
  TabPane
} = Tabs;
var {
  Meta
} = Card;
var {
  Dragger
} = Upload;
var MasterDataTabCard = props => {
  var [showModalDialogAddUpload, setShowModalDialogAddUpload] = useState(false);
  var [showModalDialogForm, setShowModalDialogForm] = useState({
    visible: false,
    title: '',
    okText: '',
    form: ''
  });
  var [showPopover, setShowPopover] = useState({
    visible: false,
    key: null,
    leftTab: null
  });
  var [showAPIDocModal, setShowAPIDocModal] = useState(false);
  var [activeTabPaneKey, setActiveTabPaneKey] = useState(LEFT_TABS.PARTY_MASTER_TABPANE);
  var [partyMasterList, setPartyMasterList] = useState([]);
  var [parcelShopMasterList, setParceShopMasterList] = useState([]);
  var [pageDetail, setPageDetail] = useState({
    current: 0,
    pageSize: 10
  });
  var [paginationDetails, setPaginationDetails] = useState({
    totalElements: 0,
    numberOfElements: 0,
    pageSizeText: PAGE_SIZE.PAGE_10
  });
  var [showLoading, setShowLoading] = useState(false);
  var [progressWidth, setProgressWidth] = useState(0);
  var [visibleJsx, setVisibleJsx] = useState(EXCEL_CONSTANTS.INITIAL);
  var [uploadResponse, setUploadResponse] = useState(null);
  var [errorData, setErrorData] = useState([]);
  var [activeTabData, setActiveTabData] = useState({});
  var [fileName, setFileName] = useState('');
  var inActive = containerConstants.formatString(containerConstants.INACTIVE);
  var active = containerConstants.formatString(containerConstants.ACTIVE);
  var store = useStore(true)[0];
  var [basePath, setBasePath] = useState('');
  var urlList = [{
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
  var urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: '/v2/new_settings/label_generation/carrier_allocation',
    heading: containerConstants.formatString(containerConstants.CARRIER_ALLOCATION_AND_MASTER_VALIDATION)
  }, {
    url: '/v2/new_settings/label_generation/carrier_allocation/master_data',
    heading: containerConstants.formatString(containerConstants.MASTER_DATA)
  }];
  var PARTY_MASTER_TABLE_HEADER = [{
    width: 40,
    onCell: (record, rowIndex) => ({
      record,
      rowIndex
    }),
    fixed: true
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.MERCHANT_CODE)),
    width: 180,
    dataIndex: MASTER_DATA_INDEX.MERCHANT_CODE,
    key: 'merchant_code',
    fixed: true,
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.TYPE)),
    width: 180,
    dataIndex: MASTER_DATA_INDEX.TYPE,
    key: 'type',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.NAME)),
    dataIndex: MASTER_DATA_INDEX.NAME,
    width: 180,
    key: '1',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.BILLING_ADDRESS)),
    dataIndex: MASTER_DATA_INDEX.BILLING_ADDRESS,
    width: 180,
    key: '2',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.CONTACT_PERSON)),
    dataIndex: MASTER_DATA_INDEX.CONTACT_PERSON,
    width: 180,
    key: '3',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.CONTACT_NUMBER)),
    dataIndex: MASTER_DATA_INDEX.CONTACT_NUMBER,
    width: 180,
    key: '4',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.EMAIL)),
    dataIndex: MASTER_DATA_INDEX.EMAIL,
    width: 180,
    key: '5',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.RATE_CARD_CODE)),
    dataIndex: MASTER_DATA_INDEX.RATE_CARD_CODE,
    width: 180,
    key: '6',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.COMMISSION_CODE)),
    dataIndex: MASTER_DATA_INDEX.COMMISSION_CODE,
    width: 180,
    key: '7',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.BASE_ADDRESS)),
    dataIndex: MASTER_DATA_INDEX.BASE_ADDRESS,
    width: 180,
    key: 'base-address',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.BASE_POSTAL_CODE)),
    dataIndex: MASTER_DATA_INDEX.BASE_POSTAL_CODE,
    width: 180,
    key: 'base-postal-code',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.BASE_LATITUDE)),
    dataIndex: MASTER_DATA_INDEX.BASE_LATITUDE,
    width: 180,
    key: 'base-latitude',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.BASE_LONGITUDE)),
    dataIndex: MASTER_DATA_INDEX.BASE_LONGITUDE,
    width: 180,
    key: 'base-longitude',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.BRAND_EXPERIENCE)),
    dataIndex: MASTER_DATA_INDEX.BRAND_EXPERIENCE,
    width: 180,
    key: 'branded-experience',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text !== null && text !== undefined ? upperFirst(String(text)) : '')
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.NO_OF_RE_ATTEMPTS)),
    dataIndex: MASTER_DATA_INDEX.NO_OF_RE_ATTEMPTS,
    width: 220,
    key: 'number-of-reAttempts',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.ACCEPT_OVERAGE_PICKUP)),
    dataIndex: MASTER_DATA_INDEX.ACCEPT_OVERAGE_PICKUP,
    width: 180,
    key: 'accept-overage-pickup',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text !== null && text !== undefined ? upperFirst(String(text)) : '')
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.THRESHOLD_NO_OF_PICKUP_SCAN)),
    dataIndex: MASTER_DATA_INDEX.THRESHOLD_NO_OF_PICKUP_SCAN,
    width: 220,
    key: 'threshold-number-for-pickupScan',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-normal fs14 lh22"
    }, text)
  }, {
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 fs10 lh18 text-upper"
    }, containerConstants.formatString(containerConstants.STATUS)),
    dataIndex: MASTER_DATA_INDEX.ACTIVE,
    width: 90,
    fixed: 'right',
    key: 'active',
    render: text => /*#__PURE__*/React.createElement(Tag, {
      id: "fixed_column",
      className: ['font-family-weight-500 font-s10 font-h14 br4 ', text ? 'status-tag-active' : 'status-tag-inactive'].join(' ')
    }, text ? '  ' + active + '   ' : ' ' + inActive + ' ')
  }];
  var errorHeader = [{
    title: /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-500 font-s10 font-h16",
      style: {
        color: '#727272'
      }
    }, "ERROR MESSAGE"),
    dataIndex: 'errorMsg',
    key: 'errorMsg',
    render: text => /*#__PURE__*/React.createElement("div", {
      className: "font-family-weight-400 font-s12 font-h18",
      style: {
        color: '#212121'
      }
    }, text)
  }];
  useEffect(() => {
    setBasePath(getBasePath(props, store));
    document.title = containerConstants.formatString(containerConstants.CARRIER_ALLOCATION_AND_MASTER_VALIDATION);
    setInitialData();
  }, [showModalDialogForm, pageDetail, activeTabPaneKey]);
  var setInitialData = () => {
    setShowLoading(true);
    if (activeTabPaneKey === LEFT_TABS.PARTY_MASTER_TABPANE) {
      setActiveTabData({
        visible: true,
        title: containerConstants.formatString(containerConstants.ADD_PARTY_MASTER),
        okText: containerConstants.formatString(containerConstants.ADD),
        form: LEFT_TABS.PARTY_MASTER_TABPANE
      });
      fetchPartyMasterPagination(pageDetail.current, pageDetail.pageSize).then(response => {
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
        notifyResponseMessage(STATUS.ERROR, error);
      });
    } else if (activeTabPaneKey === LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE) {
      setActiveTabData({
        visible: true,
        title: containerConstants.formatString(containerConstants.ADD_PARCEL_SHOP_MASTER),
        okText: containerConstants.formatString(containerConstants.ADD),
        form: LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE
      });
      fetchParcelShopMaster(pageDetail.current, pageDetail.pageSize).then(response => {
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
        notifyResponseMessage(STATUS.ERROR, error);
      });
    }
  };
  var openAddDialog = () => {
    setShowModalDialogAddUpload(true);
    setProgressWidth(0);
    setVisibleJsx(EXCEL_CONSTANTS.INITIAL);
    setUploadResponse(null);
  };
  var handlePageChange = val => {
    setPageDetail({
      current: val - 1,
      pageSize: pageDetail.pageSize
    });
  };
  var setDefaultPaginationSetting = () => {
    setPageDetail({
      current: 0,
      pageSize: 10
    });
    setPaginationDetails({
      totalElements: 0,
      numberOfElements: 0,
      pageSizeText: PAGE_SIZE.PAGE_10
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
  var getMasterDataJsx = () => {
    return /*#__PURE__*/React.createElement(Tabs, {
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
    }, /*#__PURE__*/React.createElement(TabPane, {
      tab: containerConstants.formatString(containerConstants.PARTY_MASTER),
      key: LEFT_TABS.PARTY_MASTER_TABPANE
    }, /*#__PURE__*/React.createElement(Card, {
      size: "small",
      bordered: false,
      style: {
        margin: '1px 15px 0px'
      },
      bodyStyle: {
        padding: '1rem 0px'
      }
    }, /*#__PURE__*/React.createElement(Space, {
      style: {
        float: 'right'
      },
      size: 'middle'
    }, /*#__PURE__*/React.createElement(Button, {
      ghost: true,
      type: "primary",
      onClick: () => setShowAPIDocModal(true)
    }, containerConstants.formatString(containerConstants.VIEW_API_DOC)), /*#__PURE__*/React.createElement(Button, {
      icon: /*#__PURE__*/React.createElement(PlusOutlined, null),
      style: {
        color: '#FFFFFF'
      },
      type: "primary",
      onClick: openAddDialog
    }, containerConstants.formatString(containerConstants.ADD_PARTY_MASTER)))), /*#__PURE__*/React.createElement(Spin, {
      spinning: showLoading,
      style: {
        paddingTop: '50%'
      },
      className: "text-primary",
      size: 'large'
    }, /*#__PURE__*/React.createElement(Table, {
      components: {
        body: {
          cell: props1 => CustomCell(props1, LEFT_TABS.PARTY_MASTER_TABPANE)
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
    }), /*#__PURE__*/React.createElement(CustomPagination, {
      pageDetail: pageDetail,
      paginationDetails: paginationDetails,
      handlePageChange: handlePageChange,
      handlePgaeSizeChange: handlePgaeSizeChange,
      curentPageOption: paginationDetails.pageSizeText
    }))), /*#__PURE__*/React.createElement(TabPane, {
      tab: containerConstants.formatString(containerConstants.PARCEL_SHOP_MASTER),
      key: LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE
    }, /*#__PURE__*/React.createElement(Card, {
      size: "small",
      bordered: false,
      style: {
        margin: '1px 15px 0px'
      },
      bodyStyle: {
        padding: '1rem 0px'
      }
    }, /*#__PURE__*/React.createElement(Space, {
      style: {
        float: 'right'
      },
      size: 'middle'
    }, /*#__PURE__*/React.createElement(Button, {
      ghost: true,
      type: "primary",
      onClick: () => setShowAPIDocModal(true)
    }, containerConstants.formatString(containerConstants.VIEW_API_DOC)), /*#__PURE__*/React.createElement(Button, {
      icon: /*#__PURE__*/React.createElement(PlusOutlined, null),
      style: {
        color: '#FFFFFF'
      },
      type: "primary",
      onClick: openAddDialog
    }, containerConstants.formatString(containerConstants.ADD_PARCEL_SHOP_MASTER)))), /*#__PURE__*/React.createElement(Spin, {
      spinning: showLoading,
      style: {
        paddingTop: '50%'
      },
      className: "text-primary",
      size: 'large'
    }, /*#__PURE__*/React.createElement(Table, {
      components: {
        body: {
          cell: props1 => CustomCell(props1, LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE)
        }
      },
      bordered: true,
      size: "middle",
      columns: PARCEL_SHOP_MASTER_TABLE_HEADER,
      dataSource: parcelShopMasterList ? parcelShopMasterList.content : null,
      scroll: {
        x: 900
      },
      pagination: false,
      onChange: page => {
        setPageDetail(page);
      }
    }), /*#__PURE__*/React.createElement(CustomPagination, {
      pageDetail: pageDetail,
      paginationDetails: paginationDetails,
      handlePageChange: handlePageChange,
      handlePgaeSizeChange: handlePgaeSizeChange,
      curentPageOption: paginationDetails.pageSizeText
    }))));
  };
  var clickPopoverActiveStatusHandler = dataObject => {
    setShowLoading(true);
    if (activeTabPaneKey === LEFT_TABS.PARTY_MASTER_TABPANE) {
      partyMasterStatusUpdate(dataObject.id, !dataObject.active).then(response => {
        setShowLoading(false);
        if (response && response.data) {
          if (response.data.status === 'Success') {
            setInitialData();
            notifyResponseMessage(STATUS.SUCCESS, response.data.message);
          } else {
            notifyResponseMessage(STATUS.ERROR, response.data.message);
          }
        } else {
          notifyResponseMessage(STATUS.ERROR, "ERROR");
        }
      }).catch(error => {
        setShowLoading(false);
        notifyResponseMessage(STATUS.SUCCESS, error);
      });
    } else if (activeTabPaneKey === LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE) {
      parcelShopMasterStatusUpdate(dataObject.id, !dataObject.active).then(response => {
        setShowLoading(false);
        if (response && response.data) {
          if (response.data.status === 'Success') {
            setInitialData();
            notifyResponseMessage(STATUS.SUCCESS, response.data.message);
          } else {
            notifyResponseMessage(STATUS.ERROR, response.data.message);
          }
        } else {
          notifyResponseMessage(STATUS.ERROR, "ERROR");
        }
      }).catch(error => {
        setShowLoading(false);
        notifyResponseMessage(STATUS.ERROR, error);
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
  var clickPopoverEditHandler = dataObject => {
    if (activeTabPaneKey === LEFT_TABS.PARTY_MASTER_TABPANE) {
      setShowModalDialogForm({
        visible: true,
        title: containerConstants.formatString(containerConstants.EDIT_PARTY_MASTER),
        okText: containerConstants.formatString(containerConstants.ADD),
        form: LEFT_TABS.PARTY_MASTER_TABPANE,
        operation: OPERATION.EDIT,
        data: dataObject
      });
    } else if (activeTabPaneKey === LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE) {
      setShowModalDialogForm({
        visible: true,
        title: containerConstants.formatString(containerConstants.EDIT_PARCEL_SHOP_MASTER),
        okText: containerConstants.formatString(containerConstants.ADD),
        form: LEFT_TABS.PARCEL_SHOP_MASTER_TABPANE,
        operation: OPERATION.EDIT,
        data: dataObject
      });
    }
    setShowPopover({
      visible: false,
      key: null,
      leftTab: null
    });
  };
  var CustomCell = (_ref, activeTabPane) => {
    var {
        children,
        record
      } = _ref,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
    return /*#__PURE__*/React.createElement("td", restProps, record ? /*#__PURE__*/React.createElement(Popover
    // open={showPopover.leftTab === activeTabPane && record?.id === showPopover.key && showPopover.visible}
    // afterOpenChange={(visible) => setShowPopover({ visible: visible, key: record.id, leftTab: activeTabPaneKey })}
    , {
      id: "master-data-table-popover",
      placement: "bottomLeft",
      content: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
        id: "popover-content",
        onClick: () => clickPopoverEditHandler(record)
      }, containerConstants.formatString(containerConstants.EDIT)), /*#__PURE__*/React.createElement("p", {
        id: "popover-content",
        onClick: () => clickPopoverActiveStatusHandler(record)
      }, record.active ? containerConstants.formatString(containerConstants.INACTIVE) : containerConstants.formatString(containerConstants.ACTIVE))),
      trigger: "click"
    }, /*#__PURE__*/React.createElement(MoreOutlined, {
      style: {
        fontSize: '14px'
      }
    })) : children);
  };
  var prop = {
    name: 'file',
    maxCount: 1,
    multiple: false,
    action: activeTabPaneKey === LEFT_TABS.PARTY_MASTER_TABPANE ? '/app/rest/label_generation/partyMaster/upload_excel' : '/app/rest/label_generation/parcelShopMaster/upload_excel',
    onChange: info => {
      var status = info.file.status;
      if (fileName.localeCompare(info.file.name) != 0) {
        setFileName(info.file.name);
      }
      if (status == 'uploading') {
        setProgressWidth(info.file.percent);
        setVisibleJsx(EXCEL_CONSTANTS.UPLOADING);
      } else if (status === 'done') {
        setVisibleJsx(EXCEL_CONSTANTS.UPLOAD_RESPONSE);
        setUploadResponse(info.file.response);
        if (info.file.response.failCount > 0 || info.file.response.errorMessageList && info.file.response.errorMessageList.length > 0) {
          var errors = [];
          for (var [key, errorMessage] of Object.entries(info.file.response.errorMessageList)) {
            errors.push({
              key: '1',
              errorMsg: errorMessage
            });
          }
          setErrorData(errors);
        }
      } else if (status === 'error') {
        var error = '';
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
        setVisibleJsx(EXCEL_CONSTANTS.ERROR);
      } else if (status == 'removed') {
        setVisibleJsx(EXCEL_CONSTANTS.INITIAL);
      }
    },
    accept: '.xlsx,.xls'
  };
  var downloadSample = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* () {
      axios({
        url: activeTabPaneKey === LEFT_TABS.PARTY_MASTER_TABPANE ? '/app/rest/label_generation/partymaster/download_sample_excel' : '/app/rest/label_generation/parcelShopMaster/download_sample_excel',
        method: 'GET',
        responseType: 'blob'
      }).then(response => {
        if (response.status === 200) {
          var url = window.URL.createObjectURL(new Blob([response.data]));
          var link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', (activeTabPaneKey === LEFT_TABS.PARTY_MASTER_TABPANE ? 'Add_Party_Master.' : 'Add_Parcel_Shop_Master.') + getExtension(response.data.type));
          document.body.appendChild(link);
          link.click();
        } else if (response.data) {
          var errorMessage = response.data;
          notifyResponseMessage(STATUS.ERROR, errorMessage);
        }
      }).catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          notifyResponseMessage(STATUS.ERROR, error);
        } else {
          var errorMessage = containerConstants.formatString(containerConstants.Something_Went_Wrong);
          if (error.response && error.response.headers && error.response.headers.trace_id) {
            errorMessage = errorMessage + ' Trace id: ' + error.response.headers.trace_id;
          }
          notifyResponseMessage(STATUS.ERROR, errorMessage);
        }
      });
    });
    return function downloadSample() {
      return _ref2.apply(this, arguments);
    };
  }();
  var getExtension = ext => {
    switch (ext) {
      case 'application/ms-excel':
        return 'xlsx';
      default:
        break;
    }
  };
  var closeAddPartyMasterDialog = () => {
    setShowModalDialogAddUpload(false);
    setInitialData();
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(BreadCrumb, {
    urlList: store.fromNewSetting ? urlListForNewSetting : urlList
  }), /*#__PURE__*/React.createElement(Card, {
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
  }, getMasterDataJsx()), visibleJsx === EXCEL_CONSTANTS.UPLOAD_RESPONSE && uploadResponse && uploadResponse != null && uploadResponse.successCount > 0 ? /*#__PURE__*/React.createElement(Modal, {
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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      justifyContent: 'center',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(CheckCircleFilled, {
    style: {
      fontSize: 40,
      color: '#279B4E'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      marginTop: '16px',
      justifyContent: 'center',
      display: 'flex',
      color: '#000000'
    },
    className: "font-family-weight-500 font-s18 font-h26"
  }, containerConstants.formatString(containerConstants.SUCCESSFULLY_UPLOADED)), /*#__PURE__*/React.createElement("div", {
    className: "font-family-weight-400 font-s12 font-h18",
    style: {
      justifyContent: 'center',
      display: 'flex'
    }
  }, fileName), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      justifyContent: 'center',
      display: 'flex',
      color: '#727272'
    },
    className: "font-family-weight-400 font-s14 font-h22"
  }, uploadResponse.successCount, " ", containerConstants.formatString(containerConstants.NEW_RECORDS_ARE_UPLOADED)), uploadResponse.failCount > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(InfoCircleFilled, {
    style: {
      marginRight: '10px',
      color: '#C84031',
      fontSize: 20
    }
  }), "  ", uploadResponse.failCount, " records from the file couldn't be added due to error. Please update the below records"), /*#__PURE__*/React.createElement(Table, {
    bordered: true,
    columns: errorHeader,
    dataSource: errorData,
    pagination: false
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      justifyContent: 'center',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    style: {
      marginTop: '24px'
    },
    type: "primary",
    onClick: closeAddPartyMasterDialog
  }, containerConstants.formatString(containerConstants.CLOSE))))) : /*#__PURE__*/React.createElement(Modal, {
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
  }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(Card, {
    id: "add-modal-excel-card"
  }, /*#__PURE__*/React.createElement(Dragger, _extends({}, prop, {
    showUploadList: false
  }), /*#__PURE__*/React.createElement(Meta, {
    avatar: /*#__PURE__*/React.createElement(Avatar, {
      shape: "square",
      src: UploadExcelIcon
    }),
    title: containerConstants.formatString(containerConstants.UPLOAD_EXCEL),
    description: containerConstants.formatString(containerConstants.UPLOAD_EXCEL_DESCRIPTION)
  }))), visibleJsx === EXCEL_CONSTANTS.UPLOADING && /*#__PURE__*/React.createElement(Progress, {
    showInfo: false,
    percent: progressWidth
  }), visibleJsx === EXCEL_CONSTANTS.UPLOAD_RESPONSE && uploadResponse && uploadResponse != null && uploadResponse.failCount > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#C84031'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#C84031'
    },
    className: "font-family-weight-400 font-s12 font-h18"
  }, fileName), uploadResponse.errorMessageList.map(data => /*#__PURE__*/React.createElement(Row, null, data))), visibleJsx === EXCEL_CONSTANTS.UPLOAD_RESPONSE && uploadResponse && uploadResponse != null && uploadResponse.failCount == 0 && errorData && errorData.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#C84031'
    },
    className: "font-family-weight-400 font-s12 font-h18"
  }, fileName), errorData[0].errorMsg)), /*#__PURE__*/React.createElement(Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(Card, {
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
  }, /*#__PURE__*/React.createElement(Meta, {
    avatar: /*#__PURE__*/React.createElement(Avatar, {
      shape: "square",
      src: AddFormIcon
    }),
    title: containerConstants.formatString(containerConstants.ADD_VIA_FORM),
    description: containerConstants.formatString(containerConstants.ADD_VIA_FORM_DESCRIPTION)
  })))), /*#__PURE__*/React.createElement(Button, {
    type: "link",
    onClick: downloadSample
  }, containerConstants.formatString(containerConstants.Download_Template))), showModalDialogForm.visible && /*#__PURE__*/React.createElement(AddEditFormModal, {
    showModalDialogForm,
    setShowModalDialogForm
  }), showAPIDocModal && /*#__PURE__*/React.createElement(ViewAPIDocModal, {
    activeTabPaneKey,
    setShowAPIDocModal,
    showAPIDocModal
  }));
};
export default MasterDataTabCard;
//# sourceMappingURL=MasterDataTabCard.js.map