import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
const fadeAndRotateAnimation = keyframes`
  0% {
    transform: translateX(100%) rotate(0deg);
    opacity: 0;
  }
  100% {
    transform: translateX(0) rotate(360deg);
    opacity: 1;
  }
`;
const zoomInAnimation = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;
const StyleInforPrivacy = styled.div`
  margin: 3rem 1rem;
  line-height: 1.7rem;
  color: #3c3c3c;
  text-align: justify;
  max-width: 1280px;
  padding: 15px;
  margin: 1rem auto;

  & div.policy-section {
    animation: ${zoomInAnimation} 2s ease-in-out;
    margin: 0 3rem;
    color: #3c3c3c;
    p {
      margin: 0 2rem;
    }
    ul {
      margin: 0 2rem;
    }
  }
`;

const StyleHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  h2 {
    animation: ${fadeAndRotateAnimation} 2s ease-in-out;
    color: #54269a;
    margin: 0 auto;
    font-size: 2rem;
  }
  img {
    width: 10rem;
  }
`;

const InforPrivacy = () => {
  return (
    <StyleInforPrivacy>
      <StyleHeader>
        <h2>Information Privacy Policy</h2>
        <img src="src/features/aboutUs-FAQ/assets/vsgif_com_minions-gif_.3581880.gif" />
      </StyleHeader>
      <div className="policy-section">
        <h4>1. Purpose and Scope of Collection</h4>
        <p>
          Arts.com does not sell, share, or exchange customer personal information collected on the
          website with any third party.
        </p>
        <p>The personal information collected will only be used within the company.</p>
        <p>
          When you contact us to register for a service, the personal information that Arts.com
          collects includes:
        </p>
        <ul>
          <li>Full name</li>
          <li>Address</li>
          <li>Phone number</li>
          <li>Email</li>
        </ul>
        <p>In addition to personal information, service-related information includes:</p>
        <ul>
          <li>Product name</li>
          <li>Quantity</li>
          <li>Delivery time</li>
        </ul>
      </div>

      <div className="policy-section">
        <h4>2. Scope of Use of Information</h4>
        <p>
          The personal information collected will only be used by Arts.com within the company and
          for one or all of the following purposes:
        </p>
        <ul>
          <li>Customer support</li>
          <li>Providing information related to the service</li>
          <li>
            Processing orders and providing services and information through our website as per your
            request
          </li>
          <li>
            We may send you information about new products, services, upcoming events, or
            recruitment information if you register to receive email notifications.
          </li>
          <li>
            Additionally, we will use the information you provide to manage your customer account,
            confirm and carry out financial transactions related to your online payments.
          </li>
        </ul>
      </div>

      <div className="policy-section">
        <h4>3. Information Storage Time</h4>
        <p>
          For personal information, Arts.com will only delete this data if requested by the
          customer. Customers can request deletion by sending an email to{" "}
          <a href="mailto:cskh@arts.com">cskh@arts.com</a>.
        </p>
      </div>

      <div className="policy-section">
        <h4>4. Individuals or Organizations with Access to Personal Information</h4>
        <p>
          Individuals or organizations that can access customers' personal information fall into one
          of the following cases:
        </p>
        <ul>
          <li>ARTS Company</li>
          <li>
            Partners with contracted agreements to perform part of the services provided by CÔNG TY
            CP MỸ PHẨM THIÊN NHIÊN ARTS. These partners will receive information according to the
            contract agreement (possibly part or all of the information depending on the contract
            terms) to support users in using the services provided by the company.
          </li>
        </ul>
      </div>

      <div className="policy-section">
        <h4>5. Address of the Unit Collecting and Managing Personal Information</h4>
        <p>
          ARTS COMPANY
          <br />
          Address: No. 590, Cach Mang Thang Tam, District 10, HoChiMinh.
          <br />
          Phone: 1900999999
          <br />
          Website: <a href="http://arts.com">Arts.com</a>
          <br />
          Email: <a href="mailto:cskh@arts.com">cskh@arts.com</a>
        </p>
      </div>

      <div className="policy-section">
        <h4>6. Means and Tools for Users to Access and Edit Their Personal Data</h4>
        <p>
          Arts.com does not collect customer information through the website. Personal customer
          information is collected through email inquiries for product and service purchases sent to
          our email:
          <a href="mailto:cskh@arts.com">cskh@arts.com</a> or through product purchase inquiries via
          phone at 1900999999.
        </p>
        <p>
          You can contact the above email address and phone number to request Arts.com to edit your
          personal data.
        </p>
      </div>

      <div className="policy-section">
        <h4>
          7. Mechanism for Receiving and Resolving Consumer Complaints Related to Personal
          Information Being Used for Wrong Purposes or Outside the Announced Scope
        </h4>
        <p>
          At Arts.com, protecting your personal information is very important. You are assured that
          the information provided to us will be kept confidential. Arts.com commits not to share,
          sell, or rent your personal information to any other person. Arts.com commits to only use
          your information in the following cases:
        </p>
        <ul>
          <li>Improving the quality of customer service</li>
          <li>Resolving disputes and complaints</li>
          <li>When requested by law enforcement agencies</li>
        </ul>
        <p>
          Arts.com understands that your rights in protecting personal information are also our
          responsibility. Therefore, in any case of inquiries or contributions related to Arts.com's
          privacy policy, and related to personal information being used for wrong purposes or
          outside the announced scope, please contact the hotline 1900999999 or email:{" "}
          <a href="mailto:cskh@arts.com">cskh@arts.com</a>.
        </p>
      </div>
    </StyleInforPrivacy>
  );
};

export default InforPrivacy;
