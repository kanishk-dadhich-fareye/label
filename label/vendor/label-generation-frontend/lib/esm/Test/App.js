import React, { useEffect } from 'react';
// import './AppStyle.js';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteContainer1 from './route.js';
import CommonStyle from '../styles/common.js';
import formStore from '../modules/hook-store/form-store.js';
// import styleAsString from '!!raw-loader!antd/dist/antd.css';

formStore();
var App = props => {
  var style = document.createElement("style");
  var style1 = null;
  useEffect(() => {
    style.type = "text/css";
    // style.innerHTML = styleAsString;
    style1 = document.head.appendChild(style);
    return () => {
      if (style1) {
        document.head.removeChild(style1);
      }
    };
  });
  return /*#__PURE__*/React.createElement(Router, null, /*#__PURE__*/React.createElement(CommonStyle, null), /*#__PURE__*/React.createElement(RouteContainer1, {
    updateLabelGenerationTitle: props.updateLabelGenerationTitle,
    updateCarrierAllocationName: props.updateCarrierAllocationName,
    settingInvoke: props.settingInvoke,
    showCustom: props.showCustom,
    fromFCR: props.fromFCR,
    isProduction: props.isProduction,
    fromNewSetting: props.fromNewSetting
  }));
};
export default App;
//# sourceMappingURL=App.js.map