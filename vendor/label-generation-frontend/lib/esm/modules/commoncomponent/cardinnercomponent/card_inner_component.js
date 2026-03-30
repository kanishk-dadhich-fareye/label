var _excluded = ["leftTable"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { Table, Button } from 'antd';
import { containerConstantsService } from '../../../utils/containerconstants/ContainerConstants';
import { PlusOutlined } from '@ant-design/icons';
import '../../../CSS/card_inner_component.css';
import { useStore } from '../../hook-store/store';
var containerConstants = containerConstantsService.getInstance();
var CardInnerComponent = _ref => {
  var {
      leftTable
    } = _ref,
    otherprops = _objectWithoutPropertiesLoose(_ref, _excluded);
  var store = useStore(true)[0];
  var rightTableStyle = leftTable !== undefined && Object.keys(leftTable).length > 0 ? {
    width: '83%',
    'display': 'inline-block',
    marginTop: '16px',
    marginBottom: '16px',
    paddingLeft: '16px',
    paddingRight: '20px'
  } : {
    width: '99%',
    'display': 'inline-block',
    marginTop: '16px',
    marginBottom: '16px',
    paddingLeft: '16px',
    paddingRight: '20px'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      'background': '#FFFFFF',
      'border': '1px solid #DDDDDD',
      borderBottomStyle: 'none',
      borderLeftStyle: 'none',
      'boxSizing': 'border-box',
      'borderRadius': '0px 0px 4px 4px',
      'height': '100%',
      'borderLeftWidth': 'inherit'
    }
  }, otherprops.topButton !== undefined && otherprops.topButton && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'end',
      marginTop: '12px',
      paddingRight: '16px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    onClick: () => otherprops.addValidationRule(false),
    className: "font-family-weight-500 fs14 ls22",
    style: {
      color: '#FFFFFF',
      textAlign: 'center',
      borderRadius: '2px',
      marginRight: '1%'
    },
    disabled: store.fromFCR ? false : store.showCustom
  }, /*#__PURE__*/React.createElement(PlusOutlined, {
    size: "9px"
  }), containerConstants.formatString(containerConstants.ADD_VALIDATION))), leftTable !== undefined && Object.keys(leftTable).length > 0 && /*#__PURE__*/React.createElement("div", {
    id: "left-table-tab",
    style: {
      height: '100%',
      width: '16% ',
      display: 'inline-table',
      float: 'left',
      flexDirection: 'column',
      'border-right': '1px solid #DADADA',
      'border-left': '1px solid #DADADA'
    }
  }, /*#__PURE__*/React.createElement(Table, {
    columns: leftTable.header,
    showHeader: false,
    size: "small",
    dataSource: leftTable.body,
    pagination: false,
    bordered: false,
    onRow: (record, rowIndex) => {
      return {
        onClick: event => otherprops.changeTable(record)
      };
    }
  })), /*#__PURE__*/React.createElement("div", {
    id: "column-boundries",
    style: rightTableStyle
  }, otherprops.innerTableHeader !== undefined && Object.keys(otherprops.innerTableHeader).length && /*#__PURE__*/React.createElement(Table, {
    style: {
      'border': '0.2px solid #efecec8a'
    },
    columns: otherprops.innerTableHeader,
    dataSource: otherprops.innerTableData,
    pagination: false,
    bordered: true,
    loading: otherprops.showLoading,
    components: {
      body: {
        cell: otherprops.CustomCell
      }
    }
  })));
};
export default CardInnerComponent;
//# sourceMappingURL=card_inner_component.js.map