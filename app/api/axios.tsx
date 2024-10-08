"use client";

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081", // Spring Boot 서버 주소
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage?.getItem("accessToken");
    console.log("accessToken : ", accessToken);
    if (accessToken) {
      config.headers["access"] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
