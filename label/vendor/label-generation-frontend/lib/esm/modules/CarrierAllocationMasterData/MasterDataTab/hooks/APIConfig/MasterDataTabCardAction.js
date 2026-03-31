function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import { masterDataTabCardService } from "./MasterDataTabCardService";
export function fetchPartyMaster(_x, _x2) {
  return _fetchPartyMaster.apply(this, arguments);
}
function _fetchPartyMaster() {
  _fetchPartyMaster = _asyncToGenerator(function* (pageNumber, recordPerPage) {
    var response = yield masterDataTabCardService.fetchPartyMaster(pageNumber, recordPerPage);
    return response;
  });
  return _fetchPartyMaster.apply(this, arguments);
}
export function fetchPartyMasterPagination(_x3, _x4) {
  return _fetchPartyMasterPagination.apply(this, arguments);
}
function _fetchPartyMasterPagination() {
  _fetchPartyMasterPagination = _asyncToGenerator(function* (pageNumber, recordPerPage) {
    var response = yield masterDataTabCardService.fetchPartyMasterPagination(pageNumber, recordPerPage);
    return response;
  });
  return _fetchPartyMasterPagination.apply(this, arguments);
}
export function savePartyMaster(_x5) {
  return _savePartyMaster.apply(this, arguments);
}
function _savePartyMaster() {
  _savePartyMaster = _asyncToGenerator(function* (dataObject) {
    var response = yield masterDataTabCardService.savePartyMaster(dataObject);
    return response;
  });
  return _savePartyMaster.apply(this, arguments);
}
export function fetchParcelShopMaster(_x6, _x7) {
  return _fetchParcelShopMaster.apply(this, arguments);
}
function _fetchParcelShopMaster() {
  _fetchParcelShopMaster = _asyncToGenerator(function* (pageNumber, recordPerPage) {
    var response = yield masterDataTabCardService.fetchParcelShopMaster(pageNumber, recordPerPage);
    return response;
  });
  return _fetchParcelShopMaster.apply(this, arguments);
}
export function saveParcelShopMaster(_x8) {
  return _saveParcelShopMaster.apply(this, arguments);
}
function _saveParcelShopMaster() {
  _saveParcelShopMaster = _asyncToGenerator(function* (dataObject) {
    var response = yield masterDataTabCardService.saveParcelShopMaster(dataObject);
    return response;
  });
  return _saveParcelShopMaster.apply(this, arguments);
}
export function partyMasterStatusUpdate(_x9, _x0) {
  return _partyMasterStatusUpdate.apply(this, arguments);
}
function _partyMasterStatusUpdate() {
  _partyMasterStatusUpdate = _asyncToGenerator(function* (partyMasterId, isActive) {
    var response = yield masterDataTabCardService.partyMasterStatusUpdate(partyMasterId, isActive);
    return response;
  });
  return _partyMasterStatusUpdate.apply(this, arguments);
}
export function parcelShopMasterStatusUpdate(_x1, _x10) {
  return _parcelShopMasterStatusUpdate.apply(this, arguments);
}
function _parcelShopMasterStatusUpdate() {
  _parcelShopMasterStatusUpdate = _asyncToGenerator(function* (parcelShopMasterId, isActive) {
    var response = yield masterDataTabCardService.parcelShopMasterStatusUpdate(parcelShopMasterId, isActive);
    return response;
  });
  return _parcelShopMasterStatusUpdate.apply(this, arguments);
}
//# sourceMappingURL=MasterDataTabCardAction.js.map