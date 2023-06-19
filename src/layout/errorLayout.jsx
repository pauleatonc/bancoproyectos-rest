import {Outlet} from 'react-router-dom';
import Header from '../components/Header/header'
import Footer from '../components/Footer/footer';

const ErrorLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default ErrorLayout;
