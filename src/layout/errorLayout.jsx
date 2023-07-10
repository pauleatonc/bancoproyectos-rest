import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar/navbar'
import Footer from '../components/Footer/footer';

const ErrorLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default ErrorLayout;
