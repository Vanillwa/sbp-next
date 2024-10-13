"use client";

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081", // Spring Boot 서버 주소
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage?.getItem("accessToken");
    if (accessToken) {
      config.headers["access"] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    console.log(response);
    if (response.data === "invalid access token" || response.data === "invalid refresh token") {
      return;
    }
    if (response.data === "access token expired") {
      try {
        localStorage.removeItem("accessToken");
        const reissueResponse = await instance.post("/reissue");
        if (reissueResponse.status === 200) {
          localStorage.setItem("accessToken", reissueResponse.headers.access);
          return instance(config);
        } else {
          return;
        }
      } catch {
        return;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
