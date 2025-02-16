import { Button, Result } from "antd";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Result
      status="403"
      title="Oop!"
      subTitle={error.statusText || error.message}
      extra={
        <Link to={"/"}>
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
}
