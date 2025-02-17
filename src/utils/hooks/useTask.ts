import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiRequest } from "../services/Api.service";
import { useUser } from "./useUser"; // Mengambil data user
import { ITask } from "../models/Tasks";
import { ISubject } from "../models/Subject";
import { useSubjects } from "./useSubject";
import { useTeachersData } from "./useTeacher";
import { ITeacher } from "../models/Teacher";

// Fungsi untuk mengambil tasks
const fetchTasks = async () => {
  const response = await ApiRequest({
    url: "tasks",
    method: "GET",
  });
  return response;
};

export const useTasks = () => {
  const { data: user } = useUser();
  const { data: subjects } = useSubjects(); // Mengambil data subjects
  const { teachers } = useTeachersData();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", user?.id],
    queryFn: fetchTasks,
  });

  // Filter tasks berdasarkan user.id
  const filteredTasks = data?.filter(
    (task: ITask) => task.student_id === user?.id
  );

  // Gabungkan task dengan subject berdasarkan subject_id
  const taskDetail = filteredTasks?.map((task: ITask) => {
    const subject = subjects?.find((subject: ISubject) => subject.id === task.subject_id);
    const teacher = teachers?.find((teacher: ITeacher) => teacher.id === task.subject_id);
    return {
      ...task,
      subject, // Menambahkan data subject ke dalam task
      teacher,
    };
  });

  return {
    data: taskDetail, // Mengembalikan tasks yang sudah digabung dengan subject
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
