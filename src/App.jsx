import { Outlet } from "react-router-dom";
import Footer from "./pages/layout/footer";
import Header from "./pages/layout/header";
import "./styles/global.css";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
