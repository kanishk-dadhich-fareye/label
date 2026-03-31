function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import { STATUS } from '../../utils/constants';
import { notifyResponseMessage } from '../commoncomponent/NotificationComponent/notifyResponseMessage';
import { BASE_PATH_APIS } from '../../utils/constants';
import axios from 'axios';
class DataValidationService {
  fetchValidationFields(type) {
    return _asyncToGenerator(function* () {
      console.log("Base path fetchValidationFields: " + BASE_PATH_APIS.basePathForAPIS);
      try {
        var response = yield axios.get(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/get_validation_fields', {
          params: {
            type: type
          }
        });
        return response;
      } catch (error) {
        notifyResponseMessage(STATUS.ERROR, error);
      }
      return null;
    })();
  }
  saveValidationFields(validations, attributeId, attributeValidationId) {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.post(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/addOrUpdate/fieldValidation', {
          validations: validations,
          attributeId: attributeId,
          attributeValidationId: attributeValidationId
        });
        return response;
      } catch (error) {
        notifyResponseMessage(STATUS.ERROR, error);
      }
      return null;
    })();
  }
  saveValidationRule(dataValidationRequestDto) {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.post(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/addOrUpdate_rules', dataValidationRequestDto);
        return response;
      } catch (error) {
        notifyResponseMessage(STATUS.ERROR, error);
      }
      return null;
    })();
  }
  fetchRegexGuide() {
    return _asyncToGenerator(function* () {
      console.log("Base path fetchRegexGuide: " + BASE_PATH_APIS.basePathForAPIS);
      try {
        var response = yield axios.get(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/get_regex_guide');
        return response;
      } catch (error) {
        notifyResponseMessage(STATUS.ERROR, error);
      }
      return null;
    })();
  }
  fetchValidationRule() {
    return _asyncToGenerator(function* () {
      console.log("Base path fetchValidationRule: " + BASE_PATH_APIS.basePathForAPIS);
      try {
        var response = yield axios.get(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/get_validation_rules');
        return response;
      } catch (error) {
        notifyResponseMessage(STATUS.ERROR, error);
      }
      return null;
    })();
  }
  deleteValidationRule(ruleId) {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.post(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/delete/validation_rules?ruleId=' + ruleId);
        return response;
      } catch (error) {
        notifyResponseMessage(STATUS.ERROR, error);
      }
      return null;
    })();
  }
}
export var dataValidationService = new DataValidationService();
//# sourceMappingURL=DataValidationService.js.map