import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiRequest } from "../services/Api.service";
import { useUser } from "./useUser"; // Assuming this hook fetches the user
import { ITask } from "../models/Tasks";
import { console } from "inspector";

// Fetch tasks based on studentId
const fetchTasks = async () => {
  const response = await ApiRequest({
    url: "tasks", 
    method: "GET",
  });
  return response;
};

console.log(fetchTasks)

export const useTasks = () => {
  const { data: user } = useUser();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", user?.id],
    queryFn: fetchTasks,
  });

  // Filter tasks based on the studentId
  const filteredTasks = data?.filter(
    (task: any) => task.student_id === user?.id
  );

  return {
    data: filteredTasks, // Return filtered tasks
    isLoading,
    isError,
  };
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
