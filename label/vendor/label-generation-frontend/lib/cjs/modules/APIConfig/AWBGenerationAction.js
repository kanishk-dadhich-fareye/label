"use strict";

exports.__esModule = true;
exports.deleteAWBPartyConf = deleteAWBPartyConf;
exports.fetchAWBDefaultDetails = fetchAWBDefaultDetails;
exports.fetchAWBPartyConf = fetchAWBPartyConf;
exports.fetchAllPartyMaster = fetchAllPartyMaster;
exports.saveAWBDefaultDetails = saveAWBDefaultDetails;
exports.saveAWBPartyConf = saveAWBPartyConf;
exports.searchAWBPartyListByPartyCode = searchAWBPartyListByPartyCode;
var _AWBGenerationService = require("./AWBGenerationService");
async function fetchAWBPartyConf(pageNumber, recordPerPage) {
  let response = await _AWBGenerationService.awbGenerationService.fetchAWBPartyConf(pageNumber, recordPerPage);
  return response;
}
async function searchAWBPartyListByPartyCode(partyCodes, pageNumber, recordPerPage) {
  let response = await _AWBGenerationService.awbGenerationService.searchAWBPartyListByPartyCode(partyCodes, pageNumber, recordPerPage);
  return response;
}
async function fetchAWBDefaultDetails() {
  let response = await _AWBGenerationService.awbGenerationService.fetchAWBDefaultDetails();
  return response;
}
async function saveAWBDefaultDetails(awbDefaultDetails) {
  let response = await _AWBGenerationService.awbGenerationService.saveAWBDefaultDetails(awbDefaultDetails);
  return response;
}
async function saveAWBPartyConf(awbPartyConf) {
  let response = await _AWBGenerationService.awbGenerationService.saveAWBPartyConf(awbPartyConf);
  return response;
}
async function deleteAWBPartyConf(id) {
  let response = await _AWBGenerationService.awbGenerationService.deleteAWBPartyConf(id);
  return response;
}
async function fetchAllPartyMaster() {
  let response = await _AWBGenerationService.awbGenerationService.fetchAllPartyMaster();
  return response;
}
//# sourceMappingURL=AWBGenerationAction.js.map