import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import { containerConstantsService } from '../utils/containerconstants/ContainerConstants';
import { RightOutlined } from '@ant-design/icons';
import BreadCrumb from './commoncomponent/breadcrumb/bread_crumb';
import { useStore } from './hook-store/store';
import { getBasePath } from './commoncomponent/BasePath';
import { Link } from 'react-router-dom';
var containerConstants = containerConstantsService.getInstance();
var LabelGeneration = props => {
  var borderStyleFirst = {
    'display': 'flex',
    'height': '40px',
    'background': '#FFFFFF',
    'border': '0.5px solid #DDDDDD',
    'boxSizing': 'border-box',
    'borderRadius': '4px',
    'width': '100%'
  };
  var borderStyle = {
    'marginTop': '8px',
    'display': 'flex',
    'height': '40px',
    'background': '#FFFFFF',
    'border': '0.5px solid #DDDDDD',
    'boxSizing': 'border-box',
    'borderRadius': '4px',
    'width': '100%'
  };
  var leftTextStyle = {
    'alignSelf': 'center',
    'width': '80%',
    'display': 'flex',
    'color': '#000000'
  };
  var rightArrowStyle = {
    'alignSelf': 'center',
    'width': '20%',
    'display': 'flex',
    'justifyContent': 'end',
    'color': '#323232'
  };
  var [store, dispatch] = useStore(true);
  useEffect(() => {
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
  var dataValidationClick = fromNewSetting => {
    return fromNewSetting ? '/v2/new_settings/label_generation/data_validation' : getBasePath(props, store) + '/v2/label_generation/data_validation';
  };
  var awbGenerationClick = fromNewSetting => {
    return fromNewSetting ? '/v2/new_settings/label_generation/shipment_no_generation' : getBasePath(props, store) + '/v2/label_generation/shipment_no_generation';
  };
  var masterDataClick = fromNewSetting => {
    return fromNewSetting ? '/v2/new_settings/label_generation/carrier_allocation' : getBasePath(props, store) + '/v2/label_generation/carrier_allocation';
  };
  var labelTempatesClick = fromNewSetting => {
    return fromNewSetting ? '/v2/new_settings/label_generation/label_templates' : getBasePath(props, store) + '/v2/label_generation/label_templates';
  };
  var reverseConnectorClick = fromNewSetting => {
    return fromNewSetting ? '/v2/new_settings/label_generation/reverse_connector' : getBasePath(props, store) + '/v2/label_generation/reverse_connector';
  };
  var bulkUploadClick = fromNewSetting => {
    return fromNewSetting ? '/v2/new_settings/label_generation/bulk_upload' : getBasePath(props, store) + '/v2/label_generation/bulk_upload';
  };
  var urlList = [{
    url: getBasePath(props, store) + '/v2/label_generation/v2/settings',
    heading: containerConstants.formatString(containerConstants.SETTINGS)
  }, {
    url: getBasePath(props, store) + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }];
  var urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BreadCrumb, {
    urlList: store.fromNewSetting ? urlListForNewSetting : urlList
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '16px',
      marginRight: '16px'
    }
  }, /*#__PURE__*/React.createElement(Link, {
    to: dataValidationClick(store.fromNewSetting),
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "text",
    style: borderStyleFirst
  }, /*#__PURE__*/React.createElement("div", {
    style: leftTextStyle
  }, containerConstants.formatString(containerConstants.DATA_VALIDATION)), /*#__PURE__*/React.createElement(RightOutlined, {
    style: rightArrowStyle
  }))), /*#__PURE__*/React.createElement(Link, {
    to: masterDataClick(store.fromNewSetting),
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "text",
    style: borderStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: leftTextStyle
  }, containerConstants.formatString(containerConstants.CARRIER_ALLOCATION_AND_MASTER_VALIDATION)), /*#__PURE__*/React.createElement(RightOutlined, {
    style: rightArrowStyle
  }))), /*#__PURE__*/React.createElement(Link, {
    to: awbGenerationClick(store.fromNewSetting),
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "text",
    style: borderStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: leftTextStyle
  }, containerConstants.formatString(containerConstants.AWB_GENERATION)), /*#__PURE__*/React.createElement(RightOutlined, {
    style: rightArrowStyle
  }))), /*#__PURE__*/React.createElement(Link, {
    to: labelTempatesClick(store.fromNewSetting),
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "text",
    style: borderStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: leftTextStyle
  }, containerConstants.formatString(containerConstants.LABEL_TEMPLATES)), /*#__PURE__*/React.createElement(RightOutlined, {
    style: rightArrowStyle
  }))), /*#__PURE__*/React.createElement(Link, {
    to: reverseConnectorClick(store.fromNewSetting),
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "text",
    style: borderStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: leftTextStyle
  }, containerConstants.formatString(containerConstants.REVERSE_CONNECTOR)), /*#__PURE__*/React.createElement(RightOutlined, {
    style: rightArrowStyle
  }))), /*#__PURE__*/React.createElement(Link, {
    to: bulkUploadClick(store.fromNewSetting),
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "text",
    style: borderStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: leftTextStyle
  }, containerConstants.formatString(containerConstants.BULK_UPLOAD)), /*#__PURE__*/React.createElement(RightOutlined, {
    style: rightArrowStyle
  })))));
};
export default LabelGeneration;
//# sourceMappingURL=LabelGeneration.js.map