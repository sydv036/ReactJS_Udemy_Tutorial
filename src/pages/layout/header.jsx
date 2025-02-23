import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
import { logoutAPI } from "../../services/api.service";
const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();

  const [current, setCurrent] = useState("");

  // useEffect(() => {
  //   // const path = ["users", "books"];
  //   // const check = path.find((item) => location.pathname);
  //   // console.log(check);
  //   setCurrent(location.pathname);
  // }, [location]);

  const hanldeLogout = async () => {
    const res = await logoutAPI();
    if (res.data) {
      localStorage.removeItem("access_token");
      setUser({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      });
    }
    navigate("/login");
  };

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
              {
                label: <Link onClick={() => hanldeLogout()}>Logout</Link>,
                icon: <LogoutOutlined />,
              },
              {
                label: "Profile",
                icon: <UserOutlined />,
              },
            ],
          },
        ]
      : []),
  ];

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
