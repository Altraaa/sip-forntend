import { useUser } from "@/utils/hooks/useUser";
import { useSchedules } from "@/utils/hooks/useSchedule";
import { ISchedules } from "@/utils/models/Schedules";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/SharedCompoent/Card";
import Loading from "@/ui/components/SharedCompoent/Loading";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Time slots and days (static configuration)
const timeSlots = [
  "07:30-08:10",
  "08:10-08:50",
  "08:50-09:30",
  "09:30-10:10",
  "10:10-10:30",
  "10:30-11:10",
  "11:10-11:50",
  "11:50-12:30",
  "12:30-13:10",
  "13:10-13:30",
  "13:30-14:10",
  "14:10-14:50",
  "14:50-15:30",
];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

type ScheduleSlot =
  | (ISchedules & { type: "schedule" })
  | { type: "break" }
  | { type: "dismissal" }
  | { type: "empty" };

const ViewSchedule = () => {
  const { data: userData } = useUser();
  const { data: scheduleData, isLoading: scheduleLoading } = useSchedules();

  const loading = scheduleLoading || !userData;

  // Fetching the user's classroom_id
  const classroomId = userData?.classroom_id;

  // Function to group schedules by day and time slots
  const transformScheduleData = (data: ISchedules[]) => {
    return data.map((schedule) => ({
      ...schedule,
      day:
        schedule.day.charAt(0).toUpperCase() +
        schedule.day.slice(1).toLowerCase(),
      start_time: schedule.start_time.substring(0, 5),
      end_time: schedule.end_time.substring(0, 5),
    }));
  };

  // Group schedules by day and time slots, filter by classroom_id
  const groupSchedulesByDayAndTime = (
    scheduleData: ISchedules[]
  ): Record<string, ScheduleSlot[]> => {
    const grouped: Record<string, ScheduleSlot[]> = {};

    if (!scheduleData) return grouped;

    // Filter schedule data by classroom_id
    const filteredSchedules = scheduleData.filter(
      (schedule) => schedule.classroom_id === classroomId
    );

    days.forEach((day) => {
      grouped[day] = timeSlots.map((time) => {
        const schedule = filteredSchedules.find((s) => {
          const scheduleTime = `${s.start_time.substring(
            0,
            5
          )}-${s.end_time.substring(0, 5)}`;
          return s.day === day && scheduleTime === time;
        });

        if (schedule) {
          return { ...schedule, type: "schedule" };
        } else if (
          time === "10:10-10:30" ||
          (time === "13:10-13:30" && day !== "Friday")
        ) {
          return { type: "break" };
        } else if (
          (day === "Thursday" && time === "14:50-15:30") ||
          (day === "Friday" &&
            [
              "12:30-13:10",
              "13:10-13:30",
              "13:30-14:10",
              "14:10-14:50",
              "14:50-15:30",
            ].includes(time))
        ) {
          return { type: "dismissal" };
        } else {
          return { type: "empty" };
        }
      });
    });

    return grouped;
  };

  // Applying transformation and grouping to the data
  const transformedScheduleData = scheduleData
    ? transformScheduleData(scheduleData)
    : [];
  const groupedSchedules = groupSchedulesByDayAndTime(transformedScheduleData);

  // Mobile swipe handling
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentDayIndex((prev) => Math.min(prev + 1, days.length - 1)),
    onSwipedRight: () => setCurrentDayIndex((prev) => Math.max(prev - 1, 0)),
  });

  return (
    <MainLayout title="Schedule">
      <Loading open={loading} />
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          Hi, <span className="text-customColor-oranye">{userData?.name}</span>
        </h2>
        <p className="text-gray-600">This is the schedule for your class</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="hidden md:grid sm:grid-cols-4 md:grid-cols-6 gap-2">
          <div className="space-y-2">
            <div className="h-12" />
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-20 flex items-center text-sm text-gray-600"
              >
                {time}
              </div>
            ))}
          </div>

          {days.map((day) => (
            <div key={day} className="space-y-2">
              <div className="h-12 flex items-center justify-center font-semibold">
                {day}
              </div>
              {groupedSchedules[day]?.map((slot, index) => (
                <Card
                  key={`${day}-${index}`}
                  className={`h-20 ${
                    slot.type === "schedule"
                      ? "bg-customColor-cream"
                      : slot.type === "break"
                      ? "bg-blue-100"
                      : slot.type === "dismissal"
                      ? "bg-gray-100"
                      : "bg-gray-50"
                  }`}
                >
                  {slot.type === "schedule" ? (
                    <div className="text-center">
                      <h3 className="font-semibold text-sm">
                        {slot.subject?.name}
                      </h3>
                      <p className="text-xs text-gray-600">{`Room: ${slot.room}`}</p>
                    </div>
                  ) : slot.type === "break" ? (
                    <p className="text-gray-600 text-sm text-center">
                      Istirahat
                    </p>
                  ) : slot.type === "dismissal" ? (
                    <p className="text-gray-600 text-sm text-center">Pulang</p>
                  ) : (
                    <p className="text-gray-400 text-sm text-center">
                      No schedule
                    </p>
                  )}
                </Card>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div
          {...handlers}
          className="md:hidden sm:flex sm:flex-wrap flex flex-col items-center space-y-4"
        >
          <div className="flex justify-between w-full">
            <button
              onClick={() =>
                setCurrentDayIndex((prev) => Math.max(prev - 1, 0))
              }
              disabled={currentDayIndex === 0}
              className="p-2 disabled:opacity-50 bg-gray-300 transition-all ease-in-out rounded-l-xl"
            >
              <ChevronLeft />
            </button>
            <h3 className="text-lg font-semibold">{days[currentDayIndex]}</h3>
            <button
              onClick={() =>
                setCurrentDayIndex((prev) =>
                  Math.min(prev + 1, days.length - 1)
                )
              }
              disabled={currentDayIndex === days.length - 1}
              className="p-2 disabled:opacity-50 bg-gray-300 transition-all ease-in-out rounded-r-xl"
            >
              <ChevronRight />
            </button>
          </div>
          <div className="space-y-2 w-full">
            {timeSlots.map((_time, index) => {
              const slot = groupedSchedules[days[currentDayIndex]]?.[index];
              return (
                <Card
                  key={`${days[currentDayIndex]}-${index}`}
                  className={`h-20 ${
                    slot?.type === "schedule"
                      ? "bg-customColor-cream"
                      : slot?.type === "break"
                      ? "bg-blue-100"
                      : slot?.type === "dismissal"
                      ? "bg-gray-100"
                      : "bg-gray-50"
                  }`}
                >
                  {slot?.type === "schedule" ? (
                    <div className="text-center">
                      <h3 className="font-semibold text-sm">
                        {slot.subject?.name}
                      </h3>
                      <p className="text-xs text-gray-600">{`Room: ${slot.room}`}</p>
                    </div>
                  ) : slot?.type === "break" ? (
                    <p className="text-gray-600 text-sm text-center">
                      Istirahat
                    </p>
                  ) : slot?.type === "dismissal" ? (
                    <p className="text-gray-600 text-sm text-center">Pulang</p>
                  ) : (
                    <p className="text-gray-400 text-sm text-center">
                      No schedule
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ViewSchedule;
