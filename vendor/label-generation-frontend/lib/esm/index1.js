import React from 'react';
import ReactDOM from "react-dom/client";
import IndexStyle from './indexStyle.js';
import AppStyle from './AppStyle.js';
import App from './Test/App.js';
import reportWebVitals from './reportWebVitals.js';
var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IndexStyle, null), /*#__PURE__*/React.createElement(AppStyle, null), /*#__PURE__*/React.createElement(App, null)));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//# sourceMappingURL=index1.js.map