import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  cursor: pointer;
`;

export default function EmployeePagination({ currentPage, totalPage, setCurrentPage }) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const array = new Array(totalPage).fill(false);
    array[currentPage - 1] = true;
    setPages(array);
  }, [totalPage]);

  return (
    <Container>
      {pages.map((item, index) => {
        return (
          <Button onClick={() => setCurrentPage(index + 1)} key={index}>
            {index + 1}
          </Button>
        );
      })}
    </Container>
  );
}
