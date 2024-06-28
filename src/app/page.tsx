import Image from "next/image";
import styles from "./page.module.css";
import dayjs from "dayjs";
import List from "./_component/List";
import Link from "next/link";
export default function Home() {
  const dt = dayjs();

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <p className={styles.date}>{dt.format("dddd, DD MMM")}</p>
          <Link href="/write">
            <div className={styles.writeBtn}>
              <Image src="/assets/plus.png" alt="" width={36} height={36} />
            </div>
          </Link>
        </header>
        <List />
      </div>
    </main>
  );
}
