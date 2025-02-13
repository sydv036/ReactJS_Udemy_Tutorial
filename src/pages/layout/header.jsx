import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";
// import "./header.css";
import { Menu } from "antd";
import {
  HomeOutlined,
  ProductOutlined,
  UsergroupAddOutlined,
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
