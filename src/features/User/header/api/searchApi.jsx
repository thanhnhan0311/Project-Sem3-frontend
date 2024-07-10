import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";

const searchProduct = async (searchValue) => {
  const response = await axiosClient.get("product/search-product", {
    params: {
      searchValue,
    },
  });

  return response.data;
};

export const SearchProductRequest = (searchValue) => {
  return useQuery({
    queryKey: ["search", searchValue],
    queryFn: () => {
      return searchProduct(searchValue);
    },
    retry: 0,
    enabled: searchValue != "",
  });
};
