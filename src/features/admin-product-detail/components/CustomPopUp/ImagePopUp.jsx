import React from "react";
import PopUp from "@/shared/components/PopUp/PopUp";
import { useState } from "react";
import styled from "styled-components";

const StyledPopUp = styled(PopUp)`
  max-width: 600px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-wrap: wrap;
  padding: 1rem;
  gap: 1rem;
  border: 1px dotted rgba(0, 0, 0, 0.4);
  margin-bottom: 2rem;

  > p {
    grid-column: 1/4;
  }
`;

const Header = styled.div`
  font-size: 19px;
`;

const ImageContainer = styled.div`
  width: 7rem;
  height: 7rem;
  display: flex;
  align-items: center;

  border: ${(props) =>
    props.$chosen == true ? "3px solid #007ACE" : "1px solid rgba(0, 0, 255, 0.4)"};
  cursor: pointer;

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

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

export default function ImagePopUp({ action, images, state, setState }) {
  const [name, setName] = useState(state);

  return (
    <StyledPopUp action={() => {}}>
      <Header>Update variant image</Header>
      <Content>
        {images.length > 0 ? (
          images.map((item, index) => {
            return (
              <ImageContainer key={index} $chosen={name == item} onClick={() => setName(item)}>
                <img src={import.meta.env.VITE_API_IMAGE_PATH + item} />
              </ImageContainer>
            );
          })
        ) : (
          <p>Please upload product images first</p>
        )}
      </Content>
      <Button>
        <button
          onClick={() => {
            setState(name);
            action();
          }}
        >
          Ok
        </button>
        <button onClick={action}>Cancel</button>
      </Button>
    </StyledPopUp>
  );
}
