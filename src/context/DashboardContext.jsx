import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create a context
const DashboardContext = createContext();

// Create a provider component
export const DashboardProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState("home"); // Default section
  const [user, setUser] = useState(null); // User state
  const [tasks, setTasks] = useState([]); // User state
  const navigate = useNavigate(); // Hook for navigation

  // Function to fetch user data
  const fetchUserData = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    try {
      const userResponse = await fetch(
        "http://localhost:4000/api/v1/user-details",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
      } else {
        // Handle non-OK response for user data
        const userError = await userResponse.text();
        toast.error(userError || "Failed to fetch user data");
      }
    } catch (error) {
      toast.error("An error occurred while fetching user data");
    }
  };

  // Fetch user data on component mount if token is present
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        activeSection,
        setActiveSection,
        user,
        setUser,
        fetchUserData,
        tasks,
        setTasks,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the DashboardContext
export const useDashboard = () => {
  return useContext(DashboardContext);
};
