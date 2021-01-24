import moment from 'moment';

const filtersDefaultState = {
    startDate: moment().startOf('day').subtract(30, 'days'),
    endDate: moment().startOf('day'),
    textFilter: ''
};
export default (state = filtersDefaultState, action) => {
    switch (action.type) {
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                textFilter: action.text
            };
        default:
            return state;
    }
};