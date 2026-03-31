"use strict";

exports.__esModule = true;
exports.activateDeactivateLabelTemplate = activateDeactivateLabelTemplate;
exports.deleteLabelTemplate = deleteLabelTemplate;
exports.fetchAllPartyMaster = fetchAllPartyMaster;
exports.fetchLabelPartyMapping = fetchLabelPartyMapping;
exports.fetchLabelTemplateList = fetchLabelTemplateList;
exports.saveLabelTemplate = saveLabelTemplate;
exports.saveLabelTemplatePartyMapping = saveLabelTemplatePartyMapping;
exports.saveLabelTemplateScript = saveLabelTemplateScript;
var _LabelTemplateService = require("./LabelTemplateService");
async function fetchLabelTemplateList(pageNumber, recordPerPage, selectedKeys) {
  let response = await _LabelTemplateService.labelTemplateService.fetchLabelTemplateList(pageNumber, recordPerPage, selectedKeys);
  return response;
}
async function saveLabelTemplate(labelTemplateDetails) {
  let response = await _LabelTemplateService.labelTemplateService.saveLabelTemplate(labelTemplateDetails);
  return response;
}
async function saveLabelTemplateScript(templateObj) {
  let response = await _LabelTemplateService.labelTemplateService.saveLabelTemplateScript(templateObj);
  return response;
}
async function saveLabelTemplatePartyMapping(partyCodes, templateCode) {
  let response = await _LabelTemplateService.labelTemplateService.saveLabelTemplatePartyMapping(partyCodes, templateCode);
  return response;
}
async function activateDeactivateLabelTemplate(templateObj) {
  let response = await _LabelTemplateService.labelTemplateService.activateDeactivateLabelTemplate(templateObj);
  return response;
}
async function deleteLabelTemplate(id) {
  let response = await _LabelTemplateService.labelTemplateService.deleteLabelTemplate(id);
  return response;
}
async function fetchAllPartyMaster() {
  let response = await _LabelTemplateService.labelTemplateService.fetchAllPartyMaster();
  return response;
}
async function fetchLabelPartyMapping() {
  let response = await _LabelTemplateService.labelTemplateService.fetchLabelPartyMapping();
  return response;
}
//# sourceMappingURL=LabelTemplateAction.js.map