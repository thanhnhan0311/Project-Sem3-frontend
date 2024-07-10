import styled from "styled-components";
import { useState, useRef } from "react";
import SelectInput from "@/shared/components/Input/SelectInput";
import { BiLabel } from "react-icons/bi";
import { GetOrderDetailRequest } from "../account-order-detail/api/orderDetailApi";
import { useSearchParams } from "react-router-dom";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import { Link } from "react-router-dom";
import emptyImage from "./assets/images/empty-order.png";
import { SendRefundRequest } from "./api/refundApi";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import { useNavigate } from "react-router-dom";
import { SendExchangeRequest } from "./api/refundApi";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import { useOutletContext } from "react-router-dom";
import convertToLetterString from "../ProductDetail/utils/convertIdToStr";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h3 {
    font-size: 20px;
    font-weight: 100;
  }

  & h4 {
    display: flex;
    gap: 5px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  padding: 1rem;
`;

const Image = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  > span {
    position: absolute;
    right: 0;
    transform: translateY(-100%);
    background-color: rgb(235, 235, 240);
    padding: 3px 10px;
    border-top-left-radius: 10px;
  }
`;

const StyledLink = styled(Link)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  color: #551aa9;

  &:active {
    color: red;
  }
`;

const StyledLinkNoDecoration = styled(StyledLink)`
  text-decoration: none;
`;

const ProductDetail = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 10fr 1fr;
  column-gap: 1rem;

  padding: 20px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  & .variant-text {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.6);
  }

  & .price {
    font-size: 1.1rem;
    color: red;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  gap: 10px;
  > button {
    background-color: white;
    color: #0b74e5;
    border-radius: 5px;
    border: 1px solid #0b74e5;
    padding: 8px 8px;
    cursor: pointer;
  }
`;

const NoOrder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: white;

  > img {
    width: 20rem;
  }

  > p {
    font-size: 16px;
  }
`;

const ImageContainer = styled.div`
  > input {
    display: none;
  }
`;

const AddImageButton = styled.button`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  padding: 3rem 2rem;
  border: 1px dotted rgba(0, 0, 0, 0.2);

  > span {
    color: rgba(0, 0, 255, 0.5);
    font-size: 16px;
  }

  > svg {
    font-size: 45px;
    opacity: 0.3;
  }
`;

const ImageItem = styled.div`
  position: relative;
`;

const ImageLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  padding: 5px;

  > svg {
    display: none;
    font-size: 1.2rem;
    background-color: white;
    padding: none;
    border-radius: 5px;
  }

  > svg:nth-of-type(1) {
    width: 2rem;
    height: 2rem;
    margin-left: 30px;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    border: 2px dotted rgba(255, 255, 255, 1);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }

  &:hover svg {
    display: block;
  }
`;

const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 9rem;
  gap: 10px;

  > div:nth-of-type(1) {
    grid-column: 1/3;
    grid-row: 1/3;
  }

  > div {
    border: 1px dotted rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const exchangeOptions = [
  { value: "exchange", label: "Exchage product" },
  { value: "refund", label: "Return the product" },
];

const reasonOptions = [
  { value: "Received the wrong item", label: "Received the wrong item" },
  { value: "Item arrived damaged", label: "Item arrived damaged" },
  { value: "Item is defective or malfunctioning", label: "Item is defective or malfunctioning" },
  {
    value: "Product does not match the description",
    label: "Product does not match the description",
  },
  { value: "Ordered the wrong item by mistake", label: "Ordered the wrong item by mistake" },
  { value: "Changed my mind about the purchase", label: "Changed my mind about the purchase" },
  { value: "Found a better price for the item", label: "Found a better price for the item" },
  { value: "Received more items than ordered", label: "Received more items than ordered" },
  { value: "Item arrived later than expected", label: "Item arrived later than expected" },
];

export default function AccountExchangeRequest() {
  const connection = useOutletContext();

  const [imageError, setImageError] = useState(false);
  const inputRef = useRef();
  const [images, setImages] = useState([]);
  const navigtate = useNavigate();
  const [exchangeChoice, setExchangeChoice] = useState(exchangeOptions[0]);
  const [exchangeReason, setExchangeReason] = useState(reasonOptions[0]);
  let [searchParams, setSearchParams] = useSearchParams();
  const sendRefundRequest = SendRefundRequest();
  const [success, setSuccess] = useState(false);

  const sendExchangeRequest = SendExchangeRequest();
  const getOrderDetailRequest = GetOrderDetailRequest(searchParams.get("id"));

  if (getOrderDetailRequest.isLoading) {
    return <WaitingPopUp />;
  }

  const checkValidExchange = (date) => {
    const successDate = new Date(date);

    const timeSpan = Date.now() - successDate;

    if (timeSpan <= 604800000) {
      return true;
    }
    return false;
  };

  if (
    getOrderDetailRequest.data.data == null ||
    getOrderDetailRequest.data.data.refund != null ||
    getOrderDetailRequest.data.data.orderStatusId != 16 ||
    getOrderDetailRequest.data.data.exchange != null ||
    getOrderDetailRequest.data.data.newOrderExchange != null ||
    checkValidExchange(getOrderDetailRequest.data.data.updatedAt) == false
  ) {
    return (
      <NoOrder>
        <img src={emptyImage} />
        <p>There is no order</p>
      </NoOrder>
    );
  }

  const onReturn = () => {
    if (exchangeChoice.value == "refund") {
      const formData = new FormData();
      formData.append("OrderId", getOrderDetailRequest.data.data.id);
      formData.append("ReasonRefund", exchangeReason.value);
      images.forEach((item) => formData.append("Images", item));

      sendRefundRequest.mutate(formData, {
        onSuccess: (response) => {
          if (response.status == 200) {
            if (connection) {
              connection.invoke("SendMessageAdmin", {
                UserId: getOrderDetailRequest.data.data.userId,
                Message: `${
                  convertToLetterString(
                    getOrderDetailRequest.data.data.payment.deliveryType.id,
                    1
                  ) +
                  convertToLetterString(
                    getOrderDetailRequest.data.data.variant.product.categoryId,
                    2
                  ) +
                  convertToLetterString(getOrderDetailRequest.data.data.variant.id, 5) +
                  convertToLetterString(getOrderDetailRequest.data.data.id, 8)
                } order has just been request to refund`,
              });
            }
            setSuccess(true);
          }
        },
      });
    }

    if (exchangeChoice.value == "exchange") {
      const formData = new FormData();
      formData.append("OriginalOrderId", getOrderDetailRequest.data.data.id);
      formData.append("ReasonExchange", exchangeReason.value);

      images.forEach((item) => formData.append("Images", item));

      sendExchangeRequest.mutate(formData, {
        onSuccess: (response) => {
          if (response.status == 200) {
            if (connection) {
              connection.invoke("SendMessageAdmin", {
                UserId: getOrderDetailRequest.data.data.userId,
                Message: `${
                  convertToLetterString(
                    getOrderDetailRequest.data.data.payment.deliveryType.id,
                    1
                  ) +
                  convertToLetterString(
                    getOrderDetailRequest.data.data.variant.product.categoryId,
                    2
                  ) +
                  convertToLetterString(getOrderDetailRequest.data.data.variant.id, 5) +
                  convertToLetterString(getOrderDetailRequest.data.data.id, 8)
                } order has just been request to exchange`,
              });
            }
            setSuccess(true);
          }
        },
      });
    }
  };

  const onClickAddImage = () => {
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
        return;
      }

      setImages((prev) => [...prev, ...ev.target.files]);
      ev.target.files = null;
    }
  };

  return (
    <Container>
      <h3>Exchange</h3>
      <Content>
        <div>
          <h4>
            Item return{" "}
            <StyledLinkNoDecoration
              to={`/account/order-detail?id=${getOrderDetailRequest.data.data.id}`}
            >
              #
              {convertToLetterString(getOrderDetailRequest.data.data.payment.deliveryType.id, 1) +
                convertToLetterString(
                  getOrderDetailRequest.data.data.variant.product.categoryId,
                  2
                ) +
                convertToLetterString(getOrderDetailRequest.data.data.variant.id, 5) +
                convertToLetterString(getOrderDetailRequest.data.data.id, 8)}
            </StyledLinkNoDecoration>
          </h4>
          <ProductDetail>
            <Image>
              <img
                src={
                  import.meta.env.VITE_API_IMAGE_PATH +
                  (getOrderDetailRequest.data.data.variant.variantImage
                    ? getOrderDetailRequest.data.data.variant.variantImage
                    : getOrderDetailRequest.data.data.variant.product.productImages[0].imageName)
                }
              />
              <span>X{getOrderDetailRequest.data.data.quanity}</span>
            </Image>
            <div>
              <StyledLinkNoDecoration
                to={`/productdetail?id=${getOrderDetailRequest.data.data.variant.product.id}`}
              >
                {getOrderDetailRequest.data.data.variant.product.name}
              </StyledLinkNoDecoration>
              <p className="variant-text">
                {getOrderDetailRequest.data.data.variant.variantAttributes.map((item, index) => {
                  return (
                    <>
                      {index != 0 && <span>/</span>}
                      <span>{item.attributeValue}</span>
                    </>
                  );
                })}
              </p>
            </div>
          </ProductDetail>
        </div>

        <div>
          <h4>Image detail</h4>
          <ImageContainer>
            {images.length > 0 && (
              <Images>
                {images.map((item, index) => {
                  return (
                    <ImageItem key={index}>
                      <ImageLayout>
                        <AiOutlineClose
                          onClick={() => {
                            setImages((prev) => [...prev.filter((image) => image != item)]);
                          }}
                        />
                      </ImageLayout>
                      <img src={URL.createObjectURL(item)} />
                    </ImageItem>
                  );
                })}
                <AddImageButton onClick={onClickAddImage}>
                  <BiImageAdd />
                </AddImageButton>
              </Images>
            )}

            {images.length == 0 && (
              <AddImageButton onClick={onClickAddImage}>
                <BiImageAdd />
                <span>Add Image</span>
              </AddImageButton>
            )}
            <input ref={inputRef} onChange={handleImageChange} type="file" multiple />
          </ImageContainer>
        </div>
        <div>
          <h4>Select the return reason</h4>
          <SelectInput
            state={exchangeReason}
            setState={setExchangeReason}
            options={reasonOptions}
          />
        </div>
        <div>
          <h4>Choose the desired solution</h4>
          <SelectInput
            state={exchangeChoice}
            setState={setExchangeChoice}
            options={exchangeOptions}
          />
        </div>
        <Buttons>
          <button onClick={onReturn}>Submit</button>
        </Buttons>
      </Content>
      {success && (
        <SuccessPopUp
          message={"Success. Please wait for response"}
          action={() => {
            setSuccess(false);
            navigtate("/account/order");
          }}
        />
      )}
      {imageError && (
        <ErrorPopUp message={"Wrong image type"} action={() => setImageError(false)} />
      )}
    </Container>
  );
}
