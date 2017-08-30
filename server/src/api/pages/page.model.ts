/**
 * @file page.model.ts
 * @author shijh
 *
 * 页面Schema
 */

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PageSchema = new Schema({
    // 创建人id
    createUser: { type: Schema.Types.ObjectId, ref: 'Users' },
    // 当前所属人id
    owerUser: { type: Schema.Types.ObjectId, ref: 'Users' },
    // 页面title
    title: { type: String, default: '静态页面' },
    // 页面内容
    content: { type: String },
    // 创建时间
    createTime: { type: Date, default: Date.now },
    // 更新时间
    updateTime: { type: Date, default: Date.now },
    // 是否为fork, 默认false
    fork: { type: Boolean, default: false },
    // forkId
    forkId: { type:  Schema.Types.ObjectId },
    // forkNumber fork数
    forkNum: { type: Number, default: 0 },
    // 父元素id
    parentId: { type: Schema.Types.ObjectId },
    // good 点赞数
    good: { type: Number, default: 0 },
    // bad 差评数
    bad: { type: Number, default: 0 },
    // fork时间
    forkTime: { type: Date, default: Date.now },
    // 是否发布
    publish: { type: Boolean, default: false }
}, {
    versionKey: false
});

export default mongoose.model('Pages', PageSchema);
