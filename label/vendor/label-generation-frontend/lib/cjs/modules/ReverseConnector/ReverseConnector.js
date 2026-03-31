"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _bread_crumb = _interopRequireDefault(require("../commoncomponent/breadcrumb/bread_crumb"));
var _antd = require("antd");
var _ContainerConstants = require("../../utils/containerconstants/ContainerConstants");
require("../../CSS/ReverseConnectorStyle.css");
var _ReverseConnectorAction = require("../APIConfig/ReverseConnectorAction");
var _lodash = require("lodash");
var _notifyResponseMessage = require("../commoncomponent/NotificationComponent/notifyResponseMessage");
var _constants = require("../../utils/constants");
var _store = require("../hook-store/store");
var _BasePath = require("../commoncomponent/BasePath");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const containerConstants = _ContainerConstants.containerConstantsService.getInstance();
const {
  Option
} = _antd.Select;
const {
  Item
} = _antd.Form;
const ReverseConnector = props => {
  const store = (0, _store.useStore)(true)[0];
  const [showLoading, setShowLoading] = (0, _react.useState)(false);
  const [reverseConnectorMasterList, setReverseConnectorMasterList] = (0, _react.useState)([]);
  const [selectedReverseConnector, setSelectedReverseConnector] = (0, _react.useState)({});
  const [validation, setValidation] = (0, _react.useState)({
    connectorCode: 0
  });
  const [isButtonDisabled, setIsButtonDisabled] = (0, _react.useState)(true);
  const [basePath, setBasePath] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    setBasePath((0, _BasePath.getBasePath)(props, store));
    document.title = containerConstants.formatString(containerConstants.REVERSE_CONNECTOR);
    setShowLoading(true);
    (0, _ReverseConnectorAction.fetchReverseConnectorMasterList)().then(response => {
      setShowLoading(false);
      if (response && response.status === 200) {
        setReverseConnectorMasterList(response.data);
      }
    }).catch(error => {
      setShowLoading(false);
    });
    setShowLoading(true);
    (0, _ReverseConnectorAction.fetchReverseConnectorConfig)().then(response => {
      setShowLoading(false);
      if (response && response.status === 200) {
        var _response$data;
        setSelectedReverseConnector({
          connectorCode: response == null || (_response$data = response.data) == null || (_response$data = _response$data.data) == null ? void 0 : _response$data.connectorCode
        });
      }
    }).catch(error => {
      setShowLoading(false);
    });
  }, []);
  const urlList = [{
    url: basePath + '/v2/label_generation/v2/settings',
    heading: containerConstants.formatString(containerConstants.SETTINGS)
  }, {
    url: basePath + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: basePath + '/v2/label_generation/reverse_connector',
    heading: containerConstants.formatString(containerConstants.REVERSE_CONNECTOR)
  }];
  const urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: '/v2/new_settings/label_generation/reverse_connector',
    heading: containerConstants.formatString(containerConstants.REVERSE_CONNECTOR)
  }];
  const saveConfig = () => {
    if (!(0, _lodash.isEmpty)(selectedReverseConnector)) {
      setShowLoading(true);
      (0, _ReverseConnectorAction.saveReverseConnectorConfig)(selectedReverseConnector).then(response => {
        setShowLoading(false);
        if (response && response.status === 200) {
          var _response$data2;
          if ((0, _lodash.toUpper)(response == null || (_response$data2 = response.data) == null ? void 0 : _response$data2.status) === _constants.STATUS.SUCCESS) {
            var _response$data3;
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.SUCCESS, response == null || (_response$data3 = response.data) == null ? void 0 : _response$data3.message);
          } else {
            var _response$data4;
            (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.FAILED, response == null || (_response$data4 = response.data) == null ? void 0 : _response$data4.message);
          }
        }
      }).catch(error => {
        setShowLoading(false);
        (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
      });
    } else {
      setValidation({
        connectorCode: 1
      });
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_bread_crumb.default, {
    urlList: store.fromNewSetting ? urlListForNewSetting : urlList
  }), /*#__PURE__*/_react.default.createElement(_antd.Spin, {
    spinning: showLoading
  }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
    className: "fw400 fs12 lh18",
    size: "small",
    bodyStyle: {
      color: '#727272'
    },
    id: "reverse-connector-card"
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 6
  }, containerConstants.formatString(containerConstants.NAME)), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 9
  }, /*#__PURE__*/_react.default.createElement(Item, {
    validateStatus: validation.connectorCode === 1 ? 'error' : null,
    help: validation.connectorCode === 1 ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, containerConstants.formatString(containerConstants.NAME)) : null
  }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
    disabled: store.fromFCR ? false : store.showCustom,
    style: {
      width: '96%'
    },
    onChange: value => {
      setIsButtonDisabled(false);
      setSelectedReverseConnector({
        connectorCode: value
      });
      setValidation({
        connectorCode: 0
      });
    },
    placeholder: containerConstants.formatString(containerConstants.SELECT),
    value: selectedReverseConnector.connectorCode
  }, reverseConnectorMasterList.filter(reverseConnectorMaster => reverseConnectorMaster.active !== false && reverseConnectorMaster.synchronous === false && reverseConnectorMaster.configurationType === _constants.REVERSE_CONNECTOR_TYPE.ADD_PROCESS).map(reverseConnectorMaster => /*#__PURE__*/_react.default.createElement(Option, {
    key: 'admin',
    value: reverseConnectorMaster.code
  }, reverseConnectorMaster.title)))))), /*#__PURE__*/_react.default.createElement(_antd.Row, {
    style: {
      marginTop: '24px'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    push: 11
  }, /*#__PURE__*/_react.default.createElement(_antd.Space, {
    size: 9
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    ghost: true,
    className: "fw500 fs14 lh22",
    style: {
      color: '#727272',
      border: 0
    },
    type: "primary",
    loading: showLoading
  }, containerConstants.formatString(containerConstants.CANCEL)), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: "fw500 fs14 lh22",
    style: {
      color: '#FFFFFF'
    },
    type: "primary",
    loading: showLoading,
    onClick: saveConfig,
    disabled: isButtonDisabled && (store.fromFCR ? false : store.showCustom)
  }, containerConstants.formatString(containerConstants.SAVE))))))));
};
var _default = exports.default = ReverseConnector;
//# sourceMappingURL=ReverseConnector.js.map