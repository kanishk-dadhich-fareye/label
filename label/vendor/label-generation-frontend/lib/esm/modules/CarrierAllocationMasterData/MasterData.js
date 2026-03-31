function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useCallback, useEffect, useState } from 'react';
import BreadCrumb from '../commoncomponent/breadcrumb/bread_crumb';
import { containerConstantsService } from '../../utils/containerconstants/ContainerConstants';
import { Modal, Select, Card, Input, Switch, Row, Col, Form, InputNumber } from 'antd';
import ConfigIcon from '../../images/config_icon.svg';
import '../../CSS/MasterData.css';
import { fetchMasterDataConf, getUserType, saveMasterDataConf } from '../APIConfig/MasterDataAction';
import { MASTER_DATA_SETTING, STATUS } from '../../utils/constants';
import { isEmpty } from 'lodash';
import { notifyResponseMessage } from '../commoncomponent/NotificationComponent/notifyResponseMessage';
import { useStore } from '../hook-store/store';
import { getBasePath } from '../commoncomponent/BasePath';
import { Link } from 'react-router-dom';
var containerConstants = containerConstantsService.getInstance();
var {
  Option
} = Select;
var {
  Item
} = Form;
var MasterData = props => {
  var store = useStore(true)[0];
  var [basePath, setBasePath] = useState('');
  var [showModalDialogForm, setShowModalDialogForm] = useState(false);
  var [processing, setProcessing] = useState(false);
  var [validation, setValidation] = useState({});
  var [formData, setFormData] = useState({});
  var [allUserTypeList, setAllUserTypeList] = useState([]);
  var urlList = [{
    url: basePath + '/v2/label_generation/v2/settings',
    heading: containerConstants.formatString(containerConstants.SETTINGS)
  }, {
    url: basePath + '/v2/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: basePath + '/v2/label_generation/carrier_allocation',
    heading: containerConstants.formatString(containerConstants.CARRIER_ALLOCATION_AND_MASTER_VALIDATION)
  }];
  var urlListForNewSetting = [{
    url: '/v2/new_settings/label_generation/settings',
    heading: containerConstants.formatString(containerConstants.ADD_ORDER_AND_GENERATE_LABEL)
  }, {
    url: '/v2/new_settings/label_generation/carrier_allocation',
    heading: containerConstants.formatString(containerConstants.CARRIER_ALLOCATION_AND_MASTER_VALIDATION)
  }];
  var masterDataTabClick = fromNewSetting => {
    return fromNewSetting ? '/v2/new_settings/label_generation/carrier_allocation/master_data' : basePath + '/v2/label_generation/carrier_allocation/master_data';
  };
  useEffect(() => {
    setBasePath(getBasePath(props, store));
    setValidation({});
    document.title = containerConstants.formatString(containerConstants.CARRIER_ALLOCATION_AND_MASTER_VALIDATION);
    fetchMasterDataConf().then(response => {
      if (response && response.status === 200) {
        setFormData(response.data);
      }
    }).catch(error => {});
    getUserType().then(response => {
      if (response.status === 200) {
        setAllUserTypeList(response.data);
      }
    }).catch(error => {});
  }, [showModalDialogForm]);
  var isEmptyData = () => {
    var emptyCount = 0;
    Object.values(MASTER_DATA_SETTING).forEach(key => {
      if ((!formData[key] || (typeof formData[key] === 'string' ? isEmpty(formData[key].trim()) : typeof formData[key] === 'number' ? formData[key] < 1 : isEmpty(formData[key]))) && key !== MASTER_DATA_SETTING.IS_ENABLED) {
        emptyCount++;
        setValidation(prev => _extends({}, prev, {
          [key]: 1
        }));
      }
    });
    return !emptyCount ? false : true;
  };
  var switchClickHandler = show => {
    setFormData(_extends({}, formData, {
      [MASTER_DATA_SETTING.IS_ENABLED]: show
    }));
    if (!isEmpty(formData) && formData.clientId) {
      saveMasterData(show);
    } else {
      setShowModalDialogForm(show);
    }
  };
  var saveMasterData = show => {
    var config = {};
    Object.values(MASTER_DATA_SETTING).forEach(key => {
      config[key] = typeof formData[key] === 'string' ? formData[key].trim() : formData[key];
    });
    if (show !== undefined) {
      config[MASTER_DATA_SETTING.IS_ENABLED] = show;
      setProcessing(prev => !prev);
    }
    saveMasterDataConf(config).then(response => {
      if (response && response.status === 200) {
        notifyResponseMessage(STATUS.SUCCESS, "Updated Successfully");
        setFormData(response.data);
        show !== undefined && setProcessing(prev => !prev);
        props.updateCarrierAllocationName(response.data);
      } else {
        if (formData.clientId === undefined) {
          setFormData(_extends({}, formData, {
            [MASTER_DATA_SETTING.IS_ENABLED]: show
          }));
        }
        setProcessing(prev => !prev);
        notifyResponseMessage(STATUS.ERROR, response.response.data);
      }
    }).catch(error => {
      if (formData.clientId === undefined) {
        setFormData(_extends({}, formData, {
          [MASTER_DATA_SETTING.IS_ENABLED]: show
        }));
      }
      setProcessing(prev => !prev);
      notifyResponseMessage(STATUS.ERROR, error.message);
    });
  };
  var handleClickOk = () => {
    if (!isEmptyData()) {
      saveMasterData();
      setShowModalDialogForm(false);
    }
  };
  var handleClickCancel = () => {
    setValidation({});
    if (formData.clientId === undefined) {
      setFormData(_extends({}, formData, {
        [MASTER_DATA_SETTING.IS_ENABLED]: false
      }));
    }
    setShowModalDialogForm(false);
  };
  var updateFieldValue = (e, name) => {
    setFormData(_extends({}, formData, {
      [name]: e.target.value
    }));
    validation[name] && delete validation[name];
  };
  var getRowWithInputElementJsx = (label, name) => {
    return /*#__PURE__*/React.createElement(Row, {
      justify: "space-between"
    }, /*#__PURE__*/React.createElement(Col, {
      span: 6
    }, label), /*#__PURE__*/React.createElement(Col, {
      span: 14
    }, /*#__PURE__*/React.createElement(Item, {
      validateStatus: validation[name] ? 'error' : null,
      help: validation[name] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, label) : null
    }, /*#__PURE__*/React.createElement(Input, {
      name: name,
      value: formData[name],
      onChange: e => updateFieldValue(e, name)
    }))));
  };
  var getRowWithSelectElementJsx = (label, name) => {
    return /*#__PURE__*/React.createElement(Row, {
      justify: "space-between"
    }, /*#__PURE__*/React.createElement(Col, {
      span: 6
    }, label), /*#__PURE__*/React.createElement(Col, {
      span: 14
    }, /*#__PURE__*/React.createElement(Item, {
      validateStatus: validation[name] ? 'error' : null,
      help: validation[name] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, label) : null
    }, /*#__PURE__*/React.createElement(Select, {
      mode: "multiple",
      allowClear: true,
      style: {
        width: '100%'
      },
      showSearch: true,
      value: formData[name],
      onChange: value => {
        setFormData(_extends({}, formData, {
          [name]: value
        }));
        validation[name] && delete validation[name];
      },
      filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }, allUserTypeList.map(userType => /*#__PURE__*/React.createElement(Option, {
      key: userType.id,
      value: userType.id + ""
    }, userType.name))))));
  };
  var handleAllocationOutputTypeChange = value => {
    //
    if (value === "Single Carrier") {
      setFormData(_extends({}, formData, {
        noOfOutput: 1,
        [MASTER_DATA_SETTING.ALLOCATION_OUTPUT]: value
      }));
    } else {
      setFormData(_extends({}, formData, {
        [MASTER_DATA_SETTING.ALLOCATION_OUTPUT]: value
      }));
    }
    validation[MASTER_DATA_SETTING.ALLOCATION_OUTPUT] && delete validation[MASTER_DATA_SETTING.ALLOCATION_OUTPUT];
  };
  var handleNoOfOutputChange = value => {
    setFormData(_extends({}, formData, {
      noOfOutput: value
    }));
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(BreadCrumb, {
    urlList: store.fromNewSetting ? urlListForNewSetting : urlList
  }), /*#__PURE__*/React.createElement(Modal, {
    title: containerConstants.formatString(containerConstants.SET_PREFERENCE),
    visible: showModalDialogForm,
    centered: true,
    maskClosable: "true",
    className: "master-data-modal",
    bodyStyle: {
      padding: '16px 24px 0'
    },
    width: '50%',
    okText: containerConstants.formatString(containerConstants.ADD),
    onOk: handleClickOk,
    onCancel: handleClickCancel
  }, /*#__PURE__*/React.createElement(Card, {
    className: "fw500 fs12 lh18",
    bodyStyle: {
      color: '#727272',
      padding: '1rem 0 1.5rem'
    },
    title: containerConstants.formatString(containerConstants.BASIC_DETAILS)
  }, getRowWithInputElementJsx(containerConstants.formatString(containerConstants.TITLE), MASTER_DATA_SETTING.TITLE), /*#__PURE__*/React.createElement("br", null), getRowWithSelectElementJsx(containerConstants.formatString(containerConstants.USER_TYPE), MASTER_DATA_SETTING.ALLOWED_USER_TYPES), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Row, {
    justify: "space-between"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 6
  }, containerConstants.formatString(containerConstants.ALLOCATION_OUTPUT), " :"), /*#__PURE__*/React.createElement(Col, {
    span: 14
  }, /*#__PURE__*/React.createElement(Item, {
    validateStatus: validation[MASTER_DATA_SETTING.ALLOCATION_OUTPUT] ? 'error' : null,
    help: validation[MASTER_DATA_SETTING.ALLOCATION_OUTPUT] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, containerConstants.formatString(containerConstants.ALLOCATION_OUTPUT)) : null
  }, /*#__PURE__*/React.createElement(Select, {
    style: {
      width: '100%'
    },
    showSearch: true,
    value: formData[MASTER_DATA_SETTING.ALLOCATION_OUTPUT],
    onChange: value => handleAllocationOutputTypeChange(value),
    filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }, /*#__PURE__*/React.createElement(Option, {
    key: "Single_Carrier",
    value: "Single Carrier"
  }, containerConstants.formatString(containerConstants.SINGLE_CARRIER)), /*#__PURE__*/React.createElement(Option, {
    key: "Multi_Carrier",
    value: "Multi Carrier"
  }, containerConstants.formatString(containerConstants.MULTI_CARRIER)))))), formData.isEnabled && formData[MASTER_DATA_SETTING.ALLOCATION_OUTPUT] === "Multi Carrier" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Row, {
    justify: "space-between"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 6
  }, containerConstants.formatString(containerConstants.NO_OF_OUTPUT), " :"), /*#__PURE__*/React.createElement(Col, {
    span: 14
  }, /*#__PURE__*/React.createElement(Item, {
    validateStatus: validation[MASTER_DATA_SETTING.NO_OF_OUTPUT] ? 'error' : null,
    help: validation[MASTER_DATA_SETTING.NO_OF_OUTPUT] ? containerConstants.formatString(containerConstants.REQUIRED_VALIDATION_MSG, containerConstants.formatString(containerConstants.NO_OF_OUTPUT)) : null
  }, /*#__PURE__*/React.createElement(InputNumber, {
    style: {
      height: '32px'
    },
    placeholder: "",
    name: MASTER_DATA_SETTING.NO_OF_OUTPUT,
    value: formData[MASTER_DATA_SETTING.NO_OF_OUTPUT],
    onChange: e => handleNoOfOutputChange(e)
  })))))), /*#__PURE__*/React.createElement(Card, {
    className: "fw500 fs12 lh18",
    bodyStyle: {
      color: '#727272',
      padding: '1rem 0 1.5rem'
    },
    title: containerConstants.formatString(containerConstants.CARRIER_INTEGRATION)
  }, getRowWithInputElementJsx(containerConstants.formatString(containerConstants.URL), MASTER_DATA_SETTING.URL), /*#__PURE__*/React.createElement("br", null), getRowWithInputElementJsx(containerConstants.formatString(containerConstants.API_ACCESS_TOKEN), MASTER_DATA_SETTING.API_ACCESS_TOKEN))), /*#__PURE__*/React.createElement(Link, {
    to: masterDataTabClick(store.fromNewSetting),
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    size: "small",
    bodyStyle: {},
    className: "pointer",
    id: "carrier-alloc-card"
  }, /*#__PURE__*/React.createElement("span", null, containerConstants.formatString(containerConstants.MASTER_DATA)))), (store.fromFCR || !store.showCustom) && /*#__PURE__*/React.createElement(Card, {
    size: "small",
    bodyStyle: {},
    id: "carrier-alloc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "justify-space-btw"
  }, /*#__PURE__*/React.createElement("span", null, containerConstants.formatString(containerConstants.SERVICE)), /*#__PURE__*/React.createElement("span", {
    id: "switch-config-container"
  }, formData[MASTER_DATA_SETTING.IS_ENABLED] && formData.clientId && /*#__PURE__*/React.createElement("span", {
    style: {
      paddingRight: '26px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "pointer",
    src: ConfigIcon,
    onClick: () => setShowModalDialogForm(true)
  })), /*#__PURE__*/React.createElement(Switch, {
    loading: processing,
    disabled: processing,
    checked: formData[MASTER_DATA_SETTING.IS_ENABLED],
    onClick: switchClickHandler
  })))));
};
export default MasterData;
//# sourceMappingURL=MasterData.js.map