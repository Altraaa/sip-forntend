import { ApiRequest } from "./Api.service";

export const ApiSchedules = {
  getAll: () => ApiRequest({ url: "/schedules", method: "GET" }),
  getById: (id: number) =>
    ApiRequest({ url: `/schedules/${id}`, method: "GET" }),
  create: (data: any) =>
    ApiRequest({ url: "/schedules", method: "POST", body: data }),
  update: (id: number, data: any) =>
    ApiRequest({ url: `/schedules/${id}`, method: "PUT", body: data }),
  delete: (id: number) =>
    ApiRequest({ url: `/schedules/${id}`, method: "DELETE" }),
};
