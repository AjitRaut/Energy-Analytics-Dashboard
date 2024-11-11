import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ chartData, chartOptions }) => {
  return (
    <div className="h-[400px]">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
