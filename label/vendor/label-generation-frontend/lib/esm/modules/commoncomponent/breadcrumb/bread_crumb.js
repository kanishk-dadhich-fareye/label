import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import BreadCrumbStyle from './breadCrumbStyle.js';
var BreadCrumb = props => {
  var len = props.urlList.length;
  var handleOnClick = (obj, index) => {
    if (props.handleOnClick) {
      props.handleOnClick(obj, index);
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BreadCrumbStyle, null), /*#__PURE__*/React.createElement("div", {
    className: "bread-crumb-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bread-crumb-left"
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    separator: /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '22px',
        color: '#727272',
        display: 'contents'
      }
    }, "/")
  }, props.urlList.map((obj, index) => /*#__PURE__*/React.createElement(Breadcrumb.Item, {
    key: obj.id,
    onClick: () => handleOnClick(obj, index)
  }, /*#__PURE__*/React.createElement(Link, {
    to: obj.url,
    className: len === index + 1 ? 'font-family-weight-500 fs14 ls22 color_212121 display_content capital_first_letter' : 'font-family-weight-normal fs14 ls22 color_727272 display_content capital_first_letter'
  }, obj.heading))))), /*#__PURE__*/React.createElement("div", {
    className: "bread-crumb-right"
  }, props.rightItem)));
};
export default BreadCrumb;
//# sourceMappingURL=bread_crumb.js.map