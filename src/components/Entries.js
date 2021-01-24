import React from 'react';
import moment from 'moment';
import marked from 'marked';

class Entries extends React.Component {
    constructor(props) {
        super(props);

        this.createMarkup = this.createMarkup.bind(this);
    }

    createMarkup(str) {
        return {__html: marked(str)};
    }

    render() {
        const { relativeDates, filteredEntries } = this.props;
        const sortedEntries = filteredEntries.sort((a, b) => (
            moment(b.date).valueOf() - moment(a.date).valueOf()
        ));
        const entriesToShow = sortedEntries.map((entry) => (
            <div key={entry.date} className="entry">
                <div className="heading">
                    {relativeDates ? (
                        moment(entry.date).endOf('day').fromNow()
                    ) : (
                        moment(entry.date).format("LL")
                    )}
                </div>
                <div dangerouslySetInnerHTML={this.createMarkup(entry.content)}/>
            </div>
        ));
        return (
            <div className="entry-wrapper">
                {entriesToShow.length > 0 ? (
                    entriesToShow
                ) : (
                    relativeDates ? (
                        <p>Once you have a history of entries, I'll show them to you at certain intervals.</p>
                    ) : (
                        <p>There are no entries to show.</p>
                    )
                ) }
            </div>
        );
    }
}

export default Entries;