import React from "react";
import styled from "styled-components";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import arts from "@/shared/assets/images/ArTS.svg";
import { MdLocationPin } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import bct from "./assets/logoSaleNoti.png";
import { FaCcVisa } from "react-icons/fa";
import { BiLogoMastercard } from "react-icons/bi";
import { FaCcJcb } from "react-icons/fa6";

const Container = styled.div`
  background-color: #0272c0;
  min-width: 1280px;
`;

const Content = styled.div`
  color: white;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1rem;
  width: 1280px;
  padding: 2rem 15px;
  margin: 0 auto;
`;

const Img = styled.div`
  width: 6rem;

  > img {
    width: 100%;
    height: 100%;
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  > h4 {
    font-weight: 600;
    font-size: 20px;
  }

  > div {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    text-align: justify;
    margin-left: 2rem;
    gap: 5px;
  }

  & h5 {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 15px;
    font-weight: 500;
  }

  & svg {
    font-size: 20px;
  }

  & p {
    font-size: 14px;
  }
`;

const About = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  > h4 {
    font-weight: 600;
    font-size: 20px;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 13px;
  }
`;

const Policy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  > h4 {
    font-weight: 600;
    font-size: 20px;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 13px;
  }
`;

const Subscribe = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  > h4 {
    font-weight: 600;
    font-size: 20px;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Input = styled.div`
  display: flex;
  flex-direction: row !important;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

  background-color: #f7d391;
  > input {
    padding-left: 5px;
    border: none;
    outline: none;
    padding: 6px 5px;
  }

  label {
    color: #0057a0;
    font-size: 600;
  }
`;

const Payment = styled.div`
  display: flex;
  flex-direction: row !important;

  & svg {
    font-size: 2rem;
  }
`;

export default function Footer() {
  return (
    <Container>
      <Content>
        <Contact>
          <h4>Contact Information</h4>

          <p>
            Welcome to Arts, your one-stop shop for a wide range of products including arts, gift
            articles, greeting cards, dolls, files, handbags, wallets, beauty products.
          </p>
          <h5>
            <MdLocationPin /> Store Locator
          </h5>
          <div>
            <p>590 CMT8, P.11, Q.3</p>
            <p>391A Nam Kỳ Khởi Nghĩa, P.Võ Thị Sáu, Q.3</p>
            <p>62 Đường 36, KDC Vạn Phúc, P.Hiệp Bình Phước, Tp.Thủ Đức</p>
          </div>
          <h5>
            <FaPhoneVolume /> 0911 789 450 - 0931313329
          </h5>
          <h5>
            <IoMdMail /> arts@shop.com
          </h5>
        </Contact>
        <About>
          <h4>About Us</h4>
          <div>
            <StyledLink to={"/about-us"}>About us</StyledLink>
            <StyledLink to={"/FAQ"}>FAQ</StyledLink>
          </div>
        </About>
        <Policy>
          <h4>Policy</h4>
          <div>
            <StyledLink to={"/privacy"}>Info Privacy</StyledLink>
            <StyledLink to={"/purchase-payment"}>Purchase Pay</StyledLink>
            <StyledLink to={"/return"}>Return</StyledLink>
            <StyledLink to={"/warranty"}>Warranty</StyledLink>
          </div>
        </Policy>
        <Subscribe>
          <h4>Subscribe to Newsletter</h4>
          <Input>
            <input placeholder="Input Your Email" />
            <label>SEND</label>
          </Input>
          <h5>Payment Methods</h5>
          <Payment>
            <FaCcVisa />
            <BiLogoMastercard />
            <FaCcJcb />
          </Payment>
          <img src={bct} />
        </Subscribe>
      </Content>
    </Container>
  );
}
