"use client";
import React, { useState } from "react";
import styles from "../styles/login.module.css";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log("username : " + username + "\n password : " + password);
      const response = await axios.post("http://localhost:8081/login", { username, password });
      console.log(response);
      // localStorage.setItem("token", response.data.jwt);
      // router.push("/");
    } catch (error: any) {
      console.log("로그인 실패", error.response.data);
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
