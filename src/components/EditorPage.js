import React from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment';
import { editTodaysEntry } from '../actions/entries';

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

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const value = e.target.value;
        this.props.dispatch(editTodaysEntry({ content: value }));
    }

    render() {
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
        const todaysEntry = this.props.entries.find((entry) => entry.date === moment().startOf('day').format());
        const todaysEntryContent = todaysEntry ? todaysEntry.content : '';
        return (
            <div className="editor">
                <TextareaAutosize
                    minRows={5}
                    placeholder={randomPrompt}
                    onChange={this.handleChange} 
                    value={todaysEntryContent} 
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    entries: state.entries
});

export default connect(mapStateToProps)(Editor);