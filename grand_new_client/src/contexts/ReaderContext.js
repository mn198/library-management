import React, { createContext, useReducer, useEffect} from 'react';
import {readerReducer} from '../reducers/ReaderReducer';

import axios from 'axios';

export const readerContext = createContext();

const ReaderContextProvider = (props) => {
    const initState = {
        isLoading: false,
        list: [],
        current: null
    }

    const [reader, dispatch] = useReducer(readerReducer, initState);

    
    useEffect(() => {
        axios.get('http://localhost:3600/readers')
            .then((result) => {
                dispatch({ type: 'GET_READER_LIST', payload: result.data})
            })
    }, [])
    
    return(
        <readerContext.Provider value={{reader, dispatch}}>
            {props.children}
        </readerContext.Provider>
    )
}

export default ReaderContextProvider;