"use client";
import { signIn } from "next-auth/react";
import styles from "./button.module.css";

const LoginBtn = () => {
  // const { data: session } = useSession();
  // console.log(session);
  const onLogin = async () => {
    await signIn("github");
  };
  return (
    <div onClick={onLogin} className={styles.logInBtn}>
      <span>로그인</span>
    </div>
  );
};
export default LoginBtn;
