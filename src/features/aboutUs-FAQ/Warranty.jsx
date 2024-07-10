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
const StyleWarranty = styled.div`
  max-width: 1280px;
  padding: 15px;
  margin: 1rem auto;
  line-height: 1.7rem;
  color: #3c3c3c;
  text-align: justify;
  h4 {
    margin-left: 3rem;
  }
  div {
    margin-left: 4rem;
    animation: ${zoomInAnimation} 2s ease-in-out;
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
const Warranty = () => {
  return (
    <StyleWarranty>
      <StyleHeader>
        <h2>Warranty</h2>
        <img src="src/features/aboutUs-FAQ/assets/vsgif_com_minions-gif_.3581880.gif" />
      </StyleHeader>
      <div style={{ fontSize: "0.9rem" }}>
        At Company ARTS, we are committed to providing our customers with quality products and the
        best possible service. To ensure our customers' rights, we have established the following
        warranty policy:
      </div>
      <div>
        <h4>Warranty Scope</h4>
        <div>
          Products are warranted within the scope and duration specified below.
          <br />
          Warranty applies to defects caused by the manufacturer, not damages caused by the user.
        </div>
      </div>
      <div>
        <h4>Warranty for Manufacturer's Defects</h4>
        <div>
          Products are warranted for 12 months from the date of purchase.
          <br /> Free warranty service for defects caused by the manufacturer, such as component
          failures or manufacturing defects.
          <br /> No warranty for damages caused by the user, such as dropping, misuse, or exposure
          to water/chemicals.
        </div>
      </div>
      <div>
        <h4>Warranty for Electrical/Battery Products</h4>
        <div>
          Products with batteries or chargers are warranted for 6 months.
          <br /> Free warranty when the battery or charger can no longer hold a charge or charge
          properly.
          <br /> No warranty for battery or charger damage caused by improper use.
        </div>
      </div>
      <div>
        <h4> Warranty Claim Process</h4>
        <div>
          Customers must present the warranty card and the defective product at the company's
          service center.
          <br /> Our staff will inspect and accept the warranty claim.
          <br /> If the product is under warranty, we will repair or replace it free of charge
          within 7-10 business days.
          <br /> For claims not covered by warranty, we will inform the customer and provide repair
          options.
        </div>
      </div>
      <div>
        <h4>No Warranty Without Warranty Card</h4>
        <div>
          No warranty service will be provided without a valid warranty card.
          <br />
          Customers are advised to keep the warranty card carefully.
          <br /> Company ARTS' commitment is to always prioritize customer satisfaction.
          <br /> We hope this clear and reasonable warranty policy will give our customers peace of
          mind when using our products.
          <br /> Please contact us if you need further assistance.
        </div>
      </div>
      <div>
        <h4>Shipping Products to ARTS</h4>
        <div>
          In cases where Warranty or Return requires the product to be sent back to ARTS, please
          ensure that the product is carefully packaged to maintain its original condition and ship
          it to the designated shipping partner within 48 hours of confirming the order details with
          ARTS. ARTS regrets that it will have to decline any products that are damaged due to
          improper packaging by the customer.
        </div>
      </div>
    </StyleWarranty>
  );
};

export default Warranty;
