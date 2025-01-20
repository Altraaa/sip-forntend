import axios, { AxiosRequestConfig } from "axios";

interface ApiRequestProps {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  params?: any;
  headers?: any;
  authorization?: boolean;
  isMultipart?: boolean;
}

export const DefaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}`
    : "http://127.0.0.1:8000/api/",
  timeout: 10000,
  headers: DefaultHeaders,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers?.authorization !== false) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const ApiRequest = async ({
  url,
  method = "GET",
  body = null,
  params = {},
  headers = DefaultHeaders,
  authorization = true,
  isMultipart = false,
}: ApiRequestProps) => {
  try {
    const finalHeaders = {
      ...headers,
      ...(authorization
        ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
        : {}),
    };

    const requestBody = isMultipart ? body : JSON.stringify(body);

    const config: AxiosRequestConfig = {
      url,
      method,
      headers: finalHeaders,
      params,
      data: body && requestBody,
    };

    const response = await axiosInstance.request(config);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};
