import { useQuery } from "@tanstack/react-query";
import { ApiTeachers } from "../services/Teacher.service";
import { useUser } from "./useUser";
import { useSchedules } from "./useSchedule";

// Hook utama untuk mengambil data Teachers, Schedules, dan User
export const useTeachersData = () => {
  // Menggunakan hook useSchedule untuk mengambil data jadwal
  const { data: schedules, isLoading: schedulesLoading } = useSchedules();

  // Menggunakan hook useUser untuk mengambil data pengguna
  const { data: userData, isLoading: userLoading } = useUser();

  // Menggunakan hook useQuery untuk mengambil data guru
  const { data: teachers, isLoading: teachersLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: ApiTeachers.getAll,
  });

  // Loading status gabungan
  const loading = teachersLoading || schedulesLoading || userLoading;

  return {
    teachers,
    schedules,
    userData,
    loading,
  };
};
