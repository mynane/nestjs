/**
 * @file userinfo.js
 * @author deo
 */

import Immutable from 'immutable';
import ActionType from '../actions/ActionType';

const initState = Immutable.fromJS({
    // 用户信息
    data: {},

    // 登录状态
    isAuth: false,
});

export default function (state = initState, action) {
    switch (action.type) {
        case ActionType.RECEIVE_USER:
            return state.set('data', action.payload);

        case ActionType.USER_LOGIN:
            return state.set('isAuth', true);

        case ActionType.USER_LOGOUT:
            return state.set('isAuth', false);

        default:
            return state;
    }
}
