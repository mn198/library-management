
const initState = {
    users: null,
    isLoading: false
}

export const userReducer = (state=initState, action) => {
    switch(action.type){
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload
            }
        
        default:
            return state;
    }
}