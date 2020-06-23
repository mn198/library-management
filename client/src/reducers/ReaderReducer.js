
const initState = {
    list: [],
    current: null,
    isLoading: false
}

export const readerReducer = (state=initState, action) => {
    switch(action.type){
        case 'GET_READER_LIST':
            return {
                ...state,
                list: action.payload,
                isLoading: true
            }
        case 'GET_READER':
            return {
                ...state,
                current: action.payload
            }
        case 'RESET_READER_LIST':
            return {
                list: [],
                isLoading: false
            }
        default:
            return state;
    }
}