// EmailTrackingGraphs.jsx
import {
  CategoryScale,
  Chart,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
} from "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

Chart.register(
  LinearScale,
  CategoryScale,
  PieController,
  LineController,
  PointElement,
  LineElement
);

const EmailTrackingGraphs = () => {
  const [openedCount, setOpenedCount] = useState(0);

  useEffect(() => {
    const fetchOpenedCount = async () => {
      try {
        const response = await fetch("http://localhost:3001/get-opened-count");
        const data = await response.json();
        setOpenedCount(data.openedCount);
      } catch (error) {
        console.error("Error fetching opened count:", error);
      }
    };

    fetchOpenedCount();
  }, []);

  // Define bar chart data
  const barChartData = {
    labels: ["Opened Emails"],
    datasets: [
      {
        label: "Number of Users",
        data: [openedCount],
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Define pie chart data
  const pieChartData = {
    labels: ["Opened", "Not Opened"],
    datasets: [
      {
        data: [openedCount, 100 - openedCount],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Define line chart data
  const lineChartData = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Number of Users",
        data: [3, 5, 8, 12, 18],
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointRadius: 4,
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <p className="text-lg font-bold">Graphs for Email Tracking</p>
      <div className="flex space-x-4  gap-x-[1rem]">
        <div className="flex-1 ">
          <Bar data={barChartData} options={chartOptions} />
        </div>
        <div className="flex-1 h-[200px]">
          <Pie data={pieChartData} options={chartOptions} />
        </div>
        <div className="flex-1">
          <Line data={lineChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default EmailTrackingGraphs;
