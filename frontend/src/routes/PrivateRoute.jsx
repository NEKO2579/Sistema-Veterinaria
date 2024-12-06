import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
    const { checkSession  } = useContext(AuthContext);

    return checkSession() ? <Outlet/> : <Navigate to="/login" />;
};

export default PrivateRoute;