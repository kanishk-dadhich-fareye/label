function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import { awbGenerationService } from "./AWBGenerationService";
export function fetchAWBPartyConf(_x, _x2) {
  return _fetchAWBPartyConf.apply(this, arguments);
}
function _fetchAWBPartyConf() {
  _fetchAWBPartyConf = _asyncToGenerator(function* (pageNumber, recordPerPage) {
    var response = yield awbGenerationService.fetchAWBPartyConf(pageNumber, recordPerPage);
    return response;
  });
  return _fetchAWBPartyConf.apply(this, arguments);
}
export function searchAWBPartyListByPartyCode(_x3, _x4, _x5) {
  return _searchAWBPartyListByPartyCode.apply(this, arguments);
}
function _searchAWBPartyListByPartyCode() {
  _searchAWBPartyListByPartyCode = _asyncToGenerator(function* (partyCodes, pageNumber, recordPerPage) {
    var response = yield awbGenerationService.searchAWBPartyListByPartyCode(partyCodes, pageNumber, recordPerPage);
    return response;
  });
  return _searchAWBPartyListByPartyCode.apply(this, arguments);
}
export function fetchAWBDefaultDetails() {
  return _fetchAWBDefaultDetails.apply(this, arguments);
}
function _fetchAWBDefaultDetails() {
  _fetchAWBDefaultDetails = _asyncToGenerator(function* () {
    var response = yield awbGenerationService.fetchAWBDefaultDetails();
    return response;
  });
  return _fetchAWBDefaultDetails.apply(this, arguments);
}
export function saveAWBDefaultDetails(_x6) {
  return _saveAWBDefaultDetails.apply(this, arguments);
}
function _saveAWBDefaultDetails() {
  _saveAWBDefaultDetails = _asyncToGenerator(function* (awbDefaultDetails) {
    var response = yield awbGenerationService.saveAWBDefaultDetails(awbDefaultDetails);
    return response;
  });
  return _saveAWBDefaultDetails.apply(this, arguments);
}
export function saveAWBPartyConf(_x7) {
  return _saveAWBPartyConf.apply(this, arguments);
}
function _saveAWBPartyConf() {
  _saveAWBPartyConf = _asyncToGenerator(function* (awbPartyConf) {
    var response = yield awbGenerationService.saveAWBPartyConf(awbPartyConf);
    return response;
  });
  return _saveAWBPartyConf.apply(this, arguments);
}
export function deleteAWBPartyConf(_x8) {
  return _deleteAWBPartyConf.apply(this, arguments);
}
function _deleteAWBPartyConf() {
  _deleteAWBPartyConf = _asyncToGenerator(function* (id) {
    var response = yield awbGenerationService.deleteAWBPartyConf(id);
    return response;
  });
  return _deleteAWBPartyConf.apply(this, arguments);
}
export function fetchAllPartyMaster() {
  return _fetchAllPartyMaster.apply(this, arguments);
}
function _fetchAllPartyMaster() {
  _fetchAllPartyMaster = _asyncToGenerator(function* () {
    var response = yield awbGenerationService.fetchAllPartyMaster();
    return response;
  });
  return _fetchAllPartyMaster.apply(this, arguments);
}
//# sourceMappingURL=AWBGenerationAction.js.map