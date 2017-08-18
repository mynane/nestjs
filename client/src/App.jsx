/**
 * @file App.js
 * @author denglingbo
 *
 * 此处调用 framework 的 App.js
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Layout, Icon } from 'antd';
import AuthLayout from './common/layout/AuthLayout';
import LoginLayout from './views/login/LoginLayout';
import { checkUser } from './actions/user';
import './style/common.scss';

@connect(
    state => ({
        user: state.toJS().user,
    })
)
class App extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // 监听当前的地址变换
        // this.unlisten = this.props.history.listen(location => {
        //     // console.log('history location: ' + location.pathname);
        // });
    }

    componentWillUnmount() {
        // this.unlisten();
    }

    componentWillReceiveProps(nextProps) {
        // if (// 判断是否登录
        //     nextProps.user.isAuth
        //     // 默认认为用户没有登录，目前完全由前端控制
        //     && this.props.user.isAuth !== nextProps.user.isAuth
        // ) {
        //     this.props.fetchUserAction();
        // }
    }

    render() {
        const { user } = this.props;

        return (
            <Layout>
                {user.isAuth ?
                    <AuthLayout /> :
                    <LoginLayout />
                }
            </Layout>
        );
    }
}

export default withRouter(App);
