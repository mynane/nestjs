/**
 * @file search.js
 * @author denglingbo
 *
 */
import Immutable from 'immutable';
import ActionType from '../actions/ActionType';

const initState = Immutable.fromJS({
    data: [],
    list: [],
});

export default function (state = initState, action) {
    switch (action.type) {
        case ActionType.RECEIVE_TOPIC:
            return state.set('data', action.payload);

        case ActionType.REQUEST_TOPIC_CREATE:
            const newData = state.get('list').push(action.payload);
            return state.set('list', newData);

        default:
            return state;
    }
}
