import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import Profile from "./Profile";
import Home from "./Home";
import { useDashboard } from "../context/DashboardContext";
import AddTask from "./AddTask";
import ManageTask from "./ManageTask";
import Calendar from "./Calender";
import { toast } from "react-toastify";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeSection } = useDashboard();
  const { user } = useDashboard();
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="addtask" element={<AddTask />} />
          <Route path="managetasks" element={<ManageTask />} />
          <Route path="calender" element={<Calendar />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
