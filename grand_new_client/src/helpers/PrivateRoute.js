import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {authContext} from '../contexts/AuthContext';

const PrivateRoute = ({component: Component, ...rest}) => {
    const { auth } = useContext(authContext);

    return (
        <Route
            {...rest}
            render = {props =>
            auth.isAuthenticated === true ? (<Component {...props}/>) : <Redirect to='/login'/>
            }
        />
        )
}

  export default PrivateRoute;
