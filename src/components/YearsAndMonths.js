import React from 'react';
import moment from 'moment';

const YearsAndMonths = ({ entries, onDatesChange }) => {
    const data = {};
    entries.forEach((entry) => {
        const year = moment(entry.date).year();
        const month = moment(entry.date).month();
        if (data[year]) {
            data[year].push(month);
        } else {
            data[year] = [month];
        }
    });

    const yearArray = Object.keys(data).sort((a, b) => b - a);
    const toDisplay = yearArray.map((year) => {
        const months = new Set(data[year]);
        const monthsArray = [...months].sort((a, b) => a - b);
        const monthLinks = monthsArray.map((month) => {
            const setDateRange = () => onDatesChange({ 
                startDate: moment([year, month]).startOf('month'),
                endDate: moment([year, month]).endOf('month')
            });
            return <a key={`${year}-${month}`} onClick={setDateRange}>{moment.monthsShort(month)} </a>;
        });
        return (<div key={year}>{year}: {monthLinks}</div>);
    });
    return (
        <div className="years-and-months">
            {toDisplay}
        </div>
    );
};

export default YearsAndMonths;