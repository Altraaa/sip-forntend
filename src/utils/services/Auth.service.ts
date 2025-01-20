import { ApiRequest } from "./Api.service";

export const ApiAuth = {
  login: (data: any) =>
    ApiRequest({ url: "/login", method: "POST", body: data }),
  logout: () => ApiRequest({ url: "/logout", method: "POST" }),
  loginUser: (data: any) =>
    ApiRequest({ url: "/loginUser", method: "POST", body: data }),
  logoutUser: () => ApiRequest({ url: "/logoutUser", method: "POST" }),
};
