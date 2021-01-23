import React from 'react';
import moment from 'moment';
import Entries from "./Entries";
class ArchivePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().startOf('day').subtract(30, 'days'),
            endDate: moment().endOf('day')
        };
        this.filterEntries = this.filterEntries.bind(this);
    }
    
    filterEntries(entries) {
        return entries.filter((entry) => {
            const { startDate, endDate } = this.state;
            const startDateMatch = startDate.isSameOrBefore(entry.date);
            const endDateMatch = endDate.isSameOrAfter(entry.date);
            return startDateMatch && endDateMatch;
        });
    }

    render() {
        return (
            <div>
                <Entries relativeDates={false} filterEntries={this.filterEntries} />
            </div>
        );
    }
}

export default ArchivePage;