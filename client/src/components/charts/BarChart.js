import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function BarChart({ graphData }) {
  const labels = graphData[0] ? graphData[0].dates : ["Mon", "Tues", "Wed", "Thu", "Fri"];
  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: graphData[0] ? `${graphData[0].sub_name} STATISTICS` : "SAMPLE SUB STATISTICS",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "ABSENT",
        data: graphData[0] ? graphData[0].absent : [2, 4, 6, 8, 10],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "PRESENT",
        data: graphData[0] ? graphData[0].present : [12, 14, 16, 18, 20],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
}
