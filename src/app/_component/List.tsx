"use client";
import styles from "@/app/_component/list.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useToast } from "@/app/_component/ToastProvider";

interface ITodos {
  id: number;
  contents: string;
  done: boolean;
}

const List = () => {
  const [lists, setLists] = useState<ITodos[]>([]);
  const { showToast, errorToast } = useToast();

  const onRemove = async (id: number) => {
    // remove(idx);
    fetch(`/api/todos?id=${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showToast("삭제되었습니다.");
          setLists((prev) => prev.filter((todo) => todo.id !== id));
          return;
        }
        errorToast("삭제에 실패하였습니다.");
      });
  };
  const onChange = (id: number, stat: boolean) => {
    // update(idx, stat);
    fetch(`/api/todos`, {
      method: "PUT",
      body: JSON.stringify({
        id,
        done: stat,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLists((prev) =>
            prev.map((todo) => {
              if (todo.id !== id) return todo;
              return { ...todo, done: stat };
            })
          );
        }
      });
  };
  useEffect(() => {
    fetch("/api/todos", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setLists(data.list);
        }
      });
  }, []);
  return (
    <ul className={styles.listContainer}>
      {lists.map((todo) => (
        <li className={styles.listItem} key={todo.id}>
          <div className={styles.listItemContainer}>
            <div className={styles.checkboxContainer}>
              <input
                onChange={(e) => onChange(todo.id, e.target.checked)}
                type="checkbox"
                className={styles.checkbox}
                id={`todo-${todo.id}`}
                checked={todo.done}
              />
              <label htmlFor={`todo-${todo.id}`}>
                <p>{todo.contents}</p>
                <div className={styles.line} />
              </label>
            </div>
            <div className={styles.removeBtn} onClick={() => onRemove(todo.id)}>
              <Image src="/assets/delete.png" alt="" width={24} height={24} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default List;
