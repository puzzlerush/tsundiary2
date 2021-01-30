import React from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment';
import { startEditTodaysEntry, startSetEntries } from '../actions/entries';
import { startGetTheme } from '../actions/auth';
import Entries from './Entries';

const prompts = [
    "I'm only here because I have nothing else to do, that's all!",
    "So, how have you been wasting your time lately?",
    "I'll forgive you, but just this once, got it?",
    "Could you be any more clueless?",
    "It's your privilege that I'm wasting my time listening to you...",
    "How was your day? Not that I care or anything...",
    "So, how did it go? Not that I'm expecting much!",
    "You look good today! For once...",
    "B-baka baka baka!",
    "Let me know if anything's bothering you, okay?",
    "How was your day?",
    "I-it's not like I'm listening to you because I like you or anything...",
    "Don't get me wrong, it's not like I'm worried about you.",
    "It's cute how you have no idea what's going on around you.",
    "Tell me about your day!",
    "I love listening to you!",
    "M-may I have a hug?",
    "W-would you like a hug?",
    "You may not know this, but you have many admirers!",
    "If you think I'm gonna miss you, think again.",
    "... did you manage to accomplish anything today?"
];

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPreview: false,
            randomPrompt: prompts[Math.floor(Math.random() * prompts.length)]
        };

        this.handleChange = this.handleChange.bind(this);
        this.togglePreview = this.togglePreview.bind(this);
        this.createMarkup = this.createMarkup.bind(this);
        this.filterEntries = this.filterEntries.bind(this);
    }

    componentDidMount() {
        const { email, startSetEntries, startGetTheme } = this.props;
        startSetEntries(email);
        startGetTheme(email);
        this.interval = setInterval(() => {
            startSetEntries(email);
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleChange(e) {
        const value = e.target.value;
        this.props.startEditTodaysEntry({ content: value });
    }

    togglePreview() {
        this.setState((state) => ({
            showPreview: !state.showPreview
        }));
    }

    createMarkup(str) {
        return {__html: marked(str === "" ? 
                                "You haven't written anything." : str)};
    }

    filterEntries(entries) {
        return entries.filter((entry) => {
            const yesterday = moment().startOf('day').subtract(1, 'days');
            const oneWeekAgo = moment().startOf('day').subtract(7, 'days');
            const oneMonthAgo = moment().startOf('day').subtract(1, 'months');
            const sixMonthsAgo = moment().startOf('day').subtract(6, 'months');
            const oneYearAgo = moment().startOf('day').subtract(1, 'years');
            const intervals = [yesterday, oneWeekAgo, oneMonthAgo, sixMonthsAgo, oneYearAgo];
            for (const interval of intervals) {
                if (interval.isSame(moment(entry.date), 'day')) {
                    return true;
                }
            }
            return false;
        });
    }

    render() {
        const { entries } = this.props;
        const { randomPrompt } = this.state;
        const todaysEntry = this.props.entries.find((entry) => entry.date === moment().startOf('day').format());
        const todaysEntryContent = todaysEntry ? todaysEntry.content : '';
        return (
            <div>
                <div className="editor">
                    <TextareaAutosize
                        minRows={5}
                        placeholder={randomPrompt}
                        onChange={this.handleChange} 
                        value={todaysEntryContent} 
                    />
                    {
                        this.state.showPreview 
                        ? (
                            <div className="entry">
                                <div
                                    id="preview-heading"
                                    className="heading" 
                                    onClick={this.togglePreview}
                                >
                                    Hide Preview
                                </div>
                                <div dangerouslySetInnerHTML={this.createMarkup(todaysEntryContent)}/>
                            </div>
                        ) : (
                            <div className="entry">
                                <div
                                    id="preview-heading"
                                    className="heading" 
                                    onClick={this.togglePreview}
                                >
                                    Show Preview
                                </div>
                            </div>
                        )
                    }
                </div>
                <Entries relativeDates={true} filteredEntries={this.filterEntries(entries)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    entries: state.entries,
    email: state.auth.user.email
});

const mapDispatchToProps = (dispatch) => ({
    startEditTodaysEntry: (updates) => dispatch(startEditTodaysEntry(updates)),
    startSetEntries: (email) => dispatch(startSetEntries(email)),
    startGetTheme: (email) => dispatch(startGetTheme(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);