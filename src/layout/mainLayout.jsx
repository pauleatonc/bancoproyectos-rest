import { Outlet } from 'react-router-dom';
import { Navbar, Footer, Title } from '../components/Layout'; 

const MainLayout = () =>
{
  return (
    <>
      <Navbar />
      <Title />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;