import axios from "axios";
import { useUserStore } from "../store";

const service = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers.Authorization = userStore.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.code !== 200) {
      return Promise.reject(new Error(data.message || "Error"));
    }
    return data;
  },
  (error) => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);

export default service;
