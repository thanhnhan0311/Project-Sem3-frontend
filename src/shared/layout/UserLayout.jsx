import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import WebFont from "webfontloader";
import UserNavbar from "@/features/User/header/Index";
import Footer from "@/features/User/footer/Index";
import { ReadCategoryRequest } from "../api/categoryApi";
import { ReadTypeRequest } from "../api/typeApi";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { CustomerRequest } from "../api/customerApi";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { FaCircleArrowUp } from "react-icons/fa6";

const Container = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: rgb(245, 245, 250);
  min-width: 1280px;
`;

const OutletContainer = styled.div``;

export default function UserLayout() {
  const readCategoryRequest = ReadCategoryRequest();
  const readTypeRequest = ReadTypeRequest();
  const [connection, setConnection] = useState();
  const customerRequest = CustomerRequest();

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

  if (readCategoryRequest.isSuccess) {
    localStorage.setItem("categories", JSON.stringify(readCategoryRequest.data.data));
  }

  if (readTypeRequest.isSuccess) {
    localStorage.setItem("types", JSON.stringify(readTypeRequest.data.data));
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins", "Open Sans"],
      },
    });
  }, []);

  useEffect(() => {
    if (customerRequest.isSuccess && customerRequest.data.data != null) {
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
            await conn.invoke("UserJoinRoom", { UserId: customerRequest.data.data.id });
          } catch (e) {
            console.log(e);
          }

          conn.on("ReceiveMessageUser", (message) => {
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
  }, [customerRequest.status, customerRequest.data?.data?.id]);

  return (
    <Container>
      <UserNavbar />
      <OutletContainer>
        <Outlet context={connection} />
      </OutletContainer>
      <BackToTopButton />
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
      <Footer />
    </Container>
  );
}

const TopButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 50px;

  color: white;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  z-index: 1000;

  & svg {
    font-size: 1.8rem;
    color: #0057a0;
  }
`;

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <TopButton onClick={scrollToTop}>
          <FaCircleArrowUp />
        </TopButton>
      )}
    </div>
  );
}
