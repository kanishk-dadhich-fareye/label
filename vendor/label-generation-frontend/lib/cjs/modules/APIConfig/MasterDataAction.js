"use strict";

exports.__esModule = true;
exports.fetchMasterDataConf = fetchMasterDataConf;
exports.getUserType = getUserType;
exports.saveMasterDataConf = saveMasterDataConf;
var _MasterDataService = require("./MasterDataService");
async function fetchMasterDataConf() {
  let response = await _MasterDataService.masterDataService.fetchMasterDataConf();
  return response;
}
async function getUserType() {
  let response = await _MasterDataService.masterDataService.getUserType();
  return response;
}
async function saveMasterDataConf(masterData) {
  let response = await _MasterDataService.masterDataService.saveMasterDataConf(masterData);
  return response;
}
//# sourceMappingURL=MasterDataAction.js.map