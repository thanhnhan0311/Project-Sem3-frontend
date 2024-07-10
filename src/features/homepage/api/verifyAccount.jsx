import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const verifyAccount = async (payload) => {
  const customAxios = axios.create({
    baseURL: "https://localhost:7279/api/",
  });

  customAxios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${payload.token}`;
    return config;
  });

  const response = await customAxios.put(`auth/verify`, {});
  return response.data;
};

export const VerifyAccountFn = () => {
  return useMutation({
    mutationFn: verifyAccount,
  });
};
