import React from "react";
import { GetRelatedProductRequest } from "../api/productDetailApi";
import styled from "styled-components";
import formatDollar from "@/shared/utils/FormatDollar";
import calculatePercentDifference from "@/shared/utils/calculatePercentDifference";
import { Link } from "react-router-dom";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import { FaCheck, FaStar } from "react-icons/fa";

const Suggestion = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  margin-top: 5rem;

  > h4 {
    font-size: 20px;
    font-weight: 800;
    color: #0057a0;
    width: 100%;
    border-bottom: 3px solid #0272c0;
    padding: 8px;
  }

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ItemContainer = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size: 14px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: fit-content;
  box-sizing: border-box;
`;

const Image = styled.div`
  width: 100%;
  height: 10rem;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Name = styled.div`
  font-size: 15px;
`;

const StyledNameLink = styled(Link)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  text-decoration: none;
  word-break: break-word;
  max-width: 100%;

  color: #561c8c;

  &:hover {
    color: red;
  }
`;

const Price = styled.div`
  > span:nth-of-type(1) {
    color: #965f58;
    font-size: 16px;
  }

  > span:nth-of-type(2) {
    color: #878787;
    text-decoration: line-through;
    font-weight: 300;
    font-size: 14px;
  }
`;

const StarCount = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5px;
  > span {
    font-size: 12px;
  }
`;

const ShowMoreButton = styled.div`
  margin: 1rem 0;
  width: 100%;

  display: flex;
  justify-content: center;
  > button {
    padding: 0.8rem 5rem;
    border-radius: 5px;
    border: 1px solid #0a68ff;
    background-color: white;
    cursor: pointer;
    color: #0a68ff;
    &:hover {
      background-color: #d7e3fb;
    }
  }
`;

const SalePercent = styled.span``;

export default function ProductRelated({ data }) {
  const getMinVariant = (product) => {
    const minVariant = product.variants.reduce((min, variant) => {
      return variant.price < min.price ? variant : min;
    }, product.variants[0]);

    return minVariant;
  };

  const getRelatedProductRequest = GetRelatedProductRequest(data.categoryId, data.id, 10);

  return (
    <Suggestion>
      <h4>RELATED PRODUCTS</h4>
      <ItemContainer>
        {getRelatedProductRequest.isLoading && <WaitingIcon />}
        {getRelatedProductRequest.isSuccess &&
          getRelatedProductRequest.data.pages.map((page, pageIndex) =>
            page.data.map((product, productIndex) => {
              const minVariant = getMinVariant(product.product);
              return (
                <Item key={productIndex}>
                  <Image>
                    <img
                      src={
                        import.meta.env.VITE_API_IMAGE_PATH +
                        product.product.productImages[0].imageName
                      }
                    />
                  </Image>
                  <Name>
                    <StyledNameLink to={`/productdetail?id=${product.product.id}`}>
                      {product.product.name}
                    </StyledNameLink>
                  </Name>
                  <Price>
                    <span>${formatDollar(minVariant.price)}</span>{" "}
                    <span>
                      {minVariant.salePrice != 0 && (
                        <span>${formatDollar(minVariant.salePrice)}</span>
                      )}
                    </span>{" "}
                    {minVariant.salePrice != 0 && (
                      <SalePercent>
                        -{""}
                        {calculatePercentDifference(minVariant.salePrice, minVariant.price)}
                        {""}%
                      </SalePercent>
                    )}
                  </Price>
                  <StarCount>
                    <ReadStar star={product.averageRating} />
                    <span> ({product.ratingCount})</span>
                  </StarCount>
                </Item>
              );
            })
          )}
      </ItemContainer>
      {getRelatedProductRequest.isSuccess &&
        getRelatedProductRequest.data.pageParams.length <
          getRelatedProductRequest.data.pages[0].totalPages && (
          <ShowMoreButton>
            <button
              onClick={() => {
                getRelatedProductRequest.fetchNextPage();
              }}
            >
              Show More
            </button>
          </ShowMoreButton>
        )}
    </Suggestion>
  );
}

const Star = styled.p`
  color: ${({ $active }) => ($active ? "#FFC400" : "grey")};
  margin: 0 auto;
`;

const StyledWrapReadStar = styled.span`
  display: inline-flex;
  font-size: 1.2rem;
`;

function ReadStar({ star }) {
  return (
    <StyledWrapReadStar>
      {[...Array(5)].map((_, index) => (
        <Star key={index} $active={index < star}>
          <FaStar size="15px" />
        </Star>
      ))}
    </StyledWrapReadStar>
  );
}
