import axiosClient from "@/shared/api/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";

const getOrderDetail = async (orderId) => {
  const response = await axiosClient.get("order/get-customer-order-detail", {
    params: {
      orderId,
    },
  });

  return response.data;
};

export const GetOrderDetailRequest = (orderId) => {
  return useQuery({
    queryKey: ["user-order-detail", orderId],
    queryFn: () => {
      return getOrderDetail(orderId);
    },
  });
};

const cancelOrder = async (payload) => {
  const response = await axiosClient.post("order/cancel-order", payload);

  return response.data;
};

export const CancelOrderRequest = () => {
  return useMutation({
    mutationFn: cancelOrder,
  });
};
