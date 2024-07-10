import styled from "styled-components";
import { useState } from "react";
import { GetUserRefundExchangeRequest } from "./api/userManageExchange";
import { Link } from "react-router-dom";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import convertToLetterString from "../ProductDetail/utils/convertIdToStr";
import formatDollar from "@/shared/utils/FormatDollar";
import empty_image from "./assets/images/empty-order.png";
import { PiHandsPrayingLight } from "react-icons/pi";
import { GoThumbsup } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import ProductPagination from "../admin-product-list/components/pagination/ProductPagination";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h3 {
    font-size: 20px;
    font-weight: 100;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    background-color: white;
  }
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;

export default function AccountManageExchange() {
  const [active, setActive] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const getUserRefundExchangeRequest = GetUserRefundExchangeRequest(currentPage, 20, active);
  const navigate = useNavigate();

  return (
    <Container>
      <h3>Manage Exchange Return</h3>
      <FilterBar>
        <FilterButton $active={active == "All"} onClick={() => setActive("All")}>
          All
        </FilterButton>
        <FilterButton $active={active == "Pending"} onClick={() => setActive("Pending")}>
          Pending
        </FilterButton>
        <FilterButton $active={active == "Success"} onClick={() => setActive("Success")}>
          Accepted
        </FilterButton>
        <FilterButton $active={active == "Denied"} onClick={() => setActive("Denied")}>
          Denied
        </FilterButton>
      </FilterBar>
      <Content>
        {getUserRefundExchangeRequest.isLoading && <WaitingIcon />}
        {getUserRefundExchangeRequest.isSuccess &&
          getUserRefundExchangeRequest.data.data.map((item, index) => {
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
                  {item.refund && item.refund.status == "Success" && (
                    <p>
                      Success Refund <FaCheck />
                    </p>
                  )}
                  {item.refund && item.refund.status == "Pending" && <p>Pending Refund</p>}
                  {item.refund && item.refund.status == "Denied" && (
                    <p>
                      Refund Denied <PiHandsPrayingLight size={"1.3rem"} />
                    </p>
                  )}
                  {item.exchange && item.exchange.status == "Denied" && (
                    <p>
                      Exchange Denied` <PiHandsPrayingLight size={"1.3rem"} />
                    </p>
                  )}
                  {item.exchange && item.exchange.status == "Pending" && <p>Pending Exchange</p>}
                  {item.exchange && item.exchange.status == "Success" && (
                    <p>
                      Exchange Success <GoThumbsup size={"1.3rem"} />
                    </p>
                  )}
                  {item.newOrderExchange && (
                    <p>
                      Exchange Order <FaCheck />
                    </p>
                  )}
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
                    {/* {item.orderStatusId == 16 &&
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
                    )} */}
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
                  {item.refund && (
                    <button
                      onClick={() =>
                        navigate(`/account/account-refund-detail?id=${item.refund.id}`)
                      }
                    >
                      View Detail
                    </button>
                  )}
                  {item.exchange && (
                    <button
                      onClick={() =>
                        navigate(`/account/account-exchange-detail?id=${item.exchange.id}`)
                      }
                    >
                      View Detail
                    </button>
                  )}
                  {item.newOrderExchange && (
                    <button
                      onClick={() =>
                        navigate(`/account/account-exchange-detail?id=${item.newOrderExchange.id}`)
                      }
                    >
                      View Detail
                    </button>
                  )}
                </Buttons>
              </OrderDetail>
            );
          })}
        {getUserRefundExchangeRequest.isSuccess &&
          getUserRefundExchangeRequest.data.data.length == 0 && (
            <NoOrder>
              <img src={empty_image} />
              <p>There are no order</p>
            </NoOrder>
          )}
      </Content>
      <Pagination>
        {getUserRefundExchangeRequest.isSuccess && (
          <ProductPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={getUserRefundExchangeRequest.data.totalPages}
          />
        )}
      </Pagination>
    </Container>
  );
}
