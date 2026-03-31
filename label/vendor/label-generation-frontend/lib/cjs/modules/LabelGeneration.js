"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _ContainerConstants = require("../utils/containerconstants/ContainerConstants");
var _icons = require("@ant-design/icons");
var _bread_crumb = _interopRequireDefault(require("./commoncomponent/breadcrumb/bread_crumb"));
var _store = require("./hook-store/store");
var _BasePath = require("./commoncomponent/BasePath");
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const LabelGeneration = props => {
  let borderStyleFirst = {
    'display': 'flex',
    'height': '40px',
    'background': '#FFFFFF',
    'border': '0.5px solid #DDDDDD',
    'boxSizing': 'border-box',
    'borderRadius': '4px',
    'width': '100%'
  };
  let borderStyle = {
    'marginTop': '8px',
    'display': 'flex',
    'height': '40px',
    'background': '#FFFFFF',
    'border': '0.5px solid #DDDDDD',
    'boxSizing': 'border-box',
    'borderRadius': '4px',
    'width': '100%'
  };
  let leftTextStyle = {
    'alignSelf': 'center',
    'width': '80%',
    'display': 'flex',
    'color': '#000000'
  };
  let rightArrowStyle = {
    'alignSelf': 'center',
    'width': '20%',
    'display': 'flex',
    'justifyContent': 'end',
    'color': '#323232'
  };
  const [store, dispatch] = (0, _store.useStore)(true);
  (0, _react.useEffect)(() => {
    document.title = containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL);
    if (props.showCustom) {
      dispatch('SET_SHOW_CUSTOM', props.showCustom);
    }
    if (props.fromFCR) {
      dispatch('SET_FROM_FCR', props.fromFCR);
    }
    if (props.isProduction) {
      dispatch('SET_IS_PRODUCTION', props.isProduction);
    }
    if (props.fromNewSetting) {
      dispatch('SET_IS_NEW_SETTING', props.fromNewSetting);
    }
  }, []);
  const dataValidationClick = fromNewSetting => {
    return fromNewSetting ? '/v2/new_settings/label_generation/data_validation' : (0, _BasePath.getBasePath)(props, store) + '/v2/label_generation/data_validation';
  };
  const awbGenerationClick = fromNewSetting => {
    return fromNewSetting ? '/v2/new_settings/label_generation/shipment_no_generation' : (0, _BasePath.getBasePath)(props, store) + '/v2/label_generation/shipment_no_generation';
  };
  const masterDataClick = fromNewSetting => {
    return fromNewSetting ? '/v2/new_settings/label_generation/carrier_allocation' : (0, _BasePath.getBasePath)(props, store) + '/v2/label_generation/carrier_allocation';
  };
  const labelTempatesClick = fromNewSetting => {
    return fromNewSetting ? '/v2/new_settings/label_generation/label_templates' : (0, _BasePath.getBasePath)(props, store) + '/v2/label_generation/label_templates';
  };
  const reverseConnectorClick = fromNewSetting => {
    return fromNewSetting ? '/v2/new_settings/label_generation/reverse_connector' : (0, _BasePath.getBasePath)(props, store) + '/v2/label_generation/reverse_connector';
  };
  const bulkUploadClick = fromNewSetting => {
    return fromNewSetting ? '/v2/new_settings/label_generation/bulk_upload' : (0, _BasePath.getBasePath)(props, store) + '/v2/label_generation/bulk_upload';
  };
  const urlList = [{
    url: (0, _BasePath.getBasePath)(props, store) + '/v2/label_generation/v2/settings',
    heading: containerConstants.formatString(containerConstants.SETTINGS)
  }, {
    url: (0, _BasePath.getBasePath)(props, store) + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }];
  const urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_bread_crumb.default, {
    urlList: store.fromNewSetting ? urlListForNewSetting : urlList
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '16px',
      marginRight: '16px'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: dataValidationClick(store.fromNewSetting),
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "text",
    style: borderStyleFirst
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: leftTextStyle
  }, containerConstants.formatString(containerConstants.DATA_VALIDATION)), /*#__PURE__*/_react.default.createElement(_icons.RightOutlined, {
    style: rightArrowStyle
  }))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: masterDataClick(store.fromNewSetting),
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "text",
    style: borderStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: leftTextStyle
  }, containerConstants.formatString(containerConstants.CARRIER_ALLOCATION_AND_MASTER_VALIDATION)), /*#__PURE__*/_react.default.createElement(_icons.RightOutlined, {
    style: rightArrowStyle
  }))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: awbGenerationClick(store.fromNewSetting),
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "text",
    style: borderStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: leftTextStyle
  }, containerConstants.formatString(containerConstants.AWB_GENERATION)), /*#__PURE__*/_react.default.createElement(_icons.RightOutlined, {
    style: rightArrowStyle
  }))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: labelTempatesClick(store.fromNewSetting),
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "text",
    style: borderStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: leftTextStyle
  }, containerConstants.formatString(containerConstants.LABEL_TEMPLATES)), /*#__PURE__*/_react.default.createElement(_icons.RightOutlined, {
    style: rightArrowStyle
  }))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: reverseConnectorClick(store.fromNewSetting),
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "text",
    style: borderStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: leftTextStyle
  }, containerConstants.formatString(containerConstants.REVERSE_CONNECTOR)), /*#__PURE__*/_react.default.createElement(_icons.RightOutlined, {
    style: rightArrowStyle
  }))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: bulkUploadClick(store.fromNewSetting),
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "text",
    style: borderStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: leftTextStyle
  }, containerConstants.formatString(containerConstants.BULK_UPLOAD)), /*#__PURE__*/_react.default.createElement(_icons.RightOutlined, {
    style: rightArrowStyle
  })))));
};
var _default = exports.default = LabelGeneration;
//# sourceMappingURL=LabelGeneration.js.map