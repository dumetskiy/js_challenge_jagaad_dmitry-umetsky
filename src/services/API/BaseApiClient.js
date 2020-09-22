import axios from 'axios';

export default class BaseApiClient {
  // Configuring base axios API client
  constructor() {
    this.axios = axios.create({
      baseURL: this.constructor.getBaseUrl(),
      timeout: this.constructor.getTimeout(),
      headers: this.constructor.getHeaders(),
    });
  }

  static getTimeout() {
    return 5000;
  }

  static getQueryString(queryParams) {
    return `?${new URLSearchParams(queryParams).toString()}`;
  }
}
