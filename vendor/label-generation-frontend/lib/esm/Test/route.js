function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useStore } from '../modules/hook-store/store';
import { BASE_PATH_APIS } from '../utils/constants';
import { AWBGenerationSettings, DataValidation, LabelTemplate, ReverseConnector, BulkUploadAddShipment, LabelGeneration, MasterData, MasterDataTabCard } from '../modules/index';
var RouteContainer = props => {
  var [basePath, setBasePath] = useState('/v2/label_generation');
  var [basePathForNewSetting, setBasePathForNewSetting] = useState('/v2/new_settings/label_generation');
  var dispatch = useStore(false)[1];
  useEffect(() => {
    BASE_PATH_APIS.basePathForAPIS = props.fromFCR && props.isProduction ? '/fcr' : '';
    if (props.fromFCR) {
      if (props.isProduction) {
        setBasePath("/fcr/view/reactSettings/v2/label_generation");
      } else {
        setBasePath("/view/reactSettings/v2/label_generation");
      }
    }
  }, []);
  var updateCarrierAllocationName = data => {
    props.updateCarrierAllocationName(data);
  };
  var updateLabelGenerationTitle = data => {
    props.updateLabelGenerationTitle(data);
  };
  var settingInvokeHandler = data => {
    props.settingInvoke(data);
  };
  return /*#__PURE__*/React.createElement(Routes, null, /*#__PURE__*/React.createElement(Route, {
    path: basePath + "/v2/settings",
    exact: "true",
    element: settingInvokeHandler
  }), /*#__PURE__*/React.createElement(Route, {
    path: basePath + "/settings",
    exact: "true",
    element: /*#__PURE__*/React.createElement(LabelGeneration, null)
  }), /*#__PURE__*/React.createElement(Route, {
    path: basePath + "/data_validation",
    exact: "true",
    element: /*#__PURE__*/React.createElement(DataValidation, null)
  }), /*#__PURE__*/React.createElement(Route, {
    path: basePath + "/shipment_no_generation",
    exact: "true",
    element: /*#__PURE__*/React.createElement(AWBGenerationSettings, null)
  }), /*#__PURE__*/React.createElement(Route, {
    path: basePath + "/carrier_allocation",
    exact: "true",
    element: /*#__PURE__*/React.createElement(MasterData, _extends({
      updateCarrierAllocationName: updateCarrierAllocationName
    }, props))
  }), /*#__PURE__*/React.createElement(Route, {
    path: basePath + "/carrier_allocation/master_data",
    exact: "true",
    element: /*#__PURE__*/React.createElement(MasterDataTabCard, null)
  }), /*#__PURE__*/React.createElement(Route, {
    path: basePath + "/label_templates",
    exact: "true",
    element: /*#__PURE__*/React.createElement(LabelTemplate, null)
  }), /*#__PURE__*/React.createElement(Route, {
    path: basePath + "/reverse_connector",
    exact: "true",
    element: /*#__PURE__*/React.createElement(ReverseConnector, null)
  }), /*#__PURE__*/React.createElement(Route, {
    path: basePath + "/bulk_upload",
    exact: "true",
    element: /*#__PURE__*/React.createElement(BulkUploadAddShipment, _extends({
      updateLabelGenerationTitle: updateLabelGenerationTitle
    }, props))
  }));
};
export default RouteContainer;
//# sourceMappingURL=route.js.map