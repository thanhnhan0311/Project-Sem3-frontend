import React, { useEffect, useState } from "react";

import productList from "@/features/listing-page/data/product.json";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import { formatCreatedAt } from "@/shared/utils/DateTimeHandle";

const StyleProductListing = styled.div`
  background-color: white;
  display: grid;
  width: 100%;
  max-width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;

  box-sizing: border-box;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StyleNotFound = styled.div`
  font-size: 2rem;
  font-weight: 300;
  color: lightgray;
  width: 50rem;
  text-align: center;
  margin: auto;

  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text; /* For browser compatibility */
`;

const StyleViewMore = styled.button`
  width: 10%;
  min-width: max-content;
  height: 3rem;
  margin: 1rem;
  border-radius: 1rem;
  border: 1px solid lightblue;
  cursor: pointer;
  background-color: #e3eeff;
  display: ${(props) => (props.showMore ? "block" : "none")};

  &:hover {
    box-shadow: 0 0 10px 0 #abc7f9;
  }
`;

const ProductListing = ({ productList, pageSize }) => {
  console.log(productList);
  const [showMore, setShowMore] = useState(true);

  //khi số sp search ra < pageSize (2) || click đến khi k còn page tiếp theo thì ẩn ShowMore (chạy ok)
  useEffect(() => {
    if (!productList.hasNextPage || productList.data.pages[0].data.length < pageSize) {
      setShowMore(false);
    }
  }, [productList.hasNextPage, productList.data.pages[0].data.length]);

  //.hasNextPage ngu si vẫn trả về true dù phía sau đ còn data để render thêm => click showMore thêm lần nữa mới ẩn được
  const handleLoadMore = () => {
    productList.fetchNextPage().then((response) => {
      if (!response.hasNextPage) {
        setShowMore(false);
      }
    });
  };

  return (
    <>
      <StyleProductListing>
        {productList.data.pages.map((page, index) =>
          page.data.map((product, i) => <ProductCard product={product} index={index} />)
        )}
      </StyleProductListing>
      {productList.data.pages[0].data.length === 0 ? (
        <StyleNotFound>Sorry, We Cannot Found Your Desired Product :(</StyleNotFound>
      ) : (
        showMore && (
          <StyleViewMore showMore={showMore} onClick={handleLoadMore}>
            Show more
          </StyleViewMore>
        )
      )}
    </>
  );
};

export default ProductListing;
