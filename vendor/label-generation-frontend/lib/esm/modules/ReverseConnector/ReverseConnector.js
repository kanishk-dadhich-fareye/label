import React, { useEffect, useState } from 'react';
import BreadCrumb from '../commoncomponent/breadcrumb/bread_crumb';
import { Select, Card, Row, Col, Button, Space, Form, Spin } from 'antd';
import { containerConstantsService } from '../../utils/containerconstants/ContainerConstants';
import '../../CSS/ReverseConnectorStyle.css';
import { fetchReverseConnectorMasterList, saveReverseConnectorConfig, fetchReverseConnectorConfig } from '../APIConfig/ReverseConnectorAction';
import { isEmpty, toUpper } from 'lodash';
import { notifyResponseMessage } from '../commoncomponent/NotificationComponent/notifyResponseMessage';
import { STATUS, REVERSE_CONNECTOR_TYPE } from '../../utils/constants';
import { useStore } from '../hook-store/store';
import { getBasePath } from '../commoncomponent/BasePath';
var containerConstants = containerConstantsService.getInstance();
var {
  Option
} = Select;
var {
  Item
} = Form;
var ReverseConnector = props => {
  var store = useStore(true)[0];
  var [showLoading, setShowLoading] = useState(false);
  var [reverseConnectorMasterList, setReverseConnectorMasterList] = useState([]);
  var [selectedReverseConnector, setSelectedReverseConnector] = useState({});
  var [validation, setValidation] = useState({
    connectorCode: 0
  });
  var [isButtonDisabled, setIsButtonDisabled] = useState(true);
  var [basePath, setBasePath] = useState('');
  useEffect(() => {
    setBasePath(getBasePath(props, store));
    document.title = containerConstants.formatString(containerConstants.REVERSE_CONNECTOR);
    setShowLoading(true);
    fetchReverseConnectorMasterList().then(response => {
      setShowLoading(false);
      if (response && response.status === 200) {
        setReverseConnectorMasterList(response.data);
      }
    }).catch(error => {
      setShowLoading(false);
    });
    setShowLoading(true);
    fetchReverseConnectorConfig().then(response => {
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
  var urlList = [{
    url: basePath + '/v2/label_generation/v2/settings',
    heading: containerConstants.formatString(containerConstants.SETTINGS)
  }, {
    url: basePath + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: basePath + '/v2/label_generation/reverse_connector',
    heading: containerConstants.formatString(containerConstants.REVERSE_CONNECTOR)
  }];
  var urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: '/v2/new_settings/label_generation/reverse_connector',
    heading: containerConstants.formatString(containerConstants.REVERSE_CONNECTOR)
  }];
  var saveConfig = () => {
    if (!isEmpty(selectedReverseConnector)) {
      setShowLoading(true);
      saveReverseConnectorConfig(selectedReverseConnector).then(response => {
        setShowLoading(false);
        if (response && response.status === 200) {
          var _response$data2;
          if (toUpper(response == null || (_response$data2 = response.data) == null ? void 0 : _response$data2.status) === STATUS.SUCCESS) {
            var _response$data3;
            notifyResponseMessage(STATUS.SUCCESS, response == null || (_response$data3 = response.data) == null ? void 0 : _response$data3.message);
          } else {
            var _response$data4;
            notifyResponseMessage(STATUS.FAILED, response == null || (_response$data4 = response.data) == null ? void 0 : _response$data4.message);
          }
        }
      }).catch(error => {
        setShowLoading(false);
        notifyResponseMessage(STATUS.ERROR, error);
      });
    } else {
      setValidation({
        connectorCode: 1
      });
    }
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(BreadCrumb, {
    urlList: store.fromNewSetting ? urlListForNewSetting : urlList
  }), /*#__PURE__*/React.createElement(Spin, {
    spinning: showLoading
  }, /*#__PURE__*/React.createElement(Card, {
    className: "fw400 fs12 lh18",
    size: "small",
    bodyStyle: {
      color: '#727272'
    },
    id: "reverse-connector-card"
  }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    span: 6
  }, containerConstants.formatString(containerConstants.NAME)), /*#__PURE__*/React.createElement(Col, {
    span: 9
  }, /*#__PURE__*/React.createElement(Item, {
    validateStatus: validation.connectorCode === 1 ? 'error' : null,
    help: validation.connectorCode === 1 ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, containerConstants.formatString(containerConstants.NAME)) : null
  }, /*#__PURE__*/React.createElement(Select, {
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
  }, reverseConnectorMasterList.filter(reverseConnectorMaster => reverseConnectorMaster.active !== false && reverseConnectorMaster.synchronous === false && reverseConnectorMaster.configurationType === REVERSE_CONNECTOR_TYPE.ADD_PROCESS).map(reverseConnectorMaster => /*#__PURE__*/React.createElement(Option, {
    key: 'admin',
    value: reverseConnectorMaster.code
  }, reverseConnectorMaster.title)))))), /*#__PURE__*/React.createElement(Row, {
    style: {
      marginTop: '24px'
    }
  }, /*#__PURE__*/React.createElement(Col, {
    push: 11
  }, /*#__PURE__*/React.createElement(Space, {
    size: 9
  }, /*#__PURE__*/React.createElement(Button, {
    ghost: true,
    className: "fw500 fs14 lh22",
    style: {
      color: '#727272',
      border: 0
    },
    type: "primary",
    loading: showLoading
  }, containerConstants.formatString(containerConstants.CANCEL)), /*#__PURE__*/React.createElement(Button, {
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
export default ReverseConnector;
//# sourceMappingURL=ReverseConnector.js.map