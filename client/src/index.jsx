/**
 * @file index.jsx
 * @author deo
 *
 */
import React from 'react';
import ReactDOM from 'react-dom';
import FrameApp from 'freed-spa/lib/App';
import App from './App';
import reducers from './reducers';
import { checkUser, receiveLogin } from './actions/user';
import store from 'freed-spa/lib/store';

/**
 * 启动 App
 */
const startApp = (data) => {
    ReactDOM.render(
        <FrameApp asyncReducers={reducers}>
            <App initData={data} />
        </FrameApp>,
        document.getElementById('root')
    );
}

/**
 * 首先检查该用户是否 401
 */
checkUser()
    .then((data) => {
        startApp(data);
    })
