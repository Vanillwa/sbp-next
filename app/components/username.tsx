"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import instance from "../api/axios";

export default function Username() {
  const [username, setUsername] = useState();
  const router = useRouter();

  async function getUsername() {
    try {
      const response = await instance.get("/user");
      setUsername(response.data);
    } catch {
      alert("로그인이 필요한 기능입니다.");
      router.push("/");
    }
  }

  useEffect(() => {
    getUsername();
  }, []);

  return <div>{username}</div>;
}
