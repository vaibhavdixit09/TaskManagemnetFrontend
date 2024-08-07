import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
// Import pages
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("theme", "dark");
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route index path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route exact path="/dashboard/*" element={<Dashboard />} /> */}
        <Route
          path="/dashboard/*"
          element={<ProtectedRoute component={Dashboard} />}
        />{" "}
      </Routes>
    </>
  );
}

export default App;
