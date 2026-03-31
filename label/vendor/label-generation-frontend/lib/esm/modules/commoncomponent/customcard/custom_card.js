import React from 'react';
import { Card } from 'antd';
import CardInnerComponent from '../cardinnercomponent/card_inner_component';
import CustomCardStyle from './customCardStyle.js';
var CustomCard = props => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CustomCardStyle, null), /*#__PURE__*/React.createElement(Card, {
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
  }, props.innerTableHeader !== undefined && Object.keys(props.innerTableHeader).length && /*#__PURE__*/React.createElement(CardInnerComponent, {
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
export default CustomCard;
//# sourceMappingURL=custom_card.js.map