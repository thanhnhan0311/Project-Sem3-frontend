import axiosClient from "@/shared/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

const sendRefund = async (payload) => {
  const response = await axiosClient.post("refund", payload);
  return response.data;
};

export const SendRefundRequest = () => {
  return useMutation({
    mutationFn: sendRefund,
  });
};

const sendExchange = async (payload) => {
  const response = await axiosClient.post("exchange", payload);
  return response.data;
};

export const SendExchangeRequest = () => {
  return useMutation({
    mutationFn: sendExchange,
  });
};
