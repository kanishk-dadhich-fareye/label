"use strict";

exports.__esModule = true;
exports.reverseConnectorService = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _constants = require("../../utils/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ReverseConnectorService {
  async fetchReverseConnectorConfig() {
    try {
      const response = await _axios.default.get(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/get/reverse_connector_config');
      return response;
    } catch (error) {}
    return null;
  }
  async fetchReverseConnectorMasterList() {
    try {
      const response = await _axios.default.get(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/get_connector_reverse_master');
      return response;
    } catch (error) {
      return [];
    }
  }
  async saveReverseConnectorConfig(config) {
    try {
      const response = await _axios.default.post(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/addOrUpdate/reverse_connector_config', config);
      return response;
    } catch (error) {}
    return null;
  }
}
const reverseConnectorService = exports.reverseConnectorService = new ReverseConnectorService();
//# sourceMappingURL=ReverseConnectorService.js.map