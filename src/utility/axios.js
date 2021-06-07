import axios from "axios";

import store from "@/store";

const BASE_URL = "//";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.data = config.data || {};
    updateLoader(true);
    return config;
  },
  (error) => {
    Common.showAlertMessage(networkErrorMessage, "error");
    console.error(error);
    return false;
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    updateLoader(false);
    if (response.status >= 200 && response.status <= 299 && !response.data.errors) {
      const responseData = response.data ? response.data : {};
      return {
        status: true,
        data: responseData,
      };
    } else {
      const error = response.data.errors ? response.data.errors.message : networkErrorMessage;
      Common.showAlertMessage(error, "error");
      return getErrorMessage(error);
    }
  },
  (error = {}) => {
    updateLoader(false);
    console.error(error);
    const response = error.response ? error.response : {};
    return getErrorMessage(networkErrorMessage);
  }
);

function updateLoader(flag) {
  store.commit("updateLoader", flag);
}
