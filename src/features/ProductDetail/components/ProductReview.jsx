import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { FaStar } from "react-icons/fa";
import RatingPopup from "./RatingPopup";
import { SlLike } from "react-icons/sl";
import ProductPagination from "@/features/admin-product-list/components/pagination/ProductPagination";
import { RequestReview } from "../api/checkReview";
import { RequestAllReview } from "../api/readAllReview";
import Avatar from "react-avatar";
import { format, parseISO } from "date-fns";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;
const StyledProductTitle = styled.div`
  color: #4c503d;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 20px;
  padding: 15px 10px 0 0;
`;
const StyledButtonRating = styled.button`
  margin-top: 1rem;
  border: none;
  border-radius: 3px;
  background-color: #f5f5fa;
  cursor: pointer;
`;

const StyledratingIconLike = styled(SlLike)`
  font-size: 25px;
  color: #4b91f7;
`;
const StyledWrapIconComment = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  border-radius: 5px;
  padding: 5px 5px;
  > p {
    font-size: 14px;
  }
`;

const CommentContainer = styled.div`
  background-color: white;
`;

const StyledWrapAllComment = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const StyledContainerCommentImage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 1rem;
  padding: 20px 20px 0px 20px;
  margin-bottom: 1rem;

  border-radius: 10px;
`;
const StarContainerItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem;
  margin: 0;
`;
const StyledWrapImageComment = styled.div`
  display: flex;
  justify-content: flex-start;
  column-gap: 0.5rem;

  > div {
    padding: 5px;
    width: 100px;
    height: 100px;
    border-radius: 3px;
    cursor: pointer;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const LargeImageWrapper = styled.div`
  margin: 1rem 5rem;
  > img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    padding-bottom: 1rem;
  }
`;
const StyledWrapTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  align-items: center;
`;
const StyledGroupButton = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
`;
const StyledButtonFilter = styled.button`
  background-color: white;
  padding: 4px 2rem;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  position: relative;

  color: rgba(0, 0, 0, 0.8);

  border: ${(props) => (props.$active ? "2px solid #0a68ff" : "2px solid rgba(0,0,0,0)")};

  &:hover {
    border: 2px solid #0a68ff;
  }
  &:focus {
    border: 2px solid #f33622;
    box-shadow: 0 0 5px rgba(243, 54, 34, 0.5);
    background-color: #ffeee8;
  }
  > svg {
    display: none;
  }

  ${(props) => {
    if (props.$active == true) {
      return css`
        svg {
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          background-color: #0a68ff;
          color: white;
          font-size: 10px;
          padding: 0 0 2px 2px;
          border-bottom-left-radius: 5px;
        }
      `;
    }
  }}
`;
const StyledWrapNameImage = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 7px;
`;
const StyledNotFoundComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: 200px;
  font-size: 1.1rem;
  font-weight: 600;
`;
const StyledTime = styled.div`
  color: gray;
`;
const StyledCreatedAt = styled.span`
  margin-left: 10px;
`;

const Container = styled.div`
  margin-top: 5rem;
`;

const PaginationContainer = styled.div`
  margin-top: 2rem;
`;

export default function ProductReview({ data, star }) {
  const [showRating, setShowRating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hiddenImage, sethiddenImage] = useState(false);
  const [currentIndexComment, setCurrentIndexComment] = useState();
  const [filterStar, setFilterStar] = useState(0);
  const handleClickRating = () => {
    setShowRating(true);
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndexComment(index);
    if (selectedImage === null || selectedImage === image) {
      sethiddenImage(!hiddenImage);
    } else if (selectedImage != image) {
      sethiddenImage(true);
    }
  };
  const onClickFilterStar = (star) => {
    setFilterStar(star);
  };
  const requestReview = RequestReview(data.id);
  const readAllReview = RequestAllReview(data.id, currentPage, 5, filterStar);

  useEffect(() => {
    if (requestReview.isSuccess) {
      readAllReview;
    }
    setSelectedImage(null);
    setCurrentIndexComment();
  }, [currentPage]);

  return (
    <Container>
      <StyledWrapTitle>
        <StyledProductTitle>REVIEW & RATING</StyledProductTitle>
        <StyledGroupButton>
          <StyledButtonFilter onClick={() => onClickFilterStar(0)}>All</StyledButtonFilter>

          {[...Array(5)].map((_, index) => {
            return (
              <StyledButtonFilter key={index} onClick={() => onClickFilterStar(index + 1)}>
                {index + 1} stars
              </StyledButtonFilter>
            );
          })}
        </StyledGroupButton>
      </StyledWrapTitle>
      <StyledContainer>
        <div>
          <div>
            <ReadStar star={star} />
          </div>
          <StyledButtonRating onClick={handleClickRating}>
            {requestReview.isSuccess && requestReview.data.data.length != 0 && (
              <StyledWrapIconComment>
                <StyledratingIconLike />
                <p>Write comment</p>
              </StyledWrapIconComment>
            )}
          </StyledButtonRating>
          {showRating && (
            <RatingPopup
              readAll={readAllReview}
              action={() => setShowRating(false)}
              data={data}
              checkReviewQuery={requestReview}
            />
          )}
        </div>
        <div>
          <CommentContainer>
            {readAllReview.isSuccess &&
              readAllReview.data.data.length > 0 &&
              readAllReview.data.data.map((data, index) => {
                return (
                  <StyledWrapAllComment key={index}>
                    <StyledContainerCommentImage>
                      <div>
                        <Avatar
                          src={import.meta.env.VITE_API_IMAGE_PATH + data.user.avatar}
                          name={data.user.fullname}
                          round
                          size="50"
                        />
                      </div>
                      <StyledWrapNameImage>
                        <h4>{data.user.fullname}</h4>
                        <StarContainerItem>
                          {[...Array(5)].map((_, starIndex) => (
                            <Star key={starIndex} active={starIndex < data.rating}>
                              <FaStar />
                            </Star>
                          ))}
                        </StarContainerItem>
                        <StyledTime>
                          {data.createdAt && data.createdAt != null && (
                            <p>
                              Created at:
                              <StyledCreatedAt>
                                {format(parseISO(data.createdAt), "yyyy-MM-dd HH:mm:ss")}
                              </StyledCreatedAt>
                            </p>
                          )}
                        </StyledTime>
                        <div>{data.comment}</div>
                        <StyledWrapImageComment>
                          {data.reviewImages.length > 0 &&
                            data.reviewImages.map((item, indexImage) => (
                              <div
                                key={indexImage}
                                onClick={() => handleImageClick(item.imageName, index)}
                              >
                                <img src={import.meta.env.VITE_API_IMAGE_PATH + item.imageName} />
                              </div>
                            ))}
                        </StyledWrapImageComment>
                      </StyledWrapNameImage>
                    </StyledContainerCommentImage>
                    <div>
                      {hiddenImage && selectedImage && currentIndexComment === index && (
                        <LargeImageWrapper>
                          <img src={import.meta.env.VITE_API_IMAGE_PATH + selectedImage} />
                        </LargeImageWrapper>
                      )}
                    </div>
                  </StyledWrapAllComment>
                );
              })}
          </CommentContainer>
          <PaginationContainer>
            {readAllReview.isSuccess && (
              <ProductPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={readAllReview.data.totalPages}
              />
            )}
          </PaginationContainer>
        </div>
      </StyledContainer>
    </Container>
  );
}

const Star = styled.p`
  color: ${({ active }) => (active ? "#FFC400" : "grey")};
`;

const StarContainer = styled.div`
  display: inline-flex;
  font-size: 24px;
  margin-bottom: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledWrapReadStar = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
`;

function ReadStar({ star }) {
  const rows = 5;
  const starData = star.data.data;
  return (
    <Wrapper>
      {[...Array(rows)].map((_, rowIndex) => (
        <StyledWrapReadStar>
          <StarContainer key={rowIndex}>
            {[...Array(5)].map((_, starIndex) => (
              <Star key={starIndex} active={starIndex < rows - rowIndex}>
                <FaStar />
              </Star>
            ))}
          </StarContainer>
          {/* sử dụng phương thức Array.prototype.some để dừng vòng lặp khi điều kiện được thỏa mãn */}
          {(() => {
            let review = <p> (0) </p>;
            starData.some((item, index) => {
              if (item.star === rows - rowIndex) {
                review = <p key={index}> ({item.amount}) </p>;
                return true; // Dừng vòng lặp khi điều kiện thỏa mãn
              }
              return false; // Tiếp tục vòng lặp
            });
            return review;
          })()}
        </StyledWrapReadStar>
      ))}
    </Wrapper>
  );
}
