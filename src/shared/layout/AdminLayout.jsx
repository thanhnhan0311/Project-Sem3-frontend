import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import WebFont from "webfontloader";
import AdminHeader from "@/features/admin/admin-header/Index";
import AdminSideBar from "@/features/admin/admin-sidebar/Index";
import { ReadCategoryRequest } from "../api/categoryApi";
import { ReadTypeRequest } from "../api/typeApi";
import { AdminRequest } from "../api/adminApi";
import WaitingPopUp from "../components/PopUp/WaitingPopUp";
import { useNavigate } from "react-router-dom";
import { GetCustomerIdsRequest } from "../api/customerIdsApi";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import XButton from "../components/Button/XButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const OutletContainer = styled.div`
  height: calc(100vh - 3.8rem);
  overflow-y: scroll;
  background-color: #f3f4f6;

  &::-webkit-scrollbar-track {
    background-color: none;
  }

  &::-webkit-scrollbar {
    width: 4px;
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(205, 205, 207);
  }
`;

const AdminBody = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;

  @media (max-width: 1400px) {
    grid-template-columns: 0px 1fr;
  }
`;

export default function AdminLayout() {
  const getCustomerIdsRequest = GetCustomerIdsRequest();
  const adminRequest = AdminRequest();
  const readCategoryRequest = ReadCategoryRequest();
  const readTypeRequest = ReadTypeRequest();
  const [connection, setConnection] = useState();

  const notify = (message) =>
    toast.info(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  const navigate = useNavigate();

  if (readCategoryRequest.isSuccess) {
    localStorage.setItem("categories", JSON.stringify(readCategoryRequest.data.data));
  }

  if (readTypeRequest.isSuccess) {
    localStorage.setItem("types", JSON.stringify(readTypeRequest.data.data));
  }

  useEffect(() => {
    if (getCustomerIdsRequest.isSuccess && getCustomerIdsRequest.data.data != null) {
      const startConnection = async () => {
        if (connection) {
          await connection.stop();
        }

        const conn = new HubConnectionBuilder()
          .withUrl("https://localhost:7279/notification")
          .configureLogging(LogLevel.Information)
          .build();

        try {
          await conn.start();

          try {
            for (let id of getCustomerIdsRequest.data.data) {
              await conn.invoke("AdminJoinRoom", { UserId: id });
            }
          } catch (e) {
            console.log(e);
          }

          conn.on("ReceiveMessageAdmin", (message) => {
            notify(message);
          });

          setConnection(conn);
        } catch (error) {
          console.error("some thing went wrong");
        }
      };

      startConnection();
    }

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [getCustomerIdsRequest.status]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins", "Open Sans"],
      },
    });
  }, []);

  if (adminRequest.isLoading) {
    return <WaitingPopUp />;
  }

  if (adminRequest.isError) {
    navigate("/admin-login");
    return;
  }

  if (adminRequest.isSuccess) {
    if (adminRequest.data.status == 400) {
      navigate("/admin-login");
    } else {
      return (
        <Container>
          <AdminHeader />
          <AdminBody>
            <AdminSideBar />
            <OutletContainer>
              <Outlet context={connection} />
            </OutletContainer>
          </AdminBody>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition:Bounce
          />
        </Container>
      );
    }
  }
}
