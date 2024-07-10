import React from "react";

import styled from "styled-components";
import { keyframes } from "styled-components";
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
const StyleReturn = styled.div`
  margin: 3rem 1rem;
  line-height: 1.7rem;
  color: #3c3c3c;
  text-align: justify;
  max-width: 1280px;
  padding: 15px;
  margin: 1rem auto;

  div {
    margin-left: 4rem;
    animation: ${zoomInAnimation} 2s ease-in-out;
  }

  & div.return-section {
    animation: ${zoomInAnimation} 2s ease-in-out;
    margin: 0 3rem;
    color: #3c3c3c;
    p {
      margin: 0 2rem;
    }
    ul {
      margin: 0 2rem;
    }
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

const Return = () => {
  return (
    <StyleReturn>
      <StyleHeader>
        <h2>Return and Refund Policy</h2>
        <img src="src/features/aboutUs-FAQ/assets/vsgif_com_minions-gif_.3581880.gif" />
      </StyleHeader>
      <div style={{ fontSize: "0.9rem" }}>
        Please check your goods immediately upon receipt to ensure the products are in the correct
        quantity, type, model, and quality as requested. If there is any mistake or unexpected
        issue, please inform Arts within 24 hours from the time of receipt, accompanied by a photo
        of the package and all received products. Arts will receive and adjust your order within 48
        hours of receiving your request.
      </div>

      <div className="return-section">
        <h2>1. Returns due to incorrect orders or shipping errors:</h2>
        <p>
          To ensure service quality and provide you with the best experience with our products, Arts
          applies a return policy for the following cases:
        </p>
        <ul>
          <li>Incorrect product, missing or extra products compared to the confirmed order</li>
          <li>Products are dented, broken, or damaged during shipping</li>
          <li>Products have technical defects discovered during use</li>
        </ul>

        <p>In these three cases, Arts will replace the products for you as follows:</p>
        <ol>
          <li>
            Please inform Arts within 7 days from the time of receipt, accompanied by a photo of the
            package and all received products.
          </li>
          <li>
            Arts will send the missing/defective, damaged items in the correct quantity and type to
            you within 5 days from receiving the request.
          </li>
          <li>
            You send the extra/defective, damaged items back to the company address: No. 590 Cach
            Mang Thang Tam Street, District 3, HoChiMinh.
          </li>
          <li>
            In case of any discrepancy, Arts will transfer the amount to your bank account or you
            will pay the difference to Arts upon receiving the exchanged goods.
          </li>
        </ol>

        <p>Return shipping fees: Paid by Arts.</p>
      </div>
      <div className="return-section">
        <h4>2. Return products at the customer's request:</h4>
        <p>
          With the desire that customers choose the best products and have the most satisfying
          experience, as well as ensuring trust in Arts products, customers can return products
          purchased at Arts within 5 days from the time of receipt.
        </p>
      </div>

      <div className="return-section">
        <h4>Return conditions:</h4>
        <p>
          <ul>
            <li>
              Products have not been used, still in original packaging, and include all accessories
              if any.
            </li>
            <li>
              The product packaging is not dirty, dented, broken, has an unusual smell, or shows
              signs of improper storage as per the usage instructions.
            </li>
            <li>Purchase receipt is available.</li>
          </ul>

          <p>Note:</p>
          <ul>
            <li>Products can only be exchanged once.</li>
            <li>Please pay the two-way shipping fee when requesting an exchange or return.</li>
            <li>
              In case of any discrepancy, Arts will transfer the amount to your bank account or you
              will pay the difference to Arts upon receiving the exchanged goods.
            </li>
          </ul>
        </p>
      </div>
      <div className="return-section">
        <h4>3. Product refunds:</h4>
        <p>
          In case customers experience an adverse reaction to the product, please provide photos of
          the condition or a health examination certificate from a medical facility for Arts to
          confirm.
        </p>
      </div>

      <div className="return-section">
        <h4>Return method:</h4>
        <p>
          <ol>
            <li>Send the goods back to Arts as per the regulations</li>

            <li>Arts will refund within 5 working days (excluding weekends and holidays).</li>
          </ol>
        </p>
      </div>

      <div className="return-section">
        <h4>Send goods to Arts:</h4>
        <p>
          In cases of warranty or returns that require sending goods back to Arts, please carefully
          pack the products to ensure their intact condition and send them to the shipping partner
          within 48 hours from completing the information exchange and confirmation with Arts about
          the order. Arts regrets that we will have to refuse products damaged due to careless
          packaging by the customer.
        </p>

        <p>Return address: No. 590 Cach Mang Thang Tam Street, District 3, HoChiMinh.</p>
      </div>
    </StyleReturn>
  );
};

export default Return;
