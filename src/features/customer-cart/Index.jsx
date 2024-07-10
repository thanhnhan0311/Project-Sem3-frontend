import styled from "styled-components";
import CartItem from "./components/cartItem";
import PaymentComponent from "./components/paymentComponent";
import {
  GetCartByUserIdQuery,
  GetTotalAmountByUserIdQuery,
  PutAllCartCheckedMutate,
} from "./api/customerCartApi";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import InputCheckBox from "@/shared/components/Input/InputCheckBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetUserAddressRequest } from "@/features/account-address/api/addressApi";
import { useNavigate } from "react-router-dom";
import { CustomerRequest } from "@/shared/api/customerApi";

const MainStyleComponent = styled.div`
  width: 1280px;
  padding: 15px;
  margin: 0 auto;
  min-height: 50rem;

  .layout {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }

  .left-cart {
    padding: 20px;

    .headingDetail {
      display: grid;
      grid-template-columns: auto 3fr 1fr 1fr 1fr 1fr;
      column-gap: 5px;
      padding: 16px 16px;

      background-color: #ffffff;
      margin-bottom: 10px;
    }
  }

  & .headingDetail-item5 {
    display: flex;
    justify-content: flex-end;
  }

  & .headingDetail-item2,
  .headingDetail-item3,
  .headingDetail-item4 {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
  }

  & .headingDetail-item6 {
    font-size: 15px;
    color: rgba(0, 0, 0, 0.8);
  }

  & svg {
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.4);
  }
`;

const CartItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function Cart() {
  const customerRequest = CustomerRequest();
  const navigate = useNavigate();
  const getUserAddressRequest = GetUserAddressRequest();
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const getCartByUserId = GetCartByUserIdQuery();
  const putAllCartCheckedMutate = PutAllCartCheckedMutate();
  const getTotalAmountByUserIdQuery = GetTotalAmountByUserIdQuery();
  const queryClient = useQueryClient();

  const handleIsCheckedAll = (event) => {
    setIsCheckedAll(event.target.checked);
    const formData = new FormData();
    formData.append("isCheckedState", event.target.checked);
    putAllCartCheckedMutate.mutate(formData, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["user-cart"] });
        queryClient.invalidateQueries({ queryKey: ["cart-totalAmount"] });

        if (res.status == 201) {
          alert("Some product can not be select");
        }
      },
    });
  };

  if (getCartByUserId.isLoading || getUserAddressRequest.isLoading) {
    return <WaitingPopUp />;
  }

  if (customerRequest.isError || customerRequest.data.dat) {
    navigate("/");
    return;
  }

  return (
    <MainStyleComponent>
      <div className="layout">
        <div className="left-cart">
          <div className="headingDetail">
            <span className="headingDetail-item headingDetail-item1">
              <InputCheckBox
                checked={isCheckedAll}
                onChange={(event) => handleIsCheckedAll(event)}
              />
            </span>
            <span className="headingDetail-item6">
              Total
              {getCartByUserId.data.data.length && (
                <span>({getCartByUserId.data.data.length} items)</span>
              )}
            </span>
            <span className="headingDetail-item item headingDetail-item2">Unit price</span>
            <span className="headingDetail-item item headingDetail-item3">Quantity</span>
            <span className="headingDetail-item item headingDetail-item4">Total Amount</span>
            <span className="headingDetail-item item headingDetail-item5">
              <FaRegTrashAlt />
            </span>
          </div>
          <CartItemContainer>
            {getCartByUserId?.data?.data.map((cart) => {
              return <CartItem key={cart?.id} detailCart={cart} isCheckedAll={isCheckedAll} />;
            })}
          </CartItemContainer>
        </div>
        <div className="right-cart">
          <PaymentComponent
            data={getCartByUserId.data.data}
            totalAmount={getTotalAmountByUserIdQuery?.data?.data}
            address={getUserAddressRequest.data.data}
          />
        </div>
      </div>
    </MainStyleComponent>
  );
}
