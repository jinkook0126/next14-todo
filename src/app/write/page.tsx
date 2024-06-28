import styles from "./page.module.css";
import FormBtn from "./_component/FormBtn";
export default function writePage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.title}>할 일을 등록하세요.</p>
        <FormBtn />
      </div>
    </div>
  );
}
