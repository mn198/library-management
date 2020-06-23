const initState = {
    list: [],
    isLoading: false
}

export const lendingHistoryReducer = (state=initState, action) => {
    switch(action.type){
        case 'GET_LENDINGHISTORY_LIST':
            return {
                ...state,
                list: action.payload,
                isLoading: true
            }

        case 'RESET_LENDINGHISTORY_LIST':
            return {
                list: [],
                isLoading: false
            }
        
        default:
            return state;
    }
}