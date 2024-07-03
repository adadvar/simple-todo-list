import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
}
export interface Todos {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  editTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const useTodo = create<Todos>()(
  devtools(
    persist(
      (set) => ({
        todos: [],
        addTodo: (todo: Todo) =>
          set((store) => ({ todos: [...store.todos, todo] })),
        editTodo: (todo) =>
          set((store) => ({
            todos: store.todos.map((t) => (t.id === todo.id ? todo : t)),
          })),
        deleteTodo: (id) =>
          set((store) => ({ todos: store.todos.filter((t) => t.id !== id) })),
        toggleTodo: (id: number) =>
          set((store) => ({
            todos: store.todos.map((t) =>
              t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
            ),
          })),
      }),
      {
        name: "todos",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useTodo;
