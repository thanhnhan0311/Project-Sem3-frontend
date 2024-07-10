import axiosClient from "@/shared/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

const requestRating = async (paload) => {
  const response = await axiosClient.post("review", paload);
  return response.data;
};

export function RequestRating() {
  return useMutation({
    mutationFn: requestRating,
  });
}
