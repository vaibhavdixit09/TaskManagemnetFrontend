import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import Profile from "./Profile";
import Home from "./Home";
import { useDashboard } from "../context/DashboardContext";
import AddTask from "./AddTask";
import ManageTask from "./ManageTask";
import Calendar from "./Calender";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeSection } = useDashboard();
  const { user, setUser } = useDashboard();

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    // console.log("token", token);
    // console.log("location.search", location.search);
    const isSocialLogin = searchParams.get("Is_socialLogin");
    if (token) {
      console.log(token);
      console.log("INI");
      // Decode the token to get user data
      const userData = jwtDecode(token);

      // Store user data in local storage or state
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
    }
  }, [location.search]);

  return (
    <section>
      {user && (
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
      )}
    </section>
  );
}

export default Dashboard;
