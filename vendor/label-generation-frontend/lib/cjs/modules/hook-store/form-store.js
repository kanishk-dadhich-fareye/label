"use strict";

exports.__esModule = true;
exports.default = void 0;
var _store = require("./store");
const formStore = () => {
  const actions = {
    OPEN_FIELDS_ADD_DATA_VALIDATION_FORM: (curState, data) => {
      return {
        formType: data[0],
        rowId: data[1]
      };
    },
    SET_SHOW_CUSTOM: (curState, data) => {
      return {
        showCustom: data
      };
    },
    SET_FROM_FCR: (curState, data) => {
      return {
        fromFCR: data
      };
    },
    SET_IS_PRODUCTION: (curState, data) => {
      return {
        isProduction: data
      };
    },
    SET_IS_NEW_SETTING: (curState, data) => {
      return {
        fromNewSetting: data
      };
    }
  };
  (0, _store.initStore)(actions, {
    formType: null,
    rowId: null,
    showCustom: false,
    fromFCR: false,
    isProduction: false,
    fromNewSetting: false
  });
};
var _default = exports.default = formStore;
//# sourceMappingURL=form-store.js.map