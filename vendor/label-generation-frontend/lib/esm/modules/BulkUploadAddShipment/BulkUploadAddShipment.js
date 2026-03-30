import React, { useEffect, useState } from 'react';
import { Row, Card, Switch, Col, Input, Select, Spin, Button, Space } from 'antd';
import { containerConstantsService } from '../../utils/containerconstants/ContainerConstants';
import BreadCrumb from '../commoncomponent/breadcrumb/bread_crumb';
import { getUserType } from '../APIConfig/MasterDataAction';
import { fetchBulkUploadAddShipmentConfig, saveBulkUploadAddShipmentConfig } from '../APIConfig/BulkUploadAddShipmentAction';
import { useStore } from '../hook-store/store';
import { getBasePath } from '../commoncomponent/BasePath';
import { notifyResponseMessage } from '../commoncomponent/NotificationComponent/notifyResponseMessage';
import { STATUS } from '../../utils/constants';
import '../../CSS/BulkUploadAddShipment.css';
var containerConstants = containerConstantsService.getInstance();
var BulkUploadAddShipment = props => {
  var store = useStore(true)[0];
  var [showLoading, setShowLoading] = useState(false);
  var [title, setTitle] = useState("Bulk Upload");
  var [selectedUserTypes, setSelectedUserTypes] = useState([]);
  var [allUserTypeListOption, setAllUserTypeListOption] = useState([]);
  var [bulkUploadEnabled, setBulkUploadEnabled] = useState(false);
  var [bulkUploadConfigId, setBulkUploadConfigId] = useState(0);
  var [isButtonDisabled, setIsButtonDisabled] = useState(true);
  var [dataFetched, setDataFetched] = useState(false);
  var [basePath, setBasePath] = useState('');
  var urlList = [{
    url: basePath + '/v2/label_generation/v2/settings',
    heading: containerConstants.formatString(containerConstants.SETTINGS)
  }, {
    url: basePath + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: basePath + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.BULK_UPLOAD)
  }];
  var urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: '/v2/new_settings/label_generation/bulk_upload',
    heading: containerConstants.formatString(containerConstants.CARRIER_ALLOCATION_AND_MASTER_VALIDATION)
  }];
  var switchClickHandler = checked => {
    if (!checked) {
      setSelectedUserTypes([]);
      setTitle("Bulk Upload");
      setIsButtonDisabled(false);
    }
    setBulkUploadEnabled(checked);
  };
  var handleTitleInputChange = value => {
    setTitle(value);
    isSaveButtonDisable('title', value);
  };
  var saveConfig = () => {
    setShowLoading(true);
    var lgBulkUploadSettingDto = {
      "isEnabled": bulkUploadEnabled,
      "title": title,
      "allowedUserTypes": selectedUserTypes,
      "id": bulkUploadConfigId
    };
    saveBulkUploadAddShipmentConfig(lgBulkUploadSettingDto).then(response => {
      setShowLoading(false);
      if (response && response.status === 200) {
        var _response$data;
        var status = response == null || (_response$data = response.data) == null ? void 0 : _response$data.status;
        if (status && status.toUpperCase() === STATUS.SUCCESS) {
          var _response$data2;
          setBulkUploadConfigId(response.data.data.id);
          notifyResponseMessage(STATUS.SUCCESS, response == null || (_response$data2 = response.data) == null ? void 0 : _response$data2.message);
          props.updateLabelGenerationTitle(response.data.data);
        } else {
          var _response$data3;
          notifyResponseMessage(STATUS.FAILED, response == null || (_response$data3 = response.data) == null ? void 0 : _response$data3.message);
        }
      }
    }).catch(error => {
      setShowLoading(false);
      notifyResponseMessage(STATUS.ERROR, error);
    });
  };
  var isSaveButtonDisable = (key, value) => {
    if (key) {
      switch (key) {
        case 'title':
          if (value && selectedUserTypes.length > 0) {
            setIsButtonDisabled(false);
          } else {
            setIsButtonDisabled(true);
          }
          break;
        case 'selectedUserTypes':
          if (title && value.length > 0) {
            setIsButtonDisabled(false);
          } else {
            setIsButtonDisabled(true);
          }
          break;
        default:
          break;
      }
    } else {
      if (title && selectedUserTypes.length > 0) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }
  };
  useEffect(() => {
    setBasePath(getBasePath(props, store));
    document.title = containerConstants.formatString(containerConstants.BULK_UPLOAD);
    var options = [];
    allUserTypeListOption.length === 0 && getUserType().then(response => {
      if (response.status === 200) {
        response.data.map(userType => {
          options.push({
            label: userType.name,
            value: userType.id
          });
        });
      }
      setAllUserTypeListOption(options);
    }).catch(error => {});
    !dataFetched && fetchBulkUploadAddShipmentConfig(bulkUploadConfigId).then(response => {
      if (response && response.status === 200) {
        var _response$data4;
        var status = response == null || (_response$data4 = response.data) == null ? void 0 : _response$data4.status;
        if (status && status.toUpperCase() === STATUS.SUCCESS) {
          setDataFetched(true);
          if (response.data && response.data.data) {
            var reps = response.data.data;
            var userTypes = [];
            reps.allowedUserTypes && reps.allowedUserTypes.forEach(val => {
              val && userTypes.push(parseInt(val));
            });
            setSelectedUserTypes(userTypes);
            setTitle(reps.title);
            setBulkUploadEnabled(reps.isEnabled);
            setBulkUploadConfigId(reps.id);
            isSaveButtonDisable();
          }
        }
      }
    });
  }, [allUserTypeListOption, dataFetched]);
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
    id: "bulk-upload-add-shipment-card"
  }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    span: 7
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontsize: '14px',
      lineHeight: '22px',
      color: '#212121'
    }
  }, containerConstants.formatString(containerConstants.ENABLED), " :")), /*#__PURE__*/React.createElement(Col, {
    span: 10
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: bulkUploadEnabled,
    onChange: switchClickHandler
  }))), bulkUploadEnabled && /*#__PURE__*/React.createElement(Row, {
    style: {
      marginTop: '12px'
    }
  }, /*#__PURE__*/React.createElement(Col, {
    span: 7
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontsize: '14px',
      lineHeight: '22px',
      color: '#212121'
    }
  }, containerConstants.formatString(containerConstants.TITLE), " :")), /*#__PURE__*/React.createElement(Col, {
    span: 12
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    style: {
      height: '32px'
    },
    placeholder: "Add title",
    name: "title",
    value: title,
    onChange: e => handleTitleInputChange(e.target.value)
  })))), bulkUploadEnabled && /*#__PURE__*/React.createElement(Row, {
    style: {
      marginTop: '12px'
    }
  }, /*#__PURE__*/React.createElement(Col, {
    span: 7
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontsize: '14px',
      lineHeight: '22px',
      color: '#212121'
    }
  }, containerConstants.formatString(containerConstants.USER_TYPE), " :")), /*#__PURE__*/React.createElement(Col, {
    span: 12
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "Select User Types",
    mode: "multiple",
    showSearch: true,
    style: {
      display: 'block'
    },
    value: selectedUserTypes,
    onChange: value => {
      setSelectedUserTypes(value);
      isSaveButtonDisable('selectedUserTypes', value);
    },
    filterOption: (input, option) => {
      var _option$props;
      if ((_option$props = option.props) != null && _option$props.children) return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
    options: allUserTypeListOption
  })))), /*#__PURE__*/React.createElement(Row, {
    style: {
      marginTop: '24px'
    }
  }, /*#__PURE__*/React.createElement(Col, {
    push: 15
  }, /*#__PURE__*/React.createElement("div", {
    disabled: store.fromFCR ? false : store.showCustom
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
    disabled: isButtonDisabled
  }, containerConstants.formatString(containerConstants.SAVE)))))))));
};
export default BulkUploadAddShipment;
//# sourceMappingURL=BulkUploadAddShipment.js.map