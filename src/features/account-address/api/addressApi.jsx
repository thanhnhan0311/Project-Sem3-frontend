import axiosClient from "@/shared/api/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";

const createAddress = async (payload) => {
  const response = await axiosClient.post("address", payload);
  return response.data;
};

export const CreateAddressRequest = () => {
  return useMutation({
    mutationFn: createAddress,
  });
};

const getUserAddress = async () => {
  const response = await axiosClient.get("address");
  return response.data;
};

export const GetUserAddressRequest = () => {
  return useQuery({
    queryKey: ["address"],
    queryFn: getUserAddress,
    retry: 0,
  });
};

const getUserAddressById = async (addressId) => {
  const response = await axiosClient.get("address/address-by-id", { params: { addressId } });
  return response.data;
};

export const GetUserAddressByIdRequest = (addressId) => {
  return useQuery({
    queryKey: ["address-id", addressId],
    queryFn: () => {
      return getUserAddressById(addressId);
    },
  });
};

const updateAddress = async (payload) => {
  const response = await axiosClient.put("address", payload);
  return response.data;
};

export const UpdateAddressRequest = () => {
  return useMutation({
    mutationFn: updateAddress,
  });
};
