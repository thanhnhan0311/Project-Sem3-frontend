import React from "react";
import styled from "styled-components";
import { useState } from "react";
import ProductFilter from "./ProductFilter";
import NumberInput from "@/shared/components/Input/NumberInput";

const StylePriceBlock = styled.div`
  border-top: 1px solid lightgray;
  margin: 2rem auto;
  padding-top: 1.7rem;
`;

const StylePriceTilte = styled.div`
  & h2 {
    font-size: 1.2rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
  }
`;

const StylePriceContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  .price-input-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
      width: 4rem;
      height: fit-content;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 0.5rem;
    }
  }

  .apply-button {
    padding: 0.4rem 0.4rem;
    background-color: #8aaae5;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;

    &:hover {
      background-color: #bb5af7;
    }
  }
`;

const PriceFilter = ({ handlePriceRadioChange, priceMin, priceMax }) => {
  const [localPriceMin, setLocalPriceMin] = useState(priceMin);
  const [localPriceMax, setLocalPriceMax] = useState(priceMax);

  const handleMinPriceChange = (value) => {
    setLocalPriceMin(value);
  };

  const handleMaxPriceChange = (value) => {
    setLocalPriceMax(value);
  };

  const handleApplyFilter = () => {
    handlePriceRadioChange(localPriceMin, localPriceMax);
  };

  return (
    <StylePriceBlock>
      <StylePriceTilte>
        <h2>Price</h2>
      </StylePriceTilte>

      <StylePriceContent>
        <div className="price-input-row">
          $
          <NumberInput
            placeholder="From"
            state={localPriceMin}
            setState={handleMinPriceChange}
          />
          -
          <NumberInput
            placeholder="To"
            state={localPriceMax}
            setState={handleMaxPriceChange}
          />
        </div>

        <button className="apply-button" onClick={handleApplyFilter}>
          Apply
        </button>
      </StylePriceContent>
    </StylePriceBlock>
  );
};

export default PriceFilter;
