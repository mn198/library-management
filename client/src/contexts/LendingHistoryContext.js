import React, { createContext, useReducer } from 'react';
import { lendingHistoryReducer } from '../reducers/LendingHistoryReducer';

export const lendingHistoryContext = createContext();

const LendingHistoryContextProvider = (props) => {
    const initState = {
        isLoading: false,
        list: []
    }

    const [ lendingHis, dispatch ] = useReducer(lendingHistoryReducer, initState);

    return(
        <lendingHistoryContext.Provider value={{lendingHis, dispatch}}>
            {props.children}
        </lendingHistoryContext.Provider>
    )
}

export default LendingHistoryContextProvider;