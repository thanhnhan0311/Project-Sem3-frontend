import styled from "styled-components";

import { useSearchParams } from "react-router-dom";
import { GetRefundByIdRequest } from "./api/refundDetailApi";
import { useState } from "react";
import { GetOrderDetailRequest } from "../account-order-detail/api/orderDetailApi";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import convertToLetterString from "../ProductDetail/utils/convertIdToStr";
import { GetOrderByIdRequest } from "../admin-order-detail/api/adminOrderDetailApi";
import formatDollar from "@/shared/utils/FormatDollar";
import { ProgressBar } from "react-step-progress-bar";
import { Step } from "react-step-progress-bar";
import "../account-order-detail/assets/css/progress.css";
import { CiDeliveryTruck } from "react-icons/ci";
import { GoThumbsup } from "react-icons/go";
import { CiTimer } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import dchc from "@/shared/data/dchc";
import { Link } from "react-router-dom";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { RiExchangeDollarFill } from "react-icons/ri";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import DecisionPopUp from "./components/DesicionPopUp";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 65rem;
  margin: auto;
  padding: 3rem 0;

  > h3 {
    font-size: 20px;
    font-weight: 100;
  }
`;

const TableContent = styled.table`
  border-collapse: collapse;
  font-size: 0.9em;
  width: 100%;

  overflow: hidden;

  thead tr {
    background-color: #0091ea;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }

  th,
  td {
    padding: 12px 15px;
  }

  tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }

  & td > button {
    background-color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    cursor: pointer;
  }

  & .detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    > button {
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      padding: 5px;
      border-radius: 5px;

      &:hover {
        color: red;
      }
    }
  }
  & tbody {
    background-color: white;
  }

  & .action {
    text-align: center;
  }

  & .product-detail {
    display: grid;
    grid-template-columns: 8rem auto;
    gap: 1rem;

    & .variant-text {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.4);
    }
  }

  & .exchange {
    display: flex;
    background-color: #ffe880;
    width: fit-content;
    align-items: center;
    gap: 3px;
    color: #0a68ff;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 25px;
    font-size: 12px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Progress = styled.div`
  background-color: white;

  display: flex;
  flex-direction: column;

  padding: 1rem;
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    > h4 {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.5);
    }

    > div {
      background-color: white;
      padding: 10px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.7);
      min-height: 9rem;

      & h4 {
        margin-bottom: 10px;
        font-weight: 600;
        color: #000;
      }
    }
  }
`;

const Image = styled.div`
  height: 5rem;

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const StyledLink = styled(Link)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
`;

const ProgressDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  gap: 10px;
  > button {
    background-color: white;
    color: #0b74e5;
    border-radius: 5px;
    border: 1px solid #0b74e5;
    padding: 8px 8px;
    cursor: pointer;
  }
`;

const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 9rem;
  gap: 10px;
  background-color: white;
  padding: 1rem;

  > div:nth-of-type(1) {
    grid-column: 1/3;
    grid-row: 1/3;
  }

  > div {
    border: 1px dotted rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Product = styled.div``;

export default function AdminRefundDetail() {
  let [searchParams, setSearchParams] = useSearchParams();
  const getRefundByIdRequest = GetRefundByIdRequest(searchParams.get("id"));
  const getOrderByIdRequest = GetOrderByIdRequest(
    getRefundByIdRequest.isSuccess && getRefundByIdRequest.data.data.orderId
  );
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [decisionPopUp, setDecisionPopUp] = useState(false);

  if (getRefundByIdRequest.isLoading || getOrderByIdRequest.isLoading) {
    return <WaitingPopUp />;
  }
  const getAddress = (address) => {
    const province = dchc.data.find((item) => item.level1_id == address.province);
    const district = province.level2s.find((item) => item.level2_id == address.district);
    const ward = district.level3s.find((item) => item.level3_id == address.ward);

    return `${province.name}, ${district.name}, ${ward.name}, ${address.addressDetail}`;
  };

  return (
    <Container>
      <h3>
        Refund Code #{convertToLetterString(getRefundByIdRequest.data.data.id, 6)}-
        {getRefundByIdRequest.data.data.status}
      </h3>
      <h3>
        Order Code #
        {convertToLetterString(getOrderByIdRequest.data.data.payment.deliveryType.id, 1) +
          convertToLetterString(getOrderByIdRequest.data.data.variant.product.categoryId, 2) +
          convertToLetterString(getOrderByIdRequest.data.data.variant.id, 5) +
          convertToLetterString(getOrderByIdRequest.data.data.id, 8)}
      </h3>
      <Content>
        <Info>
          <div>
            <h4>Customer Information</h4>
            <div>
              <h4>{getOrderByIdRequest.data.data.user.fullname}</h4>
              <p>Email: {getOrderByIdRequest.data.data.user.email}</p>
              <p>Phone number: {getOrderByIdRequest.data.data.user.phoneNumber}</p>
            </div>
          </div>
          <div>
            <h4>Delivery Address</h4>
            <div>
              <h4>{getOrderByIdRequest.data.data.payment.address.fullName}</h4>
              <p>Address: {getAddress(getOrderByIdRequest.data.data.payment.address)}</p>
              <p>Phone number: {getOrderByIdRequest.data.data.payment.address.phoneNumber}</p>
            </div>
          </div>
          <div>
            <h4>Payment type</h4>
            <div>
              <p>Pay by {getOrderByIdRequest.data.data.payment.paymentType.name}</p>
            </div>
          </div>
          <div>
            <h4>Refund reason</h4>
            <div>Request: {getRefundByIdRequest.data.data.reasonRefund}</div>
          </div>

          {getRefundByIdRequest.data.data.responseRefund && (
            <div>
              <h4>Refund response</h4>
              <div>Response: {getRefundByIdRequest.data.data.responseRefund}</div>
            </div>
          )}
        </Info>

        <div>
          <h4>Refund Image</h4>
          <Images>
            {getRefundByIdRequest.data.data.images.map((item) => {
              return (
                <div>
                  <img src={import.meta.env.VITE_API_IMAGE_PATH + item.imageName} />
                </div>
              );
            })}
          </Images>
        </div>
        <Product>
          <TableContent>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>DELIVERY</th>
                <th>PRICE</th>
                <th>QUANTIY</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="product-detail">
                  <Image>
                    <img
                      src={
                        import.meta.env.VITE_API_IMAGE_PATH +
                        (getOrderByIdRequest.data.data.variant.variantImage
                          ? getOrderByIdRequest.data.data.variant.variantImage
                          : getOrderByIdRequest.data.data.variant.product.productImages[0]
                              .imageName)
                      }
                    />
                  </Image>

                  <div>
                    <StyledLink
                      to={`/admin/product?id=${getOrderByIdRequest.data.data.variant.product.id}`}
                    >
                      {getOrderByIdRequest.data.data.variant.product.name}
                    </StyledLink>
                    <p className="variant-text">
                      {getOrderByIdRequest.data.data.variant.variantAttributes.map(
                        (item, index) => {
                          return (
                            <React.Fragment key={index}>
                              {index != 0 && <span>/</span>}
                              <span>{item.attributeValue}</span>
                            </React.Fragment>
                          );
                        }
                      )}
                    </p>
                  </div>
                </td>
                <td>{getOrderByIdRequest.data.data.payment.deliveryType.name}</td>
                <td>
                  $
                  {formatDollar(
                    getOrderByIdRequest.data.data.totalPrice / getOrderByIdRequest.data.data.quanity
                  )}
                </td>
                <td>{getOrderByIdRequest.data.data.quanity}</td>
                <td>${formatDollar(getOrderByIdRequest.data.data.totalPrice)}</td>
              </tr>
            </tbody>
          </TableContent>
          <Buttons>
            {getRefundByIdRequest.data.data.status == "Pending" && (
              <button onClick={() => setDecisionPopUp(true)}>Decision</button>
            )}
          </Buttons>
        </Product>
      </Content>
      {success && <SuccessPopUp action={() => setSuccess(false)} message={"Success"} />}
      {error && <ErrorPopUp action={() => setError(false)} message={"Error"} />}
      {decisionPopUp && (
        <DecisionPopUp
          refund={getRefundByIdRequest}
          order={getOrderByIdRequest}
          action={() => setDecisionPopUp(false)}
        />
      )}
    </Container>
  );
}
