import { conn } from "./AuthHandler";
import { getAccessToken, removeFromStorage } from "./Tokens";

export async function getToken() {
  const accessToken = await getAccessToken();
  conn.interceptors.request.use((config) => {
    if (config.headers && accessToken)
      config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  conn.interceptors.response.use(
    (config) => config,
    async (error) => {
      const originalRequest = error.config;

      if (
        (error.response.status === 401 ||
          errorCatch(error) === "jwt expired" ||
          errorCatch(error) === "jwt must be provided") &&
        error.config &&
        !error.config._isRetry
      ) {
        originalRequest._isRetry = true;
        try {
          await AuthService.getNewTokens();
          return conn.request(originalRequest);
        } catch (error) {
          if (errorCatch(error) === "jwt expired") removeFromStorage();
        }
      }

      throw error;
    }
  );
}

export const DeviceService = {
  async getMyDevices() {
    const response = await conn({
      url: `/device/my`,
      method: "GET",
    });

    return response.data;
  },

  async getAll() {
    const response = await conn({
      url: "/device/",
      method: "GET",
    });

    return response.data;
  },

  async getById(id) {
    const response = await conn({
      url: `/device/${id}`,
      method: "GET",
    });

    return response.data;
  },

  async getByName(id) {
    const response = await conn({
      url: `/device/name/${id}`,
      method: "GET",
    });

    return response.data;
  },

  async getByClientId(client_id) {
    const response = await conn({
      url: `/device/client_id/${client_id}`,
      method: "GET",
    });

    return response.data;
  },

  async activate(data) {
    const response = await conn({
      url: `/device/activate`,
      method: "POST",
      data,
    });
    return response.data;
  },

  async create(data) {
    const response = await conn({
      url: `/device/create`,
      method: "POST",
      data,
    });

    return response.data;
  },

  async delete(id) {
    const response = await conn({
      url: `/device/${id}`,
      method: "DELETE",
    });

    return response.data;
  },
};
