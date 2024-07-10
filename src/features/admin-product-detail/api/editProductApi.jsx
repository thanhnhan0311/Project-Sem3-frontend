import axiosAdmin from "@/shared/api/axiosAdmin";

import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const onUploadNewImage = async (payload) => {
  const response = await axiosAdmin.post("product/add-images", payload);
  return response.data;
};

export const UploadImageRequest = () => {
  return useMutation({
    mutationFn: onUploadNewImage,
  });
};

const onDeleteImage = async (payload) => {
  const response = await axiosAdmin.delete("product/remove-image", {
    params: {
      imageId: payload.imageId,
    },
  });

  return response.data;
};

export const DeleteImageRequest = () => {
  return useMutation({
    mutationFn: onDeleteImage,
  });
};

const onGetProductAdmin = async (id) => {
  const response = await axiosAdmin.get("product/admin", {
    params: {
      id: id,
    },
  });

  return response.data;
};

export const GetProductAdminDetailRequest = (id) => {
  const query = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return onGetProductAdmin(id);
    },
  });

  return query;
};

const editProduct = async (payload) => {
  const response = await axiosAdmin.put("product/update-product", payload);
  return response;
};

export const EditProductRequest = () => {
  return useMutation({
    mutationFn: editProduct,
  });
};
