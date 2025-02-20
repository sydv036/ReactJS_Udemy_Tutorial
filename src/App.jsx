import { Outlet } from "react-router-dom";
import Footer from "./pages/layout/footer";
import Header from "./pages/layout/header";
import "./styles/global.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./components/context/auth.context";
import { getAcountAuthAPI } from "./services/api.service";
import { Spin } from "antd";

function App() {
  const { setUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    CallAccountAuth();
  }, []);

  function delay() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  const CallAccountAuth = async () => {
    await delay();
    const res = await getAcountAuthAPI();
    if (res.data) {
      setUser(res.data.user);
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <Spin size="large" />
    </div>
  ) : (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
