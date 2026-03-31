"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
require("../../../CSS/CustomPagination.css");
var _constants = require("../../../utils/constants");
var _icons = require("@ant-design/icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CustomPagination = props => {
  const menu = /*#__PURE__*/_react.default.createElement(_antd.Menu, {
    items: [{
      label: /*#__PURE__*/_react.default.createElement("a", {
        onClick: () => props.handlePgaeSizeChange(_constants.PAGE_SIZE.PAGE_10)
      }, _constants.PAGE_SIZE.PAGE_10),
      key: '0'
    }, {
      label: /*#__PURE__*/_react.default.createElement("a", {
        onClick: () => props.handlePgaeSizeChange(_constants.PAGE_SIZE.PAGE_20)
      }, _constants.PAGE_SIZE.PAGE_20),
      key: '1'
    }, {
      label: /*#__PURE__*/_react.default.createElement("a", {
        onClick: () => props.handlePgaeSizeChange(_constants.PAGE_SIZE.PAGE_50)
      }, _constants.PAGE_SIZE.PAGE_50),
      key: '2'
    }, {
      label: /*#__PURE__*/_react.default.createElement("a", {
        onClick: () => props.handlePgaeSizeChange(_constants.PAGE_SIZE.PAGE_100)
      }, _constants.PAGE_SIZE.PAGE_100),
      key: '2'
    }]
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "pagination_row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "font-family-weight-400 font-s14 font-h22",
    style: {
      display: 'contents',
      color: '#212121'
    }
  }, props.paginationDetails.totalElements > 0 ? props.pageDetail.pageSize * props.pageDetail.current + 1 : props.paginationDetails.totalElements, " to ", props.pageDetail.pageSize * props.pageDetail.current + props.paginationDetails.numberOfElements, " of ", props.paginationDetails.totalElements), /*#__PURE__*/_react.default.createElement(_antd.Dropdown, {
    overlay: menu,
    trigger: ['click']
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    style: {
      marginLeft: '16px',
      color: '#212121'
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Space, null, props.curentPageOption, /*#__PURE__*/_react.default.createElement(_icons.DownOutlined, null)))), /*#__PURE__*/_react.default.createElement(_antd.Pagination, {
    className: "pagination_style",
    current: props.pageDetail.current + 1,
    pageSize: props.pageDetail.pageSize,
    total: props.paginationDetails.totalElements,
    onChange: props.handlePageChange,
    showSizeChanger: false
  }));
};
var _default = exports.default = CustomPagination;
//# sourceMappingURL=CustomPagination.js.map