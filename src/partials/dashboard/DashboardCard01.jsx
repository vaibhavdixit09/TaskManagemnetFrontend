import React from "react";
import { Link } from "react-router-dom";
import EditMenu from "../../components/DropdownEditMenu";
import { useDashboard } from "../../context/DashboardContext";

// Import utilities
// import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard01() {
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="flex flex-col items-center my-4 space-y-2">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          WELCOME
        </h2>
        <h1 className="text-xl font-bold text-green-500 uppercase tracking-wide">
          {user.firstname}
        </h1>
      </header>

      {/* Clock SVG and Button */}

      <div className="flex flex-col items-center justify-center flex-grow p-5">
        {/* Clock SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 text-purple-500 "
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="6" x2="12" y2="12" />
          <line x1="12" y1="12" x2="16" y2="12" />
        </svg>

        {/* Create Button */}
        <Link to="/dashboard/addtask">
          <button
            type=""
            className="mt-5 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-gray-300 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Create New
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DashboardCard01;
