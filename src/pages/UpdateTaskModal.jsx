import React, { useState } from "react";
import { format, parseISO, isValid } from "date-fns";

// Function to format date for input type="date"
const formatForDateInput = (dateString) => {
  if (!dateString) {
    return "";
  }
  const date = parseISO(dateString);
  return isValid(date) ? format(date, "yyyy-MM-dd") : "";
};

const UpdateTaskModal = ({ task, closeModal, updateTask }) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    category: task?.category || "",
    priority: task?.priority || "",
    status: task?.status || "",
    dueDate: task?.dueDate || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(formData, task._id); // Call a function to update the task
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 ">
      <div className="bg-gray-800 p-4  text-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-1/2 lg:w-2/3">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold uppercase text-purple-500">
            Update Task
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block uppercase font-thin text-xs  mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block uppercase font-thin text-xs  mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              rows="3"
            />
          </div>
          <div className="flex justify-between">
            <div className="w-[49%]">
              <label
                htmlFor="category"
                className="block uppercase font-thin text-xs  mb-1"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                required
              >
                <option value="">Select Category</option>
                <option value="Office">Office</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            <div className="w-[49%]">
              <label
                htmlFor="priority"
                className="block uppercase font-thin text-xs  mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="w-[49%]">
              <label
                htmlFor="status"
                className="block uppercase font-thin text-xs  mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                required
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
            <div className="w-[49%]">
              <label
                htmlFor="dueDate"
                className="block uppercase font-thin text-xs  mb-1"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formatForDateInput(formData.dueDate)}
                onChange={(e) =>
                  handleChange({
                    target: { name: "dueDate", value: e.target.value },
                  })
                }
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
