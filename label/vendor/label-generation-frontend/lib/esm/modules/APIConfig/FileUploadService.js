import axios from 'axios';
import { BASE_PATH_APIS } from '../../utils/constants';

// custom file upload for sending file using axios
// solves problem of csrf token not included automatically
class FileUploadService {
  customRequest(option) {
    var {
      onSuccess,
      onError,
      file,
      action,
      onProgress,
      data,
      filename
    } = option;
    var url = BASE_PATH_APIS.basePathForAPIS + action;
    var formData = new FormData();
    if (data) {
      Object.keys(data).forEach(key => {
        var value = data[key];
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
    axios.post(url, formData, {
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
export var fileUploadService = new FileUploadService();
//# sourceMappingURL=FileUploadService.js.map