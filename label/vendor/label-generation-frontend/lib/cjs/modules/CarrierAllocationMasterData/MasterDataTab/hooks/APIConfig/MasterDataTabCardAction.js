"use strict";

exports.__esModule = true;
exports.fetchParcelShopMaster = fetchParcelShopMaster;
exports.fetchPartyMaster = fetchPartyMaster;
exports.fetchPartyMasterPagination = fetchPartyMasterPagination;
exports.parcelShopMasterStatusUpdate = parcelShopMasterStatusUpdate;
exports.partyMasterStatusUpdate = partyMasterStatusUpdate;
exports.saveParcelShopMaster = saveParcelShopMaster;
exports.savePartyMaster = savePartyMaster;
var _MasterDataTabCardService = require("./MasterDataTabCardService");
async function fetchPartyMaster(pageNumber, recordPerPage) {
  let response = await _MasterDataTabCardService.masterDataTabCardService.fetchPartyMaster(pageNumber, recordPerPage);
  return response;
}
async function fetchPartyMasterPagination(pageNumber, recordPerPage) {
  let response = await _MasterDataTabCardService.masterDataTabCardService.fetchPartyMasterPagination(pageNumber, recordPerPage);
  return response;
}
async function savePartyMaster(dataObject) {
  let response = await _MasterDataTabCardService.masterDataTabCardService.savePartyMaster(dataObject);
  return response;
}
async function fetchParcelShopMaster(pageNumber, recordPerPage) {
  let response = await _MasterDataTabCardService.masterDataTabCardService.fetchParcelShopMaster(pageNumber, recordPerPage);
  return response;
}
async function saveParcelShopMaster(dataObject) {
  let response = await _MasterDataTabCardService.masterDataTabCardService.saveParcelShopMaster(dataObject);
  return response;
}
async function partyMasterStatusUpdate(partyMasterId, isActive) {
  let response = await _MasterDataTabCardService.masterDataTabCardService.partyMasterStatusUpdate(partyMasterId, isActive);
  return response;
}
async function parcelShopMasterStatusUpdate(parcelShopMasterId, isActive) {
  let response = await _MasterDataTabCardService.masterDataTabCardService.parcelShopMasterStatusUpdate(parcelShopMasterId, isActive);
  return response;
}
//# sourceMappingURL=MasterDataTabCardAction.js.map