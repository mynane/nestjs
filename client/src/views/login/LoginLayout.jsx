/**
 * @file LoginLayout.jsx
 * @author denglingbo
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import userAction from '../../actions/user';
import Login from './App';

@connect(
    state => ({
        user: state.toJS().user,
    })
)
class LoginLayout extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;

        return (
            <div>
                <Redirect to="/login" />
                <Route
                    path="/login"
                    component={Login}
                />
            </div>
        );
    }
}

export default withRouter(LoginLayout);
