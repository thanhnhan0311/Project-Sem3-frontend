import React from "react";
import CustomPopUp from "./CustomPopUp";
import styled from "styled-components";
import { useState } from "react";
import dchc from "@/shared/data/dchc";
import { GetUserAddressRequest } from "@/features/account-address/api/addressApi";
import { FaRegCircleCheck } from "react-icons/fa6";
import XButton from "@/shared/components/Button/XButton";
import { GetUserAddressByIdRequest } from "@/features/account-address/api/addressApi";
import TextInput from "@/shared/components/Input/TextInput";
import SelectInput from "@/shared/components/Input/SelectInput";
import { useEffect } from "react";
import InputCheckBox from "@/shared/components/Input/InputCheckBox";
import { CustomerRequest } from "@/shared/api/customerApi";
import NumberInput from "@/shared/components/Input/NumberInput";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import { CreateAddressRequest } from "@/features/account-address/api/addressApi";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateAddressRequest } from "@/features/account-address/api/addressApi";

const StyledPopUp = styled(CustomPopUp)`
  padding: 0;
  font-family: "Open Sans";
`;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  min-width: 30rem;

  height: 30rem;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: none;
  }

  &::-webkit-scrollbar {
    width: 4px;
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(205, 205, 207);
  }
`;

const AddressItem = styled.div`
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

  & h4 {
    font-weight: 500;
    letter-spacing: 1px;
  }

  > div:nth-of-type(3) {
    display: flex;
    gap: 10px;

    > span {
      color: rgba(0, 0, 0, 0.6);
    }
  }

  > div:nth-of-type(2) {
    display: flex;
    gap: 10px;

    > span {
      color: rgba(0, 0, 0, 0.6);
    }
  }

  > div:nth-of-type(4) {
    display: flex;
    gap: 1rem;

    > button {
      border: none;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
    }

    > button:nth-of-type(1) {
      background-color: #626455;
      border: none;
      color: white;
    }

    > button:nth-of-type(2) {
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }

    > button:nth-of-type(3) {
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }
  }

  border: ${(props) => (props.$active ? "1px solid blue" : "none")};
`;

const AddressHeader = styled.div`
  display: flex;
  justify-content: space-between;

  > p {
    display: flex;
    gap: 1rem;

    > span {
      display: flex;
      align-items: center;
      gap: 3px;
      color: #41c464;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0 0 1rem;

  > h4 {
    font-weight: 400;
    font-size: 16px;
  }

  > svg {
    transform: translate(30%, -90%);
    background-color: white;
    &:hover {
      background-color: white;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 1rem 1rem 0;

  > button {
    border: none;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
  }
`;

export default function ChangeAddressPopUp({ action, state, setState }) {
  const getUserAddressRequest = GetUserAddressRequest();
  const [addressId, setAddressId] = useState("");
  const [activeState, setActiveState] = useState("SELECT");

  return (
    <StyledPopUp action={() => {}}>
      {activeState == "NEW" && (
        <AddNewAddressPopUp setActiveState={setActiveState} action={action} />
      )}
      {activeState == "UPDATE" && (
        <UpdateAddressPopUp
          state={state}
          setState={setState}
          addressId={addressId}
          setActiveState={setActiveState}
          action={action}
        />
      )}
      {activeState == "SELECT" && (
        <>
          <Header>
            <h4>Address Books</h4>
            <XButton action={action} />
          </Header>
          <AddressContainer>
            {getUserAddressRequest.isSuccess &&
              getUserAddressRequest.data.data.map((address) => {
                const province = dchc.data.find((item) => item.level1_id == address.province);
                const district = province.level2s.find(
                  (item) => item.level2_id == address.district
                );
                const ward = district.level3s.find((item) => item.level3_id == address.ward);
                return (
                  <AddressItem $active={address.id == state?.id}>
                    <AddressHeader>
                      <p>
                        <h4>{address.fullName}</h4>
                        {address.isDefault && (
                          <span>
                            <FaRegCircleCheck /> Default Address
                          </span>
                        )}
                      </p>
                    </AddressHeader>
                    <div>
                      <span>Address:</span>
                      <p>
                        {province.name}, {district.name}, {ward.name}, {address.addressDetail}
                      </p>
                    </div>
                    <div>
                      <span>Phone number: </span>
                      {address.phoneNumber}
                    </div>
                    <div>
                      <button onClick={() => setState(address)}>Delivery to this Adderss</button>
                      <button
                        onClick={() => {
                          setActiveState("UPDATE");
                          setAddressId(address.id);
                        }}
                      >
                        Change
                      </button>
                    </div>
                  </AddressItem>
                );
              })}
          </AddressContainer>
          <Buttons>
            <button onClick={() => setActiveState("NEW")}>Add New Address</button>
          </Buttons>{" "}
        </>
      )}
    </StyledPopUp>
  );
}

const ContainerAddress = styled.div`
  padding: 1rem;
`;

const ContentAddress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputBodyAddress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div:nth-of-type(1) {
    display: flex;
    gap: 1rem;
  }
`;

const AddressSelectAddress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > .select_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const AddressDetailAddress = styled.div``;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ButtonsAddress = styled.div`
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

const AreaAddress = styled.textarea`
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

function AddNewAddressPopUp({ action, setActiveState }) {
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
          queryClient.invalidateQueries({ queryKey: ["address"] });
          setSuccess(true);
          setActiveState("SELECT");
        }
      },
    });
  };

  return (
    <ContainerAddress>
      <ContentAddress>
        <div>
          <h4>New Address</h4>
        </div>
        <InputBodyAddress>
          <div>
            <TextInput placeholder={"Full Name"} state={name} setState={setName} />{" "}
            <NumberInput
              placeholder={"Phone Number"}
              state={phoneNumber}
              setState={setPhoneNumber}
            />
          </div>
          <AddressSelectAddress>
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
          </AddressSelectAddress>
          <AddressDetailAddress>
            <AreaAddress
              value={addressDetail}
              onChange={(ev) => setAddressDetail(ev.target.value)}
            />
          </AddressDetailAddress>
          <CheckBox>
            <InputCheckBox
              checked={defaultInput}
              onChange={() => setDefaultInput((prev) => !prev)}
            />
            <span>Set this address as default</span>
          </CheckBox>
        </InputBodyAddress>
        <ButtonsAddress>
          <button onClick={() => setActiveState("SELECT")}>Return</button>
          <button onClick={onSubmit}>Finish</button>
        </ButtonsAddress>
      </ContentAddress>
      {errorPopUp && (
        <ErrorPopUp action={() => setErrorPopUp(false)} message={"All the field is required "} />
      )}
      {success && <SuccessPopUp action={() => setSuccess(false)} message={"Success"} />}
    </ContainerAddress>
  );
}

const ContentUpdate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputBodyUpdate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div:nth-of-type(1) {
    display: flex;
    gap: 1rem;
  }
`;

const AddressSelectUpdate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > .select_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const AddressDetailUpdate = styled.div``;

const CheckBoxUpdate = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ButtonsUpdate = styled.div`
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

const AreaUpdate = styled.textarea`
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

function UpdateAddressPopUp({ action, addressId, setActiveState, state, setState }) {
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
          queryClient.invalidateQueries({ queryKey: ["address"] });
          getUserAddressByIdRequest.refetch();
          if (state.id == getUserAddressByIdRequest.data.data.id) {
            setState({
              phoneNumber,
              id: getUserAddressByIdRequest.data.data.id,
              fullName: name,
              province: province.value,
              district: district.value,
              ward: ward.value,
              addressDetail,
              isDefault: defaultInput,
            });
          }
          setSuccess(true);
          setActiveState("SELECT");
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
    <ContainerAddress>
      <ContentUpdate>
        <div>
          <h4>New Address</h4>
        </div>
        {getUserAddressByIdRequest.isSuccess && (
          <InputBodyUpdate>
            <div>
              <TextInput placeholder={"Full Name"} state={name} setState={setName} />{" "}
              <NumberInput
                placeholder={"Phone Number"}
                state={phoneNumber}
                setState={setPhoneNumber}
              />
            </div>
            <AddressSelectUpdate>
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
            </AddressSelectUpdate>
            <AddressDetailUpdate>
              <AreaUpdate
                value={addressDetail}
                onChange={(ev) => setAddressDetail(ev.target.value)}
              />
            </AddressDetailUpdate>
            <CheckBox>
              <InputCheckBox
                checked={defaultInput}
                onChange={() => setDefaultInput((prev) => !prev)}
              />
              <span>Set this address as default</span>
            </CheckBox>
          </InputBodyUpdate>
        )}
        <ButtonsUpdate>
          <button onClick={() => setActiveState("SELECT")}>Return</button>
          <button onClick={onEdit}>Update</button>
        </ButtonsUpdate>
      </ContentUpdate>
      {errorPopUp && (
        <ErrorPopUp action={() => setErrorPopUp(false)} message={"All the field is required "} />
      )}
      {success && <SuccessPopUp action={() => setSuccess(false)} message={"Success"} />}
    </ContainerAddress>
  );
}
