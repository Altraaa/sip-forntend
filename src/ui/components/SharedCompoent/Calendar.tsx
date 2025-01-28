import { ISchedules } from "@/utils/models/Schedules";
import { useState, useEffect } from "react";

interface CalendarProps {
  isSidebarExpanded?: boolean;
  schedules: ISchedules[];
}

const Calendar = ({ isSidebarExpanded }: CalendarProps) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [todayDate] = useState({
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  });
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

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const getPrevMonthDays = (month: number, year: number) => {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    return getDaysInMonth(prevMonth, prevYear);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  useEffect(() => {
    setIsCompact(!isSidebarExpanded);
  }, [isSidebarExpanded]);

  const isToday = (day: number) => {
    return (
      day === todayDate.date &&
      currentMonth === todayDate.month &&
      currentYear === todayDate.year
    );
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const prevMonthDays = getPrevMonthDays(currentMonth, currentYear);
    const calendarDays = [];

    // Mengisi kolom kosong dengan Tanggal dari bulan sebelumnya
    for (let i = 0; i < firstDay; i++) {
      const prevDate = prevMonthDays - firstDay + i + 1;
      calendarDays.push(
        <button
          key={`prev-${i}`}
          disabled
          className={`
            p-1 text-center border border-customColor-oranye/30
            text-gray-400 bg-white/80 rounded-lg
            ${isCompact ? "text-xs" : "text-sm"}
          `}
        >
          {prevDate}
        </button>
      );
    }

    // Tanggal Bulan yang sesuai dengan bulan dan tahun
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(
        <button
          key={day}
          className={`
            p-1 text-center border border-customColor-oranye
            rounded-lg transition-all relative
            ${isCompact ? "text-xs" : "text-sm"}
            ${
              isToday(day)
                ? "bg-customColor-oranye text-white hover:bg-customColor-oranye/90"
                : "text-gray-700 bg-white hover:bg-customColor-cream hover:text-black"
            }
          `}
        >
          {day}
        </button>
      );
    }

    // Mengisi kolom kosong dengan Tanggal dari bulan setelahnya
    const remainingDays = 42 - (firstDay + daysInMonth);
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push(
        <button
          key={`next-${i}`}
          disabled
          className={`
            p-1 text-center border border-customColor-oranye/30
            text-gray-400 bg-white/80 rounded-lg
            ${isCompact ? "text-xs" : "text-sm"}
          `}
        >
          {i}
        </button>
      );
    }

    return calendarDays;
  };

  return (
    <div
      className={`
      bg-white rounded-3xl shadow-xl border-2 transition-all duration-300
      ${
        isCompact
          ? "max-w-[90%] md:max-w-[100%] lg:max-w-[100%]"
          : "max-w-[75%] lg:max-w-[50%] xl:max-w-[60%] 2xl:max-w-[100%]"
      }
      mx-auto md:p-8 p-4 space-y-6
    `}
    >
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          aria-label="Previous Month"
        >
          &lt;
        </button>
        <p
          className={`font-semibold text-center ${
            isCompact ? "text-lg" : "text-xl lg:text-2xl"
          }`}
        >
          {months[currentMonth]} {currentYear}
        </p>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          aria-label="Next Month"
        >
          &gt;
        </button>
      </div>

      <div className="bg-customColor-darkBlue py-2 flex flex-col rounded-3xl">
        <div className="grid grid-cols-7 px-4 mt-4">
          {days.map((day, i) => (
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
        <hr className="mx-5 border-customColor-cream opacity-30" />

        <div
          className={`
          grid grid-cols-7 px-5 mt-4 mb-6
          ${isCompact ? "gap-1" : "gap-3"}
        `}
        >
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
