import { Link } from "react-router-dom";
import { Children, useState } from "react";
// import "./header.css";
import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProductOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
const Header = () => {
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>User</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Book</Link>,
      key: "books",
      icon: <ProductOutlined />,
    },
    {
      label: <Link to={"/login"}>Login</Link>,
      key: "login",
      icon: <LoginOutlined />,
    },
    {
      label: "Wellcome bla bla",
      key: "info",
      icon: <SettingOutlined />,
      children: [
        { label: "Logout", icon: <LogoutOutlined /> },
        {
          label: "Profile",
          icon: <UserOutlined />,
        },
      ],
    },
  ];
  const [current, setCurrent] = useState("");
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default Header;
