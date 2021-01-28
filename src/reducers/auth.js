const authReducerDefaultState = {
    user: null,
    theme: 'Default',
    privacy: true
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
        case 'SET_PRIVATE':
            return {
                ...state,
                privacy: true
            };
        case 'SET_PUBLIC':
            return {
                ...state,
                privacy: false
            };
        default:
            return state;
    }
};
