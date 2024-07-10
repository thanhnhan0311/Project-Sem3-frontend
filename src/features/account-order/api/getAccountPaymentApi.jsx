import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";

const getAccountPayment = async (pageNumber, pageSize) => {
  const response = await axiosClient.get("payment/user-payment", {
    params: {
      pageNumber,
      pageSize,
    },
  });

  return response.data;
};

export const GetAccountOrderPayment = (pageNumber, pageSize) => {
  return useQuery({
    queryKey: ["customer-payment", pageNumber, pageSize],
    queryFn: () => {
      return getAccountPayment(pageNumber, pageSize);
    },
    retry: 0,
  });
};
