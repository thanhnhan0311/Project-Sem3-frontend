import axiosClient from "@/shared/api/axiosClient";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const readCustomerProducts = async (
  categoryId,
  pageSize,
  pageNumber,
  sort,
  searchValue,
  priceRangeMin,
  priceRangeMax,
  ratingStar
) => {
  const paramObject = {
    categoryId: categoryId,
    pageSize: pageSize,
    pageNumber: pageNumber,
    sort: sort,
    searchValue: searchValue,
    ratingStar: ratingStar,
  };
  if (priceRangeMin) {
    paramObject.priceRangeMin = priceRangeMin;
  }
  if (priceRangeMax) {
    paramObject.priceRangeMax = priceRangeMax;
  }
  const response = await axiosClient.get("product/listing-page", {
    params: paramObject,
  });

  return response.data;
};

export const ReadCustomerProductsRequest = (
  categoryId,
  pageSize,
  sort,
  searchValue,
  priceRangeMin,
  priceRangeMax,
  ratingStar
) => {
  const query = useInfiniteQuery({
    queryKey: [
      "CustomerProducts",
      categoryId,
      pageSize,
      sort,
      searchValue,
      priceRangeMin,
      priceRangeMax,
      ratingStar,
    ],
    queryFn: ({ pageParam = 1 }) => {
      return readCustomerProducts(
        categoryId,
        pageSize,
        pageParam,
        sort,
        searchValue,
        priceRangeMin,
        priceRangeMax,
        ratingStar
      );
    },
    intialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext == true) {
        return lastPage.currentPage + 1;
      } else {
        return null;
      }
    },
  });

  return query;
};
