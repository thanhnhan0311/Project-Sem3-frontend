import axiosAdmin from "@/shared/api/axiosAdmin";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

const getExchangeById = async (exchangeId) => {
  const response = await axiosAdmin.get("exchange/exchange-by-id", { params: { exchangeId } });
  return response.data;
};

export const GetExchangeById = (exchangeId) => {
  return useQuery({
    queryKey: ["exchange-admin", exchangeId],
    queryFn: () => {
      return getExchangeById(exchangeId);
    },
  });
};

const editExchange = async (payload) => {
  const response = await axiosAdmin.put("exchange", payload);
  return response.data;
};

export const EditExchangeRequest = () => {
  return useMutation({
    mutationFn: editExchange,
  });
};
