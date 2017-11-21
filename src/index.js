import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';

require('./RichTextInput.css');

class RichTextInput extends Component {
    componentDidMount() {
        const {
            input: {
                value,
            },
            toolbar,
        } = this.props;

        this.quill = new Quill(this.divRef, {
            modules: { toolbar },
            theme: 'snow',
        });

        this.quill.pasteHTML(value);

        this.editor = this.divRef.querySelector('.ql-editor');
        this.quill.on('text-change', debounce(this.onTextChange, 500));
    }

    componentWillUnmount() {
        this.quill.off('text-change', this.onTextChange);
        this.quill = null;
    }

    onTextChange = () => {
        this.props.input.onChange(this.editor.innerHTML);
    }

    updateDivRef = ref => {
        this.divRef = ref;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.input.value !== this.props.input.value) {
            this.quill.pasteHTML(nextProps.input.value);
        }
    }

    render() {
        return <div className='aor-rich-text-input'>
            <div ref={this.updateDivRef} />
        </div>
    }
}

RichTextInput.propTypes = {
    addField: PropTypes.bool.isRequired,
    addLabel: PropTypes.bool.isRequired,
    input: PropTypes.object,
    label: PropTypes.string,
    options: PropTypes.object,
    source: PropTypes.string,
    toolbar: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
    ]),
};

RichTextInput.defaultProps = {
    addField: true,
    addLabel: true,
    options: {},
    record: {},
    toolbar: true,
};

export default RichTextInput;
