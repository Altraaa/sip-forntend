import { useQuery } from "@tanstack/react-query";
import { ApiSubjects } from "@/utils/services/Subject.service"; // API service yang sudah diimpor sebelumnya

// Fungsi untuk mengambil data subjects
const fetchSubjects = async () => {
  const response = await ApiSubjects.getAll();
  return response; // Pastikan response sesuai dengan struktur yang diharapkan (array of subjects)
};

export const useSubjects = () => {
  return useQuery({
    queryKey: ["subjects"], // Unique key untuk query ini
    queryFn: fetchSubjects, // Fungsi yang akan dipanggil untuk fetch data
  });
};
