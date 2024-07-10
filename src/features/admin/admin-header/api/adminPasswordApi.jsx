import axiosAdmin from "@/shared/api/axiosAdmin";
import { useMutation } from "@tanstack/react-query";

const changePassword = async (payload) => {
  const response = await axiosAdmin.put("user/change-password", payload);
  return response.data;
};

export const ChangePasswordRequest = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};
