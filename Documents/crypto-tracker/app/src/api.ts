const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  const coins = await fetch(`https://api.coinpaprika.com/v1/coins`).then((rep) => rep.json());
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

export function fetchCoinHistory(coinId: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((respons) => respons.json());
}
