import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TodoNew from "./components/todo/TodoNew";
import TodoData from "./components/todo/TodoData";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, name: "Udemy" },
    { id: 2, name: "Youtube" },
  ]);

  const addNewTodo = (data) => {
    const todoNew = {
      id: randomID(),
      name: data,
    };
    console.log(todoNew);

    setTodoList([...todoList, todoNew]);
  };
  const randomID = () => {
    return Math.floor(Math.random() * 1000000 + 899999);
  };

  return (
    <>
      <main className="todo-container">
        <h1>Todo List</h1>
        <TodoNew addNewTodo={addNewTodo} />
        <TodoData todoList={todoList} />
      </main>
    </>
  );
}

export default App;
