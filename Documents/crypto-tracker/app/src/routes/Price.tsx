import { fetchCoinHistory } from "../api";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ApexChart from "react-apexcharts";

interface PHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price() {
  const coinId = useOutletContext();
  const { isLoading, data } = useQuery<PHistorical[]>(
    ["priceData", coinId],
    () => fetchCoinHistory(`${coinId}`)
  );
  // console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="bar"
          series={[
            {
              name: "volume",
              data: data?.map((price) => price.volume) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "55%",
              },
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) =>
                new Date(+price.time_open * 1000).toUTCString()
              ),
            },
            dataLabels: {
              enabled: false,
            },
            chart: {
              height: 350,
              background: "transparent",
            },
            grid: { show: false },
            colors: ["#0be881"],
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

export default Price;
