import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import {
  useLocation,
  useParams,
  Outlet,
  Link,
  useMatch,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo } from "../api";
import { fetchCoinTickers } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.div`
  height: 10vh;
  display: felx;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  position: relative;
  left: 40%;
  transform: translateX(-50%);
`;

const Loader = styled.span`
  tex-align: center;
  display: block;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
  }
`;

const Button = styled.button`
  border-radius: 10px;
  border: none;
  width: 50px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 13px;
  &:hover {
    cursor: pointer;
  }
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
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation() as RouterState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(`${coinId}`)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(`${coinId}`)
  );
  let navigate = useNavigate();

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loding..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Button onClick={() => navigate(-1)}>go back</Button>
        <Title>
          {state?.name ? state.name : loading ? "Loding..." : infoData?.name}
        </Title>
        {/* 여기info는 API로 받아오는 infoData이다 */}
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Price</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Volume</Link>
            </Tab>
          </Tabs>

          <Link to={`/${coinId}/chart`}></Link>
          <Link to={`/${coinId}/price`}></Link>
          <Outlet context={coinId} />
        </>
      )}
    </Container>
  );
}

export default Coin;
