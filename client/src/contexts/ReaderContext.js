import React, { createContext, useReducer } from 'react';
import {readerReducer} from '../reducers/ReaderReducer';

export const readerContext = createContext();

const ReaderContextProvider = (props) => {
    const initState = {
        isLoading: false,
        list: [],
        current: null
    }

    const [reader, dispatch] = useReducer(readerReducer, initState);

    return(
        <readerContext.Provider value={{reader, dispatch}}>
            {props.children}
        </readerContext.Provider>
    )
}

export default ReaderContextProvider;