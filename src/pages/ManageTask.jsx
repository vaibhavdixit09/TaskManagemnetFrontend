import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDashboard } from "../context/DashboardContext";
import { format, parseISO, isValid } from "date-fns";
import ShowTaskModal from "./ShowTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import { toast } from "react-toastify";

const ManageTask = () => {
  const filterDropdownRef = useRef(null);
  const actionDropdownRefs = useRef([]);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 8;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const [searchQuery, setSearchQuery] = useState("");
  const { tasks, setTasks } = useDashboard();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length === 1) {
      // If the search query is empty, show all tasks
      setFilteredTasks(allTasks);
    } else {
      // Filter tasks based on the search query
      const filtered = allTasks.filter((task) =>
        task.title.toLowerCase().includes(query)
      );

      setFilteredTasks(filtered);
    }

    // Optionally update tasks displayed based on search query
    setTasks(filteredTasks);
  };

  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };
  const handleUpdateTask = async (updatedTask, _id) => {
    try {
      console.log("update function started", updatedTask);
      const response = await fetch(
        `http://localhost:4000/api/v1/update-task/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success("Task updated successfully"); // Show success toast message
        fetchTasks();
        closeEditModal();
      }
    } catch (err) {
      toast.error("An error occurred while updating task"); // Show error toast message
      console.error(err);
    }
    console.log("update function started");
  };
  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };
  const fetchTasks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userData"));
      const response = await fetch(
        `http://localhost:4000/api/v1/list-task/${user._id}`
      );
      const data = await response.json();
      setAllTasks(data.allTasks);
      setTasks(data.allTasks);
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
  const handleDeleteTask = async (taskId) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      try {
        // Call the delete API
        const response = await fetch(
          `http://localhost:4000/api/v1/delete-task/${taskId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          toast.success("Task deleted successfully");
          fetchTasks(); // Show success toast message
          // Optionally, you can also refetch tasks or update state here
        } else {
          toast.error("Failed to delete task"); // Show error toast message
        }
      } catch (error) {
        toast.error("An error occurred while deleting task");
        console.error(error);
      }
    }
  };

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Invalid date";
    }
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "dd/MM/yyyy") : "Invalid date";
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target)
      ) {
        setIsFilterDropdownOpen(false);
      }
      if (
        actionDropdownRefs.current &&
        actionDropdownRefs.current.every(
          (ref) => ref && !ref.contains(event.target)
        )
      ) {
        setIsActionDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleNextPage = () => {
    if (currentPage < Math.ceil(tasks.length / tasksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const applyFilter = async (filterType) => {
    if (filterType === "All") {
      setTasks(allTasks);
    } else if (filterType === "high-priority") {
      const filteredTasks = allTasks.filter((task) => task.priority === "High");
      setTasks(filteredTasks);
    } else if (filterType === "low-priority") {
      const filteredTasks = allTasks.filter((task) => task.priority === "Low");
      setTasks(filteredTasks);
    } else if (filterType === "medium-priority") {
      const filteredTasks = allTasks.filter(
        (task) => task.priority === "Medium"
      );
      setTasks(filteredTasks);
    } else if (filterType === "dueToday") {
      const filteredTasks = allTasks.filter((task) => {
        const dueDate = parseISO(task.dueDate);
        const today = new Date();
        return dueDate < today;
      });
      setTasks(filteredTasks);
    } else if (filterType === "Office") {
      const filteredTasks = allTasks.filter(
        (task) => task.category === "Office"
      );
      setTasks(filteredTasks);
    } else if (filterType === "Personal") {
      const filteredTasks = allTasks.filter(
        (task) => task.category === "Personal"
      );
      setTasks(filteredTasks);
    }

    setIsFilterDropdownOpen(false); // Close dropdown after applying filter
  };

  return (
    <section className="bg-gray-50 overflow-auto  dark:bg-gray-900 ">
      <div className="mx-auto w-full  ">
        <div className="bg-white  h-[90vh] dark:bg-gray-800 relative shadow-md  overflow-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    onChange={handleSearchChange}
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                    required=""
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <Link to="/dashboard/addtask">
                <button
                  type="button"
                  className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add Task
                </button>{" "}
              </Link>
              {/* filter */}
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button
                  id="filterDropdownButton"
                  onClick={toggleFilterDropdown}
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-4 w-4 mr-2 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Filter
                  <svg
                    className="-mr-1 ml-1.5 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                </button>
                <div
                  id="filterDropdown"
                  className={`absolute right-0 top-16 z-10 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700 ${
                    isFilterDropdownOpen ? "block" : "hidden"
                  }`}
                >
                  <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                    Filter Tasks
                  </h6>
                  <ul
                    className="space-y-2 text-sm"
                    aria-labelledby="filterDropdownButton"
                  >
                    <li className="flex items-center">
                      <button
                        onClick={() => applyFilter("All")}
                        className="text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        All
                      </button>
                    </li>
                    <li className="flex items-center">
                      <button
                        onClick={() => applyFilter("Office")}
                        className="text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Office Task
                      </button>
                    </li>
                    <li className="flex items-center">
                      <button
                        onClick={() => applyFilter("Personal")}
                        className="text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Personal Task
                      </button>
                    </li>
                    <li className="flex items-center">
                      <button
                        onClick={() => applyFilter("dueToday")}
                        className="text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Due Today
                      </button>
                    </li>
                    <li className="flex items-center">
                      <button
                        onClick={() => applyFilter("high-priority")}
                        className="text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        High Priority
                      </button>
                    </li>
                    <li className="flex items-center">
                      <button
                        onClick={() => applyFilter("low-priority")}
                        className="text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Low Priority
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* filter ends */}
            </div>
          </div>

          {/* main table starts */}
          <div className="overflow-x-auto min-h-[69vh] ">
            <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Task Title
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Priority
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Due Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTasks.map((task, index) => (
                  <tr key={task._id} className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {task.title}
                    </th>
                    <td className="px-4 py-3">{task.category}</td>
                    <td className={`px-4 py-3 `}>
                      <p
                        className={`inline-block w-20 text-center rounded-md px-2 font-bold  ${getPriorityClass(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </p>
                    </td>
                    <td className="px-4 py-3">{formatDate(task.dueDate)}</td>
                    <td className="px-4 py-3 flex items-center justify-end relative">
                      <button
                        id={`dropdown-button-${index}`}
                        onClick={() => toggleDropdown(index)}
                        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                      <div
                        id={`dropdown-${index}`}
                        className={`absolute top-10 z-50 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 ${
                          openDropdownIndex === index ? "" : "hidden"
                        }`}
                      >
                        <ul
                          className="py-1 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby={`dropdown-button-${index}`}
                        >
                          <li>
                            <p
                              onClick={() => openModal(task)}
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Show
                            </p>
                          </li>
                          <li>
                            <p
                              onClick={() => openEditModal(task)}
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Edit
                            </p>
                          </li>
                        </ul>
                        <div className="py-1">
                          <p
                            onClick={() => handleDeleteTask(task._id)}
                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Delete
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isModalOpen && (
              <ShowTaskModal task={selectedTask} closeModal={closeModal} />
            )}
            {isEditModalOpen && (
              <UpdateTaskModal
                task={selectedTask}
                closeModal={closeEditModal}
                updateTask={handleUpdateTask} // Function to handle task update
              />
            )}
          </div>

          <div className="flex justify-between items-center mt-4 px-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-purple-500 p-2 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {Array.from(
                { length: Math.ceil(tasks.length / tasksPerPage) },
                (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`p-1 rounded ${
                      currentPage === i + 1
                        ? "bg-purple-500 w-8 text-white"
                        : "bg-gray-600 w-8"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
              className="bg-purple-500 text-white p-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageTask;
