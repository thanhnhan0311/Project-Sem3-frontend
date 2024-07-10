import React from "react";
import styled from "styled-components";
import { useState } from "react";

const ChatContainer = styled.div`
  background-color: white;
  width: 20rem;
  height: 20rem;
  border: 1px solid black;
`;

export default function Chat() {
  return <ChatContainer></ChatContainer>;
}
