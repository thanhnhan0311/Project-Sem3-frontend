import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
const requestAllReview = async (productId, pageNumber, pageSize, star, search) => {
  const response = await axiosClient.get("review/allReview", {
    params: { productId, pageNumber, pageSize, star, search },
  });
  return response.data;
};

export function RequestAllReview(productId, pageNumber, pageSize, star, search) {
  return useQuery({
    queryKey: ["allReview", productId, pageNumber, pageSize, star, search],
    queryFn: () => {
      return requestAllReview(productId, pageNumber, pageSize, star, search);
    },
  });
}
