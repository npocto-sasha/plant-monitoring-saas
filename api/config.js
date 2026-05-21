export const API_CONFIG = {
  BASE_URL: "http://localhost:3000",
  USE_BACKEND: true,
};

export function getApiUrl(path) {
  return `${API_CONFIG.BASE_URL}${path}`;
}