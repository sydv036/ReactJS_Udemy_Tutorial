import { Outlet } from "react-router-dom";
import Footer from "./pages/layout/footer";
import Header from "./pages/layout/header";
import "./styles/global.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { getAcountAuth } from "./services/api.service";

function App() {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    CallAccountAuth();
  }, []);

  const CallAccountAuth = async () => {
    const res = await getAcountAuth();
    setUser(res.data.user);
  };

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
