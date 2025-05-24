import { Outlet } from "react-router-dom";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="bg-[#000000] min-h-screen py-28">
        <Outlet/>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
