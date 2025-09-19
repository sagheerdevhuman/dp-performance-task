import { Outlet } from "react-router-dom";
import Footer from "../../components/sharedComponents/Footer";
import Navbar from "../../components/sharedComponents/Navbar";
const Layout = () => {
  return (
    <>
    <Navbar />
    <main className="App ">
      <Outlet />
    </main>
    <Footer />
    </>
  );
};

export default Layout;
