import { Outlet } from 'react-router-dom';
import { Navbar , Footer } from '../components/Layout'; 

const ErrorLayout = () =>
{
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default ErrorLayout;
