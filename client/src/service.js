/**
 * @file service.js
 * @author deo
 *
 * service
 */

// import { get, post } from 'freed-spa/lib/util/request';
import { get, post } from './util/request';

// export const fetchUser = () => get('/sys/user/sysLogin.htm', {
//     login: 'admin',
//     password: '123456'
// });

export const login = () => get('/login');

export const fetchUser = () => get('/api/page/query/599d23fe4401717c6c790207');

export const fetchSider = () => get('/sider');

export const fetchBookList = () => get('/book');

export const fetchBookDetail = (params) => get('/bookDetail', params);

export const fetchTopic = () => get('/topic');

export const createTopic = (params) => post('/topic/create', params);
