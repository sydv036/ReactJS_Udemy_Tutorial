import { Button, Col, Divider, Form, Input, message, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
  // const form = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const onFinish = async (values) => {
    setIsLoading(true);
    const res = await loginAPI(values.email, values.password, 3000);
    if (res.data && res.data.user && res.data.user.id) {
      message.success("Login thành công!");
      localStorage.setItem("access_token", res.data.access_token);
      setUser(res.data.user);
      navigate("/");
    } else {
      message.error("Không thể login! Vui lòng thử lại");
    }
    setIsLoading(false);
  };
  return (
    <>
      <Form
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        style={{ border: "1px soild black" }}
      >
        <Row gutter={10} justify={"center"}>
          <Col xl={8} md={8} sm={12} xs={18}>
            <Divider orientation="left">Login</Divider>
            <Form.Item
              label={"Email"}
              name="email"
              rules={[
                { type: "email", message: "Wrong email not format" },
                { required: true, message: "Please enter email" },
              ]}
            >
              <Input value={"admin@gmail.com"} />
            </Form.Item>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input.Password value={"123456"} />
            </Form.Item>
            <Divider />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button htmlType="submit" type="primary" loading={isLoading}>
                Login
              </Button>
              <Link to={"/register"}>Chưa có tài khoản?</Link>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default LoginPage;
