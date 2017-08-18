/**
 * @file Login.jsx
 * @author denglingbo
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { loginAction, loginUtil } from '../../actions/user';
import { Redirect } from 'react-router-dom';
import store, { history } from 'freed-spa/lib/store'

@connect(
    state => ({
        user: state.toJS().user.data,
    }),
    dispatch => bindActionCreators({ loginAction }, dispatch)
)
class App extends Component {
    constructor(props) {
        super(props);

        this.handleLogin = ::this.handleLogin;
    }

    componentWillMount() {}

    handleLogin() {
        this.props.loginAction();
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <input type="text" defaultValue="admin" />
                <input type="password" defaultValue="123456" />
                <button onClick={this.handleLogin}>Login!!</button>
            </div>
        )
    }
}

export default withRouter(App);
