import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.div`
  height: 10vh;
  display: felx;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-szie: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  tex-align: center;
  display: block;
`;

interface RouteParams {
  state: {
    name: string;
  };
}

function Coin() {
  const [loading, setLoding] = useState(true);
  const { state } = useLocation() as RouteParams;
  console.log(state)
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
