function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import axios from 'axios';
import { BASE_PATH_APIS } from '../../utils/constants';
class LabelTemplateService {
  fetchLabelTemplateList(pageNumber, recordPerPage, selectedKeys) {
    return _asyncToGenerator(function* () {
      var response = yield axios.get(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/get/labelTemplate', {
        params: {
          pageNumber: pageNumber,
          recordPerPage: recordPerPage,
          selectedKeys: selectedKeys
        }
      }).then(response => {
        return response == null ? void 0 : response.data;
      }).catch(error => {
        if (error.response && error.response.status === 400) {
          return error.response;
        }
        return null;
      });
      return response;
    })();
  }
  saveLabelTemplate(labelTemplateDetails) {
    return _asyncToGenerator(function* () {
      var response = yield axios.post(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/addOrUpdate/labelTemplate', labelTemplateDetails).then(response => {
        return response;
      }).catch(error => {
        if (error.response && error.response.status === 400) {
          return error.response;
        }
        return null;
      });
      return response;
    })();
  }
  saveLabelTemplateScript(templateObj) {
    return _asyncToGenerator(function* () {
      var response = yield axios.post(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/save/labelTemplate', templateObj).then(response => {
        return response;
      }).catch(error => {
        if (error.response && error.response.status === 400) {
          return error.response;
        }
        return null;
      });
      return response;
    })();
  }
  saveLabelTemplatePartyMapping(partyCodes, templateCode) {
    return _asyncToGenerator(function* () {
      var response = yield axios.post(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/save/mapping/labelTemplateParty?templateCode=' + templateCode + '&partyCodes=' + partyCodes).then(response => {
        return response;
      }).catch(error => {
        if (error.response && error.response.status === 400) {
          return error.response;
        }
        return null;
      });
      return response;
    })();
  }
  activateDeactivateLabelTemplate(templateObj) {
    return _asyncToGenerator(function* () {
      var response = yield axios.post(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/activate/labelTemplate', templateObj).then(response => {
        return response;
      }).catch(error => {
        if (error.response && error.response.status === 400) {
          return error.response;
        }
        return null;
      });
      return response;
    })();
  }
  deleteLabelTemplate(id) {
    return _asyncToGenerator(function* () {
      var response = yield axios.post(BASE_PATH_APIS.basePathForAPIS + ("/app/rest/label_generation/delete/label_template?labelTemplateId=" + id)).then(response => {
        return response;
      }).catch(error => {
        if (error.response && error.response.status === 400) {
          return error.response;
        }
        return null;
      });
      return response;
    })();
  }
  fetchAllPartyMaster() {
    return _asyncToGenerator(function* () {
      var response = yield axios.get(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/getAll_party_master').then(response => {
        return response;
      }).catch(error => {
        if (error.response && error.response.status === 400) {
          return error.response;
        }
        return null;
      });
      return response;
    })();
  }
  fetchLabelPartyMapping() {
    return _asyncToGenerator(function* () {
      var response = yield axios.get(BASE_PATH_APIS.basePathForAPIS + '/app/rest/label_generation/fetch/labelPartyMapping').then(response => {
        return response;
      }).catch(error => {
        if (error.response && error.response.status === 400) {
          return error.response;
        }
        return null;
      });
      return response;
    })();
  }
}
export var labelTemplateService = new LabelTemplateService();
//# sourceMappingURL=LabelTemplateService.js.map