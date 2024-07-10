import React from "react";
import image from "@/features/listing-page/assets/image.png";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import formatDollar from "@/shared/utils/FormatDollar";
import { Link } from "react-router-dom";
import calculatePercentDifference from "@/shared/utils/calculatePercentDifference";

const StyleProductCard = styled.div`
  display: block;

  width: 100%;
  height: 100%;
  min-height: 100%;
  border: 0.01rem solid #cee1fcb3;
  border-radius: 0.7rem;

  & p {
    font-weight: 600;
    font-size: 1.2rem;
    margin-top: 0.4rem;
    margin-left: 0.7rem;

    @media (max-width: 784px) {
      font-size: 0.75rem;
    }

    &.product-name {
      overflow: hidden;
      text-overflow: ellipsis; /* Hiển thị dấu chấm (...) nếu văn bản bị cắt bớt */
      display: -webkit-box;
      -webkit-line-clamp: 2; /* Số dòng hiển thị tối đa */
      -webkit-box-orient: vertical;
      font-size: 1rem;
    }

    &.original-price {
      font-weight: 600;
      font-size: 1.2rem;
      margin-right: 1rem;
      color: #ba1818;
      position: relative;
    }

    .currency-symbol {
      font-size: 0.7em;
      position: absolute;
      top: -0.3em;
    }

    &.sale-price {
      color: grey;
      font-weight: 600;
      font-size: 1rem;

      text-decoration: line-through;
    }
  }

  & img {
    display: block;
    margin: 1rem auto;
    width: 85%;
    height: 13rem;
    border-radius: 9px;
    object-fit: cover;
  }

  @media (max-width: 784px) {
    width: 100%;
  }

  @media (max-width: 430px) {
    width: 100%;
  }
  &:hover {
    box-shadow: 0 0 15px 0 #abc7f9;
  }
`;

const StylePriceBlock = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: start;
  align-items: baseline;
`;

const StarCount = styled.div`
  margin-left: 0.7rem;
  display: flex;
  align-items: flex-start;
  gap: 5px;
  > span {
    font-size: 12px;
  }
`;

const StyledNameLink = styled(Link)`
  overflow: hidden;
  text-overflow: ellipsis; /* Hiển thị dấu chấm (...) nếu văn bản bị cắt bớt */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Số dòng hiển thị tối đa */
  -webkit-box-orient: vertical;
  font-size: 1rem;
  margin-left: 0.7rem;
  text-decoration: none;
  word-break: break-word;
  max-width: 100%;
  font-weight: 600;
  color: #561c8c;

  &:hover {
    color: red;
  }
`;

const DiscountBlock = styled.div`
  color: #f69113;
  > p {
    font-size: 15px;
    background-color: rgba(246, 145, 19, 0.3);
    color: rgb(221, 33, 14);
    font-weight: 900;
    width: fit-content;
  }
`;

//Product Card items in Product Listing Page
const ProductCard = ({ product, index }) => {
  const minVariant = product.product.variants.reduce((min, variant) => {
    return variant.price < min.price ? variant : min;
  }, product.product.variants[0]);
  return (
    <StyleProductCard key={index}>
      <img src={import.meta.env.VITE_API_IMAGE_PATH + product.product.productImages[0].imageName} />
      <StyledNameLink to={`/productdetail?id=${product.product.id}`}>
        {product.product.name}
      </StyledNameLink>
      <StylePriceBlock>
        {minVariant.salePrice != 0 ? (
          <p className="sale-price">{formatDollar(minVariant.salePrice)}</p>
        ) : (
          <></>
        )}
        <p className="original-price">
          {formatDollar(minVariant.price)}
          <sup className="currency-symbol">$</sup>
        </p>
      </StylePriceBlock>
      <DiscountBlock>
        {minVariant.salePrice != 0 && (
          <p>-{calculatePercentDifference(minVariant.salePrice, minVariant.price)}%</p>
        )}
      </DiscountBlock>
      <StarCount>
        <ReadStar star={product.averageRating} />
        <span> ({product.ratingCount})</span>
      </StarCount>
    </StyleProductCard>
  );
};

export default ProductCard;

const Star = styled.div`
  color: ${({ $active }) => ($active ? "#FFC400" : "grey")};
  margin: 0 auto;
`;

const StyledWrapReadStar = styled.span`
  display: inline-flex;
  font-size: 1.2rem;
`;

function ReadStar({ star }) {
  const roundedStars = Math.round(star);
  return (
    <StyledWrapReadStar>
      {[...Array(5)].map((_, index) => (
        <Star key={index} $active={index < roundedStars}>
          <FaStar size="15px" />
        </Star>
      ))}
    </StyledWrapReadStar>
  );
}
