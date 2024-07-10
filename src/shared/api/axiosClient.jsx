import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:7279/api/",
});

axiosClient.interceptors.request.use((config) => {
  let token = localStorage.getItem("ACCESS_TOKEN");

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response.status == 401 || response.status == 403) {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  }
);

export default axiosClient;
