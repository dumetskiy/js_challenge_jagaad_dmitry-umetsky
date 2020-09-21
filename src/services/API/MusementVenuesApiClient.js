import BaseApiClient from "./BaseApiClient";
import appStore from "../vuex/store";

export default class MusementVenuesApiClient extends BaseApiClient {
  getBaseUrl() {
    return 'https://api.musement.com/api/v3/venues/164/activities'
  }
  getDefaultItemsPerPage() {
    return 6;
  }
  getDetailsForPage(page, limit) {
    page = page || 1;
    limit = limit || this.getDefaultItemsPerPage();

    this.axios.get(this.getQueryString({
      offset: (page - 1) * limit,
      limit: limit
    })).then(
      response => (appStore.state.listingItems = response.data)
    ).catch(
      error => console.error(error)
    );
  }
}
