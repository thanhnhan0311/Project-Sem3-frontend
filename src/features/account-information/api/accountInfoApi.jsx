import axiosClient from "@/shared/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

const changeAvatar = async (payload) => {
  const response = await axiosClient.post("user/change-image", payload);

  return response.data;
};

export const ChangeAvatarRequest = () => {
  return useMutation({
    mutationFn: changeAvatar,
  });
};

const editUserInfo = async (payload) => {
  const response = await axiosClient.post("user/change-info", payload);
  return response.data;
};

export const EditUserInfoRequest = () => {
  return useMutation({
    mutationFn: editUserInfo,
  });
};
