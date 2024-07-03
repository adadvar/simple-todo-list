import { Box } from "@chakra-ui/react";
import "./App.css";
import Form from "./components/Form";
import Todos from "./components/Todos";

function App() {
  return (
    <Box>
      <Form />
      <Todos />
    </Box>
  );
}

export default App;
