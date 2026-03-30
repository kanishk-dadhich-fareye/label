function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
import axios from 'axios';
class MasterDataTabCardService {
  fetchPartyMaster(pageNumber, recordPerPage) {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.get("/app/rest/label_generation/getAll_party_master?pageNumber=" + pageNumber + "&recordPerPage=" + recordPerPage);
        return response;
      } catch (error) {
        return error;
      }
      return null;
    })();
  }
  fetchPartyMasterPagination(pageNumber, recordPerPage) {
    return _asyncToGenerator(function* () {
      var response = yield axios.get('/app/rest/label_generation/get_party_master?pageNumber=' + pageNumber + '&recordPerPage=' + recordPerPage).then(response => {
        return response;
      }).catch(error => {
        if (error.response && error.response.status == 400) {
          return error.response;
        }
        return [];
      });
      return response;
    })();
  }
  savePartyMaster(dataObject) {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.post('/app/rest/label_generation/addOrUpdate/party_master', dataObject);
        return response;
      } catch (error) {
        return error;
      }
      return null;
    })();
  }
  fetchParcelShopMaster(pageNumber, recordPerPage) {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.get("/app/rest/label_generation/get_parcel_shop_master?pageNumber=" + pageNumber + "&recordPerPage=" + recordPerPage);
        return response;
      } catch (error) {
        return error;
      }
      return null;
    })();
  }
  saveParcelShopMaster(dataObject) {
    return _asyncToGenerator(function* () {
      try {
        var response = yield axios.post('/app/rest/label_generation/addOrUpdate/parcel_shop_master', dataObject);
        return response;
      } catch (error) {
        return error;
      }
      return null;
    })();
  }
  partyMasterStatusUpdate(partyMasterId, isActive) {
    return _asyncToGenerator(function* () {
      var response = yield axios.post('/app/rest/label_generation/activate/party_master?partyMasterId=' + partyMasterId + '&isActive=' + isActive).then(response => {
        return response;
      }).catch(error => {
        if (error.response && error.response.status == 400) {
          return error.response;
        }
        return [];
      });
      return response;
    })();
  }
  parcelShopMasterStatusUpdate(parcelShopMasterId, isActive) {
    return _asyncToGenerator(function* () {
      var response = yield axios.post('/app/rest/label_generation/activate/parcel_shop_master?parcelShopMasterId=' + parcelShopMasterId + '&isActive=' + isActive).then(response => {
        return response;
      }).catch(error => {
        if (error.response && error.response.status == 400) {
          return error.response;
        }
        return [];
      });
      return response;
    })();
  }
}
export var masterDataTabCardService = new MasterDataTabCardService();
//# sourceMappingURL=MasterDataTabCardService.js.map