import React, { createContext, useReducer, useEffect} from 'react';
import {userReducer} from '../reducers/UserReducer';
//import axios from 'axios';
//import config from '../config/config';

export const userContext = createContext();

const UserContextProvider = (props) => {
    const initState = {
        isLoading: false,
        list: []
    }

    const [user, dispatch] = useReducer(userReducer, initState);


    useEffect(() => {
        axios.get(config.base_url + '/users')
            .then((result) => {
                dispatch({ type: 'GET_USER_LIST', payload: result.data})
            })
    }, [])

    return(
        <userContext.Provider value={{user, dispatch}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserContextProvider;