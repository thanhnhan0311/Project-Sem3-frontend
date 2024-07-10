import React, { useState, useRef } from "react";
import Avatar from "react-avatar";
import styled from "styled-components";
import { RiArrowDropDownLine } from "react-icons/ri";
import TextInput from "@/shared/components/Input/TextInput";
import SelectInput from "@/shared/components/Input/SelectInput";
import NumberInput from "@/shared/components/Input/NumberInput";
import { CustomerRequest } from "@/shared/api/customerApi";
import { ChangeAvatarRequest } from "./api/accountInfoApi";
import AlertPopUp from "@/shared/components/PopUp/AlertPopUp";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import { useEffect } from "react";
import { EditUserInfoRequest } from "./api/accountInfoApi";
import CustomInput from "../admin-product-detail/components/Input/CustomInput";

import { useQueryClient } from "@tanstack/react-query";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h3 {
    font-size: 20px;
    font-weight: 100;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-color: white;
  padding: 2rem 1rem;
  column-gap: 3rem;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > div {
    display: flex;
    align-items: center;

    > span {
      width: 30%;
      text-align: right;
      padding-right: 1rem;
    }

    > input {
      width: 70%;
    }
  }

  & span {
    color: rgba(0, 0, 0, 0.7);
    font-size: 14px;
  }
`;

const Gender = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Image = styled.div`
  padding: 1rem;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  align-self: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  > button {
    background-color: white;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    padding: 0.5rem 0.9rem;
    cursor: pointer;
  }

  > p {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.6);
  }

  > input {
    display: none;
  }
`;

const Date = styled.div`
  display: flex;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;

  > button {
    background-color: #0b74e5;
    border: none;
    color: white;
    padding: 0.4rem 2rem;
    cursor: pointer;
  }
`;

export default function AccountInformation() {
  const changeAvatarRequest = ChangeAvatarRequest();
  const inputRef = useRef();
  const queryClient = useQueryClient();

  const editUserInfoRequest = EditUserInfoRequest();
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [days, setDays] = useState([]);
  const customerRequest = CustomerRequest();
  const [name, setName] = useState(customerRequest.data.data.fullname);
  const [phoneNumber, setPhoneNumber] = useState(customerRequest.data.data.phoneNumber);
  const [gender, setGender] = useState(customerRequest.data.data.gender || "male");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleImageChange = (ev) => {
    const allowedFileTypes = ["image/jpeg", "image/png"];

    if (ev.target.files.length > 0) {
      const isValidFileType = Array.from(ev.target.files).every((file) =>
        allowedFileTypes.includes(file.type)
      );

      if (!isValidFileType) {
        setImageError(true);
        return;
      }

      const formData = new FormData();
      formData.append("image", ev.target.files[0]);

      changeAvatarRequest.mutate(formData, {
        onSuccess: (response) => {
          if (response.status == 200) {
            queryClient.invalidateQueries({ queryKey: ["customer"] });
          }
        },
      });

      ev.target.files = null;
    }
  };

  const onClickInput = () => {
    inputRef.current.click();
  };

  const months = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: i + 1 }));
  const currentYear = new window.Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => ({
    value: currentYear - i,
    label: currentYear - i,
  }));

  useEffect(() => {
    const daysInMonth = (month, year) => {
      return new window.Date(year, month, 0).getDate();
    };

    if (month != null && year != null) {
      console.log(month, year);
      const numberOfDays = daysInMonth(month.value, year.value);
      const daysOption = Array.from({ length: numberOfDays }, (_, i) => ({
        value: i + 1,
        label: i + 1,
      }));
      setDays(daysOption);
      if (!daysOption.find((item) => item.value == day?.value)) {
        setDay(daysOption[0]);
      }
    } else {
      if (customerRequest.data.data.dob) {
        const date = new window.Date(customerRequest.data.data.dob);
        setMonth(months.find((item) => item.value == date.getMonth() + 1));
        setYear(years.find((item) => item.value == date.getFullYear()));
        const numberOfDays = daysInMonth(date.getMonth(), date.getFullYear());
        const daysOption = Array.from({ length: numberOfDays }, (_, i) => ({
          value: i + 1,
          label: i + 1,
        }));
        setDays(daysOption);
        setDay(daysOption.find((item) => item.value == date.getDate()));
      }
    }
  }, [month, year]);

  const handleSubmit = () => {
    if (name.trim().length == 0 || phoneNumber.trim().length == 0) {
      setErrorMessage("Please fill in all the field");
      setError(true);
    }

    if (phoneNumber.length < 7) {
      setErrorMessage("Phone number need to have atleast 7 number");
      setError(true);
      return;
    }

    if (day && month && year) {
      const selectedDate = new window.Date(year.value, month.value - 1, day.value);
      const today = new window.Date();

      if (selectedDate > today) {
        setErrorMessage("Date of birth cannot be in the future");
        setError(true);
        return;
      }
    }

    const formData = new FormData();

    formData.append("FullName", name);
    formData.append("Gender", gender);
    formData.append("PhoneNumber", phoneNumber);
    formData.append("Dob", `${year.value}-${month.value}-${day.value}`);

    editUserInfoRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 400) {
          setErrorMessage("Phone number exist!");
          setError(true);
          return;
        }

        if (response.status == 200) {
          setSuccess(true);
          queryClient.invalidateQueries({ queryKey: ["customer"] });
          return;
        }
      },
    });
  };

  return (
    <Container>
      <h3>Account information</h3>
      <Content>
        <Detail>
          <div>
            <span>Full Name</span>
            <TextInput state={name} setState={setName} />
          </div>

          <div>
            <span>Phone Number</span>
            <NumberInput state={phoneNumber} setState={setPhoneNumber} />
          </div>

          <div>
            <span>Gender</span>
            <Gender>
              <input
                onChange={(ev) => {
                  setGender(ev.target.value);
                }}
                type="radio"
                name="gender"
                value={"male"}
                checked={gender == "male"}
              />
              <label>Male</label>
              <input
                onChange={(ev) => {
                  setGender(ev.target.value);
                }}
                type="radio"
                name="gender"
                value={"female"}
                checked={gender == "female"}
              />
              <label>Female</label>
              <input
                onChange={(ev) => {
                  setGender(ev.target.value);
                }}
                type="radio"
                name="gender"
                value={"other"}
                checked={gender == "other"}
              />
              <label>Other</label>
            </Gender>
          </div>
          <div>
            <span>Date of Birth</span>
            <Date>
              <SelectInput
                state={day}
                setState={setDay}
                options={days}
                placeholder="Day"
                isDisabled={!month || !year}
              />
              <SelectInput state={month} setState={setMonth} options={months} placeholder="Month" />
              <SelectInput state={year} setState={setYear} options={years} placeholder="Year" />
            </Date>
          </div>
          <div>
            <span></span>
            <ButtonContainer>
              <button onClick={handleSubmit}>Save</button>
            </ButtonContainer>
          </div>
        </Detail>
        <Image>
          <Avatar
            src={import.meta.env.VITE_API_IMAGE_PATH + customerRequest.data.data.avatar}
            name={customerRequest.data.data.fullname}
            round
            size="150"
          />
          <button onClick={onClickInput}>Choose Image</button>
          <p>
            <span>Maximum file size: 1 MB</span> <span>Formats: .JPEG, .PNG</span>
          </p>
          <input onChange={handleImageChange} ref={inputRef} type="file" />
        </Image>
      </Content>
      {error && <ErrorPopUp message={errorMessage} action={() => setError(false)} />}
      {success && (
        <SuccessPopUp message={"Update information success"} action={() => setSuccess(false)} />
      )}
    </Container>
  );
}
