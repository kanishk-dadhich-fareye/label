"use strict";

exports.__esModule = true;
var _exportNames = {
  MasterData: true
};
exports.MasterData = void 0;
var _MasterData = _interopRequireDefault(require("./MasterData"));
exports.MasterData = _MasterData.default;
var _MasterDataTab = require("./MasterDataTab");
Object.keys(_MasterDataTab).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _MasterDataTab[key]) return;
  exports[key] = _MasterDataTab[key];
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//# sourceMappingURL=index.js.map