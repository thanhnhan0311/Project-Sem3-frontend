import React, { useCallback } from "react";
import { PrevButton, NextButton, usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import styled from "styled-components";
import "../assets/css/homepage-embla.css";
import { useNavigate } from "react-router-dom";
const OPTIONS = { align: "start", dragFree: false, loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Image = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;

  .embla_banner {
    width: 100%;
    margin: auto;
    --slide-height: 22rem;
    --slide-spacing: 1rem;
    --slide-size: 100%;
    position: relative;
  }
  .embla__viewport_banner {
    width: 100%;
    overflow: hidden;
  }
  .embla__container_banner {
    backface-visibility: hidden;
    display: flex;
    touch-action: pan-y pinch-zoom;
    margin-left: calc(var(--slide-spacing) * -1);
  }
  .embla__slide_banner {
    flex: 0 0 var(--slide-size);
    min-width: 0;
    padding-left: var(--slide-spacing);
  }
  .embla__slide__number_banner {
    box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
    border-radius: 1.8rem;
    font-size: 4rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--slide-height);
    /* height: 100%; */
  }
  .embla__controls_banner {
    position: absolute;
    width: 100%;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;

    margin: auto;
  }
  .embla__buttons_banner {
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 90%;
  }
  .embla__button_banner {
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
    width: 3.6rem;
    height: 3.6rem;
    z-index: 1;
    border-radius: 50%;
    color: var(--text-body);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .embla__button_banner:disabled {
    color: var(--detail-high-contrast);
  }
  .embla__button__svg_banner {
    width: 35%;
    height: 35%;
  }
`;

const BannerHomePage = (props) => {
  const { data } = props;
  const options = OPTIONS;
  const slides = SLIDES;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  const navigate = useNavigate();

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
      <section className="embla_banner">
        <div className="embla__controls_banner">
          <div className="embla__buttons_banner">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
        <div className="embla__viewport_banner" ref={emblaRef}>
          <div className="embla__container_banner">
            {data.map((image, index) => (
              <div className="embla__slide_banner" key={index}>
                <div className="embla__slide__number_banner">
                  <Image>
                    <img
                      onClick={() => {
                        if (index == 0) {
                          navigate("/listing-page");
                        }
                        if (index == 1) {
                          navigate("/listing-page?categoryId=6");
                        }
                      }}
                      src={image}
                    />
                  </Image>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default BannerHomePage;
