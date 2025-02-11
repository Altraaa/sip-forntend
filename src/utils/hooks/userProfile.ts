import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiRequest } from "@/utils/services/Api.service";
import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { IStudent } from "../models/Student";

// Fetch User Class data
const fetchUserClass = async (classroomId: number) => {
  const response = await ApiRequest({ url: "classrooms", method: "GET" });
  const classrooms = Array.isArray(response) ? response : response?.data;
  if (!Array.isArray(classrooms))
    throw new Error("Invalid API response: Expected an array");
  return classrooms.find((classroom: any) => classroom.id === classroomId);
};

export const useUserClass = (classroomId: number) => {
  return useQuery({
    queryKey: ["userClass", classroomId],
    queryFn: () => fetchUserClass(classroomId),
    enabled: !!classroomId,
  });
};

// Hook untuk mengambil data akses terakhir
export const useLastAccess = () => {
  const [lastAccess, setLastAccess] = useState<string | null>(null);

  useEffect(() => {
    const previousAccess = localStorage.getItem("lastAccess");
    if (previousAccess) {
      setLastAccess(previousAccess);
    }

    const currentTimestamp = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    localStorage.setItem("lastAccess", currentTimestamp);
  }, []);

  return lastAccess;
};

export const useProfileData = () => {
  const { data: user, isLoading: userLoading, error: userError } = useUser();
  const {
    data: userClass,
    isLoading: classLoading,
    error: classError,
  } = useUserClass(user?.classroom_id || 0);
  const lastAccess = useLastAccess();

  const loading = userLoading || classLoading;
  const error = userError || classError;

  return {
    user,
    userClass,
    lastAccess,
    loading,
    error,
  };
};

const editProfile = async (dataProfile: IStudent) => {
  const response = await ApiRequest({
    url: `students/${dataProfile.id}`,
    method: "PUT",
    body: dataProfile,
  })
  return response;
}

export const userEditProfile = () => {
  return useMutation({
    mutationFn: editProfile,
    onError: (error: any) => {
      console.error("Error editing profile: ", error);
    },
    onSuccess: (data) => {
      console.log("Profile successfully updated: ", data);
    }
  })
}