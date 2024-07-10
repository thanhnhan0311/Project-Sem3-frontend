import axiosClient from "./axiosClient";
import { useQuery } from "@tanstack/react-query";

const readType = async () => {
  const response = await axiosClient.get("type");

  return response.data;
};

export const ReadTypeRequest = () => {
  const query = useQuery({
    queryKey: ["types"],
    queryFn: readType,
  });

  return query;
};
