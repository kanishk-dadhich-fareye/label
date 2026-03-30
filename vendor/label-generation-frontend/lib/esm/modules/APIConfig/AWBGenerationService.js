function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import axios from 'axios';
import { STATUS } from '../../utils/constants';
import { notifyResponseMessage } from '../commoncomponent/NotificationComponent/notifyResponseMessage';
import { BASE_PATH_APIS } from '../../utils/constants';
class AWBGenerationService {
  fetchAWBPartyConf(pageNumber, recordPerPage) {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.get(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/get/awb_party_list', {
          params: {
            pageNumber: pageNumber,
            recordPerPage: recordPerPage
          }
        });
        return response;
      } catch (error) {
        notifyResponseMessage(STATUS.ERROR, error);
      }
      return null;
    })();
  }
  searchAWBPartyListByPartyCode(partyCodes, pageNumber, recordPerPage) {
    return _asyncToGenerator(function* () {
      var response = yield axios.get(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/search/awb_party_list', {
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
    })();
  }
  fetchAWBDefaultDetails() {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.get(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/get/default_awb_conf');
        return response;
      } catch (error) {
        notifyResponseMessage(STATUS.ERROR, error);
      }
      return null;
    })();
  }
  saveAWBDefaultDetails(awbDefaultDetails) {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.post(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/addOrUpdate/default_awb_conf', awbDefaultDetails);
        return response;
      } catch (error) {
        notifyResponseMessage(STATUS.ERROR, error);
      }
      return null;
    })();
  }
  saveAWBPartyConf(awbPartyConf) {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.post(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/addOrUpdate/awb_party_conf', awbPartyConf);
        return response;
      } catch (error) {
        notifyResponseMessage(STATUS.ERROR, error);
      }
      return null;
    })();
  }
  deleteAWBPartyConf(id) {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.post(BASE_PATH_APIS.basePathForAPIS + ("/app/rest/label_generation/delete/awb_party_conf?awbPartyMasterId=" + id));
        return response;
      } catch (error) {
        notifyResponseMessage(STATUS.ERROR, error);
      }
      return null;
    })();
  }
  fetchAllPartyMaster() {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.get(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/getAll_party_master');
        return response;
      } catch (error) {
        notifyResponseMessage(STATUS.ERROR, error);
      }
      return null;
    })();
  }
}
export var awbGenerationService = new AWBGenerationService();
//# sourceMappingURL=AWBGenerationService.js.map