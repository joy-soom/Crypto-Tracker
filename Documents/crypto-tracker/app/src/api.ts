

// export function fetchCoins() {
//   return fetch("https://api.coinpaprika.com/v1/coins").then(
//     (response) => response.json
//   );
// }

export async function fetchCoins() {
  const coins = await fetch(
  "https://api.coinpaprika.com/v1/coins"
  ).then((rep) => rep.json());
  return coins.slice(0, 100);
  }