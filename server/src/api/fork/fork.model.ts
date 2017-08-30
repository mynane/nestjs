/**
 * @file fork.model.ts
 * @author shijh
 *
 * fork Schema
 */

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ForkSchema = new Schema({
    // 对应页面
    page: { type: Schema.Types.ObjectId, ref: 'Pages' },
    // fork user集合
    forkUser: [
        {
            userId: { type: Schema.Types.ObjectId, ref: 'Users' },
            forkTime: { type: Date, default: Date.now },
            newPage: { type: Schema.Types.ObjectId, ref: 'Pages' }
        }
    ]
}, {
    versionKey: false
})

export default mongoose.model('Forks', ForkSchema);
