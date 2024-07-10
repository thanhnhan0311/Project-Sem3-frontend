import axiosClient from "@/shared/api/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

const onGetProduct = async (id) => {
  const response = await axiosClient.get("product", {
    params: {
      id: id,
    },
  });

  return response.data;
};

export const GetProductDetailRequest = (id) => {
  const query = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return onGetProduct(id);
    },
  });

  return query;
};

const onGetProductVariantDetail = async (id) => {
  const response = await axiosClient.get("product/product-variant", {
    params: {
      id: id,
    },
  });
  return response.data;
};

export const GetProductVariantDetailRequest = (id) => {
  const query = useQuery({
    queryKey: ["product-variant", id],
    queryFn: () => {
      return onGetProductVariantDetail(id);
    },
  });
  return query;
};

const createCartItem = async (payload) => {
  const response = await axiosClient.post("cart", payload);
  return response.data;
};

export const CreateCartItemRequest = () => {
  return useMutation({
    mutationFn: createCartItem,
  });
};

const getRelatedProduct = async (categoryId, excludedId, pageNumber, pageSize) => {
  const response = await axiosClient("product/category-suggestion", {
    params: {
      categoryId,
      excludedId,
      pageNumber,
      pageSize,
    },
  });
  return response.data;
};

export const GetRelatedProductRequest = (categoryId, excludedId, pageSize) => {
  return useInfiniteQuery({
    queryKey: ["related", categoryId, excludedId, pageSize],
    queryFn: ({ pageParam = 1 }) => {
      return getRelatedProduct(categoryId, excludedId, pageParam, pageSize);
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
