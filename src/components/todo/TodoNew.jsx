import "../../App.css";
import { useState } from "react";
const TodoNew = (props) => {
  const [ValueInput, setValueInput] = useState("sydv1");
  const { addNewTodo } = props;
  const handleClick = () => {
    addNewTodo(ValueInput);
    setValueInput("");
  };
  const handleOnChange = (event) => {
    setValueInput(event.target.value);
  };
  return (
    <>
      <div className="add-new">
        <input
          type="text"
          onChange={(event) => handleOnChange(event)}
          value={ValueInput}
        />
        <button onClick={() => handleClick()}>Add</button>
        <div>My input {ValueInput}</div>
      </div>
    </>
  );
};
export default TodoNew;
