/**
 * @file index.js
 * @author denglingbo
 */

import Immutable from 'immutable';

import user from './user';
import sider from './sider';

import book from './book';
import topic from './topic';

export default Immutable.fromJS({
    user,
    sider,
    book,
    topic,
});
