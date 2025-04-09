import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

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

import { calculateRegressionLine } from "../utils/regressionUtils";

// Register all components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function ConnectivityPlot({ correlation }) {
  const ages = correlation.subjects.map((d) => d.age);
  const connectivities = correlation.subjects.map((d) => d.connectivity);

  // Calculate regression line
  const xRange = [Math.min(...ages), Math.max(...ages)];
  const yPred = calculateRegressionLine(
    ages,
    connectivities,
    correlation.r_value
  );

  const data = {
    datasets: [
      {
        label: "Data points",
        data: correlation.subjects.map((d) => ({
          x: d.age,
          y: d.connectivity,
        })),
        backgroundColor: "blue",
        pointRadius: 5,
      },
      {
        label: "Regression",
        data: [
          { x: xRange[0], y: yPred[0] },
          { x: xRange[1], y: yPred[1] },
        ],
        borderColor: correlation.p_value < 0.05 ? "red" : "black",
        backgroundColor: "transparent",
        pointRadius: 0,
        borderWidth: 2,
        type: "line",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: [
          `${correlation.system1}-${correlation.system2}`,
          `r=${correlation.r_value.toFixed(3)}, p=${correlation.p_value.toFixed(
            5
          )}`,
        ],
        color: correlation.p_value < 0.05 ? "red" : "black",
        font: {
          size: 14,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Age",
        },
      },
      y: {
        title: {
          display: true,
          text: "Connectivity",
        },
      },
    },
  };

  return (
    <div
      className={`plot-container ${
        correlation.p_value < 0.05 ? "significant" : ""
      }`}
    >
      <div style={{ height: "250px" }}>
        <Scatter data={data} options={options} />
      </div>
    </div>
  );
}

export default ConnectivityPlot;
