import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";

const getAccountOrder = async (pageNumber, pageSize, active, search) => {
  const response = await axiosClient.get("order/get-customer-order", {
    params: {
      pageNumber,
      pageSize,
      active,
      search,
    },
  });

  return response.data;
};

export const GetAccountOrderRequest = (pageNumber, pageSize, active, search) => {
  return useQuery({
    queryKey: ["customer-order", pageNumber, pageSize, active, search],
    queryFn: () => {
      return getAccountOrder(pageNumber, pageSize, active, search);
    },
    retry: 0,
  });
};
