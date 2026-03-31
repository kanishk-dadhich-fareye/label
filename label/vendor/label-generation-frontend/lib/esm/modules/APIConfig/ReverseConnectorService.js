function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import axios from 'axios';
import { BASE_PATH_APIS } from '../../utils/constants';
class ReverseConnectorService {
  fetchReverseConnectorConfig() {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.get(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/get/reverse_connector_config');
        return response;
      } catch (error) {}
      return null;
    })();
  }
  fetchReverseConnectorMasterList() {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.get(BASE_PATH_APIS.basePathForAPIS + '/app/rest/get_connector_reverse_master');
        return response;
      } catch (error) {
        return [];
      }
    })();
  }
  saveReverseConnectorConfig(config) {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.post(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/addOrUpdate/reverse_connector_config', config);
        return response;
      } catch (error) {}
      return null;
    })();
  }
}
export var reverseConnectorService = new ReverseConnectorService();
//# sourceMappingURL=ReverseConnectorService.js.map