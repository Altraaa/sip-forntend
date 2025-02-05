import { useQuery } from "@tanstack/react-query";
import { ApiRequest } from "@/utils/services/Api.service";

// Fetch User Data
const fetchUser = async () => {
  const storedUsername = localStorage.getItem("username");
  if (!storedUsername) {
    throw new Error("No username found in localStorage");
  }
  const response = await ApiRequest({ url: "students", method: "GET" });
  const user = response.find((student: any) => student.nis === storedUsername);
  if (!user) throw new Error("User not found");
  return user;
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
};
