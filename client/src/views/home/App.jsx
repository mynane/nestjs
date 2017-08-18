/**
 * @file App.jsx
 * @author denglingbo
 *
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

@connect(
    state => ({
        user: state.toJS().user,
    })
)
class App extends Component {
    constructor(props) {
        super(props);

        this.handleHi = ::this.handleHi;
    }

    componentWillMount() {
    }

    handleHi() {
        alert('Hi');
    }

    render() {
        const { user } = this.props;

        return (
            <div>
                <h4>Homeeeee Hello {user.data.name}</h4>
                <button onClick={this.handleHi}>Hi!!</button>
            </div>
        )
    }
}

App.propTypes = {
    userinfo: PropTypes.objectOf(PropTypes.string),
}

App.defaultProps = {
    userinfo: {
        data: 'Who?'
    }
}

export default withRouter(App);
