import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaDollarSign } from "react-icons/fa6";
import dchc from "@/shared/data/dchc";
import ChangeAddressPopUp from "./ChangeAddressPopUp";
import formatDollar from "@/shared/utils/FormatDollar";
import { Link } from "react-router-dom";
import AlertPopUp from "@/shared/components/PopUp/AlertPopUp";
import { useNavigate } from "react-router-dom";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import AddressPopUp from "@/features/account-address/components/AddressPopUp";

const PaymentComponentStyle = styled.div`
  padding-top: 20px;
  position: sticky;
  top: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .price-summary {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    margin-bottom: 10px;
    border-radius: 4px;
    .price-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 20px;
      border: solid thin #efefef;
    }
    .price-total {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 20px;
      font-size: 15px;
      > span:nth-of-type(1) {
        color: rgba(0, 0, 0, 0.7);
        font-weight: 200;
      }

      > span:nth-of-type(2) {
        display: flex;
        font-size: 1.4rem;
        color: red;

        > svg {
          color: black;
          font-size: 17px;
          margin-top: 5px;
          color: red;
        }
      }
    }
  }
  .btn-order {
    cursor: pointer;
    width: 100%;
    background-color: #ff424e;
    border: none;
    color: white;
    padding: 0.6rem;
    border-radius: 5px;
    font-size: 16px;
    text-decoration: none;
    text-align: center;

    input {
      border: 0;
      outline: 0;
    }
    input:focus {
      outline: none !important;
    }
  }
`;

const AddressContainer = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;

  > div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    > span:nth-of-type(1) {
      font-size: 15px;
      color: rgba(0, 0, 0, 0.7);
    }

    > span:nth-of-type(2) {
      color: #2578ff;
      cursor: pointer;
      font-size: 13px;
    }
  }

  > div:nth-of-type(2) {
    margin-top: 15px;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    gap: 5px;
    font-family: "Open Sans";
  }

  > div:nth-of-type(3) {
    font-family: "Open Sans";
    color: rgba(0, 0, 0, 0.6);
  }
`;

export default function PaymentComponent(props) {
  const navigate = useNavigate();
  const [address, setAddress] = useState(props.address.find((item) => item.isDefault == true));
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [paymentError, setPaymentError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const [changeAddress, setChangeAddress] = useState(false);

  useEffect(() => {
    if (address) {
      const province = dchc.data.find((item) => item.level1_id == address.province);
      setProvince(province.name);
      const district = province.level2s.find((item) => item.level2_id == address.district);
      setDistrict(district.name);
      const ward = district.level3s.find((item) => item.level3_id == address.ward);
      setWard(ward.name);
    }
  }, [address]);

  const onMakePayment = () => {
    if (address == null) {
      setAddressError(true);
      return;
    }
    if (props.data.filter((item) => item.isChecked == true).length == 0) {
      setPaymentError(true);
    } else {
      navigate("/payment");
    }
  };

  return (
    <>
      <PaymentComponentStyle>
        {address && (
          <AddressContainer>
            <div>
              <span>Delivery to</span>
              <span onClick={() => setChangeAddress(true)}>Change</span>
            </div>
            <div>
              <span>{address.fullName} | </span>
              <span>{address.phoneNumber}</span>
            </div>
            <div>
              <span>Address: </span>
              <span>
                {province}, {district}, {ward}, {address.addressDetail}
              </span>
            </div>
          </AddressContainer>
        )}
        {!address && (
          <AddressContainer>
            <div>
              <span>Delivery to</span>
              <span onClick={() => setChangeAddress(true)}>Add new</span>
            </div>
          </AddressContainer>
        )}
        <div className="price-summary">
          <div className="price-total">
            <span>Total price</span>
            <span>
              <FaDollarSign /> {formatDollar(props?.totalAmount)}
            </span>
          </div>
        </div>
        <button onClick={onMakePayment} className="btn-order">
          Make Payment ({props.data.filter((item) => item.isChecked == true).length})
        </button>
      </PaymentComponentStyle>
      {changeAddress && (
        <ChangeAddressPopUp
          state={address}
          setState={setAddress}
          action={() => setChangeAddress(false)}
        />
      )}
      {paymentError && (
        <AlertPopUp
          message={"You did not select any product"}
          action={() => setPaymentError(false)}
        />
      )}
      {addressError && (
        <ErrorPopUp action={() => setAddressError(false)} message={"You dont have any address"} />
      )}
    </>
  );
}
