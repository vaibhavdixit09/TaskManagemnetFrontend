import React, { useState } from "react";
import { toast } from "react-toastify"; // Ensure you have react-toastify installed
import { useDashboard } from "../context/DashboardContext";

const AddTask = () => {
  const [formData, setFormData] = useState({
    owner: "",
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    status: "",
    category: "",
    comment: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("userData"));
      const finalFormData = { ...formData, owner: user._id };

      // Send a POST request to create a new task using Fetch API
      const response = await fetch(
        // "https://taskmanagementbackend-aen8.onrender.com/api/v1/create-task",
        "http://localhost:4000/api/v1/create-task",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalFormData),
        }
      );

      if (response.ok) {
        setMessage("Task created successfully");
        toast.success("Task created successfully");
      } else {
        setMessage("Task not created");
        toast.error("Task not created");
      }

      // Clear form data after successful submission
      setFormData({
        title: "",
        description: "",
        priority: "",
        dueDate: "",
        status: "",
        category: "",
        comment: "",
      });
    } catch (error) {
      setMessage(
        "Error creating task: " +
          (error.message || "An unexpected error occurred")
      );
      toast.error(
        "Error creating task: " +
          (error.message || "An unexpected error occurred")
      );
    }
  };

  return (
    <section>
      <form
        className="max-w-screen-md mx-auto p-4 lg:p-2"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold my-6 text-purple-500">Create Task</h2>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="title"
            id="floating_title"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            placeholder=" "
            value={formData.title}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="floating_title"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Title
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="description"
            id="floating_description"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            placeholder=" "
            value={formData.description}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="floating_description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <select
              name="priority"
              id="priority"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option className="bg-gray-700" value="" disabled hidden>
                Priority
              </option>
              <option className="bg-gray-700" value="Low">
                Low
              </option>
              <option className="bg-gray-700" value="Medium">
                Medium
              </option>
              <option className="bg-gray-700" value="High">
                High
              </option>
            </select>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <select
              name="status"
              id="status"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option className="bg-gray-700" value="" disabled hidden>
                Status
              </option>
              <option className="bg-gray-700" value="Pending">
                Pending
              </option>
              <option className="bg-gray-700" value="In Progress">
                In Progress
              </option>
              <option className="bg-gray-700" value="Completed">
                Completed
              </option>
              <option className="bg-gray-700" value="On Hold">
                On Hold
              </option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="dueDate"
              id="floating_date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="floating_date"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Select due date
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <select
              name="category"
              id="category"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Category
              </option>
              <option className="bg-gray-700" value="Personal">
                Personal
              </option>
              <option className="bg-gray-700" value="Office">
                Office
              </option>
            </select>
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <textarea
            name="comment"
            id="floating_comment"
            rows="3"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            placeholder=" "
            value={formData.comment}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="floating_comment"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your comment
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="relative my-4 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white transition-all bg-purple-500 rounded-lg group"
          >
            <span className="absolute inset-0 w-full h-0 transition-all bg-purple-600 opacity-60 group-hover:h-full"></span>
            <span className="relative">Create</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddTask;
