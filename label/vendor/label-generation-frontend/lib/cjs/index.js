"use strict";

exports.__esModule = true;
var _formStore = _interopRequireDefault(require("./modules/hook-store/form-store"));
var _modules = require("./modules");
Object.keys(_modules).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _modules[key]) return;
  exports[key] = _modules[key];
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
(0, _formStore.default)();
//# sourceMappingURL=index.js.map