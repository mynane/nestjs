var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('./test.config.ts');

describe('============登录api测试============', function () {
    before(function (done) {
        done();
    });

    // 登陆接口
    describe('#/api/users/login', function () {
        it('将登陆成功', function (done) {
            var profile = {
                userName: 'shijh',
                password: '12qwaszx',
            }
            request(config.url)
                .post('/api/users/login')
                .send(profile)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.code.should.equal(200);
                    config.userCookie = res.headers['set-cookie'];
                    done();
                })
        })
    })
})
