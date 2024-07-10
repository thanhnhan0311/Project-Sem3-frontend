import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
const requestAllReview = async () => {
  const response = await axiosClient.get("review/get-all-review-user");
  return response.data;
};

export function RequestAllReviewByUser() {
  return useQuery({
    queryKey: ["allReviewByUser"],
    queryFn: () => {
      return requestAllReview();
    },
  });
}
