import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const PrivateRouter = (props) => {
  const { user } = useContext(AuthContext);
  if (user && user.id) {
    return <>{props.children}</>;
  }
  return (
    <>
      <Result
        status="403"
        title="403"
        subTitle="Vui lòng login để sử dụng chức năng!"
        extra={
          <Link to={"/"}>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </>
  );
};
export default PrivateRouter;
