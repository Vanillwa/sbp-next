"use client";
import instance from "@/app/api/axios";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      const response = await instance.post("/logout");
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        alert("로그아웃 성공");
        logout();
        router.push("/");
      }
    } catch (error) {
      alert("로그아웃 실패");
    }
  }

  return <div onClick={handleLogout}>Logout</div>;
}
