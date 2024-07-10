import axiosAdmin from "@/shared/api/axiosAdmin";
import { useMutation, useQuery } from "@tanstack/react-query";

const getRefund = async (pageNumber, pageSize, active) => {
  const response = await axiosAdmin.get("order/order-refund", {
    params: { pageNumber, pageSize, active },
  });
  return response.data;
};

export const GetRefundRequest = (pageNumber, pageSize, active) => {
  return useQuery({
    queryKey: ["refund-order", pageNumber, pageSize, active],
    queryFn: () => {
      return getRefund(pageNumber, pageSize, active);
    },
  });
};

const getExchange = async (pageNumber, pageSize, active) => {
  const response = await axiosAdmin.get("order/exchange", {
    params: { pageNumber, pageSize, active },
  });
  return response.data;
};

export const GetExchangeRequest = (pageNumber, pageSize, active) => {
  return useQuery({
    queryKey: ["exchange-order", pageNumber, pageSize, active],
    queryFn: () => {
      return getExchange(pageNumber, pageSize, active);
    },
  });
};
