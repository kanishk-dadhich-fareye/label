"use strict";

exports.__esModule = true;
exports.masterDataService = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _constants = require("../../utils/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MasterDataService {
  async fetchMasterDataConf() {
    try {
      const response = await _axios.default.get(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/carrier_allocation/get_config');
      return response;
    } catch (error) {}
    return null;
  }
  async getUserType() {
    try {
      const response = await _axios.default.get(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/user_type');
      return response;
    } catch (error) {
      return [];
    }
  }
  async saveMasterDataConf(masterData) {
    try {
      const response = await _axios.default.post(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/carrier_allocation/save_config', masterData);
      return response;
    } catch (error) {
      return error;
    }
  }
}
const masterDataService = exports.masterDataService = new MasterDataService();
//# sourceMappingURL=MasterDataService.js.map