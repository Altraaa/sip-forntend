import { useQuery } from "@tanstack/react-query";
import { ApiStudents } from "../services/Student.service";
import { IStudent } from "../models/Student";
import { useProfileData } from "./userProfile";

// Fungsi untuk mengambil data siswa
const fetchStudents = async () => {
  const response = await ApiStudents.getAll();
  return response; // Pastikan response sesuai dengan struktur yang diharapkan (array of students)
};

export const useStudents = () => {
  const { user } = useProfileData(); // Mengambil user dan classroom_id dari hook useProfileData

  const { data, isLoading, error } = useQuery({
    queryKey: ["students"], // Unique key untuk query ini
    queryFn: fetchStudents, // Fungsi yang akan dipanggil untuk fetch data
  });

  // Jika data sudah ada, filter berdasarkan classroom_id
  const filteredData = data?.filter(
    (student: IStudent) => student.classroom_id === user?.classroom_id
  );

  return {
    data: filteredData, // Kembalikan data yang sudah difilter
    isLoading,
    error,
  };
};
