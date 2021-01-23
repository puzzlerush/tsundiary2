import React from 'react';
import marked from 'marked';
import TextareaAutosize from 'react-textarea-autosize';

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
            input: '',
            showPreview: false
        };

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState(() => ({ input: value }));
    }

    render() {
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
        return (
            <div className="editor">
                <TextareaAutosize
                    minRows={5}
                    placeholder={randomPrompt}
                    onChange={this.handleChange} 
                    value={this.state.input} 
                />
            </div>
        );
    }
}

export default Editor;