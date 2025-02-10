import "../../App.css";
import LogoReact from "../../assets/react.svg";
const TodoData = (props) => {
  // object destructuring
  const { todoList } = props;
  return (
    <>
      {todoList.length > 0 ? (
        <div className="data">
          {todoList.map((item) => {
            const { id, name } = item;
            return <div key={id}>{name}</div>;
          })}
        </div>
      ) : (
        <div>
          <img src={LogoReact} alt="" />
        </div>
      )}
    </>
  );
};
export default TodoData;
