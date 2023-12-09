import axios from "axios";
import { putRefreshToken } from "../authService";

const axiosJwt = axios.create();

axiosJwt.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken") || "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Add a response interceptor
axiosJwt.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await putRefreshToken({
          refreshToken,
        });
        const token = response.data.data.accessToken;

        localStorage.setItem("accessToken", token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosJwt;
