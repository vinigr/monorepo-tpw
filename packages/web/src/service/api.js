
import axios from "axios";
import AuthService from "./auth";

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

api.interceptors.request.use(async config => {
  const token = AuthService.getToken();
  if (token) {
    config.headers.authorization = token;
  }
  return config;
});

export default api;