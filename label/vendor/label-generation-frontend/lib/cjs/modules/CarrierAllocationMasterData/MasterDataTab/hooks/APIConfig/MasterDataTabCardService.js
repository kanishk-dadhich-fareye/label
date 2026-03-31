"use strict";

exports.__esModule = true;
exports.masterDataTabCardService = void 0;
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MasterDataTabCardService {
  async fetchPartyMaster(pageNumber, recordPerPage) {
    try {
      const response = await _axios.default.get("/app/rest/label_generation/getAll_party_master?pageNumber=" + pageNumber + "&recordPerPage=" + recordPerPage);
      return response;
    } catch (error) {
      return error;
    }
    return null;
  }
  async fetchPartyMasterPagination(pageNumber, recordPerPage) {
    const response = await _axios.default.get('/app/rest/label_generation/get_party_master?pageNumber=' + pageNumber + '&recordPerPage=' + recordPerPage).then(response => {
      return response;
    }).catch(error => {
      if (error.response && error.response.status == 400) {
        return error.response;
      }
      return [];
    });
    return response;
  }
  async savePartyMaster(dataObject) {
    try {
      const response = await _axios.default.post('/app/rest/label_generation/addOrUpdate/party_master', dataObject);
      return response;
    } catch (error) {
      return error;
    }
    return null;
  }
  async fetchParcelShopMaster(pageNumber, recordPerPage) {
    try {
      const response = await _axios.default.get("/app/rest/label_generation/get_parcel_shop_master?pageNumber=" + pageNumber + "&recordPerPage=" + recordPerPage);
      return response;
    } catch (error) {
      return error;
    }
    return null;
  }
  async saveParcelShopMaster(dataObject) {
    try {
      const response = await _axios.default.post('/app/rest/label_generation/addOrUpdate/parcel_shop_master', dataObject);
      return response;
    } catch (error) {
      return error;
    }
    return null;
  }
  async partyMasterStatusUpdate(partyMasterId, isActive) {
    const response = await _axios.default.post('/app/rest/label_generation/activate/party_master?partyMasterId=' + partyMasterId + '&isActive=' + isActive).then(response => {
      return response;
    }).catch(error => {
      if (error.response && error.response.status == 400) {
        return error.response;
      }
      return [];
    });
    return response;
  }
  async parcelShopMasterStatusUpdate(parcelShopMasterId, isActive) {
    const response = await _axios.default.post('/app/rest/label_generation/activate/parcel_shop_master?parcelShopMasterId=' + parcelShopMasterId + '&isActive=' + isActive).then(response => {
      return response;
    }).catch(error => {
      if (error.response && error.response.status == 400) {
        return error.response;
      }
      return [];
    });
    return response;
  }
}
const masterDataTabCardService = exports.masterDataTabCardService = new MasterDataTabCardService();
//# sourceMappingURL=MasterDataTabCardService.js.map