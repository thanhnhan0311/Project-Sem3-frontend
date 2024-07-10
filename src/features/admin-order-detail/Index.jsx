import { useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { GetOrderDetailRequest } from "../account-order-detail/api/orderDetailApi";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import convertToLetterString from "../ProductDetail/utils/convertIdToStr";
import { GetOrderByIdRequest } from "./api/adminOrderDetailApi";
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
import { AcceptOrderRequest } from "../admin-order/api/adminOrdersApi";
import { DenyOrderRequest } from "../admin-order/api/adminOrdersApi";
import { DeliveryOrderRequest } from "../admin-order/api/adminOrdersApi";
import { FinishOrderRequest } from "../admin-order/api/adminOrdersApi";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import { useOutletContext } from "react-router-dom";
import ConfirmPopUp from "@/shared/components/PopUp/ConfirmPopUp";

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

const Product = styled.div``;

export default function AdminOrderDetail() {
  const connection = useOutletContext();
  let [searchParams, setSearchParams] = useSearchParams();
  const acceptOrderRequest = AcceptOrderRequest();
  const denyOrderRequest = DenyOrderRequest();
  const deliveryOrderRequest = DeliveryOrderRequest();
  const finishOrderRequest = FinishOrderRequest();
  const [acceptConfirm, setAcceptConfirm] = useState([]);
  const [denyConfirm, setDenyConfirm] = useState([]);
  const [deliveryConfirm, setDeliveryConfirm] = useState([]);
  const [successConfirm, setSuccessConfirm] = useState([]);

  const getOrderByIdRequest = GetOrderByIdRequest(searchParams.get("id"));
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onAccept = (id) => {
    const formData = new FormData();

    id.forEach((item) => formData.append("orderId", item));

    acceptOrderRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          if (connection) {
            const orderIdString =
              convertToLetterString(getOrderByIdRequest.data.data.payment.deliveryType.id, 1) +
              convertToLetterString(getOrderByIdRequest.data.data.variant.product.categoryId, 2) +
              convertToLetterString(getOrderByIdRequest.data.data.variant.id, 5) +
              convertToLetterString(getOrderByIdRequest.data.data.id, 8);
            connection.invoke("SendMessageUser", {
              UserId: getOrderByIdRequest.data.data.userId,
              Message: `Order ${orderIdString} has just been accepted`,
            });
          }
          setSuccess(true);
          getOrderByIdRequest.refetch();
          return;
        }

        if (response.status == 400) {
          setError(true);
          getOrderByIdRequest.refetch();
          return;
        }
      },
    });
  };

  const onDeny = (id) => {
    const formData = new FormData();
    id.forEach((item) => formData.append("orderId", item));

    denyOrderRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          if (connection) {
            const orderIdString =
              convertToLetterString(getOrderByIdRequest.data.data.payment.deliveryType.id, 1) +
              convertToLetterString(getOrderByIdRequest.data.data.variant.product.categoryId, 2) +
              convertToLetterString(getOrderByIdRequest.data.data.variant.id, 5) +
              convertToLetterString(getOrderByIdRequest.data.data.id, 8);
            connection.invoke("SendMessageUser", {
              UserId: getOrderByIdRequest.data.data.userId,
              Message: `Order ${orderIdString} has just been denied `,
            });
          }
          setSuccess(true);
          getOrderByIdRequest.refetch();
          return;
        }

        if (response.status == 400) {
          setError(true);
          getOrderByIdRequest.refetch();
          return;
        }
      },
    });
  };

  const onDelivery = (id) => {
    const formData = new FormData();
    id.forEach((item) => formData.append("orderId", item));

    deliveryOrderRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          if (connection) {
            const orderIdString =
              convertToLetterString(getOrderByIdRequest.data.data.payment.deliveryType.id, 1) +
              convertToLetterString(getOrderByIdRequest.data.data.variant.product.categoryId, 2) +
              convertToLetterString(getOrderByIdRequest.data.data.variant.id, 5) +
              convertToLetterString(getOrderByIdRequest.data.data.id, 8);
            connection.invoke("SendMessageUser", {
              UserId: getOrderByIdRequest.data.data.userId,
              Message: `Order ${orderIdString} has just been delivery`,
            });
          }
          setSuccess(true);
          getOrderByIdRequest.refetch();
          return;
        }

        if (response.status == 400) {
          setError(true);
          getOrderByIdRequest.refetch();
          return;
        }
      },
    });
  };

  const onSuccess = (id) => {
    const formData = new FormData();
    id.forEach((item) => formData.append("orderId", item));

    finishOrderRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          if (connection) {
            const orderIdString =
              convertToLetterString(getOrderByIdRequest.data.data.payment.deliveryType.id, 1) +
              convertToLetterString(getOrderByIdRequest.data.data.variant.product.categoryId, 2) +
              convertToLetterString(getOrderByIdRequest.data.data.variant.id, 5) +
              convertToLetterString(getOrderByIdRequest.data.data.id, 8);
            connection.invoke("SendMessageUser", {
              UserId: getOrderByIdRequest.data.data.userId,
              Message: `Order ${orderIdString} has just been finished`,
            });
          }
          setSuccess(true);
          getOrderByIdRequest.refetch();
          return;
        }

        if (response.status == 400) {
          setError(true);
          getOrderByIdRequest.refetch();
          return;
        }
      },
    });
  };

  if (getOrderByIdRequest.isLoading) {
    return <WaitingPopUp />;
  }

  const getAddress = (address) => {
    const province = dchc.data.find((item) => item.level1_id == address.province);
    const district = province.level2s.find((item) => item.level2_id == address.district);
    const ward = district.level3s.find((item) => item.level3_id == address.ward);

    return `${province.name}, ${district.name}, ${ward.name}, ${address.addressDetail}`;
  };

  const percent = (status) => {
    if (status == "Pending") {
      return 0;
    }

    if (status == "Accepted") {
      return 34;
    }

    if (status == "Delivery") {
      return 67;
    }

    if (status == "Success") {
      return 100;
    }
  };

  const checkValidExchange = (date) => {
    const successDate = new Date(date);

    const timeSpan = successDate - Date.now();

    if (timeSpan <= 604800000) {
      return true;
    }
    return false;
  };

  return (
    <Container>
      <h3>
        Order Detail #
        {convertToLetterString(getOrderByIdRequest.data.data.payment.deliveryType.id, 1) +
          convertToLetterString(getOrderByIdRequest.data.data.variant.product.categoryId, 2) +
          convertToLetterString(getOrderByIdRequest.data.data.variant.id, 5) +
          convertToLetterString(getOrderByIdRequest.data.data.id, 8)}
        -{" "}
        {getOrderByIdRequest.data.data.isCancel
          ? "Order Cancel"
          : getOrderByIdRequest.data.data.refund == null
          ? getOrderByIdRequest.data.data.orderStatusType.name
          : getOrderByIdRequest.data.data.refund.status + " refund"}
      </h3>
      <Content>
        {getOrderByIdRequest.data.data.orderStatusType.name != "Denied" &&
          getOrderByIdRequest.data.data.isCancel == false && (
            <Progress>
              <ProgressBar percent={percent(getOrderByIdRequest.data.data.orderStatusType.name)}>
                <Step>
                  {({ accomplished, index }) => (
                    <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                      <CiTimer key={index} size={"1.3rem"} />
                    </div>
                  )}
                </Step>
                <Step>
                  {({ accomplished, index }) => (
                    <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                      <FaCheck key={index} />
                    </div>
                  )}
                </Step>
                <Step>
                  {({ accomplished, index }) => (
                    <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                      <CiDeliveryTruck key={index} size={"1.3rem"} />
                    </div>
                  )}
                </Step>
                <Step>
                  {({ accomplished, index }) => (
                    <div className={`indexedStep ${accomplished ? "accomplished" : null}`}>
                      <GoThumbsup key={index} size={"1.3rem"} />
                    </div>
                  )}
                </Step>
              </ProgressBar>
              <ProgressDetail>
                <div>
                  <p>Order Pending</p>
                </div>
                <div>
                  <p>Order Accepted</p>
                </div>
                <div>
                  <p>Order Delivery</p>
                </div>
                <div>
                  <p>Order Success</p>
                </div>
              </ProgressDetail>
            </Progress>
          )}
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
          {getOrderByIdRequest.data.data.isCancel && (
            <div>
              <h4>Cancel Reason</h4>
              <div>{getOrderByIdRequest.data.data.cancelReason}</div>
            </div>
          )}
          {getOrderByIdRequest.data.data.refund != null && (
            <div>
              <h4>Refund Request</h4>
              <div>Request: {getOrderByIdRequest.data.data.refund.reasonRefund}</div>
            </div>
          )}
        </Info>
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
                      to={`/productdetail?id=${getOrderByIdRequest.data.data.variant.product.id}`}
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
            {getOrderByIdRequest.data.data.isCancel == false &&
              getOrderByIdRequest.data.data.orderStatusId == 13 && (
                <>
                  <button onClick={() => setAcceptConfirm([getOrderByIdRequest.data.data.id])}>
                    Accept order
                  </button>
                  <button onClick={() => setDenyConfirm([getOrderByIdRequest.data.data.id])}>
                    Deny order
                  </button>
                </>
              )}

            {getOrderByIdRequest.data.data.orderStatusId == 14 && (
              <button onClick={() => setDeliveryConfirm([getOrderByIdRequest.data.data.id])}>
                Delivery order
              </button>
            )}
            {getOrderByIdRequest.data.data.orderStatusId == 17 && (
              <button onClick={() => setSuccessConfirm([getOrderByIdRequest.data.data.id])}>
                Finish order
              </button>
            )}
          </Buttons>
        </Product>
      </Content>
      {success && <SuccessPopUp action={() => setSuccess(false)} message={"Success"} />}
      {error && <ErrorPopUp action={() => setError(false)} message={"Error"} />}
      {acceptConfirm.length != 0 && (
        <ConfirmPopUp
          cancel={() => setAcceptConfirm([])}
          message={"Are you sure you want to accept this order"}
          confirm={() => {
            onAccept(acceptConfirm);
            setAcceptConfirm([]);
          }}
        />
      )}
      {denyConfirm.length != 0 && (
        <ConfirmPopUp
          cancel={() => setDenyConfirm([])}
          message={"Are you sure you want to deny this order"}
          confirm={() => {
            onDeny(denyConfirm);
            setDenyConfirm([]);
          }}
        />
      )}
      {deliveryConfirm.length != 0 && (
        <ConfirmPopUp
          cancel={() => setDeliveryConfirm([])}
          message={"Are you sure you want to delivery this order"}
          confirm={() => {
            onDelivery(deliveryConfirm);
            setDeliveryConfirm([]);
          }}
        />
      )}
      {successConfirm.length != 0 && (
        <ConfirmPopUp
          cancel={() => setSuccessConfirm([])}
          message={"Are you sure you want to finish this order"}
          confirm={() => {
            onSuccess(successConfirm);
            setSuccessConfirm([]);
          }}
        />
      )}
    </Container>
  );
}
