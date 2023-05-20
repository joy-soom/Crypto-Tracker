# Soom Crypto-Tracker
가상화폐 추적 사이트
## Start Project
```
git clone https://github.com/soominpark9/Crypto-Tracker.git
cd server
npm i
npm start 
```
## Link
https://crypto-tracker-coin.netlify.app/<br>
<br>
## 페이지 설명
### 메인 페이지
- api 데이터 중 100개만 사용하여 UI로 구현
- 데이이터를 가져오기 전 화면은 Loading…으로 구현 캐싱 후에는 Loading… 보이지 않도록 구현<br><br>
![coin1](https://github.com/joy-soom/Crypto-Tracker/assets/110961576/3add0eb7-1f92-439c-9ff3-9c35248606ee)
### 코인 페이지
- API의 데이터를 UI로 구현
- apexcharts를 활용하여 데이터 시각화 <br><br>
![coin2](https://github.com/joy-soom/Crypto-Tracker/assets/110961576/c76caf07-8ff1-4289-b057-16d79566640a)

## Stack
- React
- React-query
- Typescript
- Styled-Components

## Directory Structure
```
app / # react app
.gitignore
```

## REST API
- `Get /Coins` - show all Coins data
- `Get /coIn/:CoinId` - show eachCoin's data
- `Get /Coin/Chart` - show Coin's price chart
- `Get /Coin/Price` - show Coin's price volume chart
