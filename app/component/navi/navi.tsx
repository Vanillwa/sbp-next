"use client";
import Link from "next/link";
import styles from "../../styles/navi.module.css";
import Logout from "./logout";
import { useAuth } from "@/app/context/authContext";
import { Suspense, useEffect, useState } from "react";
import instance from "@/app/api/axios";

export default function Navi() {
  const { isLogin, login, logout } = useAuth();
  const [username, setUsername] = useState();

  // async function getUsername() {
  //   try {
  //     const response = await instance.get("/user");
  //     setUsername(response.data);
  //   } catch (error) {}
  // }

  // useEffect(() => {
  //   getUsername();
  // }, [username]);

  return (
    <nav className={styles.nav}>
      <ul className={styles.navContainer}>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>Board</li>
        <Suspense>
          {isLogin ? (
            <>
              <li>
                <Link href='/user'>User</Link>
              </li>
              <li>
                <Logout></Logout>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href='/login'>Login</Link>
              </li>
              <li>
                <Link href='/join'>Join</Link>
              </li>
            </>
          )}
        </Suspense>
      </ul>
    </nav>
  );
}
