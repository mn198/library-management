import React, { createContext, useReducer} from 'react';
import {userReducer} from '../reducers/UserReducer';

export const userContext = createContext();

const UserContextProvider = (props) => {
    const initState = {
        isLoading: false,
        list: []
    }

    const [user, dispatch] = useReducer(userReducer, initState);

    return(
        <userContext.Provider value={{user, dispatch}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserContextProvider;