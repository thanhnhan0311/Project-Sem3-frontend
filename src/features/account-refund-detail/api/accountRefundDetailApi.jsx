import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";

const getUserRefundDetail = async (refundId) => {
  const response = await axiosClient.get("refund/get-user-refund", { params: { refundId } });
  return response.data;
};

export const GetUserRefundDetailRequest = (refundId) => {
  return useQuery({
    queryKey: ["user-refund", refundId],
    queryFn: () => {
      return getUserRefundDetail(refundId);
    },
  });
};
