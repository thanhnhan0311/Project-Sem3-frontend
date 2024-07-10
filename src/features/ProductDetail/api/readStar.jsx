import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
const requestStar = async (productId) => {
  const response = await axiosClient.get("review/totalStar", {
    params: { productId },
  });
  return response.data;
};

export function RequestStar(productId) {
  return useQuery({
    queryKey: ["readStar", productId],
    queryFn: () => {
      return requestStar(productId);
    },
  });
}
