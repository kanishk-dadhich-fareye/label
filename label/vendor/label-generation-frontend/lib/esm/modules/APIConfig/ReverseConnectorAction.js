function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import { reverseConnectorService } from "./ReverseConnectorService.js";
export function fetchReverseConnectorMasterList() {
  return _fetchReverseConnectorMasterList.apply(this, arguments);
}
function _fetchReverseConnectorMasterList() {
  _fetchReverseConnectorMasterList = _asyncToGenerator(function* () {
    var response = yield reverseConnectorService.fetchReverseConnectorMasterList();
    return response;
  });
  return _fetchReverseConnectorMasterList.apply(this, arguments);
}
export function fetchReverseConnectorConfig() {
  return _fetchReverseConnectorConfig.apply(this, arguments);
}
function _fetchReverseConnectorConfig() {
  _fetchReverseConnectorConfig = _asyncToGenerator(function* () {
    var response = yield reverseConnectorService.fetchReverseConnectorConfig();
    return response;
  });
  return _fetchReverseConnectorConfig.apply(this, arguments);
}
export function saveReverseConnectorConfig(_x) {
  return _saveReverseConnectorConfig.apply(this, arguments);
}
function _saveReverseConnectorConfig() {
  _saveReverseConnectorConfig = _asyncToGenerator(function* (config) {
    var response = yield reverseConnectorService.saveReverseConnectorConfig(config);
    return response;
  });
  return _saveReverseConnectorConfig.apply(this, arguments);
}
//# sourceMappingURL=ReverseConnectorAction.js.map