import { useState } from "react";
import "../App.css";
import TodoNew from "../components/todo/TodoNew";
import TodoData from "../components/todo/TodoData";

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);

  const addNewTodo = (data) => {
    const todoNew = {
      id: randomID(),
      name: data,
    };
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
};
export default TodoPage;
