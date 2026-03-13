import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;

const axiosClient = axios.create({
  baseURL: BASEURL + "/api/v1",
  withCredentials: true,
});

export default axiosClient;