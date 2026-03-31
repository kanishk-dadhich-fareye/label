"use strict";

exports.__esModule = true;
exports.dataValidationService = void 0;
var _constants = require("../../utils/constants");
var _notifyResponseMessage = require("../commoncomponent/NotificationComponent/notifyResponseMessage");
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DataValidationService {
  async fetchValidationFields(type) {
    console.log("Base path fetchValidationFields: " + _constants.BASE_PATH_APIS.basePathForAPIS);
    try {
      const response = await _axios.default.get(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/get_validation_fields', {
        params: {
          type: type
        }
      });
      return response;
    } catch (error) {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
    }
    return null;
  }
  async saveValidationFields(validations, attributeId, attributeValidationId) {
    try {
      const response = await _axios.default.post(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/addOrUpdate/fieldValidation', {
        validations: validations,
        attributeId: attributeId,
        attributeValidationId: attributeValidationId
      });
      return response;
    } catch (error) {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
    }
    return null;
  }
  async saveValidationRule(dataValidationRequestDto) {
    try {
      const response = await _axios.default.post(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/addOrUpdate_rules', dataValidationRequestDto);
      return response;
    } catch (error) {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
    }
    return null;
  }
  async fetchRegexGuide() {
    console.log("Base path fetchRegexGuide: " + _constants.BASE_PATH_APIS.basePathForAPIS);
    try {
      const response = await _axios.default.get(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/get_regex_guide');
      return response;
    } catch (error) {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
    }
    return null;
  }
  async fetchValidationRule() {
    console.log("Base path fetchValidationRule: " + _constants.BASE_PATH_APIS.basePathForAPIS);
    try {
      const response = await _axios.default.get(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/get_validation_rules');
      return response;
    } catch (error) {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
    }
    return null;
  }
  async deleteValidationRule(ruleId) {
    try {
      const response = await _axios.default.post(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/delete/validation_rules?ruleId=' + ruleId);
      return response;
    } catch (error) {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
    }
    return null;
  }
}
const dataValidationService = exports.dataValidationService = new DataValidationService();
//# sourceMappingURL=DataValidationService.js.map