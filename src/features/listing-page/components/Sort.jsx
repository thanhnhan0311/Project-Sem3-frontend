import React, { useState } from "react";
import SelectInput from "@/shared/components/Input/SelectInput";
import styled from "styled-components";

const StyledSortContainer = styled.div`
  width: 20%;
`;

const Sort = ({ switched, setSwitched }) => {
  //option chứa mảng các option để render ra
  //setState là hàm tạo sự thay đổi
  //state là gtri vừa được chọn sau khi thay đổi
  //khi chọn 1 option, 1 object trong mảng options sẽ được truyền vào state switched, có thể đọc = switched.label/value

  const option = [
    { value: 0, label: "Sort" },
    { value: 1, label: "Newest" },
    { value: 2, label: "Low to High Price" },
    { value: 3, label: "High to Low Price" },
    { value: 4, label: "Best Seller" },
  ];

  console.log(switched?.label);
  return (
    <StyledSortContainer>
      <SelectInput state={switched} setState={setSwitched} options={option} />
    </StyledSortContainer>
  );
};

export default Sort;
