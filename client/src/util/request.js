/**
 * @file fetch.js
 * @author deo
 */
import axios from 'axios';
// import Promise from 'bluebird';
import { history } from 'freed-spa/lib/store';

const config = window.config;
const apiHost = config && config.apiHost ? config.apiHost : '';

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = `${apiHost}`;

axios.defaults.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
};

// http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     }
// );

// http response 拦截器
axios.interceptors.response.use(
    res => {
        const result = res.data;

        if (result.code === 200) {
            return result.data;
        }

        if (result.code === 401) {
            return Promise.reject({
                code: 401
            });
        }

        return res;
    },
    err => {
        if (err.response) {
            const status = err.response.status;
            if (status === 401) {

            }
        }

        throw err;
    }
);

/**
 * 请求发送
 * @param url
 * @param params
 * @param type
 * @returns {*}
 */
export const send = (url, params, type) => {
    const req = axios[type](url, {
        params
    });

    return req;
}

export const get = (url, params) => send(url, params, 'get');

export const post = (url, params) => send(url, params, 'post');

export default axios;
