import {Outlet} from 'react-router-dom';
import Footer from "../components/Footer/footer";

const ErrorLayout = () => {
  return (
    <>
    <h2>ErrorLayout</h2>
      <Outlet />
      <Footer />
    </>
  );
}

export default ErrorLayout;
