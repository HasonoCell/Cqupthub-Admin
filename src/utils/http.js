import axios from "axios";
import { useUserStore } from "../store"

const service = axios.create({
  //   baseURL: "https://api.example.com",
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
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
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log("未授权，跳转到登录");
          break;
        case 500:
          console.log("服务器错误");
          break;
        default:
          console.log("其他错误");
      }
    } else {
      console.log("请求超时或网络错误");
    }
    return Promise.reject(error);
  }
);

export default service;
