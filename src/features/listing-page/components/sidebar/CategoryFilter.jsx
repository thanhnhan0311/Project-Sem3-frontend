import React, { useState } from "react";
// import categories from "../../data/category.json";
import styled, { css } from "styled-components";

//CSS
const StyleCategoryBlock = styled.div`
  & h2 {
    font-weight: normal;
  }
  font-size: small;
`;

const StyleCategoryContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  margin: 0.2rem;
`;

const StyleCategoryTitle = styled.div`
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
`;

const StyleInputRadio = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid #ccc;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  position: relative;
  cursor: pointer;
  &:before {
    content: "";
    display: block;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: background-color 0.2s ease-in-out;
  }

  &:checked {
    border-color: lightpink;

    &:before {
      background-color: #c781fd;
    }
  }
`;

// Category Filter Block in Sidebar of Product Listing Page
const CategoryFilter = ({ handleChange, categoryData, selectedCategory }) => {
  //handle which category range is selected
  const handleCategoryChange = (ev) => {
    selectedCategory = ev.target.value;
    handleChange(ev.target.value); // Call the handleChange prop with the selected category ID
  };

  return (
    <StyleCategoryBlock>
      <h2>Category</h2>
      <>
        <StyleCategoryContent>
          <StyleInputRadio
            type="radio"
            name="category"
            value={0}
            checked={selectedCategory == 0}
            onChange={handleCategoryChange}
          />
          <StyleCategoryTitle>All</StyleCategoryTitle>
        </StyleCategoryContent>
        {categoryData?.map((cate, index) => (
          <StyleCategoryContent key={cate.id}>
            <StyleInputRadio
              type="radio"
              name="category"
              value={cate.id}
              checked={selectedCategory == cate.id}
              onChange={handleCategoryChange}
            />
            <StyleCategoryTitle>{cate.name}</StyleCategoryTitle>
          </StyleCategoryContent>
        ))}
      </>
    </StyleCategoryBlock>
  );
};

export default CategoryFilter;
