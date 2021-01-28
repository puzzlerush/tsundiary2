const authReducerDefaultState = {
    user: null,
    theme: 'Default'
};
export default (state = authReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.user
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        case 'SET_THEME':
            return {
                ...state,
                theme: action.theme
            };
        default:
            return state;
    }
};
