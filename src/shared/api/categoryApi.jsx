import axiosClient from "./axiosClient";
import { useQuery } from "@tanstack/react-query";

const readCategory = async () => {
  const response = await axiosClient.get("category");

  return response.data;
};

export const ReadCategoryRequest = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: readCategory,
  });

  return query;
};
