import styled from "styled-components";
import { useRef, useEffect } from "react";
import ButtonGroup from "./components/ButtonGroup";
import { MdOutlineDashboard } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { AdminRequest } from "@/shared/api/adminApi";
import { FiShoppingCart } from "react-icons/fi";

const Container = styled.div`
  height: calc(100vh - 3.8rem);
  background-color: #edeff2;

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

const Content = styled.div`
  min-height: calc(100vh - 3.8rem);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledLink = styled(Link)`
  background-color: ${(props) => (props.$active ? "white" : "#edeff2")};
  padding: 5px 35px;
  text-decoration: none;
  color: black;
  font-size: 14px;
  background-color: #e1e2e4;
  &:hover {
    background-color: ${(props) => (props.$active ? "None" : "#eaebed")};
  }

  background-color: ${(props) => (props.$active ? "white" : "#edeff2")};
  box-shadow: ${(props) =>
    props.$active
      ? "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;"
      : "None"};
`;

export default function AdminSideBar() {
  const containerRef = useRef();
  const contentRef = useRef();

  const adminRequest = AdminRequest();

  const location = useLocation();

  useEffect(() => {
    const overflow = containerRef.current.clientHeight - contentRef.current.clientHeight;

    if (overflow != 0) {
      containerRef.current.style.overflowY = "scroll";
    } else {
      containerRef.current.style.overflowY = "hidden";
    }
  });

  return (
    <Container ref={containerRef}>
      <Content ref={contentRef}>
        <ButtonGroup
          link={"dashboard"}
          groupName={"Dashboard"}
          icon={<MdOutlineDashboard />}
        ></ButtonGroup>
        {adminRequest.data.data.roleType.name == "Admin" && (
          <ButtonGroup
            groupName={"Products"}
            icon={<CiShoppingTag />}
            link={"product-list"}
          ></ButtonGroup>
        )}
        {adminRequest.data.data.roleType.name == "Admin" && (
          <ButtonGroup groupName={"Account"} icon={<VscAccount />} active={true}>
            <StyledLink $active={location.pathname.includes("employee")} to={"employee"}>
              Employee
            </StyledLink>
          </ButtonGroup>
        )}
        <ButtonGroup groupName={"Order"} icon={<FiShoppingCart />} active={true}>
          <StyledLink $active={location.pathname.includes("order")} to={"order"}>
            Order
          </StyledLink>
          <StyledLink
            $active={location.pathname.includes("exchange-manage")}
            to={"exchange-manage"}
          >
            Manage Exchange
          </StyledLink>
        </ButtonGroup>
      </Content>
    </Container>
  );
}
