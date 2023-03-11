import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  [key: string]: string | undefined; //명시적 속성의 모든 타입을 가지고 있어야 함
  coinId: string;
}
interface RouterState {
  state: {
    name: string;
  };
}

function Coin() {
  const [loading, setLoding] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation() as RouterState;
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});
  useEffect(() => {
    (async () => {
      //API할 URL
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      // console.log(infoData);
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      // console.log(priceData);
      setInfo(infoData);
      setPriceInfo(priceData);
    })();
  }, []);

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
