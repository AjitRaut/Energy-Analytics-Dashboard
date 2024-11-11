import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Chart = ({ data }) => {
    const [showModeOn, setShowModeOn] = useState(true);
    const [showModeOff, setShowModeOff] = useState(true);

    // Group data by date and simulate mode
    const groupedData = data.reduce((acc, item, index) => {
        const date = new Date(item.createdAt).toLocaleDateString();
        if (!acc[date]) acc[date] = { ON: 0, OFF: 0 };

        // Simulate "ON" and "OFF" by alternating entries
        if (index % 2 === 0) {
            acc[date].ON += item.total_kwh;
        } else {
            acc[date].OFF += item.total_kwh;
        }
        return acc;
    }, {});

    const dates = Object.keys(groupedData);

    // Prepare datasets for the chart
    const modeOnData = dates.map(date => groupedData[date].ON);
    const modeOffData = dates.map(date => groupedData[date].OFF);

    const chartData = {
        labels: dates,
        datasets: [
            {
                label: 'Energy Saving Mode ON',
                data: showModeOn ? modeOnData : [],
                backgroundColor: '#0066cc', // Dark Blue
                barThickness: 30, // Increase the bar width
                borderWidth: 0, // No border to make sure bars are solid
            },
            {
                label: 'Energy Saving Mode OFF',
                data: showModeOff ? modeOffData : [],
                backgroundColor: '#99ccff', // Light Blue
                barThickness: 30, // Increase the bar width
                borderWidth: 0, // No border to make sure bars are solid
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Disable default legend
            },
        },
        scales: {
            x: {
                stacked: true,
                categoryPercentage: 0.8, // Space between each category (set lower for more space)
                barPercentage: 0.7, // Space between bars (set lower for more space between bars)
                ticks: {
                    autoSkip: false, // Avoid skipping labels
                },
                grid: {
                    display: false, // Hide grid lines
                },
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Energy Consumed (kWh)',
                    font: { size: 14 },
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 1000,
                },
            },
        },
    };

    return (
        <div className="text-center">
            <h2 className="mb-4">Energy Consumed</h2>
            <div className="flex justify-center items-center mb-4 space-x-4">
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={showModeOn && showModeOff}
                        onChange={() => {
                            const toggleBoth = !(showModeOn && showModeOff);
                            setShowModeOn(toggleBoth);
                            setShowModeOff(toggleBoth);
                        }}
                        className="h-4 w-4"
                    />
                    <span>Both</span>
                </label>
                <label className="flex items-center space-x-2 text-blue-700">
                    <input
                        type="checkbox"
                        checked={showModeOn}
                        onChange={() => setShowModeOn(!showModeOn)}
                        className="h-4 w-4"
                    />
                    <span>Energy Saving Mode ON</span>
                </label>
                <label className="flex items-center space-x-2 text-blue-300">
                    <input
                        type="checkbox"
                        checked={showModeOff}
                        onChange={() => setShowModeOff(!showModeOff)}
                        className="h-4 w-4"
                    />
                    <span>Energy Saving Mode OFF</span>
                </label>
            </div>
            <div className="overflow-hidden">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Chart;
