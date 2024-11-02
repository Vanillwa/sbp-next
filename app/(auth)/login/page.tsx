"use client";
import React, { useState } from "react";
import styles from "../../styles/login.module.css";
import { useRouter } from "next/navigation";
import instance from "../../api/axios";
import { useAuth } from "@/app/context/authContext";

export default function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, login } = useAuth();
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await instance.post("/login", { username, password });
      localStorage.setItem("accessToken", response.headers.access);
      const userInfoResponse = await instance.get("/user");
      setUser(userInfoResponse.data);
      login();
      router.push("/");
    } catch (error: any) {
      console.log("로그인 실패", error.response);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit'>로그인</button>
        </form>
      </div>
    </div>
  );
}
