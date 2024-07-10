import { useQuery } from "@tanstack/react-query";
import axiosAdmin from "./axiosAdmin";

const getCustomerIds = async () => {
  const response = await axiosAdmin.get("user/customer-ids");
  return response.data;
};

export const GetCustomerIdsRequest = () => {
  return useQuery({
    queryKey: ["ids"],
    queryFn: getCustomerIds,
  });
};
