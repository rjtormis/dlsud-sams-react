import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "OVERALL SECTION ATTENDANCE",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "ABSENT",
      data: [1, 2, 3, 4, 5, 6, 7],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "PRESENT",
      data: [2, 2, 3, 4, 5, 6, 7],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function BarChart() {
  return <Bar options={options} data={data} />;
}
