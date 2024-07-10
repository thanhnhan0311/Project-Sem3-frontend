import { useState } from "react";
import styled from "styled-components";
import PopUp from "@/shared/components/PopUp/PopUp";
import TextInput from "@/shared/components/Input/TextInput";
import SelectInput from "@/shared/components/Input/SelectInput";
import dchc from "@/shared/data/dchc";
import { useEffect } from "react";
import InputCheckBox from "@/shared/components/Input/InputCheckBox";
import { CustomerRequest } from "@/shared/api/customerApi";
import NumberInput from "@/shared/components/Input/NumberInput";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import { CreateAddressRequest } from "../api/addressApi";
import { useQueryClient } from "@tanstack/react-query";

const StyledPopUp = styled(PopUp)``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div:nth-of-type(1) {
    display: flex;
    gap: 1rem;
  }
`;

const AddressSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > .select_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const AddressDetail = styled.div``;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  > button {
    padding: 0.5rem 1.5rem;
    cursor: pointer;
  }

  > button:nth-of-type(1) {
    background-color: none;
    border: none;
    border-radius: 5px;
  }

  > button:nth-of-type(2) {
    background-color: rgb(11, 116, 229);
    border: none;
    color: white;
    border-radius: 5px;
  }
`;

const Area = styled.textarea`
  padding: 8px;
  border-radius: 3px;
  width: 100%;
  height: 10rem;
  resize: none;

  border: 1px solid rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s;

  &:focus {
    border: 1px solid rgba(0, 0, 255, 0.4);
  }

  &:active {
    border: 1px solid rgba(0, 0, 255, 0.4);
  }
`;

export default function AddressPopUp({ action }) {
  const queryClient = useQueryClient();
  const createAddressRequest = CreateAddressRequest();
  const customerRequest = CustomerRequest();
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [errorPopUp, setErrorPopUp] = useState();
  const [defaultInput, setDefaultInput] = useState(false);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState(customerRequest.data.data.fullname);
  const [phoneNumber, setPhoneNumber] = useState(customerRequest.data.data.phoneNumber);
  const [addressDetail, setAddressDetail] = useState("");

  useEffect(() => {
    setDistrict("");
    setWard("");
  }, [province]);

  useEffect(() => {
    setWard("");
  }, [district]);

  const onSubmit = () => {
    if (!ward || !province || !district || !name || !phoneNumber || !addressDetail) {
      setErrorPopUp(true);
      return;
    }

    const formData = new FormData();
    formData.append("FullName", name);
    formData.append("PhoneNumber", phoneNumber);
    formData.append("Province", province.value);
    formData.append("District", district.value);
    formData.append("Ward", ward.value);
    formData.append("AddressDetail", addressDetail);
    formData.append("IsDefault", defaultInput);

    createAddressRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          action();
          queryClient.invalidateQueries({ queryKey: ["address"] });
          setSuccess(true);
        }
      },
    });
  };

  return (
    <StyledPopUp action={() => {}}>
      <Content>
        <div>
          <h4>New Address</h4>
        </div>
        <InputBody>
          <div>
            <TextInput placeholder={"Full Name"} state={name} setState={setName} />{" "}
            <NumberInput
              placeholder={"Phone Number"}
              state={phoneNumber}
              setState={setPhoneNumber}
            />
          </div>
          <AddressSelect>
            <SelectInput
              placeholder={"Province"}
              className={"select-input"}
              options={dchc.data.map((item) => {
                return { value: item.level1_id, label: item.name };
              })}
              state={province}
              setState={setProvince}
            />
            <div className="select_container">
              <SelectInput
                placeholder={"District"}
                options={dchc.data
                  .find((item) => item.level1_id == province.value)
                  ?.level2s.map((item) => {
                    return { value: item.level2_id, label: item.name };
                  })}
                state={district}
                setState={setDistrict}
              />
              <SelectInput
                placeholder={"Ward"}
                options={dchc.data
                  .find((item) => item.level1_id == province.value)
                  ?.level2s?.find((item1) => item1.level2_id == district.value)
                  ?.level3s.map((item) => {
                    return { value: item.level3_id, label: item.name };
                  })}
                state={ward}
                setState={setWard}
              />
            </div>
          </AddressSelect>
          <AddressDetail>
            <Area value={addressDetail} onChange={(ev) => setAddressDetail(ev.target.value)} />
          </AddressDetail>
          <CheckBox>
            <InputCheckBox
              checked={defaultInput}
              onChange={() => setDefaultInput((prev) => !prev)}
            />
            <span>Set this address as default</span>
          </CheckBox>
        </InputBody>
        <Buttons>
          <button onClick={action}>Return</button>
          <button onClick={onSubmit}>Finish</button>
        </Buttons>
      </Content>
      {errorPopUp && (
        <ErrorPopUp action={() => setErrorPopUp(false)} message={"All the field is required "} />
      )}
      {success && <SuccessPopUp action={() => setSuccess(false)} message={"Success"} />}
    </StyledPopUp>
  );
}
