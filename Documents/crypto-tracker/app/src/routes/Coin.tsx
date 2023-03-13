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
interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: ITag[];
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;

      ath_price: number;

      market_cap: number;

      market_cap_change_24h: number;

      percent_change_1h: number;

      percent_change_1y: number;

      percent_change_6h: number;

      percent_change_7d: number;

      percent_change_12h: number;

      percent_change_15m: number;

      percent_change_24h: number;

      percent_change_30d: number;

      percent_change_30m: number;

      percent_from_price_ath: number;

      price: number;

      volume_24h: number;

      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [loading, setLoding] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation() as RouterState;
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      //API할 URL
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
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
