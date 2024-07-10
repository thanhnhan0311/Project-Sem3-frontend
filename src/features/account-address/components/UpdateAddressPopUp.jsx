import { useState } from "react";
import styled from "styled-components";
import PopUp from "@/shared/components/PopUp/PopUp";
import TextInput from "@/shared/components/Input/TextInput";
import SelectInput from "@/shared/components/Input/SelectInput";
import dchc from "@/shared/data/dchc";
import { useEffect } from "react";
import InputCheckBox from "@/shared/components/Input/InputCheckBox";

import NumberInput from "@/shared/components/Input/NumberInput";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import { CreateAddressRequest } from "../api/addressApi";
import { useQueryClient } from "@tanstack/react-query";
import { GetUserAddressByIdRequest } from "../api/addressApi";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import { UpdateAddressRequest } from "../api/addressApi";

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

export default function UpdateAddressPopUp({ action, addressId }) {
  const queryClient = useQueryClient();

  const [start, setStart] = useState(true);
  const updateAddressRequest = UpdateAddressRequest();

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [errorPopUp, setErrorPopUp] = useState();
  const [defaultInput, setDefaultInput] = useState(false);
  const [success, setSuccess] = useState(false);
  const getUserAddressByIdRequest = GetUserAddressByIdRequest(addressId);

  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [addressDetail, setAddressDetail] = useState("");

  useEffect(() => {
    if (start != true) {
      setDistrict("");
      setWard("");
    }

    if (start == true && province != "") {
      const data = getUserAddressByIdRequest.data.data;
      const province = dchc.data.find((item) => item.level1_id == data.province);
      const district = province.level2s.find((item) => item.level2_id == data.district);
      setDistrict({ value: district.level2_id, label: district.name });
    }
  }, [province]);

  useEffect(() => {
    if (start != true) {
      setWard("");
    }

    if (start == true && district != "") {
      const data = getUserAddressByIdRequest.data.data;
      const province = dchc.data.find((item) => item.level1_id == data.province);
      const district = province.level2s.find((item) => item.level2_id == data.district);
      const ward = district.level3s.find((item) => item.level3_id == data.ward);
      setWard({ value: ward.level3_id, label: ward.name });
      setStart(false);
    }
  }, [district]);

  const onEdit = () => {
    if (!ward || !province || !district || !name || !phoneNumber || !addressDetail) {
      setErrorPopUp(true);
      return;
    }

    const formData = new FormData();
    formData.append("Id", getUserAddressByIdRequest.data.data.id);
    formData.append("FullName", name);
    formData.append("PhoneNumber", phoneNumber);
    formData.append("Province", province.value);
    formData.append("District", district.value);
    formData.append("Ward", ward.value);
    formData.append("AddressDetail", addressDetail);
    formData.append("IsDefault", defaultInput);

    updateAddressRequest.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          action();
          queryClient.invalidateQueries({ queryKey: ["address"] });
          setSuccess(true);
        }
      },
    });
  };

  useEffect(() => {
    if (getUserAddressByIdRequest.isSuccess) {
      const data = getUserAddressByIdRequest.data.data;
      setName(data.fullName);
      setPhoneNumber(data.phoneNumber);
      const province = dchc.data.find((item) => item.level1_id == data.province);
      setProvince({ value: province.level1_id, label: province.name });
      setAddressDetail(data.addressDetail);
      setDefaultInput(data.isDefault);
    }
  }, [getUserAddressByIdRequest.status]);

  return (
    <StyledPopUp action={() => {}}>
      <Content>
        <div>
          <h4>New Address</h4>
        </div>
        {getUserAddressByIdRequest.isSuccess && (
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
        )}
        <Buttons>
          <button onClick={action}>Return</button>
          <button onClick={onEdit}>Update</button>
        </Buttons>
      </Content>
      {errorPopUp && (
        <ErrorPopUp action={() => setErrorPopUp(false)} message={"All the field is required "} />
      )}
      {success && <SuccessPopUp action={() => setSuccess(false)} message={"Success"} />}
    </StyledPopUp>
  );
}
