import { Method, Obj, RequestArgs } from "../types/requests";
import LocalStorageActions from "../utils/localStorage";

class Api {
  public headers: Obj<any>;
  public url: string;

  constructor() {
    this.url = import.meta.env.VITE_API_BASE_URL;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: LocalStorageActions.getAuthToken() || "",
    };
  }

  async loginRequest({ email, password }: { email: string; password: string }) {
    try {
      const config = {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      };

      const response = await fetch(`${this.url}/login`, config);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const authToken = response.headers.get("authorization");
      LocalStorageActions.setAuthToken(authToken || "");

      return await response.json();
    } catch (error) {
      console.error("API Request Failed:", error);
      throw error;
    }
  }

  private async request({ endpoint, method = Method.GET, body }: RequestArgs) {
    const config = {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : null,
    };

    try {
      const response = await fetch(`${this.url}/${endpoint}`, config);
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
    return this.request({ endpoint, method: Method.GET });
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
