import * as _ from 'lodash';

export default class CommonService {
    static commonResponse(data) {
        return {
            code: 200,
            message: '请求成功',
            data
        }
    }

    static loginOk(data) {
        return {
            code: 200,
            message: '登录成功',
            data
        }
    }

    static loginError(data) {
        return {
            code: 500,
            message: '登录失败',
            data
        }
    }

    static notFoundResponse(data?: Array<Object>) {
        return {
            code: 401,
            message: '用户未登录',
            data: data || {}
        }
    }
}
