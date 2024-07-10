import axiosAdmin from "@/shared/api/axiosAdmin";
import { useQuery } from "@tanstack/react-query";

const getOrderById = async (orderId) => {
  const response = await axiosAdmin.get("order/get-admin-order", { params: { orderId } });
  return response.data;
};

export const GetOrderByIdRequest = (id) => {
  return useQuery({
    queryKey: ["admin-order", id],
    queryFn: () => {
      return getOrderById(id);
    },
  });
};
