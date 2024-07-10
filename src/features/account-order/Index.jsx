import styled from "styled-components";
import { useState } from "react";
import { GetAccountOrderRequest } from "./api/getAccountOrderApi";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import ProductPagination from "../admin-product-list/components/pagination/ProductPagination";
import convertToLetterString from "../ProductDetail/utils/convertIdToStr";
import formatDollar from "@/shared/utils/FormatDollar";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { PiHandsPrayingLight } from "react-icons/pi";
import { CiDeliveryTruck } from "react-icons/ci";
import { GoThumbsup } from "react-icons/go";
import empty_image from "./assets/images/empty-order.png";
import SelectInput from "@/shared/components/Input/SelectInput";
import { GetAccountOrderPayment } from "./api/getAccountPaymentApi";
import NumberInput from "@/shared/components/Input/NumberInput";
import { CreateCartItemRequest } from "../ProductDetail/api/productDetailApi";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import AlertPopUp from "@/shared/components/PopUp/AlertPopUp";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CiTimer } from "react-icons/ci";
import { RiExchangeDollarFill } from "react-icons/ri";
import TextInput from "@/shared/components/Input/TextInput";
import { useEffect } from "react";
import { MdCancelPresentation } from "react-icons/md";
import OrderCancel from "./components/OrderCancel";
import { useOutletContext } from "react-router-dom";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h3 {
    font-size: 20px;
    font-weight: 100;
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
  gap: 1.5rem;
  > div {
    background-color: white;
  }
  min-height: 40rem;
`;

const FilterBar = styled.div`
  background-color: white;

  display: flex;
`;

const FilterButton = styled.button`
  background-color: white;
  border: none;
  padding: 10px 0;

  flex: 1;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
  font-size: 15px;
  transition: all 0.4s;

  border-bottom: ${(props) =>
    props.$active ? "2px solid rgb(13,92,182)" : "2px solid rgba(0,0,0,0)"};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;

const ProductDetail = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 10fr 1fr;
  column-gap: 1rem;

  padding: 20px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  & .variant-text {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.6);
  }

  & .price {
    font-size: 1.1rem;
    color: red;
  }
`;

const ProductPayment = styled.div`
  padding: 20px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  & .status {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 5px;
  }
`;

const ProductPaymentDetail = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 10fr 1fr;
  column-gap: 1rem;

  & .variant-text {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.6);
  }

  & .price {
    font-size: 1.2rem;
    color: red;
  }
`;

const Image = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  > span {
    position: absolute;
    right: 0;
    transform: translateY(-100%);
    background-color: rgb(235, 235, 240);
    padding: 3px 10px;
    border-top-left-radius: 10px;
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

const StyledLinkNoDecoration = styled(StyledLink)`
  text-decoration: none;

  color: #8d1a8b;

  &:active {
    color: red;
  }
`;

const OrderDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  > div:nth-of-type(1) {
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;

    > p {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      gap: 5px;
    }
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

const NoOrder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  > img {
    width: 20rem;
  }

  > p {
    font-size: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  > div:nth-of-type(1) {
    width: 15rem;
  }
`;

const PaymentDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  > div:nth-of-type(1) {
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
  }
`;

const PaymentTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  padding: 10px;
  font-size: 1.1rem;

  > p {
    display: grid;
    grid-template-columns: 8rem 8rem;
    gap: 10px;
    color: red;
    text-align: right;
  }

  > p:nth-of-type(1) {
    font-size: 16px;
  }

  & span {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const options = [
  { value: "order", label: "View By Order" },
  { value: "payment", label: "View By Payment" },
];

export default function AccountOrder() {
  const connection = useOutletContext();
  const queryClient = useQueryClient();
  const [optionValue, setOptionValue] = useState(options[0]);
  const [active, setActive] = useState("All Order");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPagePayment, setCurrentPagePayment] = useState(1);
  const createCartItemRequest = CreateCartItemRequest();
  const [cartSuccess, setCartSuccess] = useState(false);
  const [cartError, setCartError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigtate = useNavigate();
  const [searchOrder, setSearchOrder] = useState("");
  const [searchOrderDisplay, setSearchOrderDisplay] = useState("");
  const [cancelPopUp, setCancelPopUp] = useState(false);
  const [cancelOrder, setCancelOrder] = useState();
  const [cancelSuccess, setCancelSuccess] = useState(false);

  const getAccountOrderPayment = GetAccountOrderPayment(currentPagePayment, 10);
  const getAccountOrderRequest = GetAccountOrderRequest(currentPage, 10, active, searchOrder);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchOrder(searchOrderDisplay);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchOrderDisplay]);

  // if (optionValue.value == "order" && getAccountOrderRequest.isLoading) {
  //   return <WaitingPopUp />;
  // }

  // if (optionValue.value == "payment" && getAccountOrderPayment.isLoading) {
  //   return <WaitingPopUp />;
  // }

  const totalPayment = (payment) => {
    let total = 0;

    for (let item of payment.orders) {
      if (item.newOrderExchange != null) {
        continue;
      }
      total += item.totalPrice;
    }

    return total;
  };

  const onAddToCart = (variant) => {
    const formData = new FormData();
    formData.append("VariantId", variant.id);
    formData.append("Quantity", 1);
    createCartItemRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 201) {
          setCartSuccess(true);
          queryClient.invalidateQueries({ queryKey: ["cart-quantity"] });
          queryClient.invalidateQueries({ queryKey: ["user-cart"] });
          return;
        }

        if (response.status == 405) {
          setErrorMessage(`The remaining quantity of this product is ${response.data.quanity}.`);
          setCartError(true);
          request.refetch();
        }
      },
      onError: (response) => {
        console.log(response);
      },
    });
  };

  const checkValidExchange = (date) => {
    const successDate = new Date(date);

    const timeSpan = Date.now() - successDate;

    if (timeSpan <= 604800000) {
      return true;
    }

    return false;
  };

  return (
    <Container>
      <Header>
        <h3>My Order</h3>
        <SelectInput state={optionValue} setState={setOptionValue} options={options} />
      </Header>

      {optionValue.value == "order" && (
        <TextInput
          state={searchOrderDisplay}
          setState={setSearchOrderDisplay}
          placeholder={"Search for order by order id or by product name"}
        />
      )}

      <FilterBar>
        {optionValue.value == "order" && (
          <>
            <FilterButton $active={active == "All Order"} onClick={() => setActive("All Order")}>
              All Order
            </FilterButton>
            <FilterButton $active={active == "Pending"} onClick={() => setActive("Pending")}>
              Pending
            </FilterButton>
            <FilterButton $active={active == "Accepted"} onClick={() => setActive("Accepted")}>
              Accepted
            </FilterButton>
            <FilterButton $active={active == "Denied"} onClick={() => setActive("Denied")}>
              Denied
            </FilterButton>
            <FilterButton $active={active == "Delivery"} onClick={() => setActive("Delivery")}>
              Delivery
            </FilterButton>
            <FilterButton $active={active == "Success"} onClick={() => setActive("Success")}>
              Success
            </FilterButton>
            <FilterButton $active={active == "Cancel"} onClick={() => setActive("Cancel")}>
              Cancel
            </FilterButton>
          </>
        )}
        {optionValue.value == "payment" && <FilterButton $active={true}>Payment List</FilterButton>}
      </FilterBar>

      {optionValue.value == "order" && (
        <Content>
          {optionValue.value == "order" && getAccountOrderRequest.isLoading && <WaitingIcon />}
          {optionValue.value == "order" &&
            getAccountOrderRequest.isSuccess &&
            getAccountOrderRequest.data.data.map((item, index) => {
              return (
                <OrderDetail key={index}>
                  <div>
                    <StyledLinkNoDecoration to={`/account/order-detail?id=${item.id}`}>
                      #
                      {convertToLetterString(item.payment.deliveryType.id, 1) +
                        convertToLetterString(item.variant.product.categoryId, 2) +
                        convertToLetterString(item.variant.id, 5) +
                        convertToLetterString(item.id, 8)}
                    </StyledLinkNoDecoration>
                    <p>
                      Order {item.isCancel == false && item.orderStatusType.name}{" "}
                      {item.orderStatusType.id == 14 && <FaCheck />}
                      {item.orderStatusType.id == 15 && <PiHandsPrayingLight size={"1.3rem"} />}
                      {item.orderStatusType.id == 17 && <CiDeliveryTruck size={"1.3rem"} />}
                      {item.orderStatusType.id == 16 && <GoThumbsup size={"1.3rem"} />}
                      {item.orderStatusType.id == 13 && item.isCancel == false && (
                        <CiTimer size={"1.3rem"} />
                      )}
                      {item.isCancel && (
                        <>
                          <span>Cancel</span> <MdCancelPresentation size={"1.3rem"} />
                        </>
                      )}
                    </p>
                  </div>
                  <ProductDetail>
                    <Image>
                      <img
                        src={
                          import.meta.env.VITE_API_IMAGE_PATH +
                          (item.variant.variantImage
                            ? item.variant.variantImage
                            : item.variant.product.productImages[0].imageName)
                        }
                      />
                      <span>X{item.quanity}</span>
                    </Image>
                    <div>
                      <StyledLinkNoDecoration to={`/productdetail?id=${item.variant.product.id}`}>
                        {item.variant.product.name}
                      </StyledLinkNoDecoration>
                      <p className="variant-text">
                        {item.variant.variantAttributes.map((item, index) => {
                          return (
                            <>
                              {index != 0 && <span>/</span>}
                              <span>{item.attributeValue}</span>
                            </>
                          );
                        })}
                      </p>
                      {item.orderStatusId == 16 &&
                        item.refund == null &&
                        item.exchange == null &&
                        item.newOrderExchange == null &&
                        checkValidExchange(item.updatedAt) && (
                          <p className="exchange">
                            <RiExchangeDollarFill size={"1rem"} /> Exchangable in 7 days
                          </p>
                        )}
                      {item.orderStatusType.id == 13 && item.isCancel == false && (
                        <p className="exchange">Cancelable</p>
                      )}
                    </div>
                    <div>
                      {item.newOrderExchange == null && (
                        <p className="price">${formatDollar(item.totalPrice)}</p>
                      )}
                    </div>
                  </ProductDetail>
                  <Buttons>
                    {item.orderStatusId == 13 && item.isCancel == false && (
                      <button
                        onClick={() => {
                          setCancelPopUp(true);
                          setCancelOrder(item);
                        }}
                      >
                        Request Cancel
                      </button>
                    )}
                    {checkValidExchange(item.updatedAt) &&
                      item.orderStatusId == 16 &&
                      item.refund == null &&
                      item.exchange == null &&
                      item.newOrderExchange == null && (
                        <button
                          onClick={() => navigtate(`/account/exchange-request?id=${item.id}`)}
                        >
                          Request Exchange
                        </button>
                      )}
                    {item.variant.availableQuanity > 0 && checkValidExchange(item.updatedAt) && (
                      <button onClick={() => onAddToCart(item.variant)}>Re Purchase</button>
                    )}
                    <button onClick={() => navigtate(`/account/order-detail?id=${item.id}`)}>
                      View Detail
                    </button>
                  </Buttons>
                </OrderDetail>
              );
            })}
          {getAccountOrderRequest.isSuccess && getAccountOrderRequest.data.data.length == 0 && (
            <NoOrder>
              <img src={empty_image} />
              <p>There are no order</p>
            </NoOrder>
          )}
        </Content>
      )}

      {optionValue.value == "payment" && (
        <Content>
          {optionValue.value == "payment" && getAccountOrderPayment.isLoading && <WaitingIcon />}
          {optionValue.value == "payment" &&
            getAccountOrderPayment.isSuccess &&
            getAccountOrderPayment.data.data.map((item, index) => {
              return (
                <PaymentDetail key={index}>
                  <div>
                    #{convertToLetterString(item.id, 8)}
                    <p>Pay by {item.paymentType.name}</p>
                  </div>
                  <div>
                    {item.orders.map((order, index) => {
                      return (
                        <ProductPayment>
                          <p className="status">
                            Order {order.isCancel == false && order.orderStatusType.name}{" "}
                            {order.orderStatusType.id == 14 && <FaCheck />}
                            {order.orderStatusType.id == 15 && (
                              <PiHandsPrayingLight size={"1.3rem"} />
                            )}
                            {order.orderStatusType.id == 17 && <CiDeliveryTruck size={"1.3rem"} />}
                            {order.orderStatusType.id == 16 && <GoThumbsup size={"1.3rem"} />}
                            {order.orderStatusType.id == 13 && order.isCancel == false && (
                              <CiTimer size={"1.3rem"} />
                            )}
                            {order.isCancel && (
                              <>
                                <span>Cancel</span> <MdCancelPresentation size={"1.3rem"} />
                              </>
                            )}
                          </p>
                          <ProductPaymentDetail key={index}>
                            <Image>
                              <img
                                src={
                                  import.meta.env.VITE_API_IMAGE_PATH +
                                  (order.variant.variantImage
                                    ? order.variant.variantImage
                                    : order.variant.product.productImages[0].imageName)
                                }
                              />
                              <span>X{order.quanity}</span>
                            </Image>
                            <div>
                              <StyledLinkNoDecoration to={`/account/order-detail?id=${order.id}`}>
                                #
                                {convertToLetterString(item.deliveryType.id, 1) +
                                  convertToLetterString(order.variant.product.categoryId, 2) +
                                  convertToLetterString(order.variant.id, 5) +
                                  convertToLetterString(order.id, 8)}
                              </StyledLinkNoDecoration>
                              <StyledLinkNoDecoration
                                to={`/productdetail?id=${order.variant.product.id}`}
                              >
                                {order.variant.product.name}
                              </StyledLinkNoDecoration>
                              <p className="variant-text">
                                {order.variant.variantAttributes.map((item, index) => {
                                  return (
                                    <>
                                      {index != 0 && <span>/</span>}
                                      <span>{item.attributeValue}</span>
                                    </>
                                  );
                                })}
                              </p>
                              {order.orderStatusId == 16 &&
                                order.refund == null &&
                                order.exchange == null &&
                                order.newOrderExchange == null &&
                                checkValidExchange(order.updatedAt) && (
                                  <p className="exchange">
                                    <RiExchangeDollarFill size={"1rem"} /> Exchangable in 7 days
                                  </p>
                                )}
                              {order.orderStatusType.id == 13 && order.isCancel == false && (
                                <p className="exchange">Cancelable</p>
                              )}
                            </div>
                            <div>
                              {order.newOrderExchange == null && (
                                <p className="price">${formatDollar(order.totalPrice)}</p>
                              )}
                            </div>
                          </ProductPaymentDetail>
                          <Buttons>
                            {order.orderStatusId == 13 && order.isCancel == false && (
                              <button
                                onClick={() => {
                                  setCancelPopUp(true);
                                  setCancelOrder(order);
                                }}
                              >
                                Request Cancel
                              </button>
                            )}
                            {order.orderStatusId == 16 &&
                              order.refund == null &&
                              order.exchange == null &&
                              order.newOrderExchange == null && (
                                <button
                                  onClick={() =>
                                    navigtate(`/account/exchange-request?id=${order.id}`)
                                  }
                                >
                                  Request Exchange
                                </button>
                              )}
                            {order.variant.availableQuanity > 0 &&
                              checkValidExchange(order.updatedAt) && (
                                <button onClick={() => onAddToCart(order.variant)}>
                                  Re Purchase
                                </button>
                              )}
                            <button
                              onClick={() => navigtate(`/account/order-detail?id=${order.id}`)}
                            >
                              View Detail
                            </button>
                          </Buttons>
                        </ProductPayment>
                      );
                    })}
                  </div>
                  <PaymentTotal>
                    <p>
                      <span>Shipment fee</span> ${formatDollar(item.shipFee)}
                    </p>
                    <p>
                      <span>Total</span> ${formatDollar(totalPayment(item) + item.shipFee)}
                    </p>
                  </PaymentTotal>
                </PaymentDetail>
              );
            })}
        </Content>
      )}

      <Pagination>
        {optionValue.value == "order" && getAccountOrderRequest.isSuccess && (
          <ProductPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={getAccountOrderRequest.data.totalPages}
          />
        )}

        {optionValue.value == "payment" && getAccountOrderPayment.isSuccess && (
          <ProductPagination
            currentPage={currentPagePayment}
            setCurrentPage={setCurrentPagePayment}
            totalPage={getAccountOrderPayment.data.totalPages}
          />
        )}
      </Pagination>
      {cartSuccess && (
        <SuccessPopUp
          action={() => setCartSuccess(false)}
          header={"Success add to Cart"}
          message={"Please check you cart "}
        />
      )}
      {cartError && (
        <AlertPopUp action={() => setCartError(false)} header={"Error"} message={errorMessage} />
      )}
      {cancelPopUp && (
        <OrderCancel
          action={() => {
            setCancelPopUp(false);
          }}
          successAction={() => setCancelSuccess(true)}
          order={cancelOrder}
          paymentQuery={getAccountOrderPayment}
          orderQuery={getAccountOrderRequest}
        />
      )}
      {cancelSuccess && (
        <SuccessPopUp action={() => setCancelSuccess(false)} message={"Cancel success"} />
      )}
    </Container>
  );
}
