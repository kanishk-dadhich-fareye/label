import React from 'react';
import { Button, Space, Avatar } from 'antd';
import LabelTemplateIcon from '../../images/label_template_icon.svg';
import { containerConstantsService } from '../../utils/containerconstants/ContainerConstants';
import { TEMPLATE_MODAL_TYPE } from '../../utils/constants';
var containerConstants = containerConstantsService.getInstance();
var EmptyDataView = _ref => {
  var {
    setShowModalDialog
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    id: "template-empty-data-view",
    style: {
      margin: '44px 0 0'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: LabelTemplateIcon,
    shape: "square"
  }), /*#__PURE__*/React.createElement("h1", null, containerConstants.formatString(containerConstants.TEMPLATE_NOT_FOUND)), /*#__PURE__*/React.createElement("p", null, containerConstants.formatString(containerConstants.TEMPLATE_NOT_FOUND_DESCRIPTION)), /*#__PURE__*/React.createElement(Space, {
    align: "center",
    style: {
      marginBottom: '36px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    style: {
      color: '#FFFFFF'
    },
    type: "primary",
    onClick: () => setShowModalDialog({
      visible: true,
      title: containerConstants.formatString(containerConstants.CHOOSE_TEMPLATE),
      modalType: TEMPLATE_MODAL_TYPE.CHOOSE_TEMPLATE
    })
  }, containerConstants.formatString(containerConstants.CREATE_TEMPLATE))));
};
export default EmptyDataView;
//# sourceMappingURL=EmptyDataView.js.map