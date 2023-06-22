import {Outlet} from 'react-router-dom';
import Footer from "../components/Footer/footer";
import Header from "../components/Header/header";
import Title from '../components/Title/title';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Title />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;