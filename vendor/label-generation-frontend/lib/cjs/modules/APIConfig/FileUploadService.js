"use strict";

exports.__esModule = true;
exports.fileUploadService = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _constants = require("../../utils/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// custom file upload for sending file using axios
// solves problem of csrf token not included automatically
class FileUploadService {
  customRequest(option) {
    const {
      onSuccess,
      onError,
      file,
      action,
      onProgress,
      data,
      filename
    } = option;
    const url = _constants.BASE_PATH_APIS.basePathForAPIS + action;
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach(key => {
        const value = data[key];
        if (Array.isArray(value)) {
          value.forEach(item => {
            formData.append(key + "[]", item);
          });
          return;
        }
        formData.append(key, data[key]);
      });
    }
    formData.append(filename, file);
    _axios.default.post(url, formData, {
      onUploadProgress: e => {
        onProgress({
          percent: e.loaded / e.total * 100
        });
      }
    }).then(response => {
      onSuccess(response.data, response.request);
    }).catch(err => {
      if (err.response) {
        onError(err, err.response.data);
      } else {
        onError(err);
      }
    });
  }
}
const fileUploadService = exports.fileUploadService = new FileUploadService();
//# sourceMappingURL=FileUploadService.js.map