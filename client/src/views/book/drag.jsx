import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from './util/addEventListener';
import contains from './util/contains';
import clientRect from './util/getBoundingClientRect';
import DragWrap from './dragWrap';
import './drag.scss';

class Drag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        }
    }

    componentDidMount() {
        this.event = addEventListener(document, 'click', (e) => {
            if (contains(this.nodeRef, e.target)) {
                const { left, top, width, height } = clientRect(this.nodeRef);
                this.setState({
                    left,
                    top,
                    width,
                    height
                }, () => {
                    this.createWrap()
                })
            } else if (!contains(document.querySelector('.drag-click'), e.target)) {
                this.removeMaskIntoDoc();
            }
        })
    }

    componentWillUnmount() {
        this.removeMaskIntoDoc();
        this.event.remove();
    }

    createWrap(node) {
        const wrap = node || document.body;
        this.container = document.createElement('div')
        wrap.appendChild(this.container)
        this.appendMaskIntoDoc()
    }

    removeMaskIntoDoc(node) {
        const wrap = node || document.body;
        try {
            wrap.removeChild(this.container);
        } catch(e) {}
    }

    handleMove = (po, direction) => {
        const { left, top } = this.state;
        const DragClick = document.querySelector('.drag-click');
        const DragWrap = document.querySelector('.drag');
        switch (direction) {
            case 'l':
            case 'r':
                DragClick.style.width = `${po.x - left}px`;
                DragWrap.style.width = `${po.x - left}px`;
                break;
            case 't':
            case 'b':
                DragClick.style.height = `${po.y - top}px`;
                DragWrap.style.height = `${po.x - top}px`;
                break;
            case 'lt':
            case 'tr':
                document.querySelector('.drag-click').style.width = `${po.x - left}px`;
                document.querySelector('.drag').style.width = `${po.x - left}px`;
                break;
            case 'rb':
            case 'bl':
                document.querySelector('.drag-click').style.width = `${po.x - left}px`;
                document.querySelector('.drag').style.width = `${po.x - left}px`;
                break;
        }
    }

    appendMaskIntoDoc() {
        const {
            width,
            height,
            left,
            top
        } = this.state;
        const style = {
            width,
            height,
            left,
            top
        };
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            <DragWrap
                handleMove={this.handleMove}
                style={style}
            />,
            this.container
        )
    }

    render() {
        const { prefix } = this.props;
        const {
            width,
            height,
            left,
            top
        } = this.state;
        const style = {
            width,
            height,
            left,
            top
        };
        return (
            <div
                className={
                    classNames(`${prefix}`)
                }
                ref={node => (this.nodeRef = node)}
            >
                {
                    this.props.children
                }
            </div>
        );
    }
}

Drag.propTypes = {
    prefix: PropTypes.string,
    children: PropTypes.node,
};

Drag.defaultProps = {
    prefix: 'drag'
}

export default Drag;