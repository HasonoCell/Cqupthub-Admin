import axios from "axios";

const service = axios.create({
  baseURL: "/api",
  timeout: 20000,
});

service.interceptors.request.use(
  (config) => {
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
