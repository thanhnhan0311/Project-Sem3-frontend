import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
const requestReview = async (productId) => {
  const response = await axiosClient.get("review/checkReview", {
    params: { productId },
  });
  return response.data;
};

export function RequestReview(productId) {
  return useQuery({
    queryKey: ["checkReview", productId],
    queryFn: () => {
      return requestReview(productId);
    },
  });
}
