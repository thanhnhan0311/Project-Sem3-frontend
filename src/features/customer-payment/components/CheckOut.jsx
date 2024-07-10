import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import dchc from "@/shared/data/dchc";
import ChangeAddressPopUp from "@/features/customer-cart/components/ChangeAddressPopUp";
import formatDollar from "@/shared/utils/FormatDollar";
import { Link, useNavigate } from "react-router-dom";
import { FaDollarSign } from "react-icons/fa6";
import CardPopUp from "./CardPopUp";
import { useSearchParams } from "react-router-dom";
import { CreatePaymentRequest } from "../api/CustomerPaymentAPI";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import { useQueryClient } from "@tanstack/react-query";
import { CustomerRequest } from "@/shared/api/customerApi";
import { useOutletContext } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
`;

const AddressContainer = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;

  > div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    > span:nth-of-type(1) {
      font-size: 15px;
      color: rgba(0, 0, 0, 0.7);
    }

    > span:nth-of-type(2) {
      color: #2578ff;
      cursor: pointer;
      font-size: 13px;
    }
  }

  > div:nth-of-type(2) {
    margin-top: 15px;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    gap: 5px;
    font-family: "Open Sans";
  }

  > div:nth-of-type(3) {
    font-family: "Open Sans";
    color: rgba(0, 0, 0, 0.6);
  }
`;

const PaymentBox = styled.div`
  background-color: white;

  display: flex;
  flex-direction: column;
  position: sticky;
  top: 10px;

  > div {
    display: flex;
    flex-direction: column;

    > div {
      display: flex;
      justify-content: space-between;
    }
  }

  & span {
    display: flex;
  }

  & svg {
    font-size: 12px;
    margin-top: 3px;
    color: rgba(0, 0, 0, 0.7);
  }
`;

const PaymentHeader = styled.div`
  > div:nth-of-type(1) {
    > span:nth-of-type(1) {
      font-size: 1.3rem;
    }
  }
  padding: 10px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const PaymentMoney = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 5px;

  > div {
    > span:nth-of-type(1) {
      color: rgba(0, 0, 0, 0.5);
    }

    > span:nth-of-type(2) {
      color: rgba(0, 0, 0, 0.8);
    }
  }

  font-size: 15px;
`;

const PaymentTotal = styled.div`
  padding: 10px 20px;

  > div {
    > span:nth-of-type(1) {
      font-size: 1rem;
    }

    > span:nth-of-type(2) {
      font-size: 1.8rem;
      color: #ff424e;

      > svg {
        color: #ff424e;
        font-size: 20px;
        margin-top: 6px;
      }
    }
  }

  > button {
    margin-top: 1rem;
    background-color: red;
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  color: #2578ff;
  cursor: pointer;
  font-size: 13px;
  text-decoration: none;
`;

export default function CheckOut({ cartData, addressData, total, delivery, payment }) {
  const customerRequest = CustomerRequest();
  const connection = useOutletContext();
  const queryClient = useQueryClient();
  const createPaymentRequest = CreatePaymentRequest();
  const [searchParams, setSearchParams] = useSearchParams();
  const [cardPopUp, setCardPopUp] = useState(false);
  const [address, setAddress] = useState(
    addressData.find((item) => item.id == searchParams.get("address")) ||
      addressData.find((item) => item.isDefault == true)
  );
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();

  const [changeAddress, setChangeAddress] = useState(false);
  const navigate = useNavigate();
  const [paySuccess, setPaySuccess] = useState(false);

  useEffect(() => {
    const province = dchc.data.find((item) => item.level1_id == address.province);
    setProvince(province.name);
    const district = province.level2s.find((item) => item.level2_id == address.district);
    setDistrict(district.name);
    const ward = district.level3s.find((item) => item.level3_id == address.ward);
    setWard(ward.name);
  }, [address]);

  const onSubmit = () => {
    if (!cartData.find((item) => item.isChecked == true)) {
      alert("cart is empty");
      return;
    }

    const formData = new FormData();
    formData.append("PaymentTypeId", payment);
    formData.append("AddressId", address.id);
    formData.append("DeliveryTypeId", delivery);

    createPaymentRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          queryClient.invalidateQueries({ queryKey: ["cart-quantity"] });
          if (connection) {
            connection.invoke("SendMessageAdmin", {
              UserId: customerRequest.data.data.id,
              Message: `New order has just been placed`,
            });
          }
          setPaySuccess(true);
          return;
        }
      },
    });
  };

  return (
    <>
      <Container>
        <AddressContainer>
          <div>
            <span>Delivery to</span>
            <span onClick={() => setChangeAddress(true)}>Change</span>
          </div>
          <div>
            <span>{address.fullName} | </span>
            <span>{address.phoneNumber}</span>
          </div>
          <div>
            <span>Address: </span>
            <span>
              {province}, {district}, {ward}, {address.addressDetail}
            </span>
          </div>
        </AddressContainer>
        <PaymentBox>
          <PaymentHeader>
            <div>
              <span>Order</span> <StyledLink to="/cart">Change</StyledLink>
            </div>
            <div>
              <span>{cartData.filter((item) => item.isChecked == true).length} products</span>
            </div>
          </PaymentHeader>
          <PaymentMoney>
            <div>
              <span>Estimated</span>
              <span>
                <FaDollarSign /> {formatDollar(total)}
              </span>
            </div>
            <div>
              <span>Shipping fee</span>
              <span>
                <FaDollarSign /> {formatDollar(delivery == 1 ? 5 : 3)}
              </span>
            </div>
          </PaymentMoney>
          <PaymentTotal>
            <div>
              <span>Total</span>
              <span>
                <FaDollarSign /> {formatDollar((delivery == 1 ? 5 : 3) + total)}
              </span>
            </div>
            <button
              onClick={() => {
                if (payment == 9) {
                  setCardPopUp(true);
                  return;
                }
                onSubmit();
              }}
            >
              Order
            </button>
          </PaymentTotal>
        </PaymentBox>
      </Container>
      {changeAddress && (
        <ChangeAddressPopUp
          state={address}
          setState={(address) => {
            setSearchParams({ address: address.id });
            setAddress(address);
          }}
          action={() => setChangeAddress(false)}
        />
      )}
      {cardPopUp && <CardPopUp submit={onSubmit} action={() => setCardPopUp(false)} />}
      {paySuccess && (
        <SuccessPopUp
          action={() => {
            setPaySuccess(false);
            navigate("/");
          }}
          message={"Payment Success ! Get back to HomePage"}
        />
      )}
    </>
  );
}
