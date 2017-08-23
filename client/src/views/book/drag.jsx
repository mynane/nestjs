import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from './util/addEventListener';
import contains from './util/contains';
import clientRect from './util/getBoundingClientRect';
import Draghoc from './drag/';
import './drag.scss';

@Draghoc
class Drag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        }
    }

    componentDidMount() {
        
    }

    render() {
        const { prefix, children, ...props } = this.props;
        return (
            <div
                {...props}
                className={
                    classNames(`${prefix}`)
                }
                ref={node => (this.nodeRef = node)}
            >
                {
                    children
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