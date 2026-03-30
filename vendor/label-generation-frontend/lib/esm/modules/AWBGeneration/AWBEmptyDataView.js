var _excluded = ["showButtons", "heading", "description"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { Button, Space, Avatar } from 'antd';
import AWBGenerationIcon from '../../images/awb_generation_icon.svg';
import { containerConstantsService } from '../../utils/containerconstants/ContainerConstants';
var containerConstants = containerConstantsService.getInstance();
var AWBEmptyDataView = _ref => {
  var {
      showButtons,
      heading,
      description
    } = _ref,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var openDefaultAWBForm = () => {
    otherProps.setShowFormModalDialog({
      visible: true,
      okText: containerConstants.formatString(containerConstants.ADD),
      title: containerConstants.formatString(containerConstants.ADD_DEFAULT_AWB)
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    id: "awb-empty-data-view",
    style: {
      margin: showButtons === 'first' ? '23px 0 0' : '67px 0 0'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: AWBGenerationIcon,
    shape: "square"
  }), /*#__PURE__*/React.createElement("h1", null, heading), /*#__PURE__*/React.createElement("p", null, description), (showButtons === 'both' || showButtons === 'first') && /*#__PURE__*/React.createElement(Space, {
    align: "center",
    style: {
      marginBottom: showButtons === 'first' ? '4px' : '48px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    ghost: true,
    type: "primary",
    onClick: openDefaultAWBForm
  }, containerConstants.formatString(containerConstants.ADD_DEFAULT_AWB)), showButtons !== 'first' && /*#__PURE__*/React.createElement(Button, {
    style: {
      color: '#FFFFFF'
    },
    type: "primary",
    onClick: () => otherProps.setShowModalDialogAddUpload(true)
  }, containerConstants.formatString(containerConstants.ADD_AWB))));
};
export default AWBEmptyDataView;
//# sourceMappingURL=AWBEmptyDataView.js.map