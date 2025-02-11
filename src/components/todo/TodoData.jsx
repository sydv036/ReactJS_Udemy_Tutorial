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

// khi tham số được truyền vào là 1 mảng object
// [{id:1,name:'helo'}] => bên phần nhận có thể khai báo như sau để nhận mảng object đó
// const {id,name} = data truyền đến
