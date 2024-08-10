import React, { useState, useEffect } from "react";

function DashboardCard07() {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/list-task/${user._id}`
        );
        const data = await response.json();
        console.log(data.allTasks, "data");
        // Sort tasks by date (assuming tasks are sorted from oldest to newest) and get the last 5
        const recentTasks = data.allTasks.slice(-5).reverse();
        setTasks(recentTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user._id]);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Recently Created
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">TITLE</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">STATUS</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">PRIORITY</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">DUEDATE</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {user && tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task._id}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="text-gray-800 dark:text-gray-100">
                          {task.title}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{task.status}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">
                        {task.priority}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-2 text-center">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
