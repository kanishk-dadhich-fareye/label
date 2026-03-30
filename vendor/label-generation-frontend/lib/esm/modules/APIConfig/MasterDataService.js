function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import axios from 'axios';
import { BASE_PATH_APIS } from '../../utils/constants';
class MasterDataService {
  fetchMasterDataConf() {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.get(BASE_PATH_APIS.basePathForAPIS + '/app/rest/carrier_allocation/get_config');
        return response;
      } catch (error) {}
      return null;
    })();
  }
  getUserType() {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.get(BASE_PATH_APIS.basePathForAPIS + '/app/rest/user_type');
        return response;
      } catch (error) {
        return [];
      }
    })();
  }
  saveMasterDataConf(masterData) {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.post(BASE_PATH_APIS.basePathForAPIS + '/app/rest/carrier_allocation/save_config', masterData);
        return response;
      } catch (error) {
        return error;
      }
    })();
  }
}
export var masterDataService = new MasterDataService();
//# sourceMappingURL=MasterDataService.js.map