import axiosAdmin from "@/shared/api/axiosAdmin";
import { useMutation, useQuery } from "@tanstack/react-query";
import qs from "qs";

const getAdminOrders = async (
  pageNumber,
  pageSize,
  active,
  orderId,
  customer,
  category,
  productCode,
  payment,
  paymentCode,
  delivery,
  from,
  to,
  fromDate,
  toDate
) => {
  const response = await axiosAdmin.get("order/admin-orders", {
    params: {
      pageNumber,
      pageSize,
      active,
      orderId,
      customer,
      category,
      productCode,
      payment,
      paymentCode,
      delivery,
      from,
      to,
      fromDate,
      toDate,
    },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data;
};

export const GetAdminOrderRequest = (
  pageNumber,
  pageSize,
  active,
  orderId,
  customer,
  category,
  productCode,
  payment,
  paymentCode,
  delivery,
  from,
  to,
  fromDate,
  toDate
) => {
  return useQuery({
    queryKey: [
      "admin-orders",
      pageNumber,
      pageSize,
      active,
      orderId,
      customer,
      category,
      productCode,
      payment,
      paymentCode,
      delivery,
      from,
      to,
      fromDate,
      toDate,
    ],
    queryFn: () => {
      return getAdminOrders(
        pageNumber,
        pageSize,
        active,
        orderId,
        customer,
        category,
        productCode,
        payment,
        paymentCode,
        delivery,
        from,
        to,
        fromDate,
        toDate
      );
    },
    retry: 0,
  });
};

const acceptOrder = async (payload) => {
  const response = await axiosAdmin.post("order/accept-order", payload);
  return response.data;
};

export const AcceptOrderRequest = () => {
  return useMutation({
    mutationFn: acceptOrder,
  });
};

const denyOrder = async (payload) => {
  const response = await axiosAdmin.post("order/deny-order", payload);
  return response.data;
};

export const DenyOrderRequest = () => {
  return useMutation({
    mutationFn: denyOrder,
  });
};

const deliveryOrder = async (payload) => {
  const response = await axiosAdmin.post("order/delivery-order", payload);
  return response.data;
};

export const DeliveryOrderRequest = () => {
  return useMutation({
    mutationFn: deliveryOrder,
  });
};

const finishOrder = async (payload) => {
  const response = await axiosAdmin.post("order/finish-order", payload);
  return response.data;
};

export const FinishOrderRequest = () => {
  return useMutation({
    mutationFn: finishOrder,
  });
};

const getReport = async (payload) => {
  const response = await axiosAdmin.post("order/FileResult", payload);
  return response.data;
};

export const GetReportRequest = () => {
  return useMutation({ mutationFn: getReport });
};
