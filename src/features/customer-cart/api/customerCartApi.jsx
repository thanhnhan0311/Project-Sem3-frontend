import { useMutation, useQuery } from "@tanstack/react-query";

import axiosClient from "@/shared/api/axiosClient";

const GetCartByUserId = async () => {
  const uri = "https://localhost:7279/api/Cart";
  const response = await axiosClient.get(`${uri}`);
  return response.data;
};
export const GetCartByUserIdQuery = () => {
  const query = useQuery({
    queryKey: ["user-cart"],
    queryFn: () => {
      return GetCartByUserId();
    },
    retry: 0,
  });
  return query;
};

export const UpdateCartById = async (cartId, quanity) => {
  const uri = `https://localhost:7279/api/Cart?cartId=${cartId}&quanity=${quanity}`;
  const response = await axiosClient.put(`${uri}`);
  return response.data;
};

export const UpdateCartByIdRequest = () => {
  const mutation = useMutation({
    mutationFn: UpdateCartById,
  });
  return mutation;
};

export const DeleteCartById = async (payload) => {
  console.log(payload);
  const response = await axiosClient.delete(`Cart`, { params: { cartId: payload.cartId } });
  return response.data;
};

export const DeleteCartByIdMutation = () => {
  const mutation = useMutation({
    mutationFn: DeleteCartById,
  });
  return mutation;
};

const GetTotalAmountByUserId = async () => {
  const response = await axiosClient.get(`Cart/TotalAmount`);
  return response.data;
};

export const GetTotalAmountByUserIdQuery = () => {
  const query = useQuery({
    queryKey: ["cart-totalAmount"],
    queryFn: GetTotalAmountByUserId,
  });
  return query;
};

const PutAllCartChecked = async (payload) => {
  const response = await axiosClient.put(`Cart/UpdateAllCartChecked`, payload);
  return response.data;
};
export const PutAllCartCheckedMutate = () => {
  const mutation = useMutation({
    mutationFn: PutAllCartChecked,
  });
  return mutation;
};
const PutCartCheckedById = async (payload) => {
  const response = await axiosClient.put(`Cart/UpdateCartCheckedById`, payload);
  return response.data;
};
export const PutCartCheckedByIdMutate = () => {
  const mutation = useMutation({
    mutationFn: PutCartCheckedById,
  });
  return mutation;
};
