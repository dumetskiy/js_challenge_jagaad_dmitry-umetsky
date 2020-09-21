import axios from 'axios';

export default class BaseApiClient {
  constructor() {
    this.axios = axios.create({
      baseURL: this.constructor.getBaseUrl(),
      timeout: this.constructor.getTimeout(),
      headers: {
        'Content-Type': 'application/json',
        'accept-language': 'it',
        'x-musement-currency': 'EUR',
        'x-musement-version': '3.4.0',
      },
    });
  }

  static getTimeout() {
    return 5000;
  }

  static getQueryString(queryParams) {
    return `?${new URLSearchParams(queryParams).toString()}`;
  }
}
