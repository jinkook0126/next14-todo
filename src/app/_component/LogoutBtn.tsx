"use client";
import { signOut } from "next-auth/react";
import styles from "./button.module.css";

const LogoutBtn = () => {
  const onLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <div onClick={onLogout} className={styles.logOutBtn}>
      <span>로그아웃</span>
    </div>
  );
};
export default LogoutBtn;
