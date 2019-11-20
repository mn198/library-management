import React, { createContext, useReducer, useEffect} from 'react';
import {userReducer} from '../reducers/UserReducer';
import axios from 'axios';

export const userContext = createContext();

const UserContextProvider = (props) => {
    const initState = {
        isLoading: false,
        users: null
    }

    const [user, dispatch] = useReducer(userReducer, initState);

    useEffect(() => {
        axios.get('http://localhost:3600/users')
            .then((result) => {
                dispatch({ type: 'GET_USERS', payload: result.data})
            })
    }, [])

    return(
        <userContext.Provider value={{user, dispatch}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserContextProvider;