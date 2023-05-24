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

## 💡 성장 경험
1. react-query를 활용하여 캐싱을 효율적으로 관리 할 수 있게 되었다
2. api만 따로 관리하는 파일을 생성하여 보다 구조적으로 깔끔하게 코드를 짤 수 있게 되었다.
3. typescript의 interface 기능을 활용하여 type을 정의하여 보다 단단한 코드를 만들 수 있게 되었다.
4. styled-components를 활용하여 페이지 로딩 시간을 단축 할 수 있게 되었고,중복되는 스타일은 props 컴포넌트로 재활용 하는 등 다양하게 활용해 보는 경험을 할 수 있었다.
