import axiosAdmin from "@/shared/api/axiosAdmin";
import { useMutation } from "@tanstack/react-query";

const login = async (payload) => {
  const response = await axiosAdmin.post("auth/admin-login", payload);
  return response.data;
};

export const AdminLoginRequest = () => {
  const mutation = useMutation({
    mutationFn: login,
  });

  return mutation;
};
