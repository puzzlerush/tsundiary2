import moment from 'moment';
import database from '../firebase/firebase';

export const addEntry = (entry) => ({
    type: 'ADD_ENTRY',
    entry
});

export const startAddEntry = (entry) => {
    return (dispatch, getState) => {
        const username = getState().auth.user.email.split('@')[0];
        database.ref(`users/${username}/entries/${entry.date}`).set({ content: entry.content });
    };
}

export const editTodaysEntry = (updates) => ({
    type: 'EDIT_TODAYS_ENTRY',
    date: moment().startOf('day').format(),
    updates
});

export const startEditTodaysEntry = (updates) => {
    return (dispatch, getState) => {
        const username = getState().auth.user.email.split('@')[0];
        const today = moment().startOf('day').format();
        dispatch(editTodaysEntry(updates));
        if (updates.content) {
            return database.ref(`users/${username}/entries/${today}`).set(updates);
        } else {
            return database.ref(`users/${username}/entries/${today}`).remove();
        }
    };
};

export const setEntries = (entries) => ({
    type: 'SET_ENTRIES',
    entries
});

export const startSetEntries = (email) => {
    return (dispatch) => {
        const username = email.split('@')[0];
        return database.ref(`users/${username}/entries`).once('value').then((snapshot) => {
            const entries = [];
            snapshot.forEach((childSnapshot) => {
                entries.push({
                    date: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setEntries(entries))
        });
    };
};