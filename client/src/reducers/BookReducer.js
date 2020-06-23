const initState = {
    list: [],
    isLoading: false
}

export const bookReducer = (state=initState, action) => {
    switch(action.type){
        case 'GET_BOOK_LIST':
            return {
                ...state,
                list: action.payload,
                isLoading: true
            }

        case 'RESET_BOOK_LIST':
            return {
                list: [],
                isLoading: false
            }
        
        default:
            return state;
    }
}