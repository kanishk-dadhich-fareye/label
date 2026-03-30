function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import { dataValidationService } from "./DataValidationService";
export function fetchValidationFields(_x) {
  return _fetchValidationFields.apply(this, arguments);
}
function _fetchValidationFields() {
  _fetchValidationFields = _asyncToGenerator(function* (type) {
    var response = yield dataValidationService.fetchValidationFields(type);
    return response;
  });
  return _fetchValidationFields.apply(this, arguments);
}
export function saveValidationFields(_x2, _x3, _x4) {
  return _saveValidationFields.apply(this, arguments);
}
function _saveValidationFields() {
  _saveValidationFields = _asyncToGenerator(function* (validations, attributeId, attributeValidationId) {
    var response = yield dataValidationService.saveValidationFields(validations, attributeId, attributeValidationId);
    return response;
  });
  return _saveValidationFields.apply(this, arguments);
}
export function fetchRegexGuide() {
  return _fetchRegexGuide.apply(this, arguments);
}
function _fetchRegexGuide() {
  _fetchRegexGuide = _asyncToGenerator(function* () {
    var response = yield dataValidationService.fetchRegexGuide();
    return response;
  });
  return _fetchRegexGuide.apply(this, arguments);
}
export function fetchValidationRule() {
  return _fetchValidationRule.apply(this, arguments);
}
function _fetchValidationRule() {
  _fetchValidationRule = _asyncToGenerator(function* () {
    var response = yield dataValidationService.fetchValidationRule();
    return response;
  });
  return _fetchValidationRule.apply(this, arguments);
}
export function saveValidationRule(_x5) {
  return _saveValidationRule.apply(this, arguments);
}
function _saveValidationRule() {
  _saveValidationRule = _asyncToGenerator(function* (dataValidationRequestDto) {
    var response = yield dataValidationService.saveValidationRule(dataValidationRequestDto);
    return response;
  });
  return _saveValidationRule.apply(this, arguments);
}
export function deleteValidationRule(_x6) {
  return _deleteValidationRule.apply(this, arguments);
}
function _deleteValidationRule() {
  _deleteValidationRule = _asyncToGenerator(function* (ruleId) {
    var response = yield dataValidationService.deleteValidationRule(ruleId);
    return response;
  });
  return _deleteValidationRule.apply(this, arguments);
}
//# sourceMappingURL=DataValidationAction.js.map