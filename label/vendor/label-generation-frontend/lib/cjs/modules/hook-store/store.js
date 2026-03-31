"use strict";

exports.__esModule = true;
exports.useStore = exports.initStore = void 0;
var _react = require("react");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
let globalState = {};
let listeners = [];
let actions = {};
const useStore = shouldListen => {
  const setState = (0, _react.useState)(globalState)[1];
  const dispatch = (actionIdentifier, payload, reRender) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = _extends({}, globalState, newState);
    if (reRender === undefined || reRender === true) {
      for (const listener of listeners) {
        listener(globalState);
      }
    }
  };
  (0, _react.useEffect)(() => {
    if (shouldListen) {
      listeners.push(setState);
    }
    return () => {
      if (shouldListen) {
        listeners = listeners.filter(li => li !== setState);
      }
    };
  }, [setState]);
  return [globalState, dispatch];
};
exports.useStore = useStore;
const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = _extends({}, globalState, initialState);
  }
  actions = _extends({}, actions, userActions);
};
exports.initStore = initStore;
//# sourceMappingURL=store.js.map