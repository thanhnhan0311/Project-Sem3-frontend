import axiosAdmin from "@/shared/api/axiosAdmin";
import { useQuery } from "@tanstack/react-query";

const getCatgorySale = async (option) => {
  const response = await axiosAdmin.get("category/get-sale", { params: { option } });
  return response.data;
};

export const GetCategorySaleRequest = (option) => {
  return useQuery({
    queryKey: ["dashboard", "category-pie", option],
    queryFn: () => {
      return getCatgorySale(option);
    },
  });
};

const getMonthlySale = async (year) => {
  const response = await axiosAdmin.get("order/monthly-revenue", { params: { year } });
  return response.data;
};

export const GetMonthlySaleRequest = (year) => {
  return useQuery({
    queryKey: ["dashboard", "monthly-bar", year],
    queryFn: () => {
      return getMonthlySale(year);
    },
  });
};

const getStreamOrderRevenue = async (option) => {
  const response = await axiosAdmin.get("order/stream-revenue", { params: { option } });
  return response.data;
};

export const GetStreamOrderRevenueRequest = (option) => {
  return useQuery({
    queryKey: ["dashboard", "stream-revenue", option],
    queryFn: () => {
      return getStreamOrderRevenue(option);
    },
  });
};

const getStreamNumberOfOrder = async (option) => {
  const response = await axiosAdmin.get("order/stream-order-time", { params: { option } });
  return response.data;
};

export const GetStreamNumberOfOrderRequest = (option) => {
  return useQuery({
    queryKey: ["dashboard", "stream-number-order", option],
    queryFn: () => {
      return getStreamNumberOfOrder(option);
    },
  });
};

const getRecentOrder = async () => {
  const response = await axiosAdmin.get("order/recent-order");
  return response.data;
};

export const GetRecentOrderRequest = () => {
  return useQuery({
    queryKey: ["recent-order"],
    queryFn: () => {
      return getRecentOrder();
    },
  });
};

const getOrderDashBoard = async () => {
  const response = await axiosAdmin.get("order/order-dashboard");
  return response.data;
};

export const GetOrderDashBoardRequest = () => {
  return useQuery({
    queryKey: ["order-dashboard"],
    queryFn: () => {
      return getOrderDashBoard();
    },
  });
};
