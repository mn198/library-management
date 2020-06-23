import React, { createContext, useReducer } from 'react';
import { lendingReducer } from '../reducers/LendingReducer';

export const lendingContext = createContext();

const LendingContextProvider = (props) => {
    const initState = {
        isLoading: false,
        list: []
    }

    const [ lending, dispatch ] = useReducer(lendingReducer, initState);

    return(
        <lendingContext.Provider value={{lending, dispatch}}>
            {props.children}
        </lendingContext.Provider>
    )
}

export default LendingContextProvider;