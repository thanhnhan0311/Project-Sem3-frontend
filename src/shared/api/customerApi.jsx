import axiosClient from "./axiosClient";
import { useQuery } from "@tanstack/react-query";

const customer = async () => {
  const response = await axiosClient.get("auth/customer");
  return response.data;
};

export const CustomerRequest = () => {
  const query = useQuery({
    queryKey: ["customer"],
    queryFn: customer,
    retry: 0,
  });

  return query;
};
