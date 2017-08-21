import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from './util/addEventListener';
import mousePosition from './util/getPointerPosition';
import throttle from './util/throttle';

const dots = ['l', 'lt', 't', 'tr', 'r', 'rb', 'b', 'bl'];

class DragWrap extends Component {

    componentWillUnmount() {
        this.mouseMove.remove();
        this.mouseUp.remove();
    }

    componentDidMount() {
    }

    handleDotDown = (e) => {
        this.mouseUp && this.mouseUp.remove();
        const direction = e.target.getAttribute('data-direction');
        this.mouseMove = addEventListener(document, 'mousemove', (ev) => {
            const mouse = mousePosition(ev);
            this.props.handleMove(mouse, direction);
        })
        this.mouseUp = addEventListener(document, 'mouseup', () => {
            this.mouseMove.remove();
        })
    }

    handleDotMove = (e) => {
        console.log(e)
    }

    handleDotUp = (e) => {
        const direction = e.target.getAttribute('data-direction');
        this.mouseMove.remove();
    }

    render() {
        const { prefix, handleMove, ...props } = this.props;
        return (
            <div
                className={`${prefix}-click`}
                {...props}
            >
                {
                    dots.map((item) => {
                        return (
                            <span
                                key={item}
                                data-direction={item}
                                onMouseDown={this.handleDotDown}
                                ref={node => (this.dotRef = node)}
                                className={
                                    classNames(
                                        `${prefix}-dot`,
                                        `${prefix}-${item}`
                                    )
                                }
                            />
                        )
                    })
                }
            </div>
        );
    }
}

DragWrap.propTypes = {
    prefix: PropTypes.string,
    handleMove: PropTypes.func,
};

DragWrap.defaultProps = {
    prefix: 'drag',
    handleMove: () => {}
}

export default DragWrap;