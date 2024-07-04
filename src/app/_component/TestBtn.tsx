"use client";
import { signIn, useSession } from "next-auth/react";

const TextBtn = () => {
  // const { data: session } = useSession();
  // console.log(session);
  const onLogin = async () => {
    fetch("http://localhost:3000/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  return <button onClick={onLogin}>test api</button>;
};
export default TextBtn;
