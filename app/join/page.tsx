"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import instance from "../api/axios";

export default function Join() {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleJoin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log("username : " + username + "\n password : " + password);
      const response = await instance.post("/join", { username, nickname, password });
      router.push("/login");
    } catch (error: any) {
      console.log("회원가입 실패", error.response.data);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleJoin}>
          <div>
            <label>Username:</label>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Nickname:</label>
            <input type='text' value={nickname} onChange={(e) => setNickname(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type='submit'>회원가입</button>
        </form>
      </div>
    </div>
  );
}
