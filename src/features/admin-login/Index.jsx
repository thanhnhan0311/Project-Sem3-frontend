import styled from "styled-components";
import TextInput from "@/shared/components/Input/TextInput";
import { useEffect } from "react";
import WebFont from "webfontloader";
import { useState } from "react";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import { AdminLoginRequest } from "./api/adminLoginApi";
import { useNavigate } from "react-router-dom";
import PositionAwareButton from "@/shared/components/Button/PositionAwareButton";
import { useQueryClient } from "@tanstack/react-query";

const Container = styled.div`
  background-color: #6291e1;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  & input {
    font-size: 14px;
  }
`;

const LoginForm = styled.form`
  background-color: white;
  border-radius: 5px;
  padding: 2rem;
  width: 22rem;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Header = styled.div`
  text-align: center;
  & h4 {
    font-size: 1.3rem;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  & button {
    width: 100%;
    background-color: white;
    cursor: pointer;
  }
`;

const Content = styled.div`
  & label {
    font-size: 15px;
  }
`;

const PositionAwareButtonCustom = styled(PositionAwareButton)`
  padding: 3px 0;
  border-radius: 5px;
  font-weight: 500;
`;

export default function AdminLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPopUp, setErrorPopUp] = useState(false);
  const [activeError, setActiveError] = useState(false);
  const adminLoginRequest = AdminLoginRequest();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins"],
      },
    });
  }, []);

  const onLogin = () => {
    if (email == "" || password == "") {
      setErrorPopUp(true);
      return;
    }

    const formData = new FormData();

    formData.append("Email", email);
    formData.append("Password", password);

    adminLoginRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 404) {
          setErrorPopUp(true);
          return;
        }

        if (response.status == 401) {
          setActiveError(true);
          return;
        }

        if (response.status == 200) {
          localStorage.setItem("ADMIN_ACCESS_TOKEN", response.data);
          navigate("/admin");
          // queryClient.invalidateQueries({ queryKey: ["admin"] });
        }
      },
    });
  };

  return (
    <Container>
      {errorPopUp && (
        <ErrorPopUp
          header={"wrong user name or password"}
          message={"admin account: admin@admin.com, password:admin"}
          action={() => setErrorPopUp(false)}
        />
      )}
      {activeError && (
        <ErrorPopUp message={"Your account is not active"} action={() => setActiveError(false)} />
      )}
      <LoginForm>
        <Header>
          <h4>Login</h4>
        </Header>
        <Content>
          <label>Email</label>
          <TextInput state={email} setState={setEmail} />
        </Content>
        <Content>
          <label>Password</label>
          <TextInput type={"password"} state={password} setState={setPassword} />
        </Content>
        <ButtonContainer>
          <PositionAwareButtonCustom content={"Login"} action={onLogin} />
        </ButtonContainer>
      </LoginForm>
    </Container>
  );
}
