import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import PopUp from "@/shared/components/PopUp/PopUp";
import { SlLike } from "react-icons/sl";
import ProductPagination from "@/features/admin-product-list/components/pagination/ProductPagination";
import { RequestAllReview } from "@/features/ProductDetail/api/readAllReview";
import Avatar from "react-avatar";
import { format, parseISO } from "date-fns";
import { RequestStar } from "@/features/ProductDetail/api/readStar";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import TextInput from "@/shared/components/Input/TextInput";
import XButton from "@/shared/components/Button/XButton";
import ConfirmPopUp from "@/shared/components/PopUp/ConfirmPopUp";
import { DeleteReviewRequest } from "../../api/productAdminApi";

const StyledPopUp = styled(PopUp)`
  padding: 0 2rem 2rem 2rem;
`;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

const StyledProductTitle = styled.h4`
  color: #4c503d;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  padding: 15px 0 0 0;
`;

const CommentContainer = styled.div`
  background-color: white;

  height: 60vh;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: none;
  }

  &::-webkit-scrollbar {
    width: 4px;
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(205, 205, 207);
  }
`;

const StyledWrapAllComment = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const StyledContainerCommentImage = styled.div`
  display: flex;
  justify-content: space-between;

  > div:nth-of-type(1) {
    display: flex;

    column-gap: 1rem;
    padding: 20px 20px 0px 20px;
    margin-bottom: 1rem;
    border-radius: 10px;
  }
`;
const StarContainerItem = styled.div`
  display: flex;

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
  column-gap: 2rem;
`;
const StyledGroupButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
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
  font-size: 1rem;
  font-weight: 600;
`;
const StyledTime = styled.div`
  color: gray;
`;
const StyledCreatedAt = styled.span`
  margin-left: 10px;
`;

const Container = styled.div`
  width: 50rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;

  > svg {
    transform: translate(150%, -50%);
    background-color: white;
    &:hover {
      background-color: white;
    }
  }
`;

const RemoveButton = styled.div`
  > svg {
    transform: translate(-100%, 50%);
  }
`;

const PaginationContainer = styled.div``;

export default function ReviewPopUp({ productId, action }) {
  const deleteReviewRequest = DeleteReviewRequest();
  const [showConfirm, setShowConfirm] = useState();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hiddenImage, sethiddenImage] = useState(false);
  const [currentIndexComment, setCurrentIndexComment] = useState();
  const [filterStar, setFilterStar] = useState(0);
  const requestStar = RequestStar(productId);
  const readAllReview = RequestAllReview(productId, currentPage, 5, filterStar, search);

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

  const onRemoveComment = (reviewId) => {
    deleteReviewRequest.mutate(reviewId, {
      onSuccess: (response) => {
        if (response.status == 200) {
          setShowConfirm(null);
          readAllReview.refetch();
        }
      },
    });
  };

  if (requestStar.isLoading) {
    return <WaitingPopUp />;
  }

  return (
    <StyledPopUp action={() => {}}>
      <Header>
        <XButton action={action} />
      </Header>
      <Container>
        <StyledWrapTitle>
          <span></span>
          <TextInput
            state={search}
            setState={setSearch}
            placeholder={"Search by customer name or comment content"}
          />
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
          <ReadStar star={requestStar} />
          <CommentContainer>
            {readAllReview.isLoading && <WaitingIcon />}
            {readAllReview.isSuccess &&
              readAllReview.data.data.length > 0 &&
              readAllReview.data.data.map((data, index) => {
                return (
                  <StyledWrapAllComment key={index}>
                    <StyledContainerCommentImage>
                      <div>
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
                      </div>
                      <RemoveButton>
                        <XButton action={() => setShowConfirm(data.id)} />
                      </RemoveButton>
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
          <div></div>
          <PaginationContainer>
            {readAllReview.isSuccess && (
              <ProductPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={readAllReview.data.totalPages}
              />
            )}
          </PaginationContainer>
        </StyledContainer>
      </Container>
      {showConfirm && (
        <ConfirmPopUp
          cancel={() => setShowConfirm(null)}
          confirm={() => onRemoveComment(showConfirm)}
          message={"Are you sure you want to delete this comment"}
        />
      )}
    </StyledPopUp>
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
