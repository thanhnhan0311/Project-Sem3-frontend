import styled from "styled-components";
import { CiSquarePlus } from "react-icons/ci";
import PopUp from "@/shared/components/PopUp/PopUp";
import { useState } from "react";
import AddressPopUp from "./components/AddressPopUp";
import { GetUserAddressRequest } from "./api/addressApi";
import dchc from "@/shared/data/dchc";
import { FaRegCircleCheck } from "react-icons/fa6";
import UpdateAddressPopUp from "./components/UpdateAddressPopUp";

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
  display: flex;
  flex-direction: column;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 0.7rem;
  border: 1px dotted rgba(0, 0, 0, 0.2);
  font-size: 15px;
  gap: 1rem;
  cursor: pointer;
  text-decoration: none;

  > svg {
    width: 2rem;
    height: 2rem;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
`;

const AddressItem = styled.div`
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 6px;

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
`;

const AddressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

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

const EditButton = styled.button`
  background-color: white;
  color: #0b74e5;
  border-radius: 5px;
  border: 1px solid #0b74e5;
  padding: 5px 15px;
  cursor: pointer;
`;

export default function AccountAddress() {
  const [addressPopUp, setAddressPopUp] = useState(false);
  const [updateAddressPopUp, setUpdateAddressPopUp] = useState(false);
  const [addressId, setAddressId] = useState();
  const getUserAddressRequest = GetUserAddressRequest();

  return (
    <Container>
      <h3>Address Book</h3>
      <Content>
        <AddButton onClick={() => setAddressPopUp(true)}>
          <CiSquarePlus /> Add New Address
        </AddButton>
        <AddressContainer>
          {getUserAddressRequest.isSuccess &&
            getUserAddressRequest.data.data.map((address) => {
              const province = dchc.data.find((item) => item.level1_id == address.province);
              const district = province.level2s.find((item) => item.level2_id == address.district);
              const ward = district.level3s.find((item) => item.level3_id == address.ward);
              return (
                <AddressItem>
                  <AddressHeader>
                    <p>
                      <h4>{address.fullName}</h4>
                      {address.isDefault && (
                        <span>
                          <FaRegCircleCheck /> Default Address
                        </span>
                      )}
                    </p>
                    <div>
                      <EditButton
                        onClick={() => {
                          setAddressId(address.id);
                          setUpdateAddressPopUp(true);
                        }}
                      >
                        Edit
                      </EditButton>
                    </div>
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
                </AddressItem>
              );
            })}
        </AddressContainer>
      </Content>
      {addressPopUp && <AddressPopUp action={() => setAddressPopUp(false)} />}
      {updateAddressPopUp && (
        <UpdateAddressPopUp addressId={addressId} action={() => setUpdateAddressPopUp(false)} />
      )}
    </Container>
  );
}
