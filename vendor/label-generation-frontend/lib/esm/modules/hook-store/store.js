function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { useEffect, useState } from 'react';
var globalState = {};
var listeners = [];
var actions = {};
export var useStore = shouldListen => {
  var setState = useState(globalState)[1];
  var dispatch = (actionIdentifier, payload, reRender) => {
    var newState = actions[actionIdentifier](globalState, payload);
    globalState = _extends({}, globalState, newState);
    if (reRender === undefined || reRender === true) {
      for (var listener of listeners) {
        listener(globalState);
      }
    }
  };
  useEffect(() => {
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
export var initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = _extends({}, globalState, initialState);
  }
  actions = _extends({}, actions, userActions);
};
//# sourceMappingURL=store.js.map