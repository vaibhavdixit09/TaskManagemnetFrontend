import React from "react";
import { format, parseISO, isValid } from "date-fns";

const formatDate = (dateString) => {
  if (!dateString) {
    return "Invalid date";
  }
  const date = parseISO(dateString);
  return isValid(date) ? format(date, "dd/MM/yyyy") : "Invalid date";
};

const ShowTaskModal = ({ task, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-gray-800 p-2 text-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-1/2 lg:w-1/3">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold  text-purple-500">
            Task Details
          </h2>
        </div>
        <div className="p-4">
          {task ? (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold uppercase ">{task.title}</h3>
              <p className="text-sm">
                <span className="font-semibold">Description :</span>{" "}
                {task.description}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Category:</span> {task.category}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Priority:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded ${
                    task.priority === "High"
                      ? "bg-red-500"
                      : task.priority === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {task.priority}
                </span>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Status :</span> {task.status}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Due Date:</span>{" "}
                {formatDate(task.dueDate)}
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center">No task available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowTaskModal;
