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

  return response.json();
}

export const plantApi = {
  async getPlants() {
    return request("/plants");
  },

  async getPlantById(plantId) {
    return request(`/plants/${plantId}`);
  },

  async createPlant(plantData) {
    return request("/plants", {
      method: "POST",
      body: JSON.stringify(plantData),
    });
  },

  async updatePlant(plantId, plantData) {
    return request(`/plants/${plantId}`, {
      method: "PATCH",
      body: JSON.stringify(plantData),
    });
  },

  async deletePlant(plantId) {
    return request(`/plants/${plantId}`, {
      method: "DELETE",
    });
  },
};