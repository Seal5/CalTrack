import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title
} from 'chart.js'

// initialize line chart
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title
)

// 
const containerStyle = {
  width: "80%", 
  height: "", 
  margin: "0 auto",
};

// props for line chart
function LineChart(props) {
  const data = {
    labels: props.pastMonthDate,
    datasets: [
      {
        label: "Caloric Surplus/Defecit",
        data: props.pastDateData,
        backgroundColor: "#808080",
        borderColor: "#80CE9F",
        tension: 0.1,
      },
    ],
  };

  // options within the chart to fit with the UI
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Caloric Data of Past Month",
        padding: {
          top: "10rem",
          bottom: "30rem",
        },
        color: "#80CE9F", 
        font: {
          family: "Comfortaa, sans-serif",
          size: "30rem", 
          weight: "bold", 
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            family: "Comfortaa, sans-serif",
            size: 14,
          },
        },
        ticks: {
          font: {
            family: "Comfortaa, sans-serif",
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Caloric Surplus/Deficit",
          font: {
            family: "Comfortaa, sans-serif",
            size: 14,
          },
        },
        ticks: {
          font: {
            family: "Comfortaa, sans-serif",
            size: 12,
          },
        },
      },
    },
  };

  // output the chart
  return (
    <div style={containerStyle}>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
