"use client";
import Link from "next/link";
import styles from "../css/navi.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import instance from "../api/axios";
import { useAuth } from "../context/authContext";

export default function Navi() {
  const path = usePathname();
  const router = useRouter();
  const { isLogin, logout } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await instance.post("/logout");
      if (response.status === 200) {
        logout();
        localStorage.removeItem("accessToken");
        alert("로그아웃 성공");
        router.push("/");
      }
    } catch (error) {
      alert("로그아웃 실패");
    }
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navContainer}>
        <li className={path == "/" ? styles.here : ""}>
          <Link href='/'>Home</Link>
        </li>
        <li>Board</li>
        {isLogin ? (
          <>
            <li className={path == "/user" ? styles.here : ""}>
              <Link href='/user'>User</Link>
            </li>
            <li>
              <div onClick={handleLogout}>Logout</div>
            </li>
          </>
        ) : (
          <>
            <li className={path == "/login" ? styles.here : ""}>
              <Link href='/login'>Login</Link>
            </li>
            <li className={path == "/join" ? styles.here : ""}>
              <Link href='/join'>Join</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
