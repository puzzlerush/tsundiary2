import database, { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (user) => ({
    type: 'LOGIN',
    user
});

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};

export const setTheme = (theme) => ({
    type: 'SET_THEME',
    theme
});

export const startGetTheme = () => {
    return (dispatch, getState) => {
        const email = getState().auth.user.email.split('@')[0];
        database.ref(`users/${email}/theme`).once('value').then((snapshot) => {
            const theme = snapshot.val() || 'Default';
            dispatch(setTheme(theme));
        });
    };
};

export const startSetTheme = (theme) => {
    return (dispatch, getState) => {
        const email = getState().auth.user.email.split('@')[0];
        database.ref(`users/${email}/theme`).set(theme).then(() => {
            dispatch(setTheme(theme));
        });
    }
}