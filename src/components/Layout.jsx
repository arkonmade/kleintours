import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Whatsapp from "./Whatsapp";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Whatsapp />
      <Footer />
    </>
  );
};

export default Layout;
