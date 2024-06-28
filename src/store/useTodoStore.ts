import { create } from "zustand";

type TtodoItem = {
  idx: number;
  contents: string;
  done: boolean;
};
type Store = {
  cursor: number;
  todos: TtodoItem[];
  register: (todo: string) => void;
  remove: (idx: number) => void;
  update: (idx: number, state: boolean) => void;
};

const useTodoStore = create<Store>()((set) => ({
  todos: [],
  cursor: 0,
  register: (todo) =>
    set((state) => ({
      cursor: state.cursor + 1,
      todos: [
        ...state.todos,
        {
          contents: todo,
          done: false,
          idx: state.cursor,
        },
      ],
    })),
  remove: (idx) =>
    set((state) => ({ todos: state.todos.filter((item) => item.idx !== idx) })),
  update: (idx, stat) =>
    set((state) => ({
      todos: state.todos.map((item) => {
        if (item.idx === idx) {
          return { ...item, done: stat };
        }
        return item;
      }),
    })),
}));

export default useTodoStore;
