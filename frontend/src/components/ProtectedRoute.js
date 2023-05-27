import {useContext} from 'react';
import { LoginContext } from '../contexts/LoginContext.js';
import {Navigate} from 'react-router-dom';
 const ProtectedRoute = ({element: Component, ...props}) => {
    const loginContext = useContext(LoginContext);

    return (
        loginContext.loggedIn ? <Component {...props} /> : <Navigate to="/login-in" replace/>
    );
 }

 export default ProtectedRoute;