/**
 * @file search.js
 * @author denglingbo
 *
 */

import { fetchTopic, createTopic } from '../service';
import ActionType from './ActionType';

const receiveTopicAction = (data) => ({
    type: ActionType.RECEIVE_TOPIC,
    payload: data.map(d => d)
});

export const topicAction = () => dispatch => (
    new Promise((resolve, reject) => {
        fetchTopic()
            .then(res => {
                dispatch(receiveTopicAction(res));
            })
            .catch(err => {
                reject(err);
            })
    })
)

const receiveCreateTopic = (data) => ({
    type: ActionType.REQUEST_TOPIC_CREATE,
    payload: data,
});

export const createTopicAction = (params) => dispatch => (
    new Promise((resolve, reject) => {
        createTopic(params)
            .then(res => {
                // mock 一下
                const data = {
                    id: params.name,
                    name: res.name + ' Mock Me -> ' + params.name,
                }

                dispatch(receiveCreateTopic(data));
            })
            .catch(err => {
                reject(err);
            })
    })
)
