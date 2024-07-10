import React from "react";
import styled, { keyframes } from "styled-components";
import { useRef } from "react";
import { useEffect } from "react";
import AdminSideBar from "../../admin-sidebar/Index";

const Layout = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3) !important;
  display: flex;
  align-items: center;
  z-index: 99999;
`;

function PopUp({ className, children, action }) {
  const popUpRef = useRef();

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  });

  const onClick = (ev) => {
    if (!popUpRef.current.contains(ev.target)) {
      action();
    }
  };

  return (
    <Layout className="layout" onClick={onClick}>
      <PopUpBox useRef={popUpRef} className={className} children={children} />
    </Layout>
  );
}

const Container = styled.div`
  background-color: #edeff2;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  width: 240px;
  height: 100vh;
`;

const PopUpBox = ({ className, children, useRef }) => {
  return (
    <Container ref={useRef} className={className}>
      {children}
    </Container>
  );
};

export default function SideBarPopUp({ action }) {
  return (
    <PopUp action={action}>
      <AdminSideBar />
    </PopUp>
  );
}
