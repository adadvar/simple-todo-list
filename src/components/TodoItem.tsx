import { useRef, useState } from "react";
import useTodo, { Todo } from "../store";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  HStack,
  Text,
  Input,
} from "@chakra-ui/react";

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const deleteTodo = useTodo((s) => s.deleteTodo);
  const editTodo = useTodo((s) => s.editTodo);
  const toggleTodo = useTodo((s) => s.toggleTodo);

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ref.current) {
      editTodo({ ...todo, name: ref.current.value });
      setEditMode(false);
    }
  };

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  return (
    <Card marginBottom={2}>
      <CardBody>
        {editMode ? (
          <HStack>
            <form style={{ width: "100%" }} onSubmit={handleEdit}>
              <HStack>
                <Input defaultValue={todo.name} ref={ref} />
                <Button type="submit" colorScheme="green">
                  Done
                </Button>
              </HStack>
            </form>
            <Button colorScheme="red" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </HStack>
        ) : (
          <HStack justifyContent="space-between" alignItems="center">
            <Checkbox isChecked={todo.isCompleted} onChange={handleToggle}>
              {todo.isCompleted ? (
                <Text as="del" color="gray">
                  {todo.name}
                </Text>
              ) : (
                <Text>{todo.name}</Text>
              )}
            </Checkbox>
            {/* <Heading fontSize="2xl">{todo.name}</Heading> */}
            <HStack>
              <Button colorScheme="blue" onClick={() => setEditMode(true)}>
                Edit
              </Button>
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </HStack>
          </HStack>
        )}
      </CardBody>
    </Card>
  );
};

export default TodoItem;
