import moment from 'moment';

export const editTodaysEntry = (updates) => ({
    type: 'EDIT_TODAYS_ENTRY',
    date: moment().startOf('day').format(),
    updates
});