import moment from 'moment';

export const addEntry = (entry) => ({
    type: 'ADD_ENTRY',
    entry
});

export const editTodaysEntry = (updates) => ({
    type: 'EDIT_TODAYS_ENTRY',
    date: moment().startOf('day').format(),
    updates
});