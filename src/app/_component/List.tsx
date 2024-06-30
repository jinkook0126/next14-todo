"use client";
import styles from "@/app/_component/list.module.css";
import Image from "next/image";
import { useToast } from "@/app/_component/ToastProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ITodos } from "@/model/todo";

async function fetchTodos() {
  const res = await fetch("/api/todos");
  const data = await res.json();
  if (data.success) {
    return data.list;
  }
  return [];
}
async function updateTodos({ id, stat }: { id: number; stat: boolean }) {
  await fetch(`/api/todos`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      done: stat,
    }),
  });
}
async function removeTodos({ id }: { id: number }) {
  await fetch(`/api/todos?id=${id}`, {
    method: "DELETE",
  });
}
const List = () => {
  const { showToast, errorToast } = useToast();
  const queryClient = useQueryClient();
  const { data: lists } = useQuery<ITodos[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 20,
  });
  const { mutate: removeMutation } = useMutation({
    mutationFn: removeTodos,
    onSuccess(res, params) {
      const { id } = params;
      queryClient.setQueryData(["todos"], (old: ITodos[]) =>
        old.filter((todo) => todo.id !== id)
      );
      showToast("삭제되었습니다.");
    },
    onError() {
      errorToast("삭제에 실패하였습니다.");
    },
  });
  const { mutate: updateMutation } = useMutation({
    mutationFn: updateTodos,
    onSuccess(res, params) {
      const { id, stat } = params;
      queryClient.setQueryData(["todos"], (old: ITodos[]) =>
        old.map((todo) => {
          if (todo.id !== id) return todo;
          return { ...todo, done: stat };
        })
      );
    },
  });
  const onRemove = async (id: number) => {
    removeMutation({ id });
  };
  const onChange = (id: number, stat: boolean) => {
    updateMutation({ id, stat });
  };
  return (
    <ul className={styles.listContainer}>
      {lists?.map((todo) => (
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
