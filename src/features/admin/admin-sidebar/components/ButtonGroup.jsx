import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Container = styled.div`
  font-size: 16px;
`;

const MainButton = styled.button`
  font-size: "Open Sans";
  background-color: ${(props) => (props.$active ? "white" : "#edeff2")};
  font-weight: 500;

  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  padding: 5px;

  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
  &:hover {
    background-color: ${(props) => (props.$active ? "None" : "#eaebed")};
  }
  box-shadow: ${(props) =>
    props.$active
      ? "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;"
      : "None"};

  > svg {
    font-size: 16px;
  }

  color: ${(props) => (props.$fatherActive ? "#0A68FF" : "rgba(0,0,0,1)")};
`;

const Childrens = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export default function ButtonGroup({ icon, groupName, children, active, link }) {
  const navigate = useNavigate();
  const [clickDropDown, setClickDropDown] = useState(false);

  const location = useLocation();

  return (
    <Container>
      <MainButton
        $fatherActive={children != null && clickDropDown == true}
        $active={location.pathname.includes(link)}
        onClick={(ev) => {
          if (active == true) {
            ev.preventDefault();
            setClickDropDown((prev) => !prev);
            return;
          }
          navigate(link);
          setClickDropDown((prev) => !prev);
        }}
      >
        {icon} {groupName} {children != null && clickDropDown == true && <IoIosArrowDown />}
        {children != null && clickDropDown == false && <IoIosArrowUp />}
      </MainButton>
      {clickDropDown && <Childrens>{active && children}</Childrens>}
    </Container>
  );
}
