import axiosClient from "@/shared/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

const getNewstProduct = async () => {
  const response = await axiosClient.get("product/get-newest");
  return response.data;
};

export const GetNewestProductRequest = () => {
  return useQuery({
    queryKey: ["newest"],
    queryFn: getNewstProduct,
    retry: 0,
  });
};

const getBestSeller = async () => {
  const response = await axiosClient.get("product/get-best-seller");
  return response.data;
};

export const GetBestSellerRequest = () => {
  return useQuery({
    queryKey: ["best-seller"],
    queryFn: getBestSeller,
    retry: 0,
  });
};

const getProductSuggestion = async (pageNumber, pageSize) => {
  const response = await axiosClient("product/get-suggestion", {
    params: {
      pageNumber,
      pageSize,
    },
  });
  return response.data;
};

export const GetProductSuggestionRequest = (pageSize) => {
  return useInfiniteQuery({
    queryKey: ["suggestion", pageSize],
    queryFn: ({ pageParam = 1 }) => {
      return getProductSuggestion(pageParam, pageSize);
    },
    intialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext == true) {
        return lastPage.currentPage + 1;
      } else {
        return null;
      }
    },
    retry: 0,
  });
};
