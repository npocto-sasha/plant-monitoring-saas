import axios from "axios";

import {
  saveToStorage,
  removeFromStorage,
  getAccessToken,
  getRefreshToken,
} from "./Tokens";
const host = "http://95.163.228.174:4200/api";

export const conn = axios.create({
  baseURL: host,
  headers: { "Content-Type": "application/json" },
});

export async function login(data) {
  const response = await conn({
    url: "/auth/login",
    method: "POST",
    data,
  });
  if (response.data.accessToken) saveToStorage(response.data);
  return response.data.user;
}
export async function register(data) {
  const response = await conn({
    url: "/auth/register",
    method: "POST",
    data,
  });
  if (response.data.accessToken) saveToStorage(response.data);
  return response.data.user;
}
export async function logout() {
  removeFromStorage();
}
export async function checkAuth() {
  const accessToken = await getAccessToken();
  if (accessToken) {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) return;
    var refr = {
      refreshToken: refreshToken,
    };
    const response = await axios.post(
      host + "/auth/login/access-token",
      { refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.data.accessToken) saveToStorage(response.data);
    return response.data.user;
  }
}
