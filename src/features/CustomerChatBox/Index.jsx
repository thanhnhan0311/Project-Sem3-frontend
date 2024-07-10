import styled from "styled-components";
import { useState } from "react";
import Chat from "./components/Chat";

const Container = styled.div``;

const BeginContainer = styled.div`
  background-color: white;
  width: 2rem;
  height: 2rem;
`;

export default function CustomerChatBox({ className }) {
  const [isChatOn, setIsChatOn] = useState(false);

  return (
    <Container className={className}>
      {isChatOn ? <Chat /> : <BeginContainer onClick={() => setIsChatOn(true)} />}
    </Container>
  );
}
