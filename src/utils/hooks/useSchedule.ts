import { useQuery } from "@tanstack/react-query";
import { ApiRequest } from "@/utils/services/Api.service";

// Fetch Schedules Data
const fetchSchedules = async () => {
  const response = await ApiRequest({ url: "schedules", method: "GET" });
  return response;
};

export const useSchedules = () => {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: fetchSchedules,
  });
};
