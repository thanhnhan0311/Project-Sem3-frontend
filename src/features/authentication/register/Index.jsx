import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "@/shared/components/Input/TextInput";
import NumberInput from "@/shared/components/Input/NumberInput";
import { useState } from "react";
import { CreateCustomerRequest } from "./api/registerApi";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";

const StyledContainer = styled.div`
  padding: 1rem 3rem;
`;

const StyledHeaderForm = styled.h4`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
`;

const StyledForm = styled.form`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  > p {
    color: red;
  }
`;

const StyledWrapSubmit = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  margin: 0.7rem 0;
`;

const StyledButtonSubmit = styled.button`
  width: 100%;
  height: 40px;
  background-color: #3e6807;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
`;

const StyledBackLogin = styled.button`
  border: none;
  background-color: #ffffff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PasswordRegex = /^[A-Za-z0-9]{6,}$/;

export default function Register({ switchToLogin }) {
  const navigate = useNavigate();
  const createCustomerRequest = CreateCustomerRequest();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [successPopUp, setSuccessPopUp] = useState(false);
  const [errorPopUp, setErrorPopUp] = useState(false);

  const [errors, setErrors] = useState({});

  const onRegister = (ev) => {
    ev.preventDefault();

    if (!EmailRegex.test(email)) {
      setErrors((prev) => {
        return { ...prev, emailError: "Wrong email pattern" };
      });
      return;
    } else {
      setErrors((prev) => {
        return { ...prev, emailError: null };
      });
    }

    if (!PasswordRegex.test(password)) {
      setErrors((prev) => {
        return { ...prev, passwordError: "Wrong password pattern" };
      });
      return;
    } else {
      setErrors((prev) => {
        return { ...prev, passwordError: null };
      });
    }

    if (password != confirmPassword) {
      setErrors((prev) => {
        return { ...prev, cofirmError: "Wrong confirm password" };
      });
      return;
    } else {
      setErrors((prev) => {
        return { ...prev, cofirmError: null };
      });
    }

    if (phoneNumber == "") {
      setErrors((prev) => {
        return { ...prev, phoneError: "Phone number can not be empty" };
      });
      return;
    } else {
      setErrors((prev) => {
        return { ...prev, phoneError: null };
      });
    }

    if (name == "") {
      setErrors((prev) => {
        return { ...prev, nameError: "Phone number can not be empty" };
      });
      return;
    } else {
      setErrors((prev) => {
        return { ...prev, nameError: null };
      });
    }

    const formData = new FormData();

    formData.append("Email", email);
    formData.append("Password", password);
    formData.append("PhoneNumber", phoneNumber);
    formData.append("Name", name);

    createCustomerRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 400) {
          setErrors((prev) => {
            return { ...prev, serverError: response.message };
          });
          setErrorPopUp(true);
          return;
        }

        if (response.status == 200) {
          setSuccessPopUp(true);
        }
      },
    });
  };

  return (
    <StyledContainer>
      <StyledHeaderForm>Register an account</StyledHeaderForm>
      <StyledForm>
        <TextInput state={email} setState={setEmail} placeholder="Email(*)" />
        <p>{errors.emailError}</p>
        <TextInput
          state={password}
          setState={setPassword}
          placeholder="Enter password(*)"
          type="password"
        />
        <p>{errors.passwordError}</p>
        <TextInput
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder="Confirm password(*)"
          type="password"
        />
        <p>{errors.cofirmError}</p>
        <NumberInput state={phoneNumber} setState={setPhoneNumber} placeholder="Phone number(*)" />
        <p>{errors.phoneError}</p>
        <TextInput state={name} setState={setName} placeholder="Name(*)" />
        <p>{errors.nameError}</p>
        <StyledWrapSubmit>
          <StyledBackLogin onClick={switchToLogin}>Back to Login</StyledBackLogin>
          <StyledButtonSubmit onClick={onRegister}>REGISTER</StyledButtonSubmit>
        </StyledWrapSubmit>
      </StyledForm>
      {successPopUp && (
        <SuccessPopUp
          action={() => {
            setSuccessPopUp(false);
            switchToLogin();
          }}
          header={"Success Register"}
          message={"Please check your email for account confirm"}
        />
      )}
      {errorPopUp && (
        <ErrorPopUp
          action={() => setErrorPopUp(false)}
          header={"Error"}
          message={errors.serverError}
        />
      )}
    </StyledContainer>
  );
}
