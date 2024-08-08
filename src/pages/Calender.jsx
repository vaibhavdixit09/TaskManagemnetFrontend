// CalendarComponent.jsx
import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    generateCalendar(currentYear, currentMonth);
  }, [currentMonth, currentYear]);

  const generateCalendar = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();

    const newDays = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      newDays.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      newDays.push(day);
    }

    setDays(newDays);
  };

  const handleDateClick = (day) => {
    if (day) {
      const selectedDate = new Date(currentYear, currentMonth, day);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = selectedDate.toLocaleDateString(undefined, options);
      setSelectedDate(formattedDate);
      setShowModal(true);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="bg-gray-900 flex items-center justify-center h-screen">
      <div className="lg:w-12/12 md:w-9/12 sm:w-10/12 h-screen mt-4 mx-auto ">
        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-gray-700 text-white">
            <button onClick={handlePrevMonth} className="focus:outline-none">
              Previous
            </button>
            <h2 className="text-lg font-semibold">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
              })}{" "}
              {currentYear}
            </h2>
            <button onClick={handleNextMonth} className="focus:outline-none">
              Next
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 p-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <div key={index} className="text-center font-semibold">
                  {day}
                </div>
              )
            )}
            {days.map((day, index) => (
              <div
                key={index}
                className={`text-center py-2 border border-purple-800 cursor-pointer ${
                  day === new Date().getDate() &&
                  currentMonth === new Date().getMonth() &&
                  currentYear === new Date().getFullYear()
                    ? "bg-purple-600 text-white"
                    : ""
                }`}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className="bg-gray-800 text-white  w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto p-4">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold text-purple-600">
                Selected Date
              </p>
              <button
                onClick={closeModal}
                className="px-3 py-1 rounded-full bg-gray-900 hover:bg-gray-800 focus:outline-none"
              >
                ✕
              </button>
            </div>
            <div className="text-xl   font-semibold">{selectedDate}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Calendar;
