import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";

const getCartQuantity = async () => {
  const response = await axiosClient.get("cart/quantity");
  return response.data;
};

export const GetCartQuantityRequest = () => {
  return useQuery({
    queryKey: ["cart-quantity"],
    queryFn: getCartQuantity,
    retry: 0,
  });
};
