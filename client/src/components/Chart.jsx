import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
        backgroundColor: '#0066cc',
        barThickness: 40,
        borderWidth: 0,
      },
      {
        label: 'Energy Saving Mode OFF',
        data: showModeOff ? modeOffData : Array(dates.length).fill(0),
        backgroundColor: '#99ccff',
        barThickness: 40,
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
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
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 40,
        ticks: {
          stepSize: 16,
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#E5E7EB',
        },
        title: {
          display: true,
          text: 'Energy Consumed (kWh)',
          font: {
            size: 12,
          },
          padding: { bottom: 10 },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-6 text-center">Energy Consumed</h2>
      
      <div className="flex justify-center items-center mb-6 space-x-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showModeOn && showModeOff}
            onChange={() => {
              const toggleBoth = !(showModeOn && showModeOff);
              setShowModeOn(toggleBoth);
              setShowModeOff(toggleBoth);
            }}
            className="w-4 h-4"
          />
          <span className="text-sm">Both</span>
        </label>
        
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showModeOn}
            onChange={() => setShowModeOn(!showModeOn)}
            className="w-4 h-4"
          />
          <span className="text-sm" style={{ color: '#0066cc' }}>
            Energy Saving Mode ON
          </span>
        </label>
        
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showModeOff}
            onChange={() => setShowModeOff(!showModeOff)}
            className="w-4 h-4"
          />
          <span className="text-sm" style={{ color: '#99ccff' }}>
            Energy Saving Mode OFF
          </span>
        </label>
      </div>

      <div className="h-[400px]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Chart;