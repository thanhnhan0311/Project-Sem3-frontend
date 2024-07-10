import axiosAdmin from "@/shared/api/axiosAdmin";

import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const onGetAminProducts = async (pageNumber, pageSize, categoryId, searchValue, filterOption) => {
  let categoryStr = "";
  categoryId.forEach((item) => (categoryStr += `&categoryId=${item}`));

  const response = await axiosAdmin.get(
    `product/admin-products?pageNumber=${pageNumber}&pageSize=${pageSize}${categoryStr}&searchValue=${searchValue}&filterOption=${filterOption}`
  );

  return response.data;
};

export const GetAdminProductRequest = (
  pageNumber,
  pageSize,
  categoryId,
  searchValue,
  filterOption
) => {
  const query = useQuery({
    queryKey: ["admin-product", pageNumber, pageSize, categoryId, searchValue, filterOption],
    queryFn: () => {
      return onGetAminProducts(pageNumber, pageSize, categoryId, searchValue, filterOption);
    },
  });

  return query;
};

const updateVariants = async (payload) => {
  const response = await axiosAdmin.put("product/update-variants", payload);
  return response.data;
};

export const UpdateVariantRequest = () => {
  return useMutation({
    mutationFn: updateVariants,
  });
};

const DeleteReview = async (reviewId) => {
  const response = await axiosAdmin.delete("review/delete-review", { params: { reviewId } });

  return response.data;
};

export const DeleteReviewRequest = () => {
  return useMutation({
    mutationFn: DeleteReview,
  });
};
