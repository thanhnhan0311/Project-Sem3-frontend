import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import Test from "@/features/test/Index";
import AdminLayout from "./layout/AdminLayout";
import AdminDashBoard from "@/features/admin-dashboard/Index";
import AdminProductList from "@/features/admin-product-list/Index";
import AdminProductNew from "@/features/admin-product-new/Index";
import AdminLogin from "@/features/admin-login/Index";
import Employee from "@/features/employee/Index";
import ListingPage from "@/features/listing-page/ListingPage";
import AdminProductDetail from "@/features/admin-product-detail/Index";
import Cart from "@/features/customer-cart/Index";
import ProductDetail from "@/features/ProductDetail/Index";
import Account from "@/features/account/Index";
import AccountInformation from "@/features/account-information/Index";
import AccountAddress from "@/features/account-address/AccountAddress";
import CustomerPayment from "@/features/customer-payment/Index";
import AdminOrder from "@/features/admin-order/Index";
import AdminOrderDetail from "@/features/admin-order-detail/Index";
import AccountOrder from "@/features/account-order/Index";
import AccountOrderDetail from "@/features/account-order-detail/Index";
import AccountExchangeRequest from "@/features/account-exchange-request/Index";
import AccountManageExchange from "@/features/account-manage-exchange/Index";
import Homepage from "@/features/homepage/Index";
import AdminExchangeManage from "@/features/admin-exchange-manage/Index";
import AboutUs from "@/features/aboutUs-FAQ/AboutUs";
import FAQ from "@/features/aboutUs-FAQ/FAQ";
import PurchasePay from "@/features/aboutUs-FAQ/PurchasePay";
import Warranty from "@/features/aboutUs-FAQ/Warranty";
import InforPrivacy from "@/features/aboutUs-FAQ/InforPrivacy";
import Return from "@/features/aboutUs-FAQ/Return";
import AdminRefundDetail from "@/features/admin-refund-detail/Index";
import AdminExchangeDetail from "@/features/admin-exchange-detail/Index";
import AccountReview from "@/features/account-review/Index";
import AccountRefundDetail from "@/features/account-refund-detail/Index";
import AccountExchangeDetail from "@/features/account-exchange-detail/Index";
import PageNotFound from "@/features/page-error/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "productdetail",
        element: <ProductDetail />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "FAQ",
        element: <FAQ />,
      },
      {
        path: "purchase-payment",
        element: <PurchasePay />,
      },
      {
        path: "warranty",
        element: <Warranty />,
      },
      {
        path: "return",
        element: <Return />,
      },
      {
        path: "privacy",
        element: <InforPrivacy />,
      },
      {
        path: "account",
        element: <Account />,
        children: [
          {
            path: "account-information",
            element: <AccountInformation />,
          },
          {
            path: "address",
            element: <AccountAddress />,
          },
          {
            path: "order",
            element: <AccountOrder />,
          },
          {
            path: "order-detail",
            element: <AccountOrderDetail />,
          },
          {
            path: "exchange-request",
            element: <AccountExchangeRequest />,
          },
          {
            path: "manage-exchange",
            element: <AccountManageExchange />,
          },
          {
            path: "account-review",
            element: <AccountReview />,
          },
          {
            path: "account-refund-detail",
            element: <AccountRefundDetail />,
          },
          {
            path: "account-exchange-detail",
            element: <AccountExchangeDetail />,
          },
        ],
      },
      {
        path: "listing-page",
        element: <ListingPage />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "payment",
        element: <CustomerPayment />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashBoard />,
      },
      {
        path: "",
        element: <AdminDashBoard />,
      },
      {
        path: "product-list",
        element: <AdminProductList />,
      },
      {
        path: "product-new",
        element: <AdminProductNew />,
      },
      {
        path: "employee",
        element: <Employee />,
      },
      {
        path: "product",
        element: <AdminProductDetail />,
      },
      {
        path: "order",
        element: <AdminOrder />,
      },
      { path: "order-detail", element: <AdminOrderDetail /> },
      { path: "exchange-manage", element: <AdminExchangeManage /> },
      { path: "refund-detail", element: <AdminRefundDetail /> },
      { path: "exchange-detail", element: <AdminExchangeDetail /> },
    ],
  },
  {
    path: "admin-login",
    element: <AdminLogin />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
