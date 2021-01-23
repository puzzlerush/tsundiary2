const entriesReducerDefaultState = [];
export default (state = entriesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_ENTRY':
            return state.concat(action.entry);
        case 'EDIT_TODAYS_ENTRY':
            const todaysEntry = state.find((entry) => entry.date === action.date);
            if (todaysEntry) {
                return state.map((entry) => {
                    if (entry.date === action.date) {
                        return {
                            ...entry,
                            ...action.updates
                        };
                    } else {
                        return entry;
                    }
                });
            } else {
                const newEntry = {
                    date: action.date,
                    ...action.updates
                };
                return [newEntry, ...state];
            }
            
        default:
            return state;
    }
};