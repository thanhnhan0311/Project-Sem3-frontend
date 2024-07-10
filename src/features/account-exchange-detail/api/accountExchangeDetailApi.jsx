import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";

const getUserExchangeDetail = async (exchangeId) => {
  const response = await axiosClient.get("exchange/user-exchange-by-id", {
    params: { exchangeId },
  });
  return response.data;
};

export const GetUserExchangeDetailRequest = (exchangeId) => {
  return useQuery({
    queryKey: ["user-exchange", exchangeId],
    queryFn: () => {
      return getUserExchangeDetail(exchangeId);
    },
  });
};
