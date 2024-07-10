import React from "react";
import styled from "styled-components";
import Avatar from "react-avatar";
import { FaUser, FaEye, FaMoneyBillWave, FaHeadphonesAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import {
  MdAssignmentReturn,
  MdOutlineBorderColor,
  MdOutlinePayment,
  MdReviews,
  MdFavorite,
} from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import { IoStarHalfOutline } from "react-icons/io5";
import { FaBook } from "react-icons/fa6";
import { CustomerRequest } from "@/shared/api/customerApi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 90%;
`;

const WrapItemAvatar = styled.div`
  font-size: 13px;
  cursor: pointer;
  display: flex;

  padding: 0.5rem 0;

  > div:nth-of-type(1) {
    width: 3rem;
    display: flex;
    justify-content: center;
  }
`;
const StyledAvatarText = styled.div`
  font-size: 1rem;
  color: black;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;
const StyledSpan = styled.p`
  font-size: 13px;
  color: gray;
`;
const WrapItem = styled(Link)`
  font-size: 13px;
  cursor: pointer;
  display: flex;
  color: #551a99;

  align-items: center;
  padding: 0.5rem 0;

  > div {
    width: 3rem;
    display: flex;
    justify-content: center;

    > svg {
      width: 1.4rem;
      height: 1.4rem;
      color: rgba(0, 0, 0, 0.4);
    }
  }

  &:hover {
    background-color: #ebebf0;
  }

  background-color: ${(props) => (props.$active ? "#ebebf0" : "")};
  color: ${(props) => (props.$active ? "red" : "")};

  > span {
    padding-left: 10px;
  }
`;

export default function AccountDetailSideBar({ data }) {
  const customerRequest = CustomerRequest();
  const location = useLocation();

  return (
    <Container>
      <WrapItemAvatar>
        <div>
          <Avatar
            src={import.meta.env.VITE_API_IMAGE_PATH + data.avatar}
            name={data.fullname}
            round
            size="2.4rem"
          />
        </div>
        <StyledAvatarText>
          <StyledSpan>Account of</StyledSpan> {data.fullname}
        </StyledAvatarText>
      </WrapItemAvatar>
      <WrapItem
        $active={location.pathname.includes("account-information")}
        to={"account-information"}
      >
        <div>
          <FaUser />
        </div>
        <span>Account information</span>
      </WrapItem>
      <WrapItem $active={location.pathname.includes("order")} to={"order"}>
        <div>
          <MdOutlineBorderColor />
        </div>
        <span>Order Management</span>
      </WrapItem>
      <WrapItem $active={location.pathname.includes("manage-exchange")} to="manage-exchange">
        <div>
          <MdAssignmentReturn />
        </div>
        <span>Manage returns</span>
      </WrapItem>
      <WrapItem to="address" $active={location.pathname.includes("address")}>
        <div>
          <GiPositionMarker />
        </div>
        <span>Address book</span>
      </WrapItem>
      <WrapItem $active={location.pathname.includes("account-review")} to="account-review">
        <div>
          <MdReviews />
        </div>
        <span>Product Reviews</span>
      </WrapItem>
    </Container>
  );
}
