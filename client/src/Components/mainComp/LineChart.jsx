import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js'

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)
// props
function LineChart(props) {
    console.log("HELLO" + props.pastMonthDate)
    const data = {
        labels: props.pastMonthDate,
    //   labels: ["hi", "h3", "h4"],
        datasets: [
        {
            label: "Caloric Surplus/Defecit",
            data: props.pastDateData,
            // data: [5,3,2],
            backgroundColor: "aqua",
            borderColor: "rgba(75,192,192,1)",
            tension: 0.1,
        },
        ],
    };

  return (
    <div>
      <h2>Line Chart Example</h2>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
