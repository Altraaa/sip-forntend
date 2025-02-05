import { useQuery } from "@tanstack/react-query";
import { ApiRequest } from "@/utils/services/Api.service";
import { useMutation } from "@tanstack/react-query";
import { ITask } from "@/utils/models/Tasks";

// Fungsi untuk mengambil tugas berdasarkan student_id
const fetchTasks = async (studentId: number) => {
  const response = await ApiRequest({
    url: `tasks?student_id=${studentId}`,
    method: "GET",
  });
  return response;
};

export const useTasks = () => {
  // Ambil student_id dari localStorage
  const studentId = localStorage.getItem("student_id");

  if (!studentId) {
    throw new Error("Student ID not found in localStorage.");
  }

  return useQuery({
    queryKey: ["tasks", studentId],
    queryFn: () => fetchTasks(Number(studentId)),
  });
};

// Fungsi untuk membuat tugas baru
const createTask = async (newTask: ITask) => {
  const response = await ApiRequest({
    url: "tasks",
    method: "POST",
    body: newTask,
  });
  return response;
};

export const useTaskCreate = () => {
  return useMutation({
    mutationFn: createTask,
    onError: (error: any) => {
      console.error("Error creating task:", error);
    },
    onSuccess: (data) => {
      console.log("Task successfully created:", data);
    },
  });
};
