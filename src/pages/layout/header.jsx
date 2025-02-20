import { Link } from "react-router-dom";
import { useContext, useState } from "react";
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
import { AuthContext } from "../../components/context/auth.context";
const Header = () => {
  const { user } = useContext(AuthContext);
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
    ...(!user.id
      ? [
          {
            label: <Link to={"/login"}>Login</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : []),
    ...(user.id
      ? [
          {
            label: `Wellcome ${user.fullName}`,
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
        ]
      : []),
  ];
  const [current, setCurrent] = useState("");
  const onClick = (e) => {
    setCurrent(e.key);
  };
  console.log("check user:", user);

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
