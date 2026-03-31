"use strict";

exports.__esModule = true;
exports.bulkUploadAddShipmentService = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _constants = require("../../utils/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class BulkUploadAddShipmentService {
  async fetchBulkUploadAddShipmentConfig(id) {
    try {
      const response = await _axios.default.get(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/setting/fetch_lg_bulk_upload_config?id=' + id);
      return response;
    } catch (error) {}
    return null;
  }
  async saveBulkUploadAddShipmentConfig(lgBulkUploadSettingDto) {
    try {
      const response = await _axios.default.post(_constants.BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/setting/lg_bulk_upload', lgBulkUploadSettingDto);
      return response;
    } catch (error) {}
    return null;
  }
}
const bulkUploadAddShipmentService = exports.bulkUploadAddShipmentService = new BulkUploadAddShipmentService();
//# sourceMappingURL=BulkUploadAddShipmentService.js.map