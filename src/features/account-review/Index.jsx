import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import { RequestAllReviewByUser } from "./api/readAllReviewApiByUser";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { format, parseISO } from "date-fns";
const StyledWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 5px;
  padding: 0.5rem;
`;
const StyledComponent = styled.div`
  display: flex;
  justify-content: flex-start;
  row-gap: 0.5rem;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
`;
const StyledNameImageProduct = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  margin-bottom: 0.2rem;
  > div {
    width: 50px;
    height: 50px;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  > p {
    > p {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
`;
const StyledWrapImageComment = styled.div`
  display: flex;
  justify-content: flex-start;
  column-gap: 0.5rem;

  > div {
    padding: 10px;
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
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 4rem;
  > div {
    > span {
      padding-left: 1rem;
    }
  }
`;
const StyledCreatedAt = styled.span`
  padding-left: 10px;
`;
export default function AccountReview() {
  const requestAllReviewByUser = RequestAllReviewByUser();

  return (
    <div>
      {requestAllReviewByUser.isSuccess &&
        requestAllReviewByUser.data.data.map((item, index) => {
          return (
            <StyledWrap>
              <StyledComponent>
                <div>
                  <StyledNameImageProduct>
                    <div>
                      <img
                        src={
                          import.meta.env.VITE_API_IMAGE_PATH +
                          item.product.productImages[0].imageName
                        }
                      />
                    </div>
                    <p>
                      <p>{item.product.name}</p>
                      <div>
                        <ReadStar star={item.rating} />
                      </div>
                    </p>
                  </StyledNameImageProduct>
                  <StyledContent>
                    <div>
                      {item.createdAt && item.createdAt != null && (
                        <p>
                          Created at:
                          <StyledCreatedAt>
                            {format(
                              parseISO(item.createdAt),
                              "yyyy-MM-dd HH:mm:ss"
                            )}
                          </StyledCreatedAt>
                        </p>
                      )}
                      <p>My comment: </p> <span>{item.comment}</span>
                    </div>
                    <StyledWrapImageComment>
                      {item.reviewImages.length > 0 &&
                        item.reviewImages.map((itemImage, indexImage) => (
                          <div key={indexImage}>
                            <img
                              src={
                                import.meta.env.VITE_API_IMAGE_PATH +
                                itemImage.imageName
                              }
                            />
                          </div>
                        ))}
                    </StyledWrapImageComment>
                  </StyledContent>
                </div>
              </StyledComponent>
            </StyledWrap>
          );
        })}
      {requestAllReviewByUser.isLoading && <WaitingPopUp />}
    </div>
  );
}
const Star = styled.p`
  color: ${({ active }) => (active ? "#FFC400" : "grey")};
  margin: 0 auto;
`;
const StyledWrapReadStar = styled.span`
  display: inline-flex;
  font-size: 1.2rem;
`;
function ReadStar({ star }) {
  return (
    <StyledWrapReadStar>
      {[...Array(5)].map((_, index) => (
        <Star key={index} active={index < star}>
          <FaStar size="15px" />
        </Star>
      ))}
    </StyledWrapReadStar>
  );
}
