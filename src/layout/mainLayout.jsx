import {Outlet} from 'react-router-dom';
import Footer from "../components/Footer/footer";
//import Navbar from "../components/Navbar/navbar";
import Title from '../components/Title/title';

import CustomNavbar from '../components/Navbar/navbar';

const MainLayout = () => {
  return (
    <>
      <CustomNavbar />
      <Title />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;