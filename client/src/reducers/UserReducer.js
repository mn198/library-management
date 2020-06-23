
const initState = {
    list: [],
    isLoading: false
}

export const userReducer = (state=initState, action) => {
    switch(action.type){
        case 'GET_USER_LIST':
            return {
                ...state,
                list: action.payload,
                isLoading: true
            }
        case 'RESET_USER_LIST':
            return {
                list: [],
                isLoading: false
            }
        
        default:
            return state;
    }
}