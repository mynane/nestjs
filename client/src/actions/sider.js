/**
 * @file sider.js
 * @author denglingbo
 *
 */

import { fetchSider } from '../service';
import ActionType from './ActionType';
import Promise from 'bluebird';

const receive = (data) => ({
    type: ActionType.RECEIVE_SIDER,
    payload: data,
});

export default () => dispatch => (
    new Promise((resolve, reject) => {
        fetchSider()
            .then(res => {
                dispatch(receive(res));
            })
            .catch(err => {
                reject(err);
            })
    })
)
