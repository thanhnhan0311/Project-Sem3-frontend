import axiosClient from "@/shared/api/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";

const onCreateCustomer = async (payload) => {
  const response = await axiosClient.post("user/create-customer", payload);
  return response.data;
};

export const CreateCustomerRequest = () => {
  const mutation = useMutation({
    mutationFn: onCreateCustomer,
  });

  return mutation;
};
