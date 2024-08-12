import React, { useEffect, useState } from "react";
import logo from "../assets/list.png";
import loginBg from "../assets/loginbg.jpg";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDashboard } from "../context/DashboardContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useDashboard();

  // Example function to handle Google login
  async function handleGoogleLogin() {
    // try {
    //   const response = await fetch(
    //     "http://localhost:5000/auth/google/callback"
    //   ); // Adjust URL as needed
    //   const data = await response.json();
    //   if (data.token) {
    //     localStorage.setItem("authToken", data.token);
    //     localStorage.setItem("authToken", data.user);
    //     navigate("/dashboard/home"); // Or update state without redirect
    //     toast.success("logged in...");
    //   } else {
    //     toast.error("Authentication failed");
    //     console.error("Authentication failed");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
    console.log("g hit");
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://116.202.210.102:9090/api/v1/login",
        // "http://localhost:4000/api/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwtToken", data.token);

        // Fetch user data
        const userResponse = await fetch(
          "http://116.202.210.102:9090/api/v1/user-details",
          // "http://localhost:4000/api/v1/user-details",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
          localStorage.setItem("userData", JSON.stringify(userData));
          console.log(user);
          toast.success("Login successful");
          navigate("/dashboard/home");
        } else {
          // Handle non-OK response for user data
          const userError = await userResponse.text();
          toast.error(userError || "Failed to fetch user data");
        }
      } else {
        // Handle non-OK response for login
        const errorData = await response.text();
        // toast.error(errorData || "Login failed");
        setError(errorData || "Login failed");
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error("Login error:", error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="min-h-[100vh] lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src={loginBg}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <img src={logo} className="w-16 h-16" alt="" />
            </a>
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome back...
            </h2>
            <p className="mt-4 leading-relaxed font-thin text-white/90">
              Please login to continue and access your personalized dashboard,
              where you can manage your account, view updates, and explore new
              features.
            </p>
          </div>
        </section>
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20 dark:bg-gray-900"
                href="#"
              >
                <span className="sr-only">Home</span>
                <img src={logo} alt="" />
              </a>
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                Welcome to TaskY
              </h1>
              <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                Task management is the process of overseeing a task through its
                lifecycle. It involves planning, testing, tracking, and
                reporting.
              </p>
            </div>
            <h2 className="text-white text-3xl mt-3 font-semibold lg:mt-0">
              Log In
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            <form
              onSubmit={handleLogin}
              className="mt-8 grid grid-cols-10 gap-6"
            >
              <div className="col-span-12">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 outline-none w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 outline-none w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="col-span-7 block sm:flex sm:items-center sm:gap-4 gap-2 ">
                <button
                  type="submit"
                  className="relative mr-2 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none dark:focus:ring-blue-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Login
                  </span>
                </button>
                <Link
                  onClick={handleGoogleLogin}
                  to="http://localhost:4000/auth/google"
                >
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none dark:focus:ring-blue-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Google Login
                    </span>
                  </button>
                </Link>
              </div>
            </form>
            <p className="mt-4 pt-7 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
              Don't have an account?
              <Link className="text-blue-600 px-2" to="/signup">
                Sign Up
              </Link>
            </p>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;
