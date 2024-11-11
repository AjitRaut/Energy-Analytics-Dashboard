import React, { useState } from 'react';
import ChartControls from './ChartControls';
import BarChart from './BarChart';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data }) => {
  const [showModeOn, setShowModeOn] = useState(true);
  const [showModeOff, setShowModeOff] = useState(true);

  const groupedData = data.reduce((acc, item, index) => {
    const date = new Date(item.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    if (!acc[date]) acc[date] = { ON: 0, OFF: 0 };
    
    if (index % 2 === 0) {
      acc[date].ON += item.total_kwh;
    } else {
      acc[date].OFF += item.total_kwh;
    }
    return acc;
  }, {});

  const dates = Object.keys(groupedData);
  const modeOnData = dates.map(date => groupedData[date].ON);
  const modeOffData = dates.map(date => groupedData[date].OFF);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Energy Saving Mode ON',
        data: showModeOn ? modeOnData : Array(dates.length).fill(0),
        backgroundColor: 'rgb(59, 130, 246)', // Bright blue
        barThickness: 30,
        borderWidth: 0,
        stack: 'stack0',
      },
      {
        label: 'Energy Saving Mode OFF',
        data: showModeOff ? modeOffData : Array(dates.length).fill(0),
        backgroundColor: 'rgb(191, 219, 254)', // Light blue
        barThickness: 30,
        borderWidth: 0,
        stack: 'stack0',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: 'white',
        titleColor: 'black',
        bodyColor: 'black',
        borderColor: 'rgb(229, 231, 235)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          title: (context) => {
            return context[0].label;
          },
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)} kWh`;
          }
        }
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: 'rgb(107, 114, 128)', // Gray-500
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        border: {
          display: false,
        },
        grid: {
          color: 'rgb(243, 244, 246)',
          drawTicks: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: 'rgb(107, 114, 128)', 
          padding: 8,
        },
        title: {
          display: true,
          text: 'Energy Consumed (kWh)',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
            weight: 'normal',
          },
          color: 'rgb(107, 114, 128)', 
          padding: { bottom: 12 },
        },
      },
    },
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6">
      <ChartControls
        showModeOn={showModeOn}
        showModeOff={showModeOff}
        setShowModeOn={setShowModeOn}
        setShowModeOff={setShowModeOff}
      />
      <BarChart chartData={chartData} chartOptions={chartOptions} />
    </div>
  );
};

export default Chart;
