import axiosClient from "@/shared/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

const onLoginRequest = async (payload) => {
  const response = await axiosClient.post("auth/customer-login", payload);
  return response.data;
};

export const LoginRequest = () => {
  const mutation = useMutation({
    mutationFn: onLoginRequest,
  });

  return mutation;
};
