import { ChartData } from "src/store/features/cart/cartSlice";

export const getChartData = (data: ChartData) => {
  return {
    labels: data.labels,
    datasets: [
      {
        data: data.data,
      },
    ],
  };
};
