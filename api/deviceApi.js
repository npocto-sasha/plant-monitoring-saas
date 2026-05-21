import { getApiUrl } from "./config";

async function request(path, options = {}) {
  const response = await fetch(getApiUrl(path), {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "API request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const deviceApi = {
  async getDevices() {
    return request("/devices");
  },

  async getDeviceById(deviceId) {
    return request(`/devices/${deviceId}`);
  },

  async createDevice(deviceData) {
    return request("/devices", {
      method: "POST",
      body: JSON.stringify(deviceData),
    });
  },

  async bindDeviceToPlant(deviceId, plantId) {
    return request(`/devices/${deviceId}/bind-plant`, {
      method: "PATCH",
      body: JSON.stringify({
        plantId: Number(plantId),
      }),
    });
  },

  async deleteDevice(deviceId) {
    return request(`/devices/${deviceId}`, {
      method: "DELETE",
    });
  },
};