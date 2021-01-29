import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import Entries from "./Entries";
import { setStartDate, setEndDate, setTextFilter } from '../actions/filters';
import { startSetEntries } from '../actions/entries';

class ArchivePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarFocused: null
        };
        this.filterEntries = this.filterEntries.bind(this);
        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onTextFilterChange = this.onTextFilterChange.bind(this)
    }
    
    componentDidMount() {
        const { match, startSetEntries } = this.props;
        console.log(match)
        startSetEntries(match.params.username);
    }

    filterEntries(entries) {
        return entries.filter((entry) => {
            const { startDate, endDate, textFilter } = this.props.filters;
            const startDateMatch = !startDate || startDate.isSameOrBefore(entry.date);
            const endDateMatch = !endDate || endDate.isSameOrAfter(entry.date);
            const textFilterMatch = entry.content.toLowerCase().includes(textFilter.toLowerCase());
            return startDateMatch && endDateMatch && textFilterMatch;
        });
    }

    onDatesChange({ startDate, endDate }) {
        const { setStartDate, setEndDate } = this.props;
        setStartDate(startDate);
        setEndDate(endDate);
    }

    onFocusChange(calendarFocused) {
        this.setState(() => ({ calendarFocused }))
    }
    
    onTextFilterChange(e) {
        const { setTextFilter } = this.props;
        setTextFilter(e.target.value);
    }

    render() {
        const { entries, email } = this.props;
        const { startDate, endDate } = this.props.filters;
        return (
            <div style={{ marginTop: 30 }}>
                <div className="email">{email.split('@')[0]}</div>
                <div className="icon-aligned">
                    <StarOutlinedIcon style={{ width: 18, height: 18, marginRight: 3 }}/>
                    <span>{entries.length} days of entries</span>
                </div>
                <div className="filter-wrapper">
                    <input 
                        type="text" 
                        placeholder="Search"
                        onChange={this.onTextFilterChange} 
                    />
                    <div style={{ float: "right" }}>
                        <DateRangePicker
                            startDate={startDate}
                            startDateId="start_date_id"
                            endDate={endDate}
                            endDateId="end_date_id"
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            showClearDates={true}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                        /> 
                    </div>
                </div>
                <Entries relativeDates={false} filteredEntries={this.filterEntries(entries)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    entries: state.entries,
    filters: state.filters,
    email: state.auth.user.email
});

const mapDispatchToProps = (dispatch) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    startSetEntries: (email) => dispatch(startSetEntries(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArchivePage);