/**
 * @file utils.ts
 * @author shijh
 *
 * 工具方法
 */
import * as LZString from 'lz-string';

export default class Utils {
    static parseContent(data) {
        if (!data) {
            return {};
        }
        if (data instanceof Array) {
            return data.map((item) => {
                const { content, _id, title } = item;
                return {
                    _id,
                    title,
                    content: JSON.parse(LZString.decompressFromBase64(content || ''))
                }
            })
        } else {
            const { content, _id, title } = data;
            return {
                _id,
                title,
                content: JSON.parse(LZString.decompressFromBase64(content || ''))
            }
        }
    }
}