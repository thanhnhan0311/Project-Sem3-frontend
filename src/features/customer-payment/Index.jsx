import styled from "styled-components";
import { useState } from "react";
import PaymentDetail from "./components/PaymentDetail";
import CheckOut from "./components/CheckOut";
import { GetCartByUserIdQuery } from "../customer-cart/api/customerCartApi";
import { GetUserAddressRequest } from "../account-address/api/addressApi";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import { ReadTypeRequest } from "@/shared/api/typeApi";
import { readTypesData } from "@/shared/utils/readTypesData";
import { GetTotalAmountByUserIdQuery } from "../customer-cart/api/customerCartApi";

const Container = styled.div`
  width: 1280px;
  padding: 15px;
  margin: 1rem auto;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
`;

export default function CustomerPayment() {
  const getCartByUserIdQuery = GetCartByUserIdQuery();
  const getUserAddressRequest = GetUserAddressRequest();
  const getTotalAmountByUserIdQuery = GetTotalAmountByUserIdQuery();
  const readTypeRequest = ReadTypeRequest();

  const deliveryType = readTypesData(readTypeRequest).filter(
    (item) => item.nameType == "DeliveryType"
  );
  const paymentType = readTypesData(readTypeRequest).filter(
    (item) => item.nameType == "PaymentType"
  );

  const [delivery, setDelivery] = useState(deliveryType[0].id);
  const [payment, setPayment] = useState(paymentType[0].id);

  if (getUserAddressRequest.isLoading || getCartByUserIdQuery.isLoading) {
    return <WaitingPopUp />;
  }

  return (
    <Container>
      <Content>
        <PaymentDetail
          data={getCartByUserIdQuery.data.data}
          type={readTypesData(readTypeRequest)}
          delivery={delivery}
          setDelivery={setDelivery}
          payment={payment}
          setPayment={setPayment}
        />
        <CheckOut
          cartData={getCartByUserIdQuery.data.data}
          addressData={getUserAddressRequest.data.data}
          total={getTotalAmountByUserIdQuery.data.data}
          delivery={delivery}
          payment={payment}
        />
      </Content>
    </Container>
  );
}
