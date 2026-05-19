export const API_CONFIG = {
  BASE_URL: "http://localhost:3000/api",
  TIMEOUT: 10000,
};

export function getApiUrl(path) {
  return `${API_CONFIG.BASE_URL}${path}`;
}