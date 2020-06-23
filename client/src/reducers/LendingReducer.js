const initState = {
    list: [],
    isLoading: false
}

export const lendingReducer = (state=initState, action) => {
    switch(action.type){
        case 'GET_LENDING_LIST':
            return {
                ...state,
                list: action.payload,
                isLoading: true
            }

        case 'RESET_LENDING_LIST':
            return {
                list: [],
                isLoading: false
            }
        
        default:
            return state;
    }
}