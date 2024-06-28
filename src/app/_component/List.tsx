"use client";
import styles from "@/app/_component/list.module.css";
import useTodoStore from "@/store/useTodoStore";
import Image from "next/image";

const List = () => {
  const { todos, remove, update } = useTodoStore();
  const onRemove = (idx: number) => {
    remove(idx);
  };
  const onChange = (idx: number, stat: boolean) => {
    update(idx, stat);
  };
  return (
    <ul className={styles.listContainer}>
      {todos.map((todo) => (
        <li className={styles.listItem} key={todo.idx}>
          <div className={styles.listItemContainer}>
            <div className={styles.checkboxContainer}>
              <input
                onChange={(e) => onChange(todo.idx, e.target.checked)}
                type="checkbox"
                className={styles.checkbox}
                id={`todo-${todo.idx}`}
                checked={todo.done}
              />
              <label htmlFor={`todo-${todo.idx}`}>
                <p>{todo.contents}</p>
                <div className={styles.line} />
              </label>
            </div>
            <div
              className={styles.removeBtn}
              onClick={() => onRemove(todo.idx)}
            >
              <Image src="/assets/delete.png" alt="" width={24} height={24} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default List;
