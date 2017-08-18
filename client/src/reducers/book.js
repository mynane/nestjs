/**
 * @file book.js
 * @author denglingbo
 *
 */

import Immutable from 'immutable';
import ActionType from '../actions/ActionType';

const initState = Immutable.fromJS({
    list: [],
    detail: {},
    visible: false,
});

export default function (state = initState, action) {
    switch (action.type) {
        case ActionType.RECEIVE_BOOK_LIST:
            return state.set('list', action.payload);

        case ActionType.RECEIVE_BOOK_DETAIL:
            return state.set('detail', action.payload);

        case ActionType.SET_BOOK_DETAIL_SHOW:
            return state.set('visible', true);

        case ActionType.SET_BOOK_DETAIL_HIDE:
            return state.set('visible', false);

        default:
            return state;
    }
}
