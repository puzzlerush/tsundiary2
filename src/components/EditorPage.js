import React from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment';
import { editTodaysEntry } from '../actions/entries';
import Entries from './Entries';

const prompts = [
    "I'm only here because I have nothing else to do, that's all!",
    "So, how have you been wasting your time lately?",
    "I'll forgive you, but just this once, got it?",
    "Could you be any more clueless?",
    "It's your privilege that I'm wasting my time listening to you...."
];

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPreview: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.togglePreview = this.togglePreview.bind(this);
        this.createMarkup = this.createMarkup.bind(this);
        this.filterEntries = this.filterEntries.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        this.props.dispatch(editTodaysEntry({ content: value }));
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
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
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
                <Entries relativeDates={true} filterEntries={this.filterEntries} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    entries: state.entries
});

export default connect(mapStateToProps)(Editor);