import React from "react";
import PopUp from "@/shared/components/PopUp/PopUp";
import { useState } from "react";
import styled from "styled-components";
import TextInput from "@/shared/components/Input/TextInput";
import { useEffect } from "react";

const StyledPopUp = styled(PopUp)`
  max-width: 600px;
  padding: 0;
`;

const Header = styled.div`
  font-size: 18px;
  padding: 1rem;
`;

const Content = styled.div`
  & h4 {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
  }
  max-height: 30rem;
  overflow-y: scroll;
  padding: 0 2rem;

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

const Button = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem;

  > button {
    cursor: pointer;
    color: white;
    background-color: #2962ff;
    border: none;
    padding: 0.3rem 1rem;
    border-radius: 5px;

    &:hover {
      background-color: #0052cc;
    }
  }
`;

const ContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 1rem 0;

  & button {
    cursor: pointer;
  }

  > div {
    display: flex;
    gap: 1rem;

    > input {
      width: 20rem;
    }
  }
`;

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & input {
    width: 10rem;
  }
`;

const regex = /^-?\d+(\.\d+)?$/;

export default function AmountPopUp({ action, state, setState }) {
  const [allStock, setAllStock] = useState("");
  const [stock, setStock] = useState(new Array(state.length).fill(""));

  const applyAllStock = () => {
    for (let i = 0; i < stock.length; i++) {
      stock[i] = allStock;
    }

    setStock([...stock]);
  };

  const onConfirm = () => {
    for (let i = 0; i < stock.length; i++) {
      state[i].availableQuanity = stock[i] ? stock[i] : 0;
    }

    setState();
    action();
  };

  useEffect(() => {
    state.forEach((item, index) => (stock[index] = item.availableQuanity));
    setStock([...stock]);
  }, []);

  return (
    <StyledPopUp action={() => {}}>
      <Header>Edit price</Header>
      <hr />
      <Content>
        <ContentHeader>
          <h4>Apply price for all variants</h4>
          <div>
            <TextInput
              placeholder={"0"}
              state={allStock}
              setState={(value) => {
                if (regex.test(value) || value == "") {
                  setAllStock(value);
                }
              }}
            />
            <button onClick={() => applyAllStock()}>Apply</button>
          </div>
        </ContentHeader>
        <hr />
        <ContentBody>
          {state.map((item, key) => {
            return (
              <div key={key}>
                <span>{item.variant.join("/")}</span>
                <TextInput
                  placeholder={0}
                  state={stock[key]}
                  setState={(value) => {
                    if (regex.test(value) || value == "") {
                      const newList = [...stock];
                      newList[key] = value;
                      setStock(newList);
                    }
                  }}
                />
              </div>
            );
          })}
        </ContentBody>
      </Content>
      <hr />
      <Button>
        <button onClick={onConfirm}>Ok</button>
        <button onClick={action}>Cancel</button>
      </Button>
    </StyledPopUp>
  );
}
