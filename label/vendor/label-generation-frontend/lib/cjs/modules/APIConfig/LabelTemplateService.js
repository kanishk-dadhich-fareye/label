"use strict";

exports.__esModule = true;
exports.labelTemplateService = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _constants = require("../../utils/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class LabelTemplateService {
  async fetchLabelTemplateList(pageNumber, recordPerPage, selectedKeys) {
    const response = await _axios.default.get(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/get/labelTemplate', {
      params: {
        pageNumber: pageNumber,
        recordPerPage: recordPerPage,
        selectedKeys: selectedKeys
      }
    }).then(response => {
      return response == null ? void 0 : response.data;
    }).catch(error => {
      if (error.response && error.response.status === 400) {
        return error.response;
      }
      return null;
    });
    return response;
  }
  async saveLabelTemplate(labelTemplateDetails) {
    const response = await _axios.default.post(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/addOrUpdate/labelTemplate', labelTemplateDetails).then(response => {
      return response;
    }).catch(error => {
      if (error.response && error.response.status === 400) {
        return error.response;
      }
      return null;
    });
    return response;
  }
  async saveLabelTemplateScript(templateObj) {
    const response = await _axios.default.post(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/save/labelTemplate', templateObj).then(response => {
      return response;
    }).catch(error => {
      if (error.response && error.response.status === 400) {
        return error.response;
      }
      return null;
    });
    return response;
  }
  async saveLabelTemplatePartyMapping(partyCodes, templateCode) {
    const response = await _axios.default.post(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/save/mapping/labelTemplateParty?templateCode=' + templateCode + '&partyCodes=' + partyCodes).then(response => {
      return response;
    }).catch(error => {
      if (error.response && error.response.status === 400) {
        return error.response;
      }
      return null;
    });
    return response;
  }
  async activateDeactivateLabelTemplate(templateObj) {
    const response = await _axios.default.post(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/activate/labelTemplate', templateObj).then(response => {
      return response;
    }).catch(error => {
      if (error.response && error.response.status === 400) {
        return error.response;
      }
      return null;
    });
    return response;
  }
  async deleteLabelTemplate(id) {
    const response = await _axios.default.post(_constants.BASE_PATH_APIS.basePathForAPIS + ("/app/rest/label_generation/delete/label_template?labelTemplateId=" + id)).then(response => {
      return response;
    }).catch(error => {
      if (error.response && error.response.status === 400) {
        return error.response;
      }
      return null;
    });
    return response;
  }
  async fetchAllPartyMaster() {
    const response = await _axios.default.get(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/getAll_party_master').then(response => {
      return response;
    }).catch(error => {
      if (error.response && error.response.status === 400) {
        return error.response;
      }
      return null;
    });
    return response;
  }
  async fetchLabelPartyMapping() {
    const response = await _axios.default.get(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/fetch/labelPartyMapping').then(response => {
      return response;
    }).catch(error => {
      if (error.response && error.response.status === 400) {
        return error.response;
      }
      return null;
    });
    return response;
  }
}
const labelTemplateService = exports.labelTemplateService = new LabelTemplateService();
//# sourceMappingURL=LabelTemplateService.js.map