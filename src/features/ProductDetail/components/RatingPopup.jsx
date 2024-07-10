import XButton from "@/shared/components/Button/XButton";
import TextInput from "@/shared/components/Input/TextInput";
import PopUp from "@/shared/components/PopUp/PopUp";
import React, { useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import { IoCameraOutline } from "react-icons/io5";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import { RequestRating } from "../api/ratingApi";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";

const StyledPopupRating = styled(PopUp)`
  width: 400px;
  padding: 1rem;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 550px;
`;
const StyledHeader = styled.div`
  display: flex;
  gap: 1rem;
  > div:nth-of-type(2) {
    flex: 1;
  }
`;
const StyledMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const StyledImage = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const StyledImages = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 6rem;
  flex: 1;
  gap: 0.5rem;

  > input {
    display: none;
  }
  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0;
    padding: 1rem;
    border-radius: 5px;
    border: 1px dotted blue;
    background-color: white;
    cursor: pointer;

    > svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;
const StyledWrapImage = styled.div`
  padding: 10px;
  border: 1px dotted blue;
  border-radius: 5px;

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const StyledPopupErrorType = styled(PopUp)`
  width: 400px;
  height: 400px;
`;
const StyledSubmit = styled.button`
  border-radius: 3px;
  border: none;
  padding: 0.5rem;
  color: #fff;
  font-weight: 600;
  background: linear-gradient(180deg, #4b91f7 0%, #367af6 100%);
  background-origin: border-box;
  cursor: pointer;
  box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25),
    inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
  :focus {
    box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2),
      0px 0.5px 1.5px rgba(54, 122, 246, 0.25), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
    outline: 0;
  }
`;

export default function RatingPopup({ action, data, checkReviewQuery, readAll }) {
  const inputRef = useRef();
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [ratingError, setRatingError] = useState(false);
  const [ratingSuccess, setRatingSuccess] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const createReviewRequest = RequestRating();

  const handleClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = (ev) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (ev.target.files.length > 0) {
      const isValidFileType = Array.from(ev.target.files).every((file) =>
        allowedFileTypes.includes(file.type)
      );

      if (!isValidFileType) {
        setImageError(true);
        return <StyledPopupErrorType />;
      }

      setImages((prev) => {
        return [...prev, ...ev.target.files];
      });

      ev.target.files = null;
    }
  };
  const handleSubmit = () => {
    if (rating === 0) {
      setRatingError(true);
      return;
    }
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("productId", data.id);
    formData.append("rating", rating);
    formData.append("orderId", checkReviewQuery.data.data[0]);

    images.forEach((item) => formData.append("images", item));
    createReviewRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          setRatingSuccess(true);
          readAll.refetch();
          checkReviewQuery.refetch();
          action();
        }
      },
      onError: (response) => {
        console.log(response);
      },
    });
  };

  return (
    <StyledPopupRating action={() => {}}>
      <StyledContainer>
        <StyledHeader>
          <StyledImage>
            <img
              src={import.meta.env.VITE_API_IMAGE_PATH + data.productImages[0].imageName}
              alt=""
            />
          </StyledImage>
          <div>
            <h4>{data.name}</h4>
            <RatingStar rating={rating} setRating={setRating} />
          </div>
          <XButton action={action} />
        </StyledHeader>
        <StyledMessage>
          <h4>What makes you satisfied?</h4>
          <TextInput state={comment} setState={setComment} />
        </StyledMessage>
        <StyledImages>
          <input type="file" ref={inputRef} multiple onChange={handleImageChange} />
          {images.map((item, index) => {
            return (
              <StyledWrapImage>
                <img src={URL.createObjectURL(item)} />
              </StyledWrapImage>
            );
          })}

          <button onClick={handleClick}>
            <IoCameraOutline />
          </button>
        </StyledImages>
        <StyledSubmit onClick={handleSubmit}>Submit</StyledSubmit>
      </StyledContainer>
      {imageError && (
        <ErrorPopUp
          action={() => setImageError(false)}
          header={"Wrong type of image"}
          message={"Chosen again"}
        />
      )}
      {ratingSuccess && (
        <SuccessPopUp
          action={() => setRatingSuccess(false)}
          header={"Rating success"}
          message={"Thank you very much!!!"}
        />
      )}

      {ratingError && (
        <ErrorPopUp
          action={() => setRatingError(false)}
          header={"Plese rating"}
          message={"Rating before submit"}
        />
      )}
    </StyledPopupRating>
  );
}

const StarContainer = styled.div`
  display: inline-flex;
  font-size: 24px;
`;

const Star = styled.span`
  color: ${({ active, hover }) => (active || hover ? "yellow" : "grey")};
  cursor: pointer;
  margin: 0 auto;
`;

function RatingStar({ rating, setRating }) {
  const [hoverStar, setHoverStar] = useState(0);
  const [show, setShow] = useState(false);

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
    setShow(true);
  };

  const handleStarHover = (starIndex) => {
    setHoverStar(starIndex + 1);
  };

  const handleStarLeave = () => {
    setHoverStar(0);
  };
  return (
    <div>
      <StarContainer>
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            active={index < rating}
            hover={index < hoverStar}
            onClick={() => handleStarClick(index)}
            onMouseMove={() => handleStarHover(index)}
            onMouseLeave={handleStarLeave}
          >
            <FaStar />
          </Star>
        ))}
      </StarContainer>
    </div>
  );
}
