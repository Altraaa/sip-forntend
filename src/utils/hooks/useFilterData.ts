import { useQuery } from "@tanstack/react-query";
import { ISchedules } from "@/utils/models/Schedules";

// Fungsi untuk menghitung data hari ini
const fetchTodayData = (schedules: ISchedules[]) => {
  const today = new Date().toLocaleString("en-US", { weekday: "long" });
  const todaySchedules = schedules?.filter(
    (schedule: ISchedules) => schedule.day === today
  );
  const totalSubjects = new Set(
    todaySchedules?.map((item: ISchedules) => item.subject.name)
  ).size;
  const totalTeachers = new Set(
    todaySchedules?.map((item: ISchedules) => item.teacher.name)
  ).size;

  return {
    subject: todaySchedules?.[0]?.subject.name || null,
    teacher: todaySchedules?.[0]?.teacher.name || null,
    nip: todaySchedules?.[0]?.teacher.nip || null,
    startTime: todaySchedules?.[0]?.start_time || null,
    endTime: todaySchedules?.[0]?.end_time || null,
    totalSubjects,
    totalTeachers,
  };
};

export const useTodayData = (schedules: ISchedules[]) => {
  return useQuery({
    queryKey: ["todayData", schedules],
    queryFn: () => fetchTodayData(schedules),
    enabled: !!schedules && schedules.length > 0, // Pastikan data jadwal ada dan valid
  });
};
