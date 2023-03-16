const BASE_URL = `https://api.coinpaprika.com/v1`;
// http://cors-anywhere.herokuapp.com/https://api.coinpaprika.com/v1/coins

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

// export function fetchCoinInfo(coinId: string | undefined) {
//   return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
//     response.json()
//   );
// }

// export function fetchCoinTickers(coinId: string | undefined) {
//   return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
//     response.json()
//   );
// }


export function fetchCoinHistory(coinId: string) {
  // const endDate = Math.floor(Date.now() / 1000);
  // //startDate는 endDate - 60초 * 60분 * 24시간 * 7일로 계산 (일주일전)
  // const startDate = endDate - 60 * 60 * 24 * 7 * 1;
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((respons) => respons.json());
}
