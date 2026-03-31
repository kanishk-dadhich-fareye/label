import React from 'react';
import { Pagination, Dropdown, Menu, Space, Button } from 'antd';
import '../../../../CSS/CustomPagination.css';
import { PAGE_SIZE } from '../../../../utils/constants';
import { DownOutlined } from '@ant-design/icons';
var CustomPagination = props => {
  var menu = /*#__PURE__*/React.createElement(Menu, {
    items: [{
      label: /*#__PURE__*/React.createElement("a", {
        onClick: () => props.handlePgaeSizeChange(PAGE_SIZE.PAGE_10)
      }, PAGE_SIZE.PAGE_10),
      key: '0'
    }, {
      label: /*#__PURE__*/React.createElement("a", {
        onClick: () => props.handlePgaeSizeChange(PAGE_SIZE.PAGE_20)
      }, PAGE_SIZE.PAGE_20),
      key: '1'
    }, {
      label: /*#__PURE__*/React.createElement("a", {
        onClick: () => props.handlePgaeSizeChange(PAGE_SIZE.PAGE_50)
      }, PAGE_SIZE.PAGE_50),
      key: '2'
    }, {
      label: /*#__PURE__*/React.createElement("a", {
        onClick: () => props.handlePgaeSizeChange(PAGE_SIZE.PAGE_100)
      }, PAGE_SIZE.PAGE_100),
      key: '2'
    }]
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "pagination_row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-family-weight-400 font-s14 font-h22",
    style: {
      display: 'contents',
      color: '#212121'
    }
  }, props.pageDetail.pageSize * props.pageDetail.current + 1, " to ", props.pageDetail.pageSize * props.pageDetail.current + props.paginationDetails.numberOfElements, " of ", props.paginationDetails.totalElements), /*#__PURE__*/React.createElement(Dropdown, {
    overlay: menu,
    trigger: ['click']
  }, /*#__PURE__*/React.createElement(Button, {
    style: {
      marginLeft: '16px',
      color: '#212121'
    }
  }, /*#__PURE__*/React.createElement(Space, null, props.curentPageOption, /*#__PURE__*/React.createElement(DownOutlined, null)))), /*#__PURE__*/React.createElement(Pagination, {
    className: "pagination_style",
    current: props.pageDetail.current + 1,
    pageSize: props.pageDetail.pageSize,
    total: props.paginationDetails.totalElements,
    onChange: props.handlePageChange,
    showSizeChanger: false
  }));
};
export default CustomPagination;
//# sourceMappingURL=CustomPagination.js.map