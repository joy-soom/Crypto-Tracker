// export function fetchCoins() {
//   return fetch("https://api.coinpaprika.com/v1/coins").then(
//     (response) => response.json
//   );
// }

const BASE_URL = `https://api.coinpaprika.com/v1/coins`;

export async function fetchCoins() {
  const coins = await fetch(`${BASE_URL}/coins`).then((rep) => rep.json());
  return coins.slice(0, 100);
}

export async function fetchCoinInfo(coinId: string) {
  const coinInfo = await fetch(`${BASE_URL}/coins/${coinId}`).then((rep) =>
    rep.json()
  );
  return coinInfo;
}
export async function fetchCoinTickers(coinId: string) {
  const coinPrice = await fetch(`${BASE_URL}/tickers/${coinId}`).then((rep) =>
    rep.json()
  );
  return coinPrice;
}
