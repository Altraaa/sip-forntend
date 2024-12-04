import { useState } from "react";

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(0);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const handlePrevMonth = () => {
      setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    };

    const handleNextMonth = () => {
      setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    };

    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 space-y-8 border-2">
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            aria-label="Previous Month"
          >
            &lt;
          </button>
          <p className="text-2xl font-semibold">{months[currentMonth]}</p>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            aria-label="Next Month"
          >
            &gt;
          </button>
        </div>
        <div className="bg-customColor-darkBlue py-2 flex flex-col rounded-3xl">
          <div className="grid grid-cols-7 px-4 mt-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <span
                key={i}
                className="p-2 text-sm text-center font-bold text-customColor-cream"
              >
                {day}
              </span>
            ))}
          </div>
          <hr className="mx-5" />
          <div className="grid grid-cols-7 gap-3 px-5 mt-4 mb-6">
            {[...Array(31)].map((_, i) => (
              <span
                key={i}
                className="p-1 text-sm text-center cursor-pointer border border-customColor-oranye text-gray-700 bg-white rounded-lg"
              >
                {i + 1}
              </span>
            ))}
            {[...Array(7 - (31 % 7))].map((_, i) => (
              <span
                key={`next-${i}`}
                className="p-1 text-sm text-center cursor-pointer border border-customColor-oranye text-gray-400 bg-white rounded-lg"
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
}

export default Calendar;