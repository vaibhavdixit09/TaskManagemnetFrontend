import React from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import EditMenu from "../../components/DropdownEditMenu";
import { format } from "date-fns"; // Import date-fns for formatting dates

// Import utilities

function DashboardCard03() {
  // Get today's date
  const todayDate = format(new Date(), "MMMM dd, yyyy");

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-xl   text-gray-800 dark:text-gray-100 font-bold ">
            {todayDate}
          </h2>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">
          Date
        </div>
      </div>
      {/* Calendar Component */}
      <div className="grow flex flex-col bg-transparent items-center justify-center p-4 relative mt-2">
        {/* Calendar SVG */}
        <div className="flex items-center justify-center mb-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-purple-500 fill-current "
            viewBox="0 0 448 512"
          >
            {" "}
            <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l80 0 0 56-80 0 0-56zm0 104l80 0 0 64-80 0 0-64zm128 0l96 0 0 64-96 0 0-64zm144 0l80 0 0 64-80 0 0-64zm80-48l-80 0 0-56 80 0 0 56zm0 160l0 40c0 8.8-7.2 16-16 16l-64 0 0-56 80 0zm-128 0l0 56-96 0 0-56 96 0zm-144 0l0 56-64 0c-8.8 0-16-7.2-16-16l0-40 80 0zM272 248l-96 0 0-56 96 0 0 56z" />
          </svg>{" "}
        </div>

        {/* Button */}
        {/* Button */}
        <Link to="/dashboard/calender">
          <button
            type=""
            className="my-2 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-gray-300 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              View Calender
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DashboardCard03;
