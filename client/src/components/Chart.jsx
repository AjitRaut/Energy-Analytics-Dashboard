import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ data }) => {
    const chartData = {
        labels: data.map(item => new Date(item.createdAt).toLocaleDateString()),
        datasets: [
            {
                label: 'Energy Consumed (kWh)',
                data: data.map(item => item.total_kwh),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
        ],
    };

    return <Bar data={chartData} />;
};

export default Chart;
