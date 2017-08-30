/**
 * @file fork.model.ts
 * @author shijh
 *
 * fork Schema
 */

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ShareSchema = new Schema({
    // 页面信息
    page: { type: Schema.Types.ObjectId, ref: 'Pages' },
    // 用户信息
    user: { type: Schema.Types.ObjectId, ref: 'Users'  },
    // 分享时间
    shareTime: { type: Date, default: Date.now }
}, {
    versionKey: false
})

export default mongoose.model('Shares', ShareSchema);
