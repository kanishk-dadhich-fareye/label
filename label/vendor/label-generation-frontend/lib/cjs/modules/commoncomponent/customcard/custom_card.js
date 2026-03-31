"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _card_inner_component = _interopRequireDefault(require("../cardinnercomponent/card_inner_component"));
var _customCardStyle = _interopRequireDefault(require("./customCardStyle.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CustomCard = props => {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_customCardStyle.default, null), /*#__PURE__*/_react.default.createElement(_antd.Card, {
    style: {
      'margin': '0px 16px 16px 16px',
      'boxSizing': 'border-box',
      'borderRadius': '4px',
      'height': '100%',
      width: '100%'
    },
    tabList: props.tabList,
    activeTabKey: props.activeTabKey,
    id: "custom-card",
    onTabChange: key => {
      props.onMainTabChange(key);
    }
  }, props.innerTableHeader !== undefined && Object.keys(props.innerTableHeader).length && /*#__PURE__*/_react.default.createElement(_card_inner_component.default, {
    showLoading: props.showLoading,
    activeTab: props.activeTabKey,
    leftTable: props.leftTable,
    innerTableHeader: props.innerTableHeader,
    innerTableData: props.innerTableData,
    tableWidth: props.tableWidth,
    topButton: props.topButton,
    changeTable: props.changeTable,
    addValidationRule: props.addValidationRule,
    CustomCell: props.CustomCell
  })));
};
var _default = exports.default = CustomCard;
//# sourceMappingURL=custom_card.js.map