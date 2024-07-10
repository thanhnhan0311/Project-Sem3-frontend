import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const zoomInAnimation = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;
const fadeAndRotateAnimation = keyframes`
  0% {
    transform: translateX(100%) rotate(0deg);
    opacity: 0;
  }
  100% {
    transform: translateX(0) rotate(360deg);
    opacity: 1;
  }
`;
const fadeDownAnimation = keyframes`
  0% {
    transform: translateY(-1000%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
const fadeInLeftAnimation = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeInRightAnimation = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;
const StyleHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  h2 {
    animation: ${fadeAndRotateAnimation} 2s ease-in-out;
    color: #54269a;
    margin: 0 auto;
    font-size: 2rem;
  }
  img {
    width: 10rem;
  }
`;
const StylePurchasePayment = styled.div`
  margin: 3rem 3rem;
  line-height: 1.7rem;
  color: #3c3c3c;
  text-align: justify;
  max-width: 1280px;
  padding: 15px;
  margin: 1rem auto;
`;
const StylePurchase = styled.div`
  margin-left: 1rem;
  align-items: center;
  animation: ${zoomInAnimation} 1.2s ease-out;
`;
const StylePay = styled.div`
  margin-top: 1rem;
  margin-left: 1rem;
  align-items: center;
  animation: ${fadeInRightAnimation} 1.5s ease-out;
  animation: ${zoomInAnimation} 1.2s ease-out;
`;

const PurchasePay = () => {
  return (
    <StylePurchasePayment>
      <StyleHeader>
        <h2>Purchasing and Payment Policy</h2>
        <img src="src/features/aboutUs-FAQ/assets/vsgif_com_minions-gif_.3581880.gif" />
      </StyleHeader>

      <StylePurchase>
        <h4>Purchasing Guide</h4>
        <b> Customers can purchase directly in 2 ways:</b>
        <br />{" "}
        <p style={{ color: "#5b5b5b", marginLeft: "1rem" }}>
          {" "}
          <b>Visit and experience the artistic space at the ARTS offline store.</b>
        </p>
        <p style={{ color: "#5b5b5b", marginLeft: "1rem" }}>
          <b>Purchasing on the website arts.com:</b>{" "}
        </p>
        <div style={{ marginLeft: "2rem" }}>
          Step 1: Access the website http://arts.com, explore the products you need in the PRODUCTS
          section.
          <br /> Step 2: Select the product, the desired quantity and click "Add to cart" to
          continue purchasing other products, or click "Buy now" to proceed with payment.
          <br /> Step 3: After selecting all the products you want to buy. Click on the Cart in the
          top right corner of the screen. Review the products and quantities in the cart and select
          the appropriate payment method.
          <br /> Step 4: Click CONFIRM ORDER after filling in all the information. <br />
          Step 5: Our staff will confirm the order and process the order as soon as possible.
        </div>
      </StylePurchase>
      <StylePay>
        <h4>Delivery - Payment process</h4>
        <div style={{ marginLeft: "2rem" }}>
          After confirming the order and shipping information from the Customer, ARTS will pack the
          goods and deliver them to the carrier within 24 hours. In Hanoi and Saigon, ARTS's
          delivery staff will directly deliver the goods to the customer within 48 working hours,
          except in case of unexpected difficulties or force majeure. For other locations, ARTS
          delivers the goods through professional shipping companies with Express delivery. The
          delivery time is 2-5 working days depending on the location. Central cities will receive
          the goods faster than remote areas. Some liquid and water products will take longer to
          deliver than dry goods.
        </div>
        <div>
          <h5>Shipping policy</h5>
          <div style={{ marginLeft: "2rem" }}>
            Fast delivery: 5$/order <br /> Standard delivery: 3$/order <br />
          </div>
          <h5> Payment methods </h5>
          <div style={{ marginLeft: "2rem" }}>
            At ARTS store: pay in Dollar/Cheuqe or by Visa, Master, ATM card <br /> Delivered
            orders: Visa, Master, ATM card payment through online payment providers (applicable to
            orders placed on the website), or VPP cash/cheque payment upon delivery.
          </div>
        </div>
      </StylePay>
    </StylePurchasePayment>
  );
};

export default PurchasePay;
