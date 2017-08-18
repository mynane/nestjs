/**
 * @file userinfo.js
 * @author deo
 */

import { fetchUser, login } from '../service';
import ActionType from './ActionType';
// import Promise from 'bluebird';

export const receiveUser = (data) => ({
    type: ActionType.RECEIVE_USER,
    payload: data,
});

export const receiveLogin = () => ({
    type: ActionType.USER_LOGIN,
    payload: true,
});

export const receiveLogout = (data) => ({
    type: ActionType.USER_LOGOUT,
    payload: false,
});

/**
 * 获取用户信息
 * 1. 成功则设置为登录状态
 * 2. 失败则设置为登出状态
 */
export const checkUser = () => (
    new Promise((resolve, reject) => {
        fetchUser()
            .then(res => {
                return resolve(res);
            })
            .catch(err => {
                return reject(err);
            })
    })
)

/**
 * 获取用户信息
 * 1. 成功则设置为登录状态
 * 2. 失败则设置为登出状态
 */
export const fetchUserAction = () => dispatch => (
    fetchUser()
        .then(res => {
            // 如果获取用户信息正常，则修改 isAuth
            dispatch(receiveLogin());

            // 储存用户信息
            dispatch(receiveUser(res));
        })
        .catch(err => {
            dispatch(receiveLogout());

            return Promise.reject(err);
        })
)

/**
 * 登录接口
 * 该接口只设置用户 isAuth
 * @param params
 */
export const loginAction = (params) => dispatch => (
    login(params)
        .then(() => {
            dispatch(receiveLogin());
        })
        .catch(err => {
            return reject(err);
        })
)
