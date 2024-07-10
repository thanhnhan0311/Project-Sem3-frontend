import axiosClient from "@/shared/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

const createPayment = async (payload) => {
  const respond = await axiosClient.post("cart/CreatePayment", payload);
  return respond.data;
};

export const CreatePaymentRequest = () => {
  return useMutation({ mutationFn: createPayment });
};
