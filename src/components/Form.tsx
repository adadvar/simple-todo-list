import { Input } from "@chakra-ui/react";
import React, { useRef } from "react";
import useTodo from "../store";

const Form = () => {
  const ref = useRef<HTMLInputElement>(null);
  const addTodo = useTodo((s) => s.addTodo);
  const todoNum = useTodo((s) => s.todos.length);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ref.current) {
      addTodo({ id: todoNum + 1, name: ref.current.value, isCompleted: false });
      ref.current.value = "";
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        marginBottom={2}
        ref={ref}
        borderRadius={20}
        placeholder="Enter title for todo"
        variant="filled"
      />
    </form>
  );
};

export default Form;
