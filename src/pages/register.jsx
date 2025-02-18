import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { registerAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (value) => {
    const res = await registerAPI(value);
    if (res.data) {
      notification.success({
        message: "Register",
        description: "Registered Successfully!",
        showProgress: true,
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Register",
        description: JSON.stringify(res.message),
        showProgress: true,
      });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="basic"
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div
        style={{
          padding: "60px",
        }}
      >
        <Row gutter={10} justify={"center"}>
          <Col md={8} sm={12} xs={24}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your Full Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10} justify={"center"}>
          <Col md={8} sm={12} xs={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
                {
                  type: "email",
                  message: "Wrong email address",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10} justify={"center"}>
          <Col md={8} sm={12} xs={24}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
                // {
                //   pattern:
                //     /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!#$%\-_=+<>])([a-zA-Z0-9!#$%\-_=+<>]+)$/,
                //   message: `Password Pattern`,
                // },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10} justify={"center"}>
          <Col md={8} sm={12} xs={24}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your Phone!",
                },
                {
                  pattern: new RegExp(/\d+/g),
                  message: "Must be a number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={10} justify={"center"}>
          <Col md={8} sm={12} xs={24}>
            <Divider dashed />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                // htmlType="submit"
                onClick={() => form.submit()}
                color="cyan"
                variant="solid"
              >
                Register
              </Button>
              {/* <Button
              onClick={() => {
                form.setFieldsValue({
                  email: "sydvb@gmail.com",
                  fullName: "sydvb",
                });
              }}
            >
              Tét
            </Button> */}
              <Link to={"/login"}>Đã có tài khoản?</Link>
            </div>
          </Col>
        </Row>
      </div>
    </Form>
  );
};
export default RegisterPage;
