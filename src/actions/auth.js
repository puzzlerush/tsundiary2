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
        const username = getState().auth.user.email.split('@')[0];
        database.ref(`users/${username}/theme`).once('value').then((snapshot) => {
            const theme = snapshot.val() || 'Default';
            dispatch(setTheme(theme));
        });
    };
};

export const startSetTheme = (theme) => {
    return (dispatch, getState) => {
        const username = getState().auth.user.email.split('@')[0];
        database.ref(`users/${username}/theme`).set(theme).then(() => {
            dispatch(setTheme(theme));
        });
    };
};

export const setPrivate = () => ({
    type: 'SET_PRIVATE'
});

export const startSetPrivate = () => {
    return (dispatch, getState) => {
        const username = getState().auth.user.email.split('@')[0];
        database.ref(`users/${username}/privacy`).set(true).then(() => {
            dispatch(setPrivate());
        });
    };
};

export const setPublic = () => ({
    type: 'SET_PUBLIC'
});

export const startSetPublic = () => {
    return (dispatch, getState) => {
        const username = getState().auth.user.email.split('@')[0];
        database.ref(`users/${username}/privacy`).set(false).then(() => {
            dispatch(setPublic());
        });
    };
}; 

export const startGetPrivacySettings = () => {
    return (dispatch, getState) => {
        const username = getState().auth.user.email.split('@')[0];
        database.ref(`users/${username}/privacy`).once('value').then((snapshot) => {
            if (snapshot.val() || snapshot.val() === undefined) {
                dispatch(setPrivate());
            } else {
                dispatch(setPublic());
            }
        });
    };
};