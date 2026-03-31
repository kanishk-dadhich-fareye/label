"use strict";

exports.__esModule = true;
exports.fetchBulkUploadAddShipmentConfig = fetchBulkUploadAddShipmentConfig;
exports.saveBulkUploadAddShipmentConfig = saveBulkUploadAddShipmentConfig;
var _BulkUploadAddShipmentService = require("./BulkUploadAddShipmentService.js");
async function fetchBulkUploadAddShipmentConfig(id) {
  let response = await _BulkUploadAddShipmentService.bulkUploadAddShipmentService.fetchBulkUploadAddShipmentConfig(id);
  return response;
}
async function saveBulkUploadAddShipmentConfig(lgBulkUploadSettingDto) {
  let response = await _BulkUploadAddShipmentService.bulkUploadAddShipmentService.saveBulkUploadAddShipmentConfig(lgBulkUploadSettingDto);
  return response;
}
//# sourceMappingURL=BulkUploadAddShipmentAction.js.map