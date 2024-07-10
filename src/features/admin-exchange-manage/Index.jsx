import styled from "styled-components";
import { useState } from "react";
import SelectInput from "@/shared/components/Input/SelectInput";
import { GetRefundRequest } from "./api/manageExchangeApi";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import convertToLetterString from "../ProductDetail/utils/convertIdToStr";
import { Link } from "react-router-dom";
import ProductPagination from "../admin-product-list/components/pagination/ProductPagination";
import { GetExchangeRequest } from "./api/manageExchangeApi";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: auto;
  max-width: 75rem;
  font-size: 14px;
  min-height: 40rem;
  padding: 3rem 0;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: white;
  min-height: 40rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  > div:nth-of-type(1) {
    width: 15rem;
  }
`;

const FilterBar = styled.div`
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Buttons = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ActiveStatusButton = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 15px;

  padding: 0 2rem;
  transition: all 0.2s;

  border-bottom: ${(props) =>
    props.$active == true ? "3px solid red" : "3px solid rgba(0,0,0,0)"};
`;

const TableContent = styled.table`
  border-collapse: collapse;
  width: 100%;

  font-size: 0.9em;

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
`;

const StyledLink = styled(Link)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  text-decoration: none;
`;

const Footer = styled.div`
  padding: 2rem 2rem;
`;

const options = [
  { value: "exchange", label: "Manage Exchange" },
  { value: "refund", label: "Manage Refund" },
];

export default function AdminExchangeManage() {
  const [chosenOption, setChosennOption] = useState(options[0]);
  const [activeRefund, setActiveRefund] = useState("All");
  const [activeExchange, setActiveExchange] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const getRefundRequest = GetRefundRequest(currentPage, 10, activeRefund);
  const getExchangeRequest = GetExchangeRequest(currentPage, 10, activeExchange);

  return (
    <Container>
      <Header>
        <h3>Manage Exchange</h3>
        <SelectInput state={chosenOption} setState={setChosennOption} options={options} />
      </Header>

      <Content>
        <FilterBar>
          <Buttons>
            <ActiveStatusButton
              $active={
                chosenOption.value == "refund" ? activeRefund == "All" : activeExchange == "All"
              }
              onClick={() => {
                if (chosenOption.value == "refund") {
                  setActiveRefund("All");
                } else {
                  setActiveExchange("All");
                }
              }}
            >
              All
            </ActiveStatusButton>
            <ActiveStatusButton
              $active={
                chosenOption.value == "refund"
                  ? activeRefund == "Pending"
                  : activeExchange == "Pending"
              }
              onClick={() => {
                if (chosenOption.value == "refund") {
                  setActiveRefund("Pending");
                } else {
                  setActiveExchange("Pending");
                }
              }}
            >
              Pending
            </ActiveStatusButton>
            <ActiveStatusButton
              $active={
                chosenOption.value == "refund"
                  ? activeRefund == "Success"
                  : activeExchange == "Success"
              }
              onClick={() => {
                if (chosenOption.value == "refund") {
                  setActiveRefund("Success");
                } else {
                  setActiveExchange("Success");
                }
              }}
            >
              Success
            </ActiveStatusButton>
            <ActiveStatusButton
              $active={
                chosenOption.value == "refund"
                  ? activeRefund == "Denied"
                  : activeExchange == "Denied"
              }
              onClick={() => {
                if (chosenOption.value == "refund") {
                  setActiveRefund("Denied");
                } else {
                  setActiveExchange("Denied");
                }
              }}
            >
              Denied
            </ActiveStatusButton>
          </Buttons>
        </FilterBar>

        <TableContent>
          <thead>
            <tr>
              <th>ORDER ID</th>
              {chosenOption.value == "exchange" && <th>TYPE</th>}
              <th>CUSTOMER</th>
              <th>CATEGORY</th>
              <th>PRODUCT CODE</th>
              <th>REQUEST CODE</th>
              <th>DATE REQUEST</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {getRefundRequest.isLoading && <WaitingIcon />}
            {getExchangeRequest.isLoading && <WaitingIcon />}
            {getRefundRequest.isSuccess &&
              chosenOption.value == "refund" &&
              getRefundRequest.data.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <StyledLink to={`/admin/order-detail?id=${item.id}`}>
                        {convertToLetterString(item.payment.deliveryTypeId, 1) +
                          convertToLetterString(item.variant.product.categoryId, 2) +
                          convertToLetterString(item.variant.id, 5) +
                          convertToLetterString(item.id, 8)}
                      </StyledLink>
                    </td>
                    <td>{item.user.fullname}</td>
                    <td>{item.variant.product.category.name}</td>
                    <td>
                      <StyledLink to={`/admin/product?id=${item.variant.product.id}`}>
                        {convertToLetterString(item.variant.product.categoryId, 2) +
                          convertToLetterString(item.variant.id, 5)}
                      </StyledLink>
                    </td>
                    <td>
                      <StyledLink>{convertToLetterString(item.refund.id, 6)}</StyledLink>
                    </td>
                    <td>
                      {new Date(item.refund.createdAt)
                        .toLocaleString("en-us", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2")}
                    </td>
                    <td>{item.refund.status}</td>
                    <td className="detail">
                      <button onClick={() => navigate(`/admin/refund-detail?id=${item.refund.id}`)}>
                        See detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            {getExchangeRequest.isSuccess &&
              chosenOption.value == "exchange" &&
              getExchangeRequest.data.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <StyledLink to={`/admin/order-detail?id=${item.id}`}>
                        {convertToLetterString(item.payment.deliveryTypeId, 1) +
                          convertToLetterString(item.variant.product.categoryId, 2) +
                          convertToLetterString(item.variant.id, 5) +
                          convertToLetterString(item.id, 8)}
                      </StyledLink>
                    </td>
                    <td>
                      {item.exchange != null && <span>Request Order</span>}
                      {item.exchange == null && item.newOrderExchange != null && (
                        <span>Exchange Order</span>
                      )}
                    </td>
                    <td>{item.user.fullname}</td>
                    <td>{item.variant.product.category.name}</td>
                    <td>
                      <StyledLink to={`/admin/product?id=${item.variant.product.id}`}>
                        {convertToLetterString(item.variant.product.categoryId, 2) +
                          convertToLetterString(item.variant.id, 5)}
                      </StyledLink>
                    </td>
                    <td>
                      <StyledLink>
                        {item.exchange != null
                          ? convertToLetterString(item.exchange.id, 6)
                          : convertToLetterString(item.newOrderExchange.id, 6)}
                      </StyledLink>
                    </td>
                    <td>
                      {new Date(
                        item.exchange != null
                          ? item.exchange.exchangeDate
                          : item.newOrderExchange.exchangeDate
                      )
                        .toLocaleString("en-us", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2")}
                    </td>
                    <td>
                      {item.exchange != null ? item.exchange.status : item.newOrderExchange.status}
                    </td>
                    <td className="detail">
                      <button
                        onClick={() => {
                          if (item.exchange != null) {
                            navigate(`/admin/exchange-detail?id=${item.exchange.id}`);
                            return;
                          }

                          navigate(`/admin/exchange-detail?id=${item.newOrderExchange.id}`);
                        }}
                      >
                        See detail
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </TableContent>
        <Footer>
          {getRefundRequest.isSuccess && (
            <ProductPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={getRefundRequest.data.totalPages}
            />
          )}
        </Footer>
      </Content>
    </Container>
  );
}
