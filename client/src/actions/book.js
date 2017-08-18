/**
 * @file book.js
 * @author denglingbo
 *
 */

import { fetchBookList, fetchBookDetail } from '../service';
import ActionType from './ActionType';

const receiveBookList = (data) => ({
    type: ActionType.RECEIVE_BOOK_LIST,
    payload: data.map(d => d)
});

export const bookListAction = () => dispatch => (
    new Promise((resolve, reject) => {
        fetchBookList()
            .then(res => {
                dispatch(receiveBookList(res));
            })
            .catch(err => {
                reject(err);
            })
    })
)

export const showDetail = () => ({
    type: ActionType.SET_BOOK_DETAIL_SHOW,
})

export const hideDetail = () => ({
    type: ActionType.SET_BOOK_DETAIL_HIDE,
})

const receiveBookDetail = (data) => ({
    type: ActionType.RECEIVE_BOOK_DETAIL,
    payload: data
});

export const bookDetailAction = (params) => dispatch => (
    new Promise((resolve, reject) => {
        fetchBookDetail(params)
            .then(res => {
                // 这里强行 Mock 一下
                const data = res;
                data.content += ` <<Mock ID: ${params.id}>>`;

                dispatch(receiveBookDetail(data));

                resolve();
            })
            .catch(err => {
                reject(err);
            })
    })
)
