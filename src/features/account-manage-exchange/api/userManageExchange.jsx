import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";

const getUserRefundExchange = async (pageNumber, pageSize, active) => {
  const response = await axiosClient.get("order/user-exchange", {
    params: { pageNumber, pageSize, active },
  });
  return response.data;
};

export const GetUserRefundExchangeRequest = (pageNumber, pageSize, active) => {
  return useQuery({
    queryKey: ["user-exchange-refund", pageNumber, pageSize, active],
    queryFn: () => {
      return getUserRefundExchange(pageNumber, pageSize, active);
    },
  });
};
