import styled from "styled-components";
import { useState } from "react";
import { GetRecentOrderRequest } from "../api/dashbardApi";
import { Link } from "react-router-dom";
import formatDollar from "@/shared/utils/FormatDollar";
import React from "react";

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
    grid-template-columns: 3rem auto;
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

const StyledLink = styled(Link)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 14px;
`;

const Image = styled.div`
  height: 2rem;

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Container = styled.div`
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  background-color: white;
  border-radius: 5px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  h4 {
    font-weight: 500;
  }
`;

export default function GetRecentOrder() {
  const getRecentOrderRequest = GetRecentOrderRequest();

  return (
    <Container>
      <Header>
        <h4>Recent Order</h4>
        <StyledLink to={"/admin/order"}>View all</StyledLink>
      </Header>
      {getRecentOrderRequest.isSuccess && (
        <TableContent>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>CUSTOMER</th>
              <th>PRICE</th>
              <th>QUANTIY</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {getRecentOrderRequest.data.data.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="product-detail">
                    <Image>
                      <img
                        src={
                          import.meta.env.VITE_API_IMAGE_PATH +
                          (item.variant.variantImage
                            ? item.variant.variantImage
                            : item.variant.product.productImages[0].imageName)
                        }
                      />
                    </Image>

                    <div>
                      <StyledLink to={`/productdetail?id=${item.variant.product.id}`}>
                        {item.variant.product.name}
                      </StyledLink>
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
                    </div>
                  </td>
                  <td>{item.user.fullname}</td>
                  <td>${formatDollar(item.totalPrice / item.quanity)}</td>
                  <td>{item.quanity}</td>
                  <td>${formatDollar(item.totalPrice)}</td>
                </tr>
              );
            })}
          </tbody>
        </TableContent>
      )}
    </Container>
  );
}
