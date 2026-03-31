function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import { labelTemplateService } from "./LabelTemplateService";
export function fetchLabelTemplateList(_x, _x2, _x3) {
  return _fetchLabelTemplateList.apply(this, arguments);
}
function _fetchLabelTemplateList() {
  _fetchLabelTemplateList = _asyncToGenerator(function* (pageNumber, recordPerPage, selectedKeys) {
    var response = yield labelTemplateService.fetchLabelTemplateList(pageNumber, recordPerPage, selectedKeys);
    return response;
  });
  return _fetchLabelTemplateList.apply(this, arguments);
}
export function saveLabelTemplate(_x4) {
  return _saveLabelTemplate.apply(this, arguments);
}
function _saveLabelTemplate() {
  _saveLabelTemplate = _asyncToGenerator(function* (labelTemplateDetails) {
    var response = yield labelTemplateService.saveLabelTemplate(labelTemplateDetails);
    return response;
  });
  return _saveLabelTemplate.apply(this, arguments);
}
export function saveLabelTemplateScript(_x5) {
  return _saveLabelTemplateScript.apply(this, arguments);
}
function _saveLabelTemplateScript() {
  _saveLabelTemplateScript = _asyncToGenerator(function* (templateObj) {
    var response = yield labelTemplateService.saveLabelTemplateScript(templateObj);
    return response;
  });
  return _saveLabelTemplateScript.apply(this, arguments);
}
export function saveLabelTemplatePartyMapping(_x6, _x7) {
  return _saveLabelTemplatePartyMapping.apply(this, arguments);
}
function _saveLabelTemplatePartyMapping() {
  _saveLabelTemplatePartyMapping = _asyncToGenerator(function* (partyCodes, templateCode) {
    var response = yield labelTemplateService.saveLabelTemplatePartyMapping(partyCodes, templateCode);
    return response;
  });
  return _saveLabelTemplatePartyMapping.apply(this, arguments);
}
export function activateDeactivateLabelTemplate(_x8) {
  return _activateDeactivateLabelTemplate.apply(this, arguments);
}
function _activateDeactivateLabelTemplate() {
  _activateDeactivateLabelTemplate = _asyncToGenerator(function* (templateObj) {
    var response = yield labelTemplateService.activateDeactivateLabelTemplate(templateObj);
    return response;
  });
  return _activateDeactivateLabelTemplate.apply(this, arguments);
}
export function deleteLabelTemplate(_x9) {
  return _deleteLabelTemplate.apply(this, arguments);
}
function _deleteLabelTemplate() {
  _deleteLabelTemplate = _asyncToGenerator(function* (id) {
    var response = yield labelTemplateService.deleteLabelTemplate(id);
    return response;
  });
  return _deleteLabelTemplate.apply(this, arguments);
}
export function fetchAllPartyMaster() {
  return _fetchAllPartyMaster.apply(this, arguments);
}
function _fetchAllPartyMaster() {
  _fetchAllPartyMaster = _asyncToGenerator(function* () {
    var response = yield labelTemplateService.fetchAllPartyMaster();
    return response;
  });
  return _fetchAllPartyMaster.apply(this, arguments);
}
export function fetchLabelPartyMapping() {
  return _fetchLabelPartyMapping.apply(this, arguments);
}
function _fetchLabelPartyMapping() {
  _fetchLabelPartyMapping = _asyncToGenerator(function* () {
    var response = yield labelTemplateService.fetchLabelPartyMapping();
    return response;
  });
  return _fetchLabelPartyMapping.apply(this, arguments);
}
//# sourceMappingURL=LabelTemplateAction.js.map