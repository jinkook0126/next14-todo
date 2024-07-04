import Image from "next/image";
import styles from "./page.module.css";
import dayjs from "dayjs";
import List from "./_component/List";
import Link from "next/link";
import LoginBtn from "./_component/LoginBtn";
import TextBtn from "./_component/TestBtn";
import { auth } from "@/auth";
import LogoutBtn from "./_component/LogoutBtn";

export default async function Home() {
  const dt = dayjs();
  const session = await auth();
  console.log(session);
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div>
            <p className={styles.date}>{dt.format("dddd, DD MMM")}</p>
            {session && (
              <p
                className={styles.hello}
              >{`${session.user?.name}님의 투두 리스트`}</p>
            )}
          </div>
          {/* <LoginBtn />
          <TextBtn /> */}
          {session ? (
            <div className={styles.btncontainer}>
              <LogoutBtn />
              <Link href="/write">
                <div className={styles.writeBtn}>
                  <Image src="/assets/plus.png" alt="" width={36} height={36} />
                </div>
              </Link>
            </div>
          ) : (
            <LoginBtn />
          )}
        </header>
        {session && <List />}
      </div>
    </main>
  );
}
