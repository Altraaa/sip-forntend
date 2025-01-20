import { ApiRequest } from "./Api.service";

export const ApiTasks = {
  getAll: () => ApiRequest({ url: "/tasks", method: "GET" }),
  create: (data: any) =>
    ApiRequest({ url: "/tasks", method: "POST", body: data }),
  update: (id: number, data: any) =>
    ApiRequest({ url: `/tasks/${id}`, method: "PUT", body: data }),
  delete: (id: number) => ApiRequest({ url: `/tasks/${id}`, method: "DELETE" }),
};
