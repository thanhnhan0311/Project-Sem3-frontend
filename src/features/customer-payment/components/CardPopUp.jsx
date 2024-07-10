import React from "react";
import Cards from "react-credit-cards-2";
import styled from "styled-components";
import PopUp from "@/shared/components/PopUp/PopUp";
import { useState } from "react";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import NumberInput from "@/shared/components/Input/NumberInput";
import TextInput from "@/shared/components/Input/TextInput";
import XButton from "@/shared/components/Button/XButton";

const StyledPopUp = styled(PopUp)`
  padding: 0;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Content = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 20rem;
  gap: 2rem;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  padding-left: 2rem;

  > h4 {
    font-size: 1.3rem;
    font-weight: 300;
  }

  > svg {
    transform: translate(50%, -100%);
    background-color: white;

    &:hover {
      background-color: white;
    }
  }
`;

const Footer = styled.div`
  padding-bottom: 1rem;
  padding-right: 2rem;
  display: flex;
  justify-content: flex-end;

  > button {
    background-color: #0272c0;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default function CardPopUp({ action, submit }) {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const onSubmit = () => {
    if (state.number.length != 16) {
      alert("cart number must be 16 number");
      return;
    }

    if (state.name.length == 0) {
      alert("name not must be empty");
      return;
    }

    if (state.expiry.length != 4) {
      alert("wrong expire date");
      return;
    }

    if (state.cvc.length != 3) {
      alert("wrong cvc number");
      return;
    }

    submit();
  };

  return (
    <StyledPopUp action={() => {}}>
      <Header>
        <h4>Card Payment</h4>
        <XButton action={action} />
      </Header>
      <Content>
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
        <Form>
          <NumberInput
            state={state.number}
            setState={(value) => {
              return setState({ ...state, number: value, focus: "number" });
            }}
            placeholder={"Card number"}
          />
          <TextInput
            state={state.name}
            setState={(value) => {
              return setState({ ...state, name: value, focus: "name" });
            }}
            placeholder={"Card name"}
          />
          <NumberInput
            state={state.expiry}
            setState={(value) => {
              return setState({ ...state, expiry: value, focus: "expiry" });
            }}
            placeholder={"valid"}
          />
          <NumberInput
            state={state.cvc}
            setState={(value) => {
              return setState({ ...state, cvc: value, focus: "cvc" });
            }}
            placeholder={"CVC"}
          />
        </Form>
      </Content>
      <Footer>
        <button onClick={() => onSubmit()}>Submit</button>
      </Footer>
    </StyledPopUp>
  );
}
