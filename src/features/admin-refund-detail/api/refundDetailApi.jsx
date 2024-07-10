import axiosAdmin from "@/shared/api/axiosAdmin";
import { useMutation, useQuery } from "@tanstack/react-query";

const getRefundById = async (refundId) => {
  const response = await axiosAdmin.get("refund/get-refund", { params: { refundId } });
  return response.data;
};

export const GetRefundByIdRequest = (refundId) => {
  return useQuery({
    queryKey: ["refund-detail", refundId],
    queryFn: () => {
      return getRefundById(refundId);
    },
  });
};

const editRefund = async (payload) => {
  const response = await axiosAdmin.put("refund", payload);
  return response.data;
};

export const EditRefundRequest = () => {
  return useMutation({
    mutationFn: editRefund,
  });
};
