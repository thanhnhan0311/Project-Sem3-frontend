import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { keyframes } from "styled-components";

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
const StyleFAQ = styled.div`
  max-width: 1280px;
  padding: 15px;
  margin: 1rem auto;
  padding: 3rem;
  text-align: justify;
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #022dc9;
  }

  & > div {
    padding: 1rem;
    transition: background 30s ease-in-out, font-size 0.3s ease-in-out, font-weight 0.3s ease-in-out;
    cursor: pointer;
    margin: 2rem;
    /* background-color: #ffefff; */
    background: linear-gradient(to right, #b3cdff, #c5f6ff);
    font-weight: 600;
  }

  & > div:hover {
    background: linear-gradient(to right, #792af9, #b384ff, #ac9bf8, #c5f6ff);
    font-size: 1.2rem;
    font-weight: 700;
    color: #ffffff;
  }
`;
const StylePurchasePayment = styled.div`
  animation: ${fadeInRightAnimation} 1s ease-in;
`;
const StyleWarranty = styled.div`
  animation: ${fadeInLeftAnimation} 1s ease-in;
`;
const StyleReturn = styled.div`
  animation: ${fadeInRightAnimation} 1s ease-in;
`;
const StylePrivacy = styled.div`
  animation: ${fadeInLeftAnimation} 1s ease-in;
`;
const FAQ = () => {
  const navigate = useNavigate();
  return (
    <StyleFAQ>
      <h2>Frequently Asked Questions</h2>
      <StylePurchasePayment onClick={() => navigate("/purchase-payment")}>
        Purchase and Payment Policy
      </StylePurchasePayment>
      <StyleWarranty onClick={() => navigate("/warranty")}>Warranty</StyleWarranty>
      <StyleReturn onClick={() => navigate("/return")}>Return and Refund Policy</StyleReturn>
      <StylePrivacy onClick={() => navigate("/privacy")}>Information Privacy Policy</StylePrivacy>
    </StyleFAQ>
  );
};

export default FAQ;
