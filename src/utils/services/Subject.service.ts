import { ApiRequest } from "./Api.service";

export const ApiSubjects = {
  getAll: () => ApiRequest({ url: "/subjects", method: "GET" }),
  getById: (id: number) =>
    ApiRequest({ url: `/subjects/${id}`, method: "GET" }),
  create: (data: any) =>
    ApiRequest({ url: "/subjects", method: "POST", body: data }),
  update: (id: number, data: any) =>
    ApiRequest({ url: `/subjects/${id}`, method: "PUT", body: data }),
  delete: (id: number) =>
    ApiRequest({ url: `/subjects/${id}`, method: "DELETE" }),
};
