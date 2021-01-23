import React from 'react';
import { connect } from 'react-redux';
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
        const { relativeDates, filterEntries } = this.props;
        const sortedEntries = this.props.entries.sort((a, b) => (
            moment(b.date).valueOf() - moment(a.date).valueOf()
        ));
        const filteredEntries = filterEntries(sortedEntries);
        const entriesToShow = filteredEntries.map((entry) => (
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
                {entriesToShow}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    entries: state.entries
});

export default connect(mapStateToProps)(Entries);