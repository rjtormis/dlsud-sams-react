import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart() {
  const options = { responsive: true };
  const labels = ["BCS 11", "BCS 12", "BCS 13"];
  const data = {
    labels,
    datasets: [
      {
        label: "ABSENT",
        data: [49, 2, 10],
        borderColor: "rgb(48,104,68)",
      },
      {
        label: "PRESENT",
        data: [10, 8, 35],
        borderColor: "rgb(46,5,68)",
      },
    ],
  };
  return <Line data={data} options={options} />;
}

export default LineChart;
