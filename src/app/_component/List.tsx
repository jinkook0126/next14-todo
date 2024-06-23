import styles from "@/app/_component/list.module.css";
import Image from "next/image";

const List = () => {
  const onRemove = () => {};
  return (
    <ul className={styles.listContainer}>
      <li className={styles.listItem}>
        <div className={styles.listItemContainer}>
          <div className={styles.checkboxContainer}>
            <input type="checkbox" className={styles.checkbox} id="check1" />
            <label htmlFor="check1">
              <p>집에 가서 저녁 먹기 ㅎㅎ</p>
              <div className={styles.line} />
            </label>
          </div>
          <div className={styles.removeBtn}>
            <Image src="/assets/delete.png" alt="" width={24} height={24} />
          </div>
        </div>
      </li>
      <li className={styles.listItem}>
        <div className={styles.listItemContainer}>
          <div className={styles.checkboxContainer}>
            <input type="checkbox" className={styles.checkbox} id="check2" />
            <label htmlFor="check2">
              <p>집에 가서 저녁 먹기 ㅎㅎ</p>
              <div className={styles.line} />
            </label>
          </div>
          <div className={styles.removeBtn}>
            <Image src="/assets/delete.png" alt="" width={24} height={24} />
          </div>
        </div>
      </li>
    </ul>
  );
};
export default List;
