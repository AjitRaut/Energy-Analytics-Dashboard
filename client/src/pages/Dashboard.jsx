import React, { useEffect, useState } from "react";
import api from "../services/api";
import Chart from "../components/Chart";
import LogForm from "../components/LogForm";
// import AccessLogs from "../components/AccessLogs";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/chart/data");
      setChartData(response.data);
    //   console.log(response.data)
    } catch (error) {
      alert("Failed to fetch chart data");
    }
    setLoading(false);
  };

  const fetchChartDataByDate = async () => {
    setLoading(true);
    try {
      const { start, end } = dateRange;
      const response = await api.get(
        `/chart/data/date-range?startDate=${start}&endDate=${end}`
      );
      console.log("date by range",response.data)
      setChartData(response.data);
    } catch (error) {
      alert("Failed to fetch chart data");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Energy Consumption Dashboard</h1>
      <div className="flex space-x-4 mb-6">
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange({ ...dateRange, start: e.target.value })
          }
          className="border px-2 py-1 rounded"
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={fetchChartDataByDate}
          className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500"
        >
          Filter
        </button>
      </div>
      {loading ? <Spinner /> : <Chart data={chartData} />}
      <LogForm />
      {/* <AccessLogs /> */}
    </div>
  );
};

export default Dashboard;
