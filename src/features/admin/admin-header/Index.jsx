import styled from "styled-components";
import logo from "@/shared/assets/images/Art_Logo.png";
import Avatar from "react-avatar";
import { AdminRequest } from "@/shared/api/adminApi";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import PopUp from "@/shared/components/PopUp/PopUp";
import TextInput from "@/shared/components/Input/TextInput";
import XButton from "@/shared/components/Button/XButton";
import { ChangePasswordRequest } from "./api/adminPasswordApi";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import SideBarPopUp from "./components/SideBarPopUp";
import { BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";

const Container = styled.div`
  height: 3.8rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  gap: 5rem;
`;

const ImageContainer = styled.img`
  width: 7.5rem;
`;

const LeftContent = styled.div`
  display: flex;
`;

const RightContent = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const UserButton = styled.button`
  cursor: pointer;
  border-radius: 25px;
  padding: 5px 1rem;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #0a68ff;
  /* border: 1px solid #0a68ff; */
`;

const DropDown = styled.div`
  position: absolute;
  font-size: 14px;
  transform: translate(0%, 60%);

  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  > button {
    border: none;
    background-color: white;
    width: 100%;
    padding: 10px 1rem;
    width: 12rem;

    cursor: pointer;
    &:hover {
      background-color: #0a68ff;
      color: white;
    }
  }
`;

const ShowSideBarButton = styled.div`
  display: none;
  @media (max-width: 1400px) {
    display: block;
  }
  cursor: pointer;
`;

export default function AdminHeader() {
  const [showSideBar, setShowSideBar] = useState(false);
  const adminRequest = AdminRequest();
  const [dropDown, setDropDown] = useState(false);
  const [passwordPopUp, setPasswordPopUp] = useState(false);
  const buttonRef = useRef();
  const dropDownRef = useRef();

  useEffect(() => {
    const mouseDownEvent = (ev) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(ev.target) &&
        !buttonRef.current.contains(ev.target)
      ) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", mouseDownEvent);

    return () => {
      document.removeEventListener("mousedown", mouseDownEvent);
    };
  }, []);

  const onLogout = () => {
    localStorage.removeItem("ADMIN_ACCESS_TOKEN");
    adminRequest.refetch();
  };

  return (
    <>
      <Container>
        <LeftContent>
          <ImageContainer src={logo} />
        </LeftContent>
        <ShowSideBarButton>
          <FiMoreHorizontal onClick={() => setShowSideBar(true)} size={"1.5rem"} />
        </ShowSideBarButton>
        <RightContent>
          <UserButton ref={buttonRef} onClick={() => setDropDown((prev) => !prev)}>
            {adminRequest.data.data.fullname}
            <Avatar
              src={import.meta.env.VITE_API_IMAGE_PATH + adminRequest.data.data.avatar}
              name={adminRequest.data.data.email}
              size="30"
              round={true}
            />
          </UserButton>
          {dropDown && (
            <DropDown ref={dropDownRef}>
              <button onClick={() => setPasswordPopUp(true)}>Change password</button>
              <button onClick={onLogout}>Log out</button>
            </DropDown>
          )}
        </RightContent>
        {showSideBar && <SideBarPopUp action={() => setShowSideBar(false)} />}
      </Container>
      {passwordPopUp && <ChangePasswordPopUp action={() => setPasswordPopUp(false)} />}
    </>
  );
}

const StyledPopUp = styled(PopUp)`
  padding: 1rem 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 20rem;

  & h4 {
    font-size: 14px;
    font-weight: 500;
  }

  & p {
    color: red;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Footer = styled.div`
  margin-top: 2rem;

  > button {
    cursor: pointer;
    background-color: #2962ff;
    display: flex;
    align-items: center;
    gap: 5px;
    color: white;
    border: none;
    font-size: 15px;
    padding: 10px;
    border-radius: 5px;
  }

  > button:hover {
    background-color: #0052cc;
  }
`;

const PasswordRegex = /^[A-Za-z0-9]{6,}$/;

function ChangePasswordPopUp({ action }) {
  const changePasswordRequest = ChangePasswordRequest();
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [errorPopUp, setErrorPopUp] = useState(false);

  const onChangePassword = () => {
    let isOk = true;

    if (previousPassword == "" || newPassword == "" || newPasswordConfirm == "") {
      isOk = false;
      setErrors((prev) => {
        return { ...prev, emptyError: "Please input all the field" };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, emptyError: null };
      });
    }

    if (!PasswordRegex.test(newPassword) || !PasswordRegex.test(newPasswordConfirm)) {
      isOk = false;
      setErrors((prev) => {
        return {
          ...prev,
          regexError: "Password only accept letter and number with atleast 6 charaters",
        };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, regexError: null };
      });
    }

    if (newPasswordConfirm != newPassword) {
      isOk = false;
      setErrors((prev) => {
        return { ...prev, confirmError: "Wrong password confirm" };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, confirmError: null };
      });
    }

    if (isOk) {
      const formData = new FormData();
      formData.append("PreviousPassword", previousPassword);
      formData.append("NewPassword", newPassword);

      changePasswordRequest.mutate(formData, {
        onSuccess: (response) => {
          if (response.status == 200) {
            setSuccessPopUp(true);
          }

          if (response.status == 400) {
            setErrorPopUp(true);
          }
        },
      });
    }
  };

  return (
    <StyledPopUp action={() => {}}>
      <Header>
        <h4>Change password</h4>
        <XButton action={action} />
      </Header>
      <Content>
        <div>
          <h4>Previous password</h4>
          <TextInput type={"password"} state={previousPassword} setState={setPreviousPassword} />
        </div>
        <div>
          <h4>New password</h4>
          <TextInput type={"password"} state={newPassword} setState={setNewPassword} />
        </div>
        <div>
          <h4>New password confirm</h4>
          <TextInput
            type={"password"}
            state={newPasswordConfirm}
            setState={setNewPasswordConfirm}
          />
        </div>
        <div>
          <p>{errors.regexError}</p>
          <p>{errors.confirmError}</p>
          <p>{errors.emptyError}</p>
        </div>
      </Content>
      <Footer>
        <button onClick={onChangePassword}>Change password</button>
      </Footer>
      {successPopUp && (
        <SuccessPopUp
          action={() => {
            setSuccessPopUp(false);
            action();
          }}
          message={"Your password has been successfully changed"}
        />
      )}
      {errorPopUp && <ErrorPopUp action={() => setErrorPopUp(false)} message={"Wrong password"} />}
    </StyledPopUp>
  );
}
