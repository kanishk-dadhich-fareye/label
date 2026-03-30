"use strict";

exports.__esModule = true;
exports.deleteValidationRule = deleteValidationRule;
exports.fetchRegexGuide = fetchRegexGuide;
exports.fetchValidationFields = fetchValidationFields;
exports.fetchValidationRule = fetchValidationRule;
exports.saveValidationFields = saveValidationFields;
exports.saveValidationRule = saveValidationRule;
var _DataValidationService = require("./DataValidationService");
async function fetchValidationFields(type) {
  let response = await _DataValidationService.dataValidationService.fetchValidationFields(type);
  return response;
}
async function saveValidationFields(validations, attributeId, attributeValidationId) {
  let response = await _DataValidationService.dataValidationService.saveValidationFields(validations, attributeId, attributeValidationId);
  return response;
}
async function fetchRegexGuide() {
  let response = await _DataValidationService.dataValidationService.fetchRegexGuide();
  return response;
}
async function fetchValidationRule() {
  let response = await _DataValidationService.dataValidationService.fetchValidationRule();
  return response;
}
async function saveValidationRule(dataValidationRequestDto) {
  let response = await _DataValidationService.dataValidationService.saveValidationRule(dataValidationRequestDto);
  return response;
}
async function deleteValidationRule(ruleId) {
  let response = await _DataValidationService.dataValidationService.deleteValidationRule(ruleId);
  return response;
}
//# sourceMappingURL=DataValidationAction.js.map