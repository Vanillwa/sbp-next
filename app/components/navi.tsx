"use client";
import Link from "next/link";
import styles from "../css/navi.module.css";
import { usePathname } from "next/navigation";

export default function Navi() {
  const path = usePathname();

  return (
    <nav className={styles.nav}>
      <ul className={styles.navContainer}>
        <li className={path == "/" ? styles.here : ""}>
          <Link href='/'>Home</Link>
        </li>
        <li>Board</li>
        <li className={path == "/login" ? styles.here : ""}>
          <Link href='/login'>Login</Link>
        </li>
        <li className={path == "/join" ? styles.here : ""}>
          <Link href='/join'>Join</Link>
        </li>
        <li className={path == "/user" ? styles.here : ""}>
          <Link href='/user'>User</Link>
        </li>
      </ul>
    </nav>
  );
}
