import setAuthToken from '../helpers/setAuthToken';

const initState = {
    isAuthenticated: false,
    user: {}
};

export const authReducer = (state=initState, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case 'LOGOUT':

            localStorage.removeItem('jwtToken');
            setAuthToken(false);
            
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            }
        default:
            return state;
        
    }
}