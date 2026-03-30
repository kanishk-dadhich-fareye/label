"use strict";

exports.__esModule = true;
exports.awbGenerationService = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _constants = require("../../utils/constants");
var _notifyResponseMessage = require("../commoncomponent/NotificationComponent/notifyResponseMessage");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AWBGenerationService {
  async fetchAWBPartyConf(pageNumber, recordPerPage) {
    try {
      const response = await _axios.default.get(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/get/awb_party_list', {
        params: {
          pageNumber: pageNumber,
          recordPerPage: recordPerPage
        }
      });
      return response;
    } catch (error) {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
    }
    return null;
  }
  async searchAWBPartyListByPartyCode(partyCodes, pageNumber, recordPerPage) {
    const response = await _axios.default.get(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/search/awb_party_list', {
      params: {
        partyCodes: partyCodes,
        pageNumber: pageNumber,
        recordPerPage: recordPerPage
      }
    }).then(response => {
      return response;
    }).catch(error => {
      if (error.response && error.response.status === 400) {
        return error.response;
      }
      return [];
    });
    return response;
  }
  async fetchAWBDefaultDetails() {
    try {
      const response = await _axios.default.get(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/get/default_awb_conf');
      return response;
    } catch (error) {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
    }
    return null;
  }
  async saveAWBDefaultDetails(awbDefaultDetails) {
    try {
      const response = await _axios.default.post(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/addOrUpdate/default_awb_conf', awbDefaultDetails);
      return response;
    } catch (error) {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
    }
    return null;
  }
  async saveAWBPartyConf(awbPartyConf) {
    try {
      const response = await _axios.default.post(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/addOrUpdate/awb_party_conf', awbPartyConf);
      return response;
    } catch (error) {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
    }
    return null;
  }
  async deleteAWBPartyConf(id) {
    try {
      const response = await _axios.default.post(_constants.BASE_PATH_APIS.basePathForAPIS + ("/app/rest/label_generation/delete/awb_party_conf?awbPartyMasterId=" + id));
      return response;
    } catch (error) {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
    }
    return null;
  }
  async fetchAllPartyMaster() {
    try {
      const response = await _axios.default.get(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/getAll_party_master');
      return response;
    } catch (error) {
      (0, _notifyResponseMessage.notifyResponseMessage)(_constants.STATUS.ERROR, error);
    }
    return null;
  }
}
const awbGenerationService = exports.awbGenerationService = new AWBGenerationService();
//# sourceMappingURL=AWBGenerationService.js.map