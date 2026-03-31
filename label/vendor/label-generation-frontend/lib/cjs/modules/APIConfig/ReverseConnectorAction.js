"use strict";

exports.__esModule = true;
exports.fetchReverseConnectorConfig = fetchReverseConnectorConfig;
exports.fetchReverseConnectorMasterList = fetchReverseConnectorMasterList;
exports.saveReverseConnectorConfig = saveReverseConnectorConfig;
var _ReverseConnectorService = require("./ReverseConnectorService.js");
async function fetchReverseConnectorMasterList() {
  let response = await _ReverseConnectorService.reverseConnectorService.fetchReverseConnectorMasterList();
  return response;
}
async function fetchReverseConnectorConfig() {
  let response = await _ReverseConnectorService.reverseConnectorService.fetchReverseConnectorConfig();
  return response;
}
async function saveReverseConnectorConfig(config) {
  let response = await _ReverseConnectorService.reverseConnectorService.saveReverseConnectorConfig(config);
  return response;
}
//# sourceMappingURL=ReverseConnectorAction.js.map