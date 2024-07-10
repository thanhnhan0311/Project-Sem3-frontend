import axios from "axios";

const axiosAdmin = axios.create({
  baseURL: "https://localhost:7279/api/",
});

axiosAdmin.interceptors.request.use((config) => {
  let token = localStorage.getItem("ADMIN_ACCESS_TOKEN");

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosAdmin.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response.status == 401 || response.status == 403) {
      localStorage.removeItem("ADMIN_ACCESS_TOKEN");
    }
  }
);

export default axiosAdmin;
