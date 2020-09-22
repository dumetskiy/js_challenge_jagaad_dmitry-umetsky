import BaseApiClient from './BaseApiClient';
import appStore from '../Vuex/Store';

export default class MusementVenuesApiClient extends BaseApiClient {
  static getBaseUrl() {
    return 'https://api.musement.com/api/v3/activities';
  }
  static getDefaultItemsPerPage() {
    return 6;
  }
  static getHeaders() {
    return {
      'Content-Type': 'application/json',
      'accept-language': 'it',
      'x-musement-currency': 'EUR',
      'x-musement-version': '3.4.0',
    }
  }
  getDetailsForPage(page, limit) {
    page = page || 1;
    limit = limit || this.constructor.getDefaultItemsPerPage();

    this.axios.get(this.constructor.getQueryString({
      offset: (page - 1) * limit,
      limit,
    })).then(
      (response) => {
        appStore.state.listingItems = response.data.data;
        appStore.state.resultsCount = response.data.meta.count;
      },
    ).catch(
      (error) => console.error(error),
    );
  }
}
