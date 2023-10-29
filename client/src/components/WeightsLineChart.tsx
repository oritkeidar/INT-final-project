import React from "react";
import { Line } from "react-chartjs-2";
import './WeightsLineChart.css'
function WeightsLineChart({ chartData }:any) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Weight trends over time"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default WeightsLineChart;