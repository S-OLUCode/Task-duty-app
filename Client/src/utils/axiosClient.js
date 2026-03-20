import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;

const axiosClient = axios.create({
  baseURL: BASEURL + "/api/v1",
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;