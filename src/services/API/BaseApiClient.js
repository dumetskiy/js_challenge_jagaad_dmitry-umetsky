import axios from "axios";

export default class BaseApiClient {
  constructor() {
    this.axios = axios.create({
      baseURL: this.getBaseUrl(),
      timeout: this.getTimeout(),
      headers: {
        'Content-Type': 'application/json',
        'accept-language': 'it',
        'x-musement-currency': 'EUR',
        'x-musement-version': '3.4.0',
      }
    });
  }
  getTimeout() {
    return 5000;
  }
  getQueryString(queryParams) {
    return '?' + new URLSearchParams(queryParams).toString();
  }
}
