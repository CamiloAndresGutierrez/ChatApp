import { Method, RequestArgs } from "../types/requests";
import LocalStorageActions from "../utils/localStorage";

class Api {
  #baseURL: string | undefined;

  constructor() {
    this.#baseURL = import.meta.env.VITE_API_BASE_URL;
  }

  async request({ endpoint, method = Method.GET, body = {} }: RequestArgs) {
    const headers = {
      Authorization: LocalStorageActions.getAuthToken(),
    };

    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(LocalStorageActions.getAuthToken() && headers),
      },
      body: body ? JSON.stringify(body) : null,
    };

    try {
      const response = await fetch(`${this.#baseURL}${endpoint}`, config);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API Request Failed:", error);
      throw error;
    }
  }

  get(endpoint: string) {
    return this.request({ endpoint, method: Method.GET, body: {} });
  }

  post(endpoint: string, body: RequestArgs["body"] = {}) {
    return this.request({ endpoint, method: Method.POST, body });
  }

  put(endpoint: string, body: RequestArgs["body"] = {}) {
    return this.request({ endpoint, method: Method.PUT, body });
  }

  delete(endpoint: string, body: RequestArgs["body"] = {}) {
    return this.request({ endpoint, method: Method.PUT, body });
  }
}

export default new Api();
