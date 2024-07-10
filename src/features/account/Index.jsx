import React from "react";
import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import AccountDetailSideBar from "./components/AccountDetailSideBar";
import { CustomerRequest } from "@/shared/api/customerApi";
import { useNavigate } from "react-router-dom";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import { useLocation } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const Container = styled.div`
  width: 1280px;
  padding: 15px;
  margin: 1rem auto;
  min-height: 40rem;
`;

const BreadCrumb = styled.div`
  padding: 10px 10px;
  display: flex;
  align-items: center;

  > span {
    color: rgba(0, 0, 0, 0.5);
  }

  > svg {
    margin-right: 5px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 1rem;
  margin: 1rem 0;
`;

const StyledLink = styled(Link)`
  color: #551a99;
`;

const OutletContainter = styled.div``;

export default function Account() {
  const connection = useOutletContext();
  const customerRequest = CustomerRequest();
  const location = useLocation();

  const navigate = useNavigate();

  if (customerRequest.isLoading) {
    return <WaitingPopUp />;
  }

  if (customerRequest.isError) {
    navigate("/");
    return;
  }

  return (
    <Container>
      <BreadCrumb>
        <StyledLink to={"/"}>Home</StyledLink> <FaAngleRight />
        {location.pathname.includes("account-information") && (
          <StyledLink to={"/account/account-information"}>Account</StyledLink>
        )}
        {(location.pathname.includes("manage-exchange") ||
          location.pathname.includes("account-exchange-detail") ||
          location.pathname.includes("account-refund-detail")) && (
          <StyledLink onClick={(ev) => ev.preventDefault()}>Manage Returns</StyledLink>
        )}
        {location.pathname.includes("account-review") && (
          <StyledLink onClick={(ev) => ev.preventDefault()}>Product Reviews</StyledLink>
        )}
        {(location.pathname.includes("order") ||
          location.pathname.includes("exchange-request")) && (
          <StyledLink to={"/account/order"}>Order Management</StyledLink>
        )}
        {location.pathname.includes("address") && (
          <StyledLink to={"/account/address"}>Address</StyledLink>
        )}
        {location.pathname.includes("order-detail") && (
          <>
            <FaAngleRight />
            <StyledLink onClick={(ev) => ev.preventDefault()}>My Order</StyledLink>
          </>
        )}
        {location.pathname.includes("exchange-request") && (
          <>
            <FaAngleRight />
            <StyledLink onClick={(ev) => ev.preventDefault()}>Exchage Request</StyledLink>
          </>
        )}
      </BreadCrumb>
      <Content>
        <AccountDetailSideBar data={customerRequest.data.data} />
        <OutletContainter>
          <Outlet context={connection} />
        </OutletContainter>
      </Content>
    </Container>
  );
}
