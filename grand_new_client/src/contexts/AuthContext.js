import React, { createContext, useReducer, useEffect} from 'react';
import { authReducer } from '../reducers/AuthReducer';
import setAuthToken from '../helpers/setAuthToken';
import jwt_decode from 'jwt-decode';

export const authContext = createContext();

const AuthContextProvider = (props) => {
    const initState = {
        isAuthenticated: false,
        user: {}
    };

    const [auth, dispatch] = useReducer(authReducer, initState);


    useEffect(() => {
        if(localStorage.jwtToken){
            const token = localStorage.jwtToken;
            const decoded = jwt_decode(token);
            
            setAuthToken(token);
            dispatch({ type: 'LOGIN', payload: decoded });
        }
    }, []);


    return(
        <authContext.Provider value={{auth, dispatch}}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthContextProvider;