import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaUser, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import Login from "@/features/authentication/login/Index";
import Register from "@/features/authentication/register/Index";
import PopUp from "@/shared/components/PopUp/PopUp";
import logo from "@/shared/assets/images/Art_Logo.png";
import XButton from "@/shared/components/Button/XButton";
import { FaHome } from "react-icons/fa";
import { CustomerRequest } from "@/shared/api/customerApi";
import { FaSortDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdCurrencyExchange } from "react-icons/md";
import { ReadCategoryRequest } from "@/shared/api/categoryApi";
import { readCategoriesData } from "@/shared/utils/readCategoriesData";
import arts from "@/shared/assets/images/ArTS.svg";
import { GetCartQuantityRequest } from "./api/cartQuantityApi";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { SearchProductRequest } from "./api/searchApi";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import { AiOutlineImport } from "react-icons/ai";
import formatDollar from "@/shared/utils/FormatDollar";
import calculatePercentDifference from "@/shared/utils/calculatePercentDifference";
import { FaCheck, FaStar } from "react-icons/fa";

const StyledContainer = styled.div`
  background-color: #0272c0;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
  min-width: 1280px;
`;

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 9.5fr;
  column-gap: 1rem;
  align-items: center;

  width: 1280px;
  padding: 15px 0;
  margin: auto;
`;

const StyledContainerLogo = styled.div`
  width: 7.5rem;
  height: 5rem;
  cursor: pointer;
`;

const StyledLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: auto;
  position: relative;
`;

const StyledInputSearch = styled.input`
  height: 2.4rem;
  width: 100%;
  border-radius: 1.5rem;
  border: none;
  padding-left: 2rem;
  box-sizing: border-box;

  &:focus,
  &:hover {
    outline: none;
  }
`;

const StyledHeaderCustomer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;

  & svg {
    display: block;
    width: 1.4rem;
    height: 1.4rem;
    color: white;
    cursor: pointer;
  }

  > div {
    position: relative;
  }
`;

const StyedPopUp = styled(PopUp)`
  width: 450px;
  padding: 0;

  > div:nth-of-type(1) {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledXButton = styled(XButton)`
  background-color: white;
  transform: translate(50%, -30%);

  &:hover {
    background-color: white;
  }
`;

const UserDropDown = styled.div`
  position: absolute;
  display: none;
  width: 12rem;
  transform: translate(-9rem, 0);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5px;

  > a {
    background-color: white;
    width: 100%;
    border: none;
    cursor: pointer;
    padding: 10px 2rem;
    text-decoration: none;

    &:hover {
      background-color: #f5f5fa;
    }
  }

  &:hover {
    display: flex;
    flex-direction: column;
  }
`;

const UserContainer = styled.div`
  display: flex;
  color: white;
  cursor: pointer;

  &:hover + div {
    display: flex;
    flex-direction: column;
  }
`;

const Exchange = styled.div`
  background-color: #0057a0;
  display: flex;
  align-items: center;
  justify-content: center;
  > h4 {
    cursor: pointer;
    padding: 10px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
    color: white;
    > span {
      color: #808080;
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 700;
      font-size: 18px;
    }
  }
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
  column-gap: 1rem;
`;

const Button = styled.button`
  background-color: inherit;
  border: none;
  color: white;
  cursor: pointer;
`;

const Cart = styled(Link)`
  position: relative;
`;

const CartQuantity = styled.span`
  position: absolute;
  background-color: #ff424f;
  font-size: 12px;
  top: 0;
  right: 0;
  border-radius: 50%;
  padding: 0 6px;
  font-weight: 700;
  color: white;
  transform: translate(10px, -10px);
`;

const SearchContainer = styled.div`
  position: absolute;
  background-color: white;
  min-height: 200px;
  width: 100%;
  top: 0;
  transform: translateY(40px);
  z-index: 1;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 3;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: 1rem;
`;

const Image = styled.div`
  width: 5rem;
  height: 5rem;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ItemContent = styled.div``;

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

const SalePercent = styled.span``;

export default function UserNavbar() {
  const searchRef = useRef();
  const searchContainerRef = useRef();
  const readCategoryRequest = ReadCategoryRequest();
  const getCartQuantityRequest = GetCartQuantityRequest();
  const [searchValue, setSearchValue] = useState("");
  const searchProductRequest = SearchProductRequest(searchValue);
  const [onSearchActive, setOnSearchActive] = useState(false);

  const customerRequest = CustomerRequest();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();

  const switchToRegister = () => {
    setIsLoginForm(false);
  };

  const switchToLogin = () => {
    setIsLoginForm(true);
  };

  useEffect(() => {
    const onMouseDownEvent = (ev) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(ev.target) &&
        !searchRef.current.contains(ev.target)
      ) {
        setOnSearchActive(false);
      }
    };

    document.addEventListener("mousedown", onMouseDownEvent);

    return () => {
      document.removeEventListener("mousedown", onMouseDownEvent);
    };
  }, []);

  const getMinVariant = (product) => {
    const minVariant = product.variants.reduce((min, variant) => {
      return variant.price < min.price ? variant : min;
    }, product.variants[0]);

    return minVariant;
  };

  return (
    <>
      <StyledContainer>
        <StyledHeader>
          <StyledContainerLogo onClick={() => navigate("/")}>
            <StyledLogo src={arts} alt="Logo" />
          </StyledContainerLogo>
          <Main>
            <StyledSearchBar>
              <StyledInputSearch
                ref={searchRef}
                value={searchValue}
                onFocus={() => setOnSearchActive(true)}
                onChange={(ev) => setSearchValue(ev.target.value)}
                type="text"
                placeholder="Search desired products"
              />
              {searchValue != "" && onSearchActive && (
                <SearchContainer ref={searchContainerRef}>
                  {searchProductRequest.isLoading && <WaitingIcon />}
                  {searchProductRequest.isSuccess &&
                    searchProductRequest.data.data.map((item, index) => {
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
                          <div>
                            <StyledNameLink to={`/productdetail?id=${item.product.id}`}>
                              {item.product.name}
                            </StyledNameLink>
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
                                  {calculatePercentDifference(
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
                          </div>
                        </Item>
                      );
                    })}
                </SearchContainer>
              )}
            </StyledSearchBar>
            <StyledHeaderCustomer>
              <FaHome
                onClick={() => {
                  navigate("/");
                }}
              />
              <div>
                <UserContainer>
                  {customerRequest.isSuccess ? (
                    <Avatar
                      round
                      size="2rem"
                      name={customerRequest.data.data.fullname}
                      src={import.meta.env.VITE_API_IMAGE_PATH + customerRequest.data.data.avatar}
                    />
                  ) : (
                    <FaUser
                      onClick={() => {
                        if (customerRequest.isError || customerRequest.data == null) {
                          setIsPopUpVisible(true);
                          setIsLoginForm(true);
                        }
                      }}
                    />
                  )}
                  {customerRequest.isSuccess && <FaSortDown />}
                </UserContainer>
                {customerRequest.isSuccess && (
                  <UserDropDown>
                    <Link to={"/account/account-information"}>Account detail</Link>
                    <Link to={"/account/order"}>My order</Link>
                    <Link
                      onClick={() => {
                        localStorage.removeItem("ACCESS_TOKEN");
                        customerRequest.refetch();
                        getCartQuantityRequest.refetch();
                      }}
                    >
                      Logout
                    </Link>
                  </UserDropDown>
                )}
              </div>
              <Cart to="/cart">
                <FaShoppingCart />
                {getCartQuantityRequest.isSuccess && (
                  <CartQuantity>{getCartQuantityRequest.data.data}</CartQuantity>
                )}
              </Cart>
            </StyledHeaderCustomer>
            <div>
              {readCategoriesData(readCategoryRequest).map((item, key) => {
                return (
                  <Button onClick={() => navigate(`/listing-page?categoryId=${item.id}`)} key={key}>
                    {item.name}
                  </Button>
                );
              })}
            </div>
          </Main>
        </StyledHeader>
        <Exchange>
          <h4 onClick={() => navigate("return")}>
            <span>
              <MdCurrencyExchange />7 Days
            </span>
            Change of Mind Policy
          </h4>
        </Exchange>
      </StyledContainer>
      {isPopUpVisible && (
        <StyedPopUp action={() => {}}>
          <div>
            <StyledXButton action={() => setIsPopUpVisible(false)} />
          </div>
          {isLoginForm ? (
            <Login switchToRegister={switchToRegister} action={() => setIsPopUpVisible(false)} />
          ) : (
            <Register switchToLogin={switchToLogin} />
          )}
        </StyedPopUp>
      )}
    </>
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
  return (
    <StyledWrapReadStar>
      {[...Array(5)].map((_, index) => (
        <Star key={index} $active={index < star}>
          <FaStar size="15px" />
        </Star>
      ))}
    </StyledWrapReadStar>
  );
}
