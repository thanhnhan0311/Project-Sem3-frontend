import React from "react";
import styled from "styled-components";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import ReviewFilter from "./ReviewFilter";

//CSS
const StyleProductFilter = styled.div`
  width: 90%;
  /* max-width: 100%; */
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
  /* border-right: 2px solid #e5e5e5; */
  display: flex;
  flex-direction: column;
  align-items: start;
  z-index: 3;

  @media (max-width: 1024px) {
    padding: 1rem;
  }
  @media (max-width: 768px) {
  }
`;

//Filter Sidebar (parents component) in Product Listing Page
const ProductFilter = ({
  handleChange,
  handlePriceRadioChange,
  categoryData,
  selectedCategory,
  priceMin,
  priceMax,
  starValue,
  handleStarChange,
}) => {
  return (
    <StyleProductFilter>
      <CategoryFilter
        selectedCategory={selectedCategory}
        handleChange={handleChange}
        categoryData={categoryData}
      />
      <PriceFilter
        priceMin={priceMin}
        priceMax={priceMax}
        handlePriceRadioChange={handlePriceRadioChange}
      />
      <ReviewFilter starValue={starValue} handleStarChange={handleStarChange} />
    </StyleProductFilter>
  );
};

export default ProductFilter;
