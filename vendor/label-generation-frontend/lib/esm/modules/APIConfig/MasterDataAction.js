function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import { masterDataService } from "./MasterDataService";
export function fetchMasterDataConf() {
  return _fetchMasterDataConf.apply(this, arguments);
}
function _fetchMasterDataConf() {
  _fetchMasterDataConf = _asyncToGenerator(function* () {
    var response = yield masterDataService.fetchMasterDataConf();
    return response;
  });
  return _fetchMasterDataConf.apply(this, arguments);
}
export function getUserType() {
  return _getUserType.apply(this, arguments);
}
function _getUserType() {
  _getUserType = _asyncToGenerator(function* () {
    var response = yield masterDataService.getUserType();
    return response;
  });
  return _getUserType.apply(this, arguments);
}
export function saveMasterDataConf(_x) {
  return _saveMasterDataConf.apply(this, arguments);
}
function _saveMasterDataConf() {
  _saveMasterDataConf = _asyncToGenerator(function* (masterData) {
    var response = yield masterDataService.saveMasterDataConf(masterData);
    return response;
  });
  return _saveMasterDataConf.apply(this, arguments);
}
//# sourceMappingURL=MasterDataAction.js.map