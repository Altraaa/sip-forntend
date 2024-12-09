import { useState, useEffect } from "react";

const Calendar = ({ isSidebarExpanded }: { isSidebarExpanded?: boolean }) => {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [isCompact, setIsCompact] = useState(false);

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

  useEffect(() => {
    // Set compact mode saat sidebar mengecil
    setIsCompact(!isSidebarExpanded);
  }, [isSidebarExpanded]);

  return (
    <div
      className={`
        bg-white rounded-3xl shadow-xl border-2 transition-all duration-300
        ${
          isCompact
            ? "max-w-[90%] md:max-w-[100%] lg:max-w-[100%]"
            : "max-w-[75%] lg:max-w-[50%] xl:max-w-[40%] 2xl:max-w-[100%]"
        }
        mx-auto md:p-8 p-4 space-y-6
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          aria-label="Previous Month"
        >
          &lt;
        </button>
        <p
          className={`font-semibold text-center ${
            isCompact ? "text-lg" : "text-xl lg:text-2xl"
          }`}
        >
          {months[currentMonth]}
        </p>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          aria-label="Next Month"
        >
          &gt;
        </button>
      </div>

      {/* Calendar Body */}
      <div className="bg-customColor-darkBlue py-2 flex flex-col rounded-3xl">
        {/* Days Header */}
        <div className="grid grid-cols-7 px-4 mt-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <span
              key={i}
              className={`p-2 text-center font-bold text-customColor-cream ${
                isCompact ? "text-xs" : "text-sm"
              }`}
            >
              {day}
            </span>
          ))}
        </div>
        <hr className="mx-5" />

        {/* Dates */}
        <div
          className={`grid px-5 mt-4 mb-6 gap-2 ${
            isCompact ? "grid-cols-7 gap-1" : "grid-cols-7 gap-3"
          }`}
        >
          {[...Array(31)].map((_, i) => (
            <span
              key={i}
              className={`p-1 text-center cursor-pointer border border-customColor-oranye 
              text-gray-700 bg-white rounded-lg ${
                isCompact ? "text-xs" : "text-sm"
              }`}
            >
              {i + 1}
            </span>
          ))}
          {[...Array(7 - (31 % 7))].map((_, i) => (
            <span
              key={`next-${i}`}
              className={`p-1 text-center cursor-pointer border border-customColor-oranye 
              text-gray-400 bg-white rounded-lg ${
                isCompact ? "text-xs" : "text-sm"
              }`}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
