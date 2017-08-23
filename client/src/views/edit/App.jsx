import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'babel-polyfill'

// The editor core
import Editor, { Editable, createEmptyState } from 'ory-editor-core'
import 'ory-editor-core/lib/index.css' // we also want to load the stylesheets

import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'
import 'ory-editor-ui/lib/index.css'

require('react-tap-event-plugin')()

import slate from 'ory-editor-plugins-slate'
import 'ory-editor-plugins-slate/lib/index.css'

import spacer from 'ory-editor-plugins-spacer'
import 'ory-editor-plugins-spacer/lib/index.css'

import image from 'ory-editor-plugins-image'
import 'ory-editor-plugins-image/lib/index.css'

import video from 'ory-editor-plugins-video'
import 'ory-editor-plugins-video/lib/index.css'

import parallax from 'ory-editor-plugins-parallax-background'
import 'ory-editor-plugins-parallax-background/lib/index.css'

import divider from 'ory-editor-plugins-divider'

const plugins = {
    content: [slate(), spacer, image, video, divider],
    layout: [parallax({ defaultPlugin: slate() })]
}

class Edit extends Component {
    componentWillMount() {
        const { initData } = this.props;
        this.editor = new Editor({
            plugins,
            editables: [
                ...initData.content,
                createEmptyState()
            ],
        })
    }

    componentDidMount() {
        const elements = document.querySelectorAll('.editable')
        for (const element of elements) {
            ReactDOM.render((
                <Editable
                    editor={this.editor}
                    id={element.dataset.id}
                    onChange={(state) => {
                        if (element.dataset.id === '1') {
                            console.log(state)
                        }
                    }}
                />
            ), element)
        }
        ReactDOM.render((
            <div>
                <Trash editor={this.editor} />
                <DisplayModeToggle editor={this.editor} />
                <Toolbar editor={this.editor} />
            </div>
        ), document.getElementById('controls'))
    }

    handleSave = () => {
        // this.props.save
    }

    render() {
        return <div>
            <span onClick={this.handleSave}>保存</span>
        </div>;
    }
}

Edit.propTypes = {
    initData: PropTypes.objectOf(PropTypes.any),
};

export default Edit;