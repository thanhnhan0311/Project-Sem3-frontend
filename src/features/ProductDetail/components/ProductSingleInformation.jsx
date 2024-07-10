import React from "react";
import styled from "styled-components";
import parse from "html-react-parser";

const StyledContainerInfor = styled.div``;
const StyledProductTitle = styled.div`
  color: #4c503d;
  font-size: 15px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 20px;
  padding: 15px 10px 0 0;
`;
const StyledProductInforWrap = styled.div`
  color: #6a6a69;
  font-size: 15.5px;
  font-weight: 400;
  line-height: 24px;
  transition: all 0.3s;

  margin-top: 20px;
`;
const StyledProductItem = styled.div`
  margin-bottom: 1rem;
  font-style: italic;
`;
const StyledImage = styled.img`
  display: block;
  width: 80%;
  margin: 1rem auto;
`;

export default function ProductSingleInformation({ data }) {
  return (
    <StyledContainerInfor>
      <StyledProductTitle>Description</StyledProductTitle>
      <StyledProductInforWrap>{parse(data.description)}</StyledProductInforWrap>
    </StyledContainerInfor>
  );
}
