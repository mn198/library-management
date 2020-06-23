import React, { createContext, useReducer } from 'react';
import {bookReducer} from '../reducers/BookReducer';

export const bookContext = createContext();

const BookContextProvider = (props) => {
    const initState = {
        isLoading: false,
        list: []
    }

    const [ book, dispatch ] = useReducer(bookReducer, initState);

    return(
        <bookContext.Provider value={{book, dispatch}}>
            {props.children}
        </bookContext.Provider>
    )
}

export default BookContextProvider;