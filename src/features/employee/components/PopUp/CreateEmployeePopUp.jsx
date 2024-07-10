import React from "react";
import { useState, useRef } from "react";
import styled from "styled-components";
import PopUp from "@/shared/components/PopUp/PopUp";
import TextInput from "@/shared/components/Input/TextInput";
import { LuImagePlus } from "react-icons/lu";
import { CreateEmployeeRequest } from "../../api/employeeApi";
import { useQueryClient } from "@tanstack/react-query";
import XButton from "@/shared/components/Button/XButton";

const StyledPopUp = styled(PopUp)`
  padding: 1rem;
  & #upload-input {
    display: none;
  }

  & .red {
    color: red;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.div`
  & h4 {
    font-size: 16px;
  }

  display: flex;
  justify-content: space-between;

  > svg {
    transform: translate(100%, -100%);
    background-color: white;
    &:hover {
      background-color: white;
    }
  }
`;

const UploadImageButtonn = styled.button`
  border-radius: 50%;
  background-color: white;
  width: 6rem;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dotted rgba(0, 0, 0, 0.4);
  cursor: pointer;

  & svg {
    font-size: 2rem;
    opacity: 0.4;
  }
`;

const Footer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  > button {
    background-color: white;
    color: #0b74e5;
    border-radius: 5px;
    border: 1px solid #0b74e5;
    padding: 8px 8px;
    cursor: pointer;
  }
`;

const ImageContainer = styled.div`
  background-color: white;
  width: 6rem;
  aspect-ratio: 1/1;
  border: 1px dotted rgba(0, 0, 0, 0.4);
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Error = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  color: red;
`;

const regex = /^-?\d+(\.\d+)?$/;

export default function CreateEmployeePopUp({ action }) {
  const queryClient = useQueryClient();
  const inputRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState();
  const [errors, setErrors] = useState({});

  const createEmployeeRequest = CreateEmployeeRequest();

  const onClickUpload = () => {
    inputRef.current.click();
  };

  const handleImageChange = (ev) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (ev.target.files.length > 0) {
      const isValidFileType = Array.from(ev.target.files).every((file) =>
        allowedFileTypes.includes(file.type)
      );

      if (!isValidFileType) {
        // setImageError(true);
        // Clear the file input if the file type is invalid

        return;
      }

      setAvatar(ev.target.files[0]);
      ev.target.value = null;
    }
  };

  const onCreateProduct = () => {
    if (email == "") {
      setErrors((prev) => {
        return { ...prev, emailError: "Please fill up employee email" };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, emailError: null };
      });
    }

    if (password == "") {
      setErrors((prev) => {
        return { ...prev, passwordError: "Please fill up employee password" };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, passwordError: null };
      });
    }

    if (name == "") {
      setErrors((prev) => {
        return { ...prev, nameError: "Please fill up employee name" };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, nameError: null };
      });
    }

    const formData = new FormData();
    formData.append("Email", email);
    formData.append("Password", password);
    formData.append("FullName", name);
    formData.append("Address", address);
    formData.append("Phone", phoneNumber);
    formData.append("Avatar", avatar);

    createEmployeeRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 400) {
          setErrors((prev) => {
            return { ...prev, error: response.message };
          });

          return;
        }

        if (response.status == 200) {
          queryClient.invalidateQueries({ queryKey: ["employees"] });

          action();
        }
      },
    });
  };

  return (
    <StyledPopUp action={() => {}}>
      <input type="file" ref={inputRef} onChange={handleImageChange} id="upload-input" />
      <Header>
        <h4>Create new Employee</h4>
        <XButton action={action} />
      </Header>
      <Content>
        <div>
          {!avatar ? (
            <UploadImageButtonn onClick={onClickUpload}>
              <LuImagePlus />
            </UploadImageButtonn>
          ) : (
            <ImageContainer>
              <img onClick={onClickUpload} src={URL.createObjectURL(avatar)} />
            </ImageContainer>
          )}
        </div>
        <div>
          <label>
            Email <span className="red">*</span>
          </label>
          <TextInput state={email} setState={(value) => setEmail(value)} />
        </div>
        <div>
          <label>
            Password <span className="red">*</span>
          </label>
          <TextInput type={"password"} state={password} setState={(value) => setPassword(value)} />
        </div>
        <div>
          <label>
            Full name <span className="red">*</span>
          </label>
          <TextInput state={name} setState={(value) => setName(value)} />
        </div>
        <div>
          <label>Address</label>
          <TextInput state={address} setState={(value) => setAddress(value)} />
        </div>
        <div>
          <label>Phone Number</label>
          <TextInput
            state={phoneNumber}
            setState={(value) => {
              if (regex.test(value) || value == "") {
                setPhoneNumber(value);
              }
            }}
          />
        </div>
      </Content>
      <Error>
        {Object.values(errors).map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </Error>
      <Footer>
        <button onClick={onCreateProduct}>Confirm</button>
        <button onClick={action}>Cancel</button>
      </Footer>
    </StyledPopUp>
  );
}
