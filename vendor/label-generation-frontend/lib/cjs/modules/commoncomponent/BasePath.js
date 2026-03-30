"use strict";

exports.__esModule = true;
exports.getBasePath = void 0;
const getBasePath = function (props, store) {
  if (props.fromFCR || store.fromFCR) {
    if (props.isProduction || store.isProduction) {
      return '/fcr/view/reactSettings';
    } else {
      return '/view/reactSettings';
    }
  }
  return '';
};
exports.getBasePath = getBasePath;
//# sourceMappingURL=BasePath.js.map