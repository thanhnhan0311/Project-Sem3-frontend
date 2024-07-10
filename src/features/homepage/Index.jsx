import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import { CustomerRequest } from "@/shared/api/customerApi";
import { VerifyAccountFn } from "./api/verifyAccount";
import BannerHomePage from "./components/BannerHomePage";
import hundred from "./assets/images/100.jpg";
import delivery from "./assets/images/delivery.jpg";
import exchange from "./assets/images/exchange.jpg";
import contact from "./assets/images/image.png";
import styled from "styled-components";
import newbanner from "./assets/images/NewArrival.png";
import bag from "./assets/images/bagimage.png";
import ship from "./assets/images/ship.png";
import homebanner from "./assets/images/experience.png";
import { ReadCategoryRequest } from "@/shared/api/categoryApi";
import { readCategoriesData } from "@/shared/utils/readCategoriesData";
import { Link } from "react-router-dom";
import { IoColorPaletteOutline } from "react-icons/io5";
import { AiOutlineGift } from "react-icons/ai";
import { IoMdCard } from "react-icons/io";
import { MdToys } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { GetNewestProductRequest } from "./api/productHomePageApi";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import NewestProduct from "./components/NewestProduct";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import { GetBestSellerRequest } from "./api/productHomePageApi";
import BestSellerProduct from "./components/BestSellerProduct";
import bestSellerBanner from "./assets/images/Subheading.png";
import { GetProductSuggestionRequest } from "./api/productHomePageApi";
import formatDollar from "@/shared/utils/FormatDollar";
import calculatePercentDifference from "@/shared/utils/calculatePercentDifference";
import { FaCheck, FaStar } from "react-icons/fa";

const Container = styled.div`
  width: 1230px;
  padding: 15px;
  margin: 1rem auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const Policy = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  background-color: white;
  padding: 1rem 0;
  border-radius: 5px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 5px;
  }

  & p {
    font-size: 13px;
  }
`;

const PolicyImage = styled.div`
  width: 3rem;
  height: 3rem;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NewProduct = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr !important;
  gap: 2rem;
`;

const HomeBanner = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;

  > div:nth-of-type(2) {
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-left: 1rem;
  color: rgb(33, 37, 41, 0.7);
  font-size: 16px;
  font-weight: 600;

  &:hover > span {
    color: red;
  }

  & svg {
    font-size: 18px;
  }
`;

const Category = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;

  > * {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    flex: 1;
    padding: 10px 0;
  }
`;

const BestSeller = styled.div`
  > div:nth-of-type(1) {
    width: 100%;
    height: 65px;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const BestSellerContainer = styled.div``;

const Suggestion = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;

  > h4 {
    font-size: 20px;
    font-weight: 800;
    color: #0057a0;
    width: 100%;
    border-bottom: 3px solid #0272c0;
    text-align: center;
    padding: 8px;
  }

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ItemContainer = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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

const StyledNameLink = styled(Link)`
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

const ShowMoreButton = styled.div`
  margin: 1rem 0;
  width: 100%;

  display: flex;
  justify-content: center;
  > button {
    padding: 0.8rem 5rem;
    border-radius: 5px;
    border: 1px solid #0a68ff;
    background-color: white;
    cursor: pointer;
    color: #0a68ff;
    &:hover {
      background-color: #d7e3fb;
    }
  }
`;

const SalePercent = styled.span``;

export default function Homepage() {
  const getProductSuggestionRequest = GetProductSuggestionRequest(15);
  const [searchParams, setSearchParams] = useSearchParams();
  const verifyAccountFn = VerifyAccountFn();
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [errorPopUp, setErrorPopUp] = useState(false);
  const customerRequest = CustomerRequest();
  const readCategoryRequest = ReadCategoryRequest();
  const getNewestProductRequest = GetNewestProductRequest();
  const getBestSellerRequest = GetBestSellerRequest();

  const getMinVariant = (product) => {
    const minVariant = product.variants.reduce((min, variant) => {
      return variant.price < min.price ? variant : min;
    }, product.variants[0]);

    return minVariant;
  };

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      verifyAccountFn.mutate(
        { token },
        {
          onSuccess: (response) => {
            if (response.status == 200) {
              setSuccessPopUp(true);
            }
          },
          onError: (error) => {
            setErrorPopUp(true);
          },
        }
      );
    }
  }, []);

  return (
    <Container>
      <Content>
        <HomeBanner>
          <Category>
            {readCategoriesData(readCategoryRequest).map((item, index) => {
              return (
                <StyledLink to={`/listing-page?categoryId=${index + 1}`} key={index}>
                  {item.name == "Gift Articles" && <AiOutlineGift />}
                  {item.name == "Greeting Cards" && <IoMdCard />}
                  {item.name == "Dolls" && <MdToys />}
                  {item.name == "Files" && <AiOutlineFileText />}
                  {item.name == "Hand Bags" && <FaShoppingBag />}
                  {item.name == "Wallets" && <FaWallet />}
                  {item.name == "Arts" && <IoColorPaletteOutline />} <span>{item.name}</span>
                </StyledLink>
              );
            })}
          </Category>
          <div>
            <BannerHomePage data={[homebanner, bag, ship]} />
          </div>
        </HomeBanner>
        <BestSeller>
          <div>
            <img src={bestSellerBanner} />
          </div>
          <BestSellerContainer>
            {getBestSellerRequest.isLoading && <WaitingIcon />}

            {getBestSellerRequest.isSuccess && (
              <BestSellerProduct data={getBestSellerRequest.data.data} />
            )}
          </BestSellerContainer>
        </BestSeller>
        <NewProduct>
          <div>
            <img src={newbanner} />
          </div>
          <div>
            {getNewestProductRequest.isSuccess && (
              <NewestProduct data={getNewestProductRequest.data.data} />
            )}
            {getNewestProductRequest.isLoading && <WaitingIcon />}
          </div>
        </NewProduct>
        <Suggestion>
          <h4>RECOMMENDED</h4>
          <ItemContainer>
            {getProductSuggestionRequest.isLoading && <WaitingIcon />}
            {getProductSuggestionRequest.isSuccess &&
              getProductSuggestionRequest.data.pages.map((page, pageIndex) =>
                page.data.map((product, productIndex) => {
                  const minVariant = getMinVariant(product.product);
                  return (
                    <Item key={productIndex}>
                      <Image>
                        <img
                          src={
                            import.meta.env.VITE_API_IMAGE_PATH +
                            product.product.productImages[0].imageName
                          }
                        />
                      </Image>
                      <Name>
                        <StyledNameLink to={`/productdetail?id=${product.product.id}`}>
                          {product.product.name}
                        </StyledNameLink>
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
                            {calculatePercentDifference(minVariant.salePrice, minVariant.price)}
                            {""}%
                          </SalePercent>
                        )}
                      </Price>
                      <StarCount>
                        <ReadStar star={product.averageRating} />
                        <span> ({product.ratingCount})</span>
                      </StarCount>
                    </Item>
                  );
                })
              )}
          </ItemContainer>
          {getProductSuggestionRequest.isSuccess &&
            getProductSuggestionRequest.data.pageParams.length <
              getProductSuggestionRequest.data.pages[0].totalPages && (
              <ShowMoreButton>
                <button
                  onClick={() => {
                    getProductSuggestionRequest.fetchNextPage();
                  }}
                >
                  Show More
                </button>
              </ShowMoreButton>
            )}
        </Suggestion>
        <Policy>
          <div>
            <PolicyImage>
              <img src={hundred} />
            </PolicyImage>
            <h4>Authentic Products</h4>
            <p>A wide range of products at the best prices from reputable brands</p>
          </div>
          <div>
            <PolicyImage>
              <img src={delivery} />
            </PolicyImage>
            <h4>Nationwide Delivery</h4>
            <p>Get Your Orders Delivered Nationwide in No Time</p>
          </div>
          <div>
            <PolicyImage>
              <img src={exchange} />
            </PolicyImage>
            <h4>7-day free returns</h4>
            <p>Attractive after-sales policy, always ensuring customer rights</p>
          </div>
          <div>
            <PolicyImage>
              <img src={contact} />
            </PolicyImage>
            <h4>Free consultation on issues</h4>
            <p>Contact Hotline 0911 789 450 for consultation</p>
          </div>
        </Policy>
      </Content>
      {successPopUp && (
        <SuccessPopUp
          action={() => {
            setSuccessPopUp(false);
            searchParams.delete("token");
            setSearchParams(searchParams);
          }}
          header={"Success Verify"}
          message={"Welcome"}
        />
      )}
      {errorPopUp && (
        <ErrorPopUp
          action={() => {
            setErrorPopUp(false);
            searchParams.delete("token");
            setSearchParams(searchParams);
          }}
          header={"Erorr email"}
          message={"Verify Fail"}
        />
      )}
    </Container>
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
