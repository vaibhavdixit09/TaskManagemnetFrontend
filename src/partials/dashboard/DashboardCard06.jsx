import React, { useEffect, useState } from "react";
import DoughnutChart from "../../charts/DoughnutChart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard06() {
  const [chartData, setChartData] = useState(null);

  const fetchTasks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userData"));
      if (!user || !user._id) {
        // toast.error("User data not found");
        return;
      }

      const response = await fetch(
        // `http://localhost:4000/api/v1/list-task/${user._id}`
        `http://116.202.210.102:9090/api/v1/list-task/${user._id}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("data", data);

      const personalTasks = data.allTasks.filter((task) =>
        task.category.includes("Personal")
      );
      const officeTasks = data.allTasks.filter((task) =>
        task.category.includes("Office")
      );

      const totalTasks = personalTasks.length + officeTasks.length;

      let personalPercentage = 0;
      let officePercentage = 0;

      if (totalTasks > 0) {
        personalPercentage = Math.round(
          (personalTasks.length / totalTasks) * 100
        );
        officePercentage = 100 - personalPercentage; // Ensure that percentages add up to 100
      }

      setChartData({
        labels: ["Personal", "Office"],
        datasets: [
          {
            label: "Task Categories",
            data: [personalPercentage, officePercentage],
            backgroundColor: [
              tailwindConfig().theme.colors.purple[500],
              tailwindConfig().theme.colors.purple[800],
            ],
            hoverBackgroundColor: [
              tailwindConfig().theme.colors.purple[600],
              tailwindConfig().theme.colors.purple[900],
            ],
            borderWidth: 0,
          },
        ],
      });

      if (data.allTasks.length <= 0) {
        toast.warning("No tasks found");
      }
    } catch (error) {
      toast.error("An error occurred while fetching tasks");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Task Categories
        </h2>
      </header>
      {chartData && <DoughnutChart data={chartData} width={389} height={260} />}
    </div>
  );
}

export default DashboardCard06;
