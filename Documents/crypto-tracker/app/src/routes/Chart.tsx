import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import { useQuery } from "@tanstack/react-query";
import ApexChart from "react-apexcharts";
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart() {
  const coinId = useOutletContext();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(`${coinId}`)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "close_price",
              data: data?.map((price) => price.close) ?? [],
            },
           
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(+price.time_close * 1000).toUTCString()
              ),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(2)}`,
              },
              
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
