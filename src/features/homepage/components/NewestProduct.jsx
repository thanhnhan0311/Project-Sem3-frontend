import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";

import useEmblaCarousel from "embla-carousel-react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import formatDollar from "@/shared/utils/FormatDollar";
import { FaCheck, FaStar } from "react-icons/fa";

const Container = styled.div`
  height: 100%;

  background-color: white;
  border-radius: 15px;
  padding: 1rem;

  .embla_new {
    margin: auto;
    --slide-height: 19rem;
    --slide-spacing: 1rem;
    --slide-size: 100%;
    position: relative;
    height: 100%;
    width: 95%;
  }
  .embla__viewport_new {
    overflow: hidden;
  }
  .embla__container_new {
    backface-visibility: hidden;
    display: flex;
    touch-action: pan-y pinch-zoom;
    margin-left: calc(var(--slide-spacing) * -1);
  }
  .embla__slide_new {
    flex: 0 0 var(--slide-size);
    min-width: 0;
    padding-left: var(--slide-spacing);
  }
  .embla__slide__number_new {
    font-weight: 600;
    height: 100%;
  }
  .embla__controls_new {
    position: absolute;
    width: 100%;
    top: 0;
    margin: auto;

    height: 100%;
    display: flex;
  }
  .embla__buttons_new {
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 100%;
  }
  .embla__button_new {
    -webkit-tap-highlight-color: rgba(var(--text-high-contrast-rgb-value), 0.5);
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    touch-action: manipulation;
    display: inline-flex;
    text-decoration: none;
    cursor: pointer;
    border: 0;
    padding: 0;
    margin: 0;
    box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
    width: 2rem;
    height: 2rem;
    z-index: 1;
    border-radius: 50%;
    color: var(--text-body);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #b7c2cb;
    color: white;
  }

  .embla__button--next_new {
    background-color: #b7c2cb;
    width: 2rem;
    height: 2rem;
    color: white;
  }
  .embla__button_new:disabled {
    color: var(--detail-high-contrast);
  }
  .embla__button__svg_new {
    width: 35%;
    height: 35%;
  }
`;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size: 14px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: fit-content;
  box-sizing: border-box;
`;

const Image = styled.div`
  width: 100%;
  height: 10rem;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Name = styled.div`
  font-size: 15px;
`;

const StyledLink = styled(Link)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  text-decoration: none;
  word-break: break-word;
  max-width: 100%;

  color: #561c8c;

  &:hover {
    color: red;
  }
`;

const Price = styled.div`
  > span:nth-of-type(1) {
    color: #965f58;
    font-size: 16px;
  }

  > span:nth-of-type(2) {
    color: #878787;
    text-decoration: line-through;
    font-weight: 300;
    font-size: 14px;
  }
`;

const StarCount = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5px;
  > span {
    font-size: 12px;
  }
`;

const SalePercent = styled.span``;

const SLIDES = Array.from(Array(3).keys());

const OPTIONS = { align: "start", dragFree: false, loop: false };

function calculatePercentageDifference(price1, price2) {
  let difference = Math.abs(price1 - price2);

  let percentageDifference = (difference / price1) * 100;

  percentageDifference = Math.round(percentageDifference);

  return percentageDifference;
}

const NewestProduct = (props) => {
  const getMinVariant = (product) => {
    const minVariant = product.variants.reduce((min, variant) => {
      return variant.price < min.price ? variant : min;
    }, product.variants[0]);

    return minVariant;
  };

  const { data } = props;
  const options = OPTIONS;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

    resetOrStop();
  }, []);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <Container>
      <section className="embla_new">
        <div className="embla__controls_new">
          <div className="embla__buttons_new">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>

        <div className="embla__viewport_new" ref={emblaRef}>
          <div className="embla__container_new">
            {SLIDES.map((item, index) => (
              <div className="embla__slide_new" key={index}>
                <div className="embla__slide__number_new">
                  <ItemContainer>
                    {data
                      .filter((_, number) => number < (index + 1) * 8 && number >= 8 * index)
                      .map((item, index) => {
                        const minVariant = getMinVariant(item.product);
                        return (
                          <Item key={index}>
                            <Image>
                              <img
                                src={
                                  import.meta.env.VITE_API_IMAGE_PATH +
                                  item.product.productImages[0].imageName
                                }
                              />
                            </Image>
                            <Name>
                              <StyledLink to={`/productdetail?id=${item.product.id}`}>
                                {item.product.name}
                              </StyledLink>
                            </Name>
                            <Price>
                              <span>${formatDollar(minVariant.price)}</span>{" "}
                              <span>
                                {minVariant.salePrice != 0 && (
                                  <span>${formatDollar(minVariant.salePrice)}</span>
                                )}
                              </span>{" "}
                              {minVariant.salePrice != 0 && (
                                <SalePercent>
                                  -{""}
                                  {calculatePercentageDifference(
                                    minVariant.salePrice,
                                    minVariant.price
                                  )}
                                  {""}%
                                </SalePercent>
                              )}
                            </Price>
                            <StarCount>
                              <ReadStar star={item.averageRating} />
                              <span> ({item.ratingCount})</span>
                            </StarCount>
                          </Item>
                        );
                      })}
                  </ItemContainer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default NewestProduct;

function usePrevNextButtons(emblaApi, onButtonClick) {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
}

function PrevButton(props) {
  const { children, ...restProps } = props;

  return (
    <button className="embla__button_new embla__button--prev_new" type="button" {...restProps}>
      <svg className="embla__button__svg" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
        />
      </svg>
      {children}
    </button>
  );
}

function NextButton(props) {
  const { children, ...restProps } = props;

  return (
    <button className="embla__button embla__button--next_new" type="button" {...restProps}>
      <svg className="embla__button__svg_new" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
        />
      </svg>
      {children}
    </button>
  );
}

const Star = styled.p`
  color: ${({ $active }) => ($active ? "#FFC400" : "grey")};
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
        <Star key={index} $active={index < roundedStars}>
          <FaStar size="15px" />
        </Star>
      ))}
    </StyledWrapReadStar>
  );
}
