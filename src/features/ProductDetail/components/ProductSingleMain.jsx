import React from "react";
import Carousel from "react-multi-carousel";
import styled, { css } from "styled-components";
import "react-multi-carousel/lib/styles.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "../assets/embla.css";
import ProductSingleInformation from "./ProductSingleInformation";
import { FaDollarSign } from "react-icons/fa6";
import convertToLetterString from "../utils/convertIdToStr";
import { getSalePrices } from "../utils/getVariantPrices";
import { getPrices } from "../utils/getVariantPrices";
import { FaCheck, FaStar } from "react-icons/fa";
import NumberInput from "@/shared/components/Input/NumberInput";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import AlertPopUp from "@/shared/components/PopUp/AlertPopUp";
import { CustomerRequest } from "@/shared/api/customerApi";
import { IoIosReturnLeft } from "react-icons/io";
import { IoShieldCheckmark } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CreateCartItemRequest } from "../api/productDetailApi";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import { useQueryClient } from "@tanstack/react-query";
import formatDollar from "@/shared/utils/FormatDollar";
import { SiExpress } from "react-icons/si";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaBox } from "react-icons/fa";
import calculatePercentDifference from "@/shared/utils/calculatePercentDifference";
import { useOutletContext } from "react-router-dom";

const Container = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 4fr 6fr;
  align-items: flex-start;
  gap: 1rem;
`;

const Images = styled.div`
  padding: 1rem;
  border-radius: 5px;
  background-color: white;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div {
    padding: 1rem 2rem;
    background-color: white;
  }
`;

const ProductName = styled.h4`
  font-size: 1rem;
`;

const Variants = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Variant = styled.button`
  background-color: white;
  padding: 5px 2rem;
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

const VariantContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const LeftDetail = styled.div`
  position: sticky;
  top: 10px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ShipmentDetail = styled.div`
  background-color: white;

  & li > span {
    display: flex;
    align-items: center;
    gap: 5px;

    > svg {
      font-size: 2rem;
    }
  }
`;

const StyledShippingBoxWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ID = styled.span`
  display: flex;
  font-size: 13px;
  font-weight: 700;
  gap: 0.4rem;
  color: rgba(0, 0, 0, 0.6);

  > span:nth-of-type(2) {
    letter-spacing: 2px;
  }
`;

const Prices = styled.div`
  display: flex;
  align-items: last baseline;
  gap: 1rem;

  > h4 {
    display: flex;
    align-items: flex-start;
  }

  > h4:nth-of-type(1) {
    font-size: 2rem;
    color: #ee4d2d;
    > svg {
      margin-top: 10px;
      font-size: 15px;
    }
    font-weight: 400;
  }

  > h4:nth-of-type(2) {
    font-size: 1.1rem;
    color: #9292a0;
    font-weight: 100;
    text-decoration: line-through;

    > svg {
      font-size: 15px;
    }
  }
`;

const InitialPrice = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.4rem;
  align-items: last baseline;

  & svg {
    padding: 0;
    margin: 0;
  }

  > div:nth-of-type(2) {
    font-size: 1.1rem;
    color: #9292a0;
    position: relative;
    > span {
      font-weight: 900;
    }

    & h4 {
      font-weight: 100;
    }

    & svg {
      margin-top: 5px;
      font-size: 0.8rem;
    }
  }

  > div:nth-of-type(2)::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 100%;
    border-top: 1px solid #9292a0;
    pointer-events: none;
    transform: translateX(2px);
  }

  > div:nth-of-type(1) {
    font-size: 2rem;
    color: #ee4d2d;

    & svg {
      margin-top: 10px;
      font-size: 1rem;
    }

    & h4 {
      font-weight: 400;
    }
  }

  & h4 {
    display: flex;
  }

  > div {
    display: flex;
    gap: 0.2rem;
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;

  & button {
    background-color: white;
    border: none;
  }

  & svg {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }

  & input {
    width: 3rem;
    height: 2rem;
  }

  & span {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.7);
  }
`;

const CartButton = styled.div`
  > button {
    display: flex;
    align-items: center;
    width: 15rem;
    justify-content: center;
    background-color: red;
    color: white;
    font-size: 1rem;
    border: none;
    padding: 0.5rem;
    font-weight: 500;
    border-radius: 5px;
    cursor: pointer;
    > svg {
      font-size: 1.8rem;
    }
  }
`;

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const VariantDetail = styled.div`
  display: flex;
  gap: 1rem;

  > div:nth-of-type(1) {
    width: 2rem;
    height: 2rem;

    & img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & span {
    font-size: 14px;
  }

  & span:nth-of-type(odd) {
    font-weight: 900;
  }
`;

const TotalAmount = styled.div`
  h2 {
    display: flex;
    font-size: 2rem;
    color: #ee4d2d;
    font-weight: 400;
    align-items: flex-start baseline;
  }

  & svg {
    margin-top: 10px;
    font-size: 1.2rem;
  }
`;

const ProductDetail = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;

  > div {
    display: grid;
    grid-template-columns: 2fr 5fr;
    column-gap: 1rem;
    padding: 10px 0;
  }

  & .warranty {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  & .unit {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  & h4 {
    display: flex;
    gap: 5px;
    color: rgba(0, 0, 0, 0.8);

    > svg {
      margin-top: 2px;
      align-self: baseline;
    }
  }

  & p {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    gap: 5px;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 0.5rem;

  > div {
    font-size: 0.8rem;
    border-bottom: 2px solid #ffc400;
    color: #ffc400;
  }
  > p {
    font-size: 0.8rem;
    > span {
    }
  }
`;

export default function ProductSingleMain({ data, variant, request, star }) {
  const createCartItemRequest = CreateCartItemRequest();
  const OPTIONS = {};
  const SLIDES = data.productImages;
  const customerRequest = CustomerRequest();
  const [quantity, setQuantity] = useState(0);
  const queryClient = useQueryClient();

  const [variantError, setVariantError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [outOfStockError, setOutOfStockError] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  const [cartError, setCartError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [variantAttributes, setVariantAttributes] = useState(new Array(variant.length).fill(null));

  const onActive = (index, i) => {
    if (index == 0) {
      return i == variantAttributes[0];
    }

    if (index == 1) {
      return i == variantAttributes[1];
    }

    if (index == 2) {
      return i == variantAttributes[2];
    }
  };

  const onGetVariant = () => {
    return data.variants.find((item) => {
      let i = 0;
      for (i; i < item.variantAttributes.length; i++) {
        if (item.variantAttributes[i].attributeValue != variant[i].values[variantAttributes[i]]) {
          break;
        }
      }
      if (i == item.variantAttributes.length) {
        return item;
      }
    });
  };

  const onClickAddQuantity = () => {
    const variant = onGetVariant();

    if (variant) {
      setQuantity((prev) => {
        if (prev + 1 > variant.availableQuanity) {
          return variant.availableQuanity;
        }
        return prev + 1;
      });
    } else {
      const max = getTotalQuantity(data);
      setQuantity((prev) => {
        if (prev + 1 > max) {
          return max;
        }
        return prev + 1;
      });
    }
  };

  const totalStar = (data) => {
    let tongSao = 0;

    let person = 0;
    data.forEach((item) => {
      tongSao += item.star * item.amount;
      person += item.amount;
    });
    return (tongSao / person).toFixed(1);
  };

  const totalAmount = (data) => {
    let ratingAmount = 0;
    data.forEach((item) => {
      ratingAmount += item.amount;
    });
    return ratingAmount;
  };

  const onClickSubQuantity = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  const getTotalQuantity = (data) => {
    let total = 0;

    for (let i = 0; i < data.variants.length; i++) {
      total += data.variants[i].availableQuanity;
    }

    return total;
  };

  const onAddToCart = () => {
    if (customerRequest.isError) {
      setUserError(true);
      return;
    }

    if (variantAttributes.includes(null)) {
      setVariantError(true);
      return;
    }

    if (onGetVariant().availableQuanity == 0) {
      setOutOfStockError(true);
      return;
    }

    let variantDetail = data.variants[0];

    if (variant.length > 0) {
      variantDetail = onGetVariant();
    }

    const formData = new FormData();
    formData.append("VariantId", variantDetail.id);
    formData.append("Quantity", quantity);
    createCartItemRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 201) {
          setCartSuccess(true);
          queryClient.invalidateQueries({ queryKey: ["cart-quantity"] });
          return;
        }

        if (response.status == 405) {
          setErrorMessage(`The remaining quantity of this product is ${response.data.quanity}.`);
          setCartError(true);
          request.refetch();
        }
      },
      onError: (response) => {
        console.log(response);
      },
    });
  };

  useEffect(() => {
    if (!variantAttributes.includes(null) && onGetVariant().availableQuanity == 0) {
      setQuantity(0);
    } else {
      if (getTotalQuantity(data) == 0) {
        setQuantity(0);
        return;
      }
      setQuantity(1);
    }
  }, [variantAttributes[0], variantAttributes[1], variantAttributes[2]]);

  return (
    <Container>
      <LeftDetail>
        <Images>
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </Images>
      </LeftDetail>
      <Detail>
        <Header>
          <h2>{data.name}</h2>
          {star.data.data.length > 0 && (
            <StyledTitle>
              <div>{star.data.data && totalStar(star.data.data)}</div>
              <ReadStar star={totalStar(star.data.data)} />
              <p>
                <span>({totalAmount(star.data.data)})</span> Review{" "}
              </p>
            </StyledTitle>
          )}
          {variantAttributes.includes(null) ? (
            <InitialPrice>
              <div>
                {getPrices(data).map((item, index) => {
                  return (
                    <>
                      {index == 1 && <span>-</span>}
                      <h4 key={index}>
                        <FaDollarSign />
                        {formatDollar(item)}
                      </h4>
                    </>
                  );
                })}
              </div>
              <div>
                {getSalePrices(data).map((item, index) => {
                  return (
                    <>
                      {index == 1 && <span>-</span>}
                      <h4 key={index}>
                        <FaDollarSign />
                        {formatDollar(item)}
                      </h4>
                    </>
                  );
                })}
              </div>
            </InitialPrice>
          ) : (
            <Prices>
              <h4>
                <FaDollarSign />
                {formatDollar(onGetVariant().price)}
              </h4>
              {onGetVariant().salePrice != 0 && (
                <h4>
                  <FaDollarSign />
                  {formatDollar(onGetVariant().salePrice)}
                </h4>
              )}
            </Prices>
          )}

          <ProductDetail>
            {data.unit && data.unit != 0 && (
              <div className="unit">
                <h4>
                  <FaBox /> Unit
                </h4>
                <p>{data.unit}</p>
              </div>
            )}
            <div>
              <h4>
                <IoIosReturnLeft /> Return Policy
              </h4>
              <p>7-day return policy, Free change of mind returns</p>
            </div>

            {data.warrantyDuration > 0 && (
              <div className="warranty">
                <h4>
                  <IoShieldCheckmark /> Warranty information
                </h4>
                <p>
                  <span>Warranty duration: {data.warrantyDuration} months</span>
                  <span>Warranty type: Electronics</span>
                  <span>Warranty location: Manufacturer's warranty</span>
                  <span>
                    Warranty instructions: <Link to={"/warranty"}>See details</Link>
                  </span>
                </p>
              </div>
            )}
          </ProductDetail>
        </Header>

        {variant.length > 0 && (
          <Variants>
            {variant.map((item, index) => {
              return (
                <div key={index}>
                  <h4>{item.variant}</h4>
                  <VariantContainer>
                    {item.values.map((value, i) => {
                      return (
                        <Variant
                          $active={onActive(index, i)}
                          onClick={() =>
                            setVariantAttributes((prev) => {
                              prev[index] = i;
                              return [...prev];
                            })
                          }
                          key={i}
                        >
                          {value}
                          <FaCheck />
                        </Variant>
                      );
                    })}
                  </VariantContainer>
                </div>
              );
            })}
          </Variants>
        )}

        <Payment>
          <h4>Quantity</h4>
          {!variantAttributes.includes(null) && variant.length != 0 && (
            <VariantDetail>
              <div>
                <img
                  src={
                    import.meta.env.VITE_API_IMAGE_PATH +
                    (onGetVariant().variantImage || data.productImages[0].imageName)
                  }
                />
              </div>
              {variant.map((item, index) => {
                return (
                  <div key={index}>
                    <span>{item.variant}</span>:{" "}
                    <span>{item.values[variantAttributes[index]]}</span>
                  </div>
                );
              })}
            </VariantDetail>
          )}

          <Quantity>
            <button onClick={onClickSubQuantity}>
              <CiSquareMinus />
            </button>
            <NumberInput
              state={quantity}
              setState={(value) => {
                if (variantAttributes.includes(null)) {
                  const max = getTotalQuantity(data);
                  if (value > max) {
                    setQuantity(max);
                    return;
                  }
                  setQuantity(value);
                } else {
                  const max = onGetVariant().availableQuanity;
                  if (value > max) {
                    setQuantity(max);
                    return;
                  }

                  if (value == 0) {
                    if (value == 0 && max != 0) {
                      setQuantity(1);
                      return;
                    }
                  }
                  setQuantity(value);
                }
              }}
            />
            <button onClick={onClickAddQuantity}>
              <CiSquarePlus />
            </button>
            {!variantAttributes.includes(null) ? (
              <span>{onGetVariant().availableQuanity} Available in Stock </span>
            ) : (
              <span>{getTotalQuantity(data)} Total Available in Stock</span>
            )}
          </Quantity>

          {!variantAttributes.includes(null) && (
            <TotalAmount>
              <h3>Total amount</h3>
              <h2>
                <FaDollarSign /> {formatDollar(onGetVariant().price * quantity)}
              </h2>
            </TotalAmount>
          )}

          <CartButton>
            <button onClick={onAddToCart}>
              Add To Cart <CiShoppingCart />
            </button>
          </CartButton>
        </Payment>

        <ShipmentDetail>
          <StyledShippingBoxWrap>
            <div>
              <h4>Shipping Fee</h4>
              <ul>
                <li>
                  <span>Normal ship - 3 USD</span>
                </li>
                <li>
                  <span>Express ship - 5 USD </span>
                </li>
              </ul>
            </div>
            <div>
              <h4>Expected ship time</h4>
              <ul>
                <li>Ha Noi, Ho Chi Minh city: 1-2 days</li>
                <li>The remaining provinces: 3-5 days</li>
              </ul>
            </div>
          </StyledShippingBoxWrap>
        </ShipmentDetail>
        {data.description && <ProductSingleInformation data={data} />}
      </Detail>
      {variantError && (
        <AlertPopUp
          action={() => setVariantError(false)}
          message={"Please choose the product variant"}
        />
      )}
      {userError && (
        <AlertPopUp action={() => setUserError(false)} message={"Please login first"} />
      )}
      {outOfStockError && (
        <AlertPopUp
          action={() => setOutOfStockError(false)}
          message={"Sorry this product out of stock"}
        />
      )}
      {cartSuccess && (
        <SuccessPopUp
          action={() => setCartSuccess(false)}
          header={"Success add to Cart"}
          message={"Please check you cart "}
        />
      )}
      {cartError && (
        <AlertPopUp action={() => setCartError(false)} header={"Error"} message={errorMessage} />
      )}
    </Container>
  );
}

function EmblaCarousel(props) {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <img src={import.meta.env.VITE_API_IMAGE_PATH + item.imageName} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((item, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function Thumb(props) {
  const { selected, item, onClick } = props;

  return (
    <div className={"embla-thumbs__slide".concat(selected ? " embla-thumbs__slide--selected" : "")}>
      <button onClick={onClick} type="button" className="embla-thumbs__slide__number">
        <Image src={import.meta.env.VITE_API_IMAGE_PATH + item.imageName} />
      </button>
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
  const roundedStars = Math.round(star);
  return (
    <StyledWrapReadStar>
      {[...Array(5)].map((_, index) => (
        <Star key={index} active={index < roundedStars}>
          <FaStar size="15px" />
        </Star>
      ))}
    </StyledWrapReadStar>
  );
}
