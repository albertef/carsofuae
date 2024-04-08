import axios from "axios";
import store from "@/store";

const BASE_URL = "//";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.data = config.data || {};
    const jwt = localStorage.getItem("login_info")
      ? JSON.parse(localStorage.getItem("login_info"))
      : "";
    config.headers["Authorization"] = `Bearer ${jwt && jwt.jwtToken}`;
    updateLoader(true);
    return config;
  },
  (error) => {
    updateLoader(false);
    console.error(error);
    return false;
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    updateLoader(false);
    return response.data ? response.data : {};
  },
  (error = {}) => {
    updateLoader(false);
    console.error(error);
    return false;
  }
);

function updateLoader(flag) {
  store.commit("updateLoader", flag);
}
