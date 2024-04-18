import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';  // Asegúrate de importarlo desde la ubicación correcta

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route 
      {...rest}
      render={(props) => (
        isLoggedIn
          ? <Component {...props} />
          : <Navigate to="" />
      )}
    />
  );
};

export default PrivateRoute;