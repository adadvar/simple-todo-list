import useTodo from "../store";
import TodoItem from "./TodoItem";

const Todos = () => {
  const todos = useTodo((s) => s.todos);

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default Todos;
