import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Radio from "@/shared/components/Input/RadioInput";
import { Link } from "react-router-dom";
import { FaDollarSign } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { PiMoneyWavyLight } from "react-icons/pi";
import cheque from "../assets/images/check-svgrepo-com.svg";
import formatDollar from "@/shared/utils/FormatDollar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & h4 {
    font-size: 20px;
    font-weight: 100;
  }
`;

const Payment = styled.div`
  background-color: white;
  padding: 2rem;
`;

const Delivery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  padding: 2rem;
`;

const DeliveryType = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f0f8ff;
  width: 60%;
  padding: 2rem;
  border: 1px solid #c2e1ff;
  border-radius: 5px;

  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: -13px; /* Adjust this value based on the height of the arrow */
    left: 30%;
    transform: translateX(-50%);
    width: 1.5rem;
    height: 1.5rem;
    border-bottom: 1px solid #c2e1ff;
    border-right: 1px solid #c2e1ff;
    background-color: #f0f8ff;
    transform: rotate(45deg);
  }
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  column-gap: 1rem;

  > div:nth-of-type(1) {
    width: 5rem;
    height: 5rem;

    > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
  }

  > div:nth-of-type(3) {
    display: flex;
    align-items: flex-end;

    > div {
      display: flex;
      gap: 1rem;

      > p {
        display: flex;
        font-size: 1rem;
        color: red;
        font-weight: 400;
      }

      & svg {
        font-size: 13px;
        margin-top: 4px;
      }
    }
  }
`;

const StyledLink = styled(Link)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PaymentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 2rem 1rem;
  border-radius: 5px;
`;

const PaymentType = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin-top: 2rem;

  .radio-button,
  .checkbox {
    margin: 0;
  }

  > div {
    display: flex;
    align-items: center;

    > p {
      display: flex;
      align-items: center;
      gap: 5px;

      > img {
        width: 2rem;
      }

      > svg {
        font-size: 2rem;
      }
    }
  }
`;

export default function PaymentDetail({ data, type, delivery, setDelivery, payment, setPayment }) {
  const deliveryType = type.filter((item) => item.nameType == "DeliveryType");
  const paymentType = type.filter((item) => item.nameType == "PaymentType");

  return (
    <Container>
      <Delivery>
        <h4>Choose the delivery method</h4>
        <DeliveryType>
          {deliveryType.map((item, index) => {
            return (
              <div key={index}>
                <Radio
                  onChange={() => setDelivery(item.id)}
                  name="delivery"
                  checked={item.id == delivery}
                />
                {item.name == "Fast" && <span>Express Delivery</span>}
                {item.name == "Normal" && <span>Standard Delivery</span>}
              </div>
            );
          })}
        </DeliveryType>

        <PaymentItem>
          {data
            .filter((item) => item.isChecked == true)
            .map((item, index) => {
              return (
                <Item key={index}>
                  <div>
                    <img
                      src={
                        import.meta.env.VITE_API_IMAGE_PATH +
                        (item.variant.variantImage
                          ? item.variant.variantImage
                          : item.variant.product?.productImages[0].imageName)
                      }
                    />
                  </div>
                  <div>
                    <StyledLink>{item.variant.product.name}</StyledLink>
                    <p className="variant-text">
                      {item.variant.variantAttributes.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            {index != 0 && <span>/</span>}
                            <span>{item.attributeValue}</span>
                          </React.Fragment>
                        );
                      })}
                    </p>
                    <p>Quantity: X {item.quanity}</p>
                  </div>
                  <div>
                    <div>
                      <p>
                        <FaDollarSign /> {formatDollar(item.quanity * item.variant.price)}
                      </p>
                    </div>
                  </div>
                </Item>
              );
            })}
        </PaymentItem>
      </Delivery>
      <Payment>
        <h4>Choose the payment method</h4>
        <PaymentType>
          {paymentType.map((item, index) => {
            return (
              <div key={index}>
                <Radio
                  onChange={() => setPayment(item.id)}
                  name="payment"
                  checked={item.id == payment}
                />

                {item.name == "VPP" && (
                  <p className="payment_type">
                    {/* <PiMoneyWavyLight />  */}
                    {item.name} (Cash On Delivery)
                  </p>
                )}
                {item.name == "Cheque" && (
                  <p className="payment_type">
                    {/* <img src={cheque} /> */}
                    Pay by {item.name}
                  </p>
                )}
                {item.name == "Credit" && (
                  <p className="payment_type">
                    {/* <CiCreditCard1 /> */}
                    Pay by {item.name}
                  </p>
                )}
                {item.name == "DD" && <p className="payment_type">Pay by Demand Draft</p>}
              </div>
            );
          })}
        </PaymentType>
      </Payment>
    </Container>
  );
}
