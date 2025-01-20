import { ApiRequest } from "./Api.service";

export const ApiClassrooms = {
  getAll: () => ApiRequest({ url: "/classrooms", method: "GET" }),
  getById: (id: number) =>
    ApiRequest({ url: `/classrooms/${id}`, method: "GET" }),
  create: (data: any) =>
    ApiRequest({ url: "/classrooms", method: "POST", body: data }),
  update: (id: number, data: any) =>
    ApiRequest({ url: `/classrooms/${id}`, method: "PUT", body: data }),
  delete: (id: number) =>
    ApiRequest({ url: `/classrooms/${id}`, method: "DELETE" }),
};
