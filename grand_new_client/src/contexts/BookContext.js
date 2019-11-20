import React, { createContext, useReducer, useEffect } from 'react';
import {bookReducer} from '../reducers/BookReducer';
import axios from 'axios';
export const bookContext = createContext();

const BookContextProvider = (props) => {
    const initState = {
        isLoading: false,
        list: []
    }

    const [ book, dispatch ] = useReducer(bookReducer, initState);

    useEffect(() => {
        axios.get('http://localhost:3600/books')
            .then((result) => {
                dispatch({ type: 'GET_BOOK_LIST', payload: result.data})
            })
    }, [])

    return(
        <bookContext.Provider value={{book, dispatch}}>
            {props.children}
        </bookContext.Provider>
    )
}

export default BookContextProvider;