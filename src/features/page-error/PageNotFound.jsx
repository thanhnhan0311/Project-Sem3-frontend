import styled from "styled-components";
import pagenotfound from "./404.png";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function PageNotFound() {
  return (
    <Container>
      <img src={pagenotfound} />
    </Container>
  );
}
