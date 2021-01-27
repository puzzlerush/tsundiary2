const authReducerDefaultState = {
    preferences: {
        theme: 'default'
    }
};
export default (state = authReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...authReducerDefaultState,
                user: action.user
            };
        case 'LOGOUT':
            return authReducerDefaultState;
        default:
            return state;
    }
};
