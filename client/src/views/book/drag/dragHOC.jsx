import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import addEventListener from '../util/addEventListener';
import contains from '../util/contains';
import clientRect from '../util/getBoundingClientRect';
import DragWrap from './dragWrap';

function Draghoc(WrapComponent) {
    class HOC extends Component {
        constructor(props) {
            super(props);
            this.state = {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            }
        }

        componentDidMount() {
            this.tagetEle = ReactDOM.findDOMNode(this.wrap);
            this.wrapEle = document.querySelector('.centent-wrap');
            this.wrapElePosition = clientRect(this.wrapEle);
            this.event = addEventListener(document, 'click', (e) => {
                if (contains(this.tagetEle, e.target) && !this.container) {
                    const { left, top, width, height } = clientRect(this.tagetEle);
                    this.setState({
                        width,
                        height,
                        left: left - this.wrapElePosition.left,
                        top: top - this.wrapElePosition.top
                    }, () => {
                        this.createWrap(this.wrapEle)
                    })
                } else if (!contains(this.tagetEle, e.target)) {
                    this.removeMaskIntoDoc(this.wrapEle);
                }
            })
        }


        componentWillUnmount() {
            this.removeMaskIntoDoc(this.tagetEle);
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
                this.container = null;
            } catch (e) { }
        }

        appendMaskIntoDoc() {
            const { left, height, width, top } = this.state;
            ReactDOM.unstable_renderSubtreeIntoContainer(
                this,
                <DragWrap
                    handleMove={this.handleMove}
                    style={{left, height, width, top}}
                />,
                this.container
            )
        }

        changeStyle = (type, value) => {
            const DragClick = document.querySelector('.drag-click');
            DragClick.style[type] = `${value}px`;
            this.tagetEle.style[type] = `${value}px`;
        }

        handleMove = (po, direction) => {
            const { left, top, width, height } = this.state;
            const DragClick = document.querySelector('.drag-click');
            console.log(DragClick)
            const DragWrap = this.tagetEle;
            switch (direction) {
                case 'l': {
                    const l = po.x - this.wrapElePosition.left;
                    const w = left - l;
                    this.changeStyle('left', l);
                    this.changeStyle('width', width + w);
                    break;
                }
                case 'r': {
                    const w = po.x - left - this.wrapElePosition.left;
                    this.changeStyle('width', w);
                    break;
                }
                case 't': {
                    const t = po.y - this.wrapElePosition.top;
                    const h = top - t;
                    this.changeStyle('top', t);
                    this.changeStyle('height', height + h);
                    break;
                }
                    break;
                case 'b':
                    const h = po.y - top - this.wrapElePosition.top;
                    this.changeStyle('height', h);
                    break;
                case 'lt': {
                    const w = po.x - left - this.wrapElePosition.left;
                    this.changeStyle('width', w);
                }
                case 'tr':
                    document.querySelector('.drag-click').style.width = `${po.x - left}px`;
                    document.querySelector('.drag').style.width = `${po.x - left}px`;
                    break;
                case 'rb': {
                    const w = po.x - left - this.wrapElePosition.left;
                    const h = po.y - top - this.wrapElePosition.top;
                    console.log(w)
                    // this.changeStyle('width', w);
                    this.changeStyle('height', h);
                }
                case 'bl':
                    document.querySelector('.drag-click').style.width = `${po.x - left}px`;
                    document.querySelector('.drag').style.width = `${po.x - left}px`;
                    break;
            }
        }

        render() {
            const {
                width, height
            } = this.state;
            const { wrapNode, ...props } = this.props;
            const style = {
                width: width || 'initial',
                height: height || 'initial',
            };
            Object.assign(style, this.props.style)
            return (
                <WrapComponent
                    {...props}
                    style={style}
                    ref={node => (this.wrap = node)}
                />
            )
        }
    }
    return HOC;
}

export default Draghoc;
