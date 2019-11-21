import React, { createContext, useReducer, useEffect } from 'react';
import {bookReducer} from '../reducers/BookReducer';
import axios from 'axios';
import config from '../config/config';

export const bookContext = createContext();

const BookContextProvider = (props) => {
    const initState = {
        isLoading: false,
        list: []
    }

    const [ book, dispatch ] = useReducer(bookReducer, initState);

    useEffect(() => {
        axios.get(config.base_url + '/books')
            .then((result) => {
                dispatch({ type: 'GET_BOOK_LIST', payload: result.data})
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return(
        <bookContext.Provider value={{book, dispatch}}>
            {props.children}
        </bookContext.Provider>
    )
}

export default BookContextProvider;