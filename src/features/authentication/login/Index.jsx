import React from "react";
import styled from "styled-components";
import TextInput from "@/shared/components/Input/TextInput";
import { LoginRequest } from "./api/loginApi";
import { useState } from "react";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import { useQueryClient } from "@tanstack/react-query";

const StyledContainer = styled.div`
  padding: 1rem 3rem;
`;

const StyledHeaderForm = styled.div`
  font-size: 22px;
  font-weight: 600;
  text-align: center;
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  > p {
    color: red;
  }
`;

const StyledWrapForgorPass = styled.div``;

const StyledForgotPass = styled.button`
  border: none;
  color: gray;
  background-color: #ffffff;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
`;

const StyledButtonSubmit = styled.button`
  width: 100%;
  background-color: #3e6807;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
`;

const StyledButtonSubmitWithFacebook = styled(StyledButtonSubmit)`
  background-color: #3b5999;
  :hover {
    background-color: #3e6807;
  }
  cursor: pointer;
`;

const StyledLinkRegister = styled.div`
  color: gray;
  text-align: center;
  margin: 1.5rem 0;
`;

const StyledOrLine = styled.div`
  align-self: center;
  width: 40%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  line-height: 0.1em;
  text-align: center;

  span {
    background: #fff;
    padding: 0 10px;
  }
`;

const StyledButtonHere = styled.button`
  border: none;
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PasswordRegex = /^[A-Za-z0-9]{6,}$/;

export default function Login({ switchToRegister, action }) {
  const queryClient = useQueryClient();

  const loginRequest = LoginRequest();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [errorPopUp, setErrorPopUp] = useState(false);

  const onLogin = (ev) => {
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

    const formData = new FormData();

    formData.append("Email", email);
    formData.append("Password", password);

    loginRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 404) {
          setErrors((prev) => {
            return { ...prev, serverError: response.message };
          });
          setErrorPopUp(true);
          return;
        }
        if (response.status == 200) {
          localStorage.setItem("ACCESS_TOKEN", response.data);
          setSuccessPopUp(true);
          queryClient.invalidateQueries({ queryKey: ["customer"] });
          queryClient.invalidateQueries({ queryKey: ["cart-quantity"] });
        }
      },
    });
  };

  return (
    <StyledContainer>
      <StyledForm>
        <StyledHeaderForm>LOGIN</StyledHeaderForm>
        <TextInput state={email} setState={setEmail} placeholder="Enter your email..."></TextInput>
        <p>{errors.emailError}</p>
        <TextInput
          state={password}
          setState={setPassword}
          placeholder="Enter your password..."
          type="password"
        ></TextInput>
        <p>{errors.passwordError}</p>
        {/* <StyledWrapForgorPass>
          <StyledForgotPass>Get your password back</StyledForgotPass>
        </StyledWrapForgorPass> */}
        <ButtonContainer>
          <StyledButtonSubmit onClick={onLogin}>LOGIN</StyledButtonSubmit>
        </ButtonContainer>
        <StyledLinkRegister>
          Don't have an Account yet? Please register for a new Account
          <StyledButtonHere onClick={switchToRegister}>Here</StyledButtonHere>
        </StyledLinkRegister>
      </StyledForm>
      {successPopUp && (
        <SuccessPopUp
          action={() => {
            setSuccessPopUp(false);
            action();
          }}
          header={"Success Login"}
          message={"Enjoy"}
        />
      )}
      {errorPopUp && (
        <ErrorPopUp
          action={() => setErrorPopUp(false)}
          header={"Wrong email or Password"}
          message={"Are you forgot your password"}
        />
      )}
    </StyledContainer>
  );
}
