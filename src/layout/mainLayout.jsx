import {Outlet} from 'react-router-dom';
import Footer from "../components/Footer/footer";
import Header from "../components/Header/header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
